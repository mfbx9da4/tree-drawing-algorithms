import * as d3 from 'd3'
import { TreeNode } from './TreeNode'
import { TreeDrawer } from './TreeDrawer'
import { DavidStrategy } from './strategies/DavidStrategy'
import { KnuthStrategy, knuthStrategy } from './strategies/KnuthStrategy'
import { davidStrategy } from './strategies/DavidStrategy2'
import { shannonStrategy } from './strategies/ShannonStrategy'
import { reingoldTilfordStrategy } from './strategies/ReingoldTilfordStrategy'

const A = 'A'
const B = 'B'
const C = 'C'
const D = 'D'
const E = 'E'
const F = 'F'
const G = 'G'
const H = 'H'
const I = 'I'
const J = 'J'
const K = 'K'
const L = 'L'
const M = 'M'
const N = 'N'
const O = 'O'
const P = 'P'
const Q = 'Q'
const R = 'R'
const S = 'S'
const T = 'T'
const U = 'U'
const V = 'V'
const W = 'W'
const X = 'X'
const Y = 'Y'
const Z = 'Z'

const a = {
  E: [A, D],
  D: [B, C, X, Y, Z, V],
  R: [E, X, Y, Z, V, N],
  V: [P],
  N: [G, M],
  M: [I, J],
  G: [O],
  O: [S, T],
}

const b = {
  E: [A, D],
  D: [B, C, J],
  J: [F, G],
  G: [H, I],
  R: [E, P, W, X, Y, Z],
}

const c = {
  E: [A, D],
  D: [B, J],
  J: [F, G],
  G: [H, I],
  R: [E, P],
}

const bigRightSubtree = {
  R: [A, B],
  B: [P],
  P: [Q],
  Q: [S],
  S: [T],
  T: [U],
}

const tree = TreeNode.createTree(R, c)

// knuthStrategy(tree)
// davidStrategy(tree)
// shannonStrategy(tree)
reingoldTilfordStrategy(tree)
new TreeDrawer(tree)
