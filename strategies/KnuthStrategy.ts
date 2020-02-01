export class KnuthStrategy implements StrategyInterface {
  private offsetCount = 0
  root: TreeNode
  constructor(root: TreeNode) {
    this.root = root
  }

  calculatePositions() {
    this._calculatePositions(this.root)
  }

  _calculatePositions(node?: TreeNode, depth: number = 0) {
    if (node === undefined) return
    const children = node.children
    const left = children[0]
    const right = children[1]
    this._calculatePositions(left, depth + 1)
    node.position.left = this.offsetCount++
    node.position.top = depth
    this._calculatePositions(right, depth + 1)
  }
}
