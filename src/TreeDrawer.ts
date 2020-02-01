import { TreeNode } from './TreeNode'
import { StrategyConstructor } from 'index'
const selector = '#main'
const MAIN_CONTAINER = document.querySelector(selector)
if (MAIN_CONTAINER) {
  MAIN_CONTAINER.style.position = 'relative'
  MAIN_CONTAINER.style.width = '100%'
  MAIN_CONTAINER.style.height = '100%'

  var svg = d3
    .select('svg')
    .attr('width', `${MAIN_CONTAINER.offsetWidth}px`)
    .attr('height', `${MAIN_CONTAINER.offsetHeight}px`)
}

export class TreeDrawer {
  constructor(tree: TreeNode, Strategy: StrategyConstructor) {
    const strategy = new Strategy(tree)
    strategy.calculatePositions()
    this.draw(tree)
  }

  draw(node?: TreeNode): { left?: number; top?: number } {
    if (node === undefined) return {}
    const left = node.position.left * node.dimension * 1.3
    const top = node.position.top * node.dimension * 1.3
    node.element.style.left = `${left}px`
    node.element.style.top = `${top}px`
    for (let i = 0; i < node.children.length; i++) {
      const child = this.draw(node.children[i])
      if (child.left !== undefined && child.top !== undefined) {
        this.drawLine(left, top, child.left, child.top, node.dimension)
      }
    }
    return { left, top }
  }

  drawLine(
    left: number,
    top: number,
    childLeft: number,
    childTop: number,
    dimension: number,
  ) {
    svg
      .append('line')
      .attr('stroke', 'white')
      .attr('fill', 'white')
      .attr('x1', left + dimension / 2)
      .attr('y1', top + dimension / 2)
      .attr('x2', childLeft + dimension / 2)
      .attr('y2', childTop + dimension / 2)
  }
}
