import { NodeKey, NodePosition, AdjacenyList } from 'index'

const selector = '#main'
const MAIN_CONTAINER = document.querySelector(selector)

export class TreeNode {
  position: NodePosition
  children: Array<TreeNode | undefined>
  key: NodeKey
  dimension: number = 50
  mod = 0
  element: HTMLElement
  thread?: TreeNode
  constructor(
    key: NodeKey,
    children: Array<TreeNode | undefined>,
    position: NodePosition = { left: 0, top: 0 },
  ) {
    this.key = key
    this.children = children
    this.position = position
    this.element = document.createElement('div')
    this.element.className = 'node'
    this.element.style.width = `${this.dimension}px`
    this.element.style.height = `${this.dimension}px`
    this.element.innerHTML = key.toString()
    if (MAIN_CONTAINER) MAIN_CONTAINER.appendChild(this.element)
  }

  static createTree(root: NodeKey, adjacencyList: AdjacenyList): TreeNode {
    const children = (adjacencyList[root] || []).map((x) => {
      if (x === undefined) return x
      return TreeNode.createTree(x, adjacencyList)
    })
    const node = new TreeNode(root, children)
    return node
  }
}
