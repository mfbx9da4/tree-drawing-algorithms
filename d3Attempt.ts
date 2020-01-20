var svg = d3
  .select('svg')
  .attr('width', window.innerWidth)
  .attr('height', window.innerWidth)

var data = [
  { label: 'A', r: 20, left: 0, top: 104 },
  { label: 'B', r: 20, left: 80, top: 156 },
  { label: 'C', r: 20, left: 160, top: 156 },
  { label: 'D', r: 20, left: 120, top: 104 },
  { label: 'E', r: 20, left: 40, top: 52 },
  { label: 'F', r: 20, left: 240, top: 104 },
  { label: 'G', r: 20, left: 320, top: 156 },
  { label: 'H', r: 20, left: 400, top: 156 },
  { label: 'I', r: 20, left: 360, top: 104 },
  { label: 'J', r: 20, left: 280, top: 52 },
  { label: 'K', r: 20, left: 200, top: 0 },
]

var elem = svg.selectAll('g node').data(data)

/*Create and place the "blocks" containing the circle and the text */

var elemEnter = elem
  .enter()
  .append('g')
  .attr('transform', function(d) {
    let left = d.left + d.r * 1.5
    let top = d.top + d.r * 1.5
    return `translate(${left},${top})`
  })

/*Create the circle for each block */
var circle = elemEnter
  .append('circle')
  .attr('r', function(d) {
    return d.r
  })
  .attr('stroke', '#c3c3c3')
  .attr('fill', 'rgba(0,0,0,0)')

/* Create the text for each block */
elemEnter
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('dx', function(d) {
    return 0
  })
  .text(function(d) {
    return d.label
  })
  .attr('fill', '#c3c3c3')
