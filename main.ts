import * as d3 from 'd3'

const selector = '#main'
const MAIN_CONTAINER = document.querySelector(selector)
if (MAIN_CONTAINER) {
  MAIN_CONTAINER.style.position = 'absolute'
  MAIN_CONTAINER.style.width = '100%'
  MAIN_CONTAINER.style.height = '100%'
}

// const SVG = document.querySelector('svg')
// if (SVG) {
//   SVG.setAttribute('width', window.innerWidth.toString())
//   SVG.setAttribute('height', window.innerHeight.toString())
// }

var svg = d3
  .select('svg')
  .attr('width', window.innerWidth)
  .attr('height', window.innerWidth)

type AdjacenyList = {
  [K in string]: Array<string | undefined>
}

type NodePosition = {
  left: number
  top: number
}

class DrawTreeNode {
  position: NodePosition
  children: Array<DrawTreeNode | undefined>
  key: string
  dimension: number = 40
  element: HTMLElement
  constructor(
    key: string,
    children: Array<DrawTreeNode | undefined>,
    position: NodePosition = { left: 0, top: 0 },
  ) {
    this.key = key
    this.children = children
    this.position = position
    this.element = document.createElement('div')
    this.element.className = 'node'
    this.element.style.width = `${this.dimension}px`
    this.element.style.height = `${this.dimension}px`
    this.element.innerHTML = key
    if (MAIN_CONTAINER) MAIN_CONTAINER.appendChild(this.element)
  }
}

class DefaultDict<T> {
  value: Record<string | number, T> = {}
  private defaultValue: T
  constructor(defaultValue: T) {
    this.defaultValue = defaultValue
  }
  get(key: string | number): T {
    if (!(key in this.value)) {
      this.value[key] = this.defaultValue
    }
    return this.value[key]
  }

  set(key: string | number, val: T) {
    this.value[key] = val
  }
}

class DrawTree {
  root: DrawTreeNode
  offsetCount = 0
  constructor(root: string, adjacencyList: AdjacenyList) {
    this.root = this.createTreeNode(root, adjacencyList)
    // this.knuthCalculatePositions(this.root)
    this.davidCalculatePositions(this.root)
    this.draw(this.root)
  }

  createTreeNode(root: string, adjacencyList: AdjacenyList): DrawTreeNode {
    const children = (adjacencyList[root] || []).map(x => {
      if (x === undefined) return x
      return this.createTreeNode(x, adjacencyList)
    })
    const node = new DrawTreeNode(root, children)
    return node
  }

  davidCalculatePositions(
    node: DrawTreeNode,
    depth: number = 0,
    siblingCount = new DefaultDict<number>(-1),
    rightMost: number = -1,
  ): { rightMost: number; left: number } {
    const leftPositions: Array<number> = []
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i]
      if (!child) continue
      // treat left and right differently
      let { left, rightMost: rm } = this.davidCalculatePositions(
        child,
        depth + 1,
        siblingCount,
        rightMost,
      )
      if (rm > rightMost) rightMost = rm
      leftPositions.push(left)
    }
    node.position.top = depth
    const count = siblingCount.get(depth)
    if (node.children.length >= 1) {
      const leftMost = Math.min(...leftPositions)
      rightMost = Math.max(...leftPositions)
      const centered = leftMost + Math.abs(rightMost - leftMost) / 2
      node.position.left = centered
    } else {
      node.position.left = Math.max(count, rightMost) + 1
      rightMost++
    }
    siblingCount.set(depth, node.position.left)
    const out = { left: node.position.left, rightMost }
    return out
  }

  knuthCalculatePositions(node?: DrawTreeNode, depth: number = 0) {
    if (node === undefined) return
    const children = node.children
    const left = children[0]
    const right = children[1]
    this.knuthCalculatePositions(left, depth + 1)
    node.position.left = this.offsetCount++
    node.position.top = depth
    this.knuthCalculatePositions(right, depth + 1)
  }

  draw(node?: DrawTreeNode): { left?: number; top?: number } {
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

const tree = new DrawTree('O', {
  E: ['A', 'D'],
  D: ['B', 'C'],
  O: ['E', 'N'],
  N: ['G', 'M'],
  M: ['I', 'J'],
})
