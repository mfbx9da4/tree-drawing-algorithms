import { NodeKey } from 'index'
import { TreeNode } from '../TreeNode'
import { DefaultDict } from '../utils/DefaultDict'

export function reingoldTilfordStrategy(node: TreeNode) {
  addMods(setup(node))
}

function nextLeft(v: TreeNode): TreeNode | undefined {
  if (v.thread) return v.thread
  if (v.children) return v.children[v.children.length - 1]
}

function nextRight(v: TreeNode): TreeNode | undefined {
  if (v.thread) return v.thread
  if (v.children) return v.children[0]
}

function contour(
  left: TreeNode,
  right: TreeNode,
  maxDiff?: number,
  leftOuter?: TreeNode,
  rightOuter?: TreeNode,
  lOffset = 0,
  rOffset = 0,
): {
  leftInner: TreeNode | undefined
  rightInner: TreeNode | undefined
  maxDiff: number
  lOffset: number
  rOffset: number
  leftOuter: TreeNode
  rightOuter: TreeNode
} {
  // update the maxDiff
  const delta = left.position.left + lOffset - (right.position.left + rOffset)
  if (!maxDiff || delta > maxDiff) {
    maxDiff = delta
  }

  if (!leftOuter) leftOuter = left
  if (!rightOuter) rightOuter = right

  const lo = nextLeft(leftOuter)
  const li = nextRight(left)
  const ri = nextLeft(right)
  const ro = nextRight(rightOuter)

  if (li && ri) {
    lOffset += left.mod
    rOffset += right.mod
    return contour(li, ri, maxDiff, lo, ro, lOffset, rOffset)
  }

  return {
    leftInner: li,
    rightInner: ri,
    maxDiff,
    lOffset,
    rOffset,
    leftOuter,
    rightOuter,
  }
}

function fixSubtrees(left: TreeNode, right: TreeNode): number {
  let {
    leftInner,
    rightInner,
    maxDiff,
    lOffset,
    rOffset,
    leftOuter,
    rightOuter,
  } = contour(left, right)

  // Add 1 so they don't conflict
  maxDiff += 1
  // Add another if the midpoint between r and l is odd
  // This is to ensure integral coordinates for all nodes
  maxDiff += (right.position.left + maxDiff + left.position.left) % 2

  // Move the right tree over to not conflict
  right.position.left += maxDiff
  // We shift all the children of the right subtree over
  // We actually update the children's left later
  right.mod = maxDiff

  // If this node has some children we need to update the rOffset
  if (right.children.length) rOffset += maxDiff

  // if one is deeper than the other
  // update the thread
  if (rightInner && !leftInner) {
    leftOuter.thread = rightInner
    leftOuter.mod = rOffset - lOffset
  } else if (leftInner && !rightInner) {
    rightOuter.thread = leftInner
    rightOuter.mod = lOffset - rOffset
  }

  return (left.position.left + right.position.left) / 2
}

function setup(node: TreeNode, depth = 0): TreeNode {
  node.position.top = depth
  if (node.children.length === 0) {
    node.position.left = 0
    return node
  }

  if (node.children.length === 1) {
    node.position.left = setup(node, depth + 1).position.left
    return node
  }

  if (node.children.length > 2) {
    throw new Error('This algorithm only works for binary trees')
  }

  const left = setup(node.children[0] as TreeNode, depth + 1)
  const right = setup(node.children[1] as TreeNode, depth + 1)

  node.position.left = fixSubtrees(left, right)
  return node
}

function addMods(node: TreeNode, mod = 0): TreeNode {
  node.position.left += mod
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i]
    if (child) addMods(child, mod + node.mod)
  }
  return node
}
