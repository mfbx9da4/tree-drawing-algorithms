interface StrategyConstructor {
  new (root: TreeNode): StrategyInterface
}
interface StrategyInterface {
  root: TreeNode
  calculatePositions(): void
}

type AdjacenyList = {
  [K in string]: Array<string | number | undefined>
}

type NodePosition = {
  left: number
  top: number
}
