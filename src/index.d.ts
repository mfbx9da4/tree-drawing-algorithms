import { TreeNode } from './TreeNode'

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

type NodeKey = string | number

type NodePosition = {
  left: number
  top: number
}
