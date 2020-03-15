import { TreeNode } from '../TreeNode'

type GlobalVars = {
  offsetCount: number
}

export function knuthStrategy(root: TreeNode) {
  const global = { offsetCount: 0 }
  traverse(root, 0, global)
}

function traverse(
  node: TreeNode | undefined,
  depth: number,
  global: GlobalVars,
) {
  if (node === undefined) return
  const left = node.children[0]
  const right = node.children[1]
  traverse(left, depth + 1, global)
  node.position.left = global.offsetCount++
  node.position.top = depth
  traverse(right, depth + 1, global)
}
