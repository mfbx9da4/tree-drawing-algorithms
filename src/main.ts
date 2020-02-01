import * as d3 from 'd3'
import { TreeNode } from './TreeNode'
import { TreeDrawer } from './TreeDrawer'
import { DavidStrategy } from './strategies/DavidStrategy'
import { KnuthStrategy } from './strategies/KnuthStrategy'

const tree = TreeNode.createTree('R', {
  E: ['A', 'D'],
  D: ['B', 'C'],
  R: ['E', 'N'],
  Z: ['P'],
  N: ['G', 'M'],
  M: ['I', 'J'],
  G: ['O'],
  O: ['S'],
})
// new TreeDrawer(tree, KnuthStrategy)
new TreeDrawer(tree, DavidStrategy)
