"use strict";
var selector = '#main';
var MAIN_CONTAINER = document.querySelector(selector);
if (MAIN_CONTAINER) {
    MAIN_CONTAINER.style.position = 'absolute';
    MAIN_CONTAINER.style.width = '100%';
    MAIN_CONTAINER.style.height = '100%';
}
var DrawTreeNode = /** @class */ (function () {
    function DrawTreeNode(key, children, position) {
        if (position === void 0) { position = { left: 0, top: 0 }; }
        this.dimension = 40;
        this.key = key;
        this.children = children;
        this.position = position;
        this.element = document.createElement('div');
        this.element.className = 'node';
        this.element.style.width = this.dimension + "px";
        this.element.style.height = this.dimension + "px";
        this.element.innerHTML = key;
        if (MAIN_CONTAINER)
            MAIN_CONTAINER.appendChild(this.element);
    }
    return DrawTreeNode;
}());
var DefaultDict = /** @class */ (function () {
    function DefaultDict(defaultValue) {
        this.value = {};
        this.defaultValue = defaultValue;
    }
    DefaultDict.prototype.get = function (key) {
        if (!(key in this.value)) {
            this.value[key] = this.defaultValue;
        }
        return this.value[key];
    };
    DefaultDict.prototype.set = function (key, val) {
        this.value[key] = val;
    };
    return DefaultDict;
}());
var DrawTree = /** @class */ (function () {
    function DrawTree(root, adjacencyList) {
        this.offsetCount = 0;
        this.root = this.createTreeNode(root, adjacencyList);
        // this.knuthCalculatePositions(this.root)
        this.davidCalculatePositions(this.root);
        this.draw(this.root);
    }
    DrawTree.prototype.createTreeNode = function (root, adjacencyList) {
        var _this = this;
        var children = (adjacencyList[root] || []).map(function (x) {
            if (x === undefined)
                return x;
            return _this.createTreeNode(x, adjacencyList);
        });
        var node = new DrawTreeNode(root, children);
        return node;
    };
    DrawTree.prototype.davidCalculatePositions = function (node, depth, siblingCount) {
        if (depth === void 0) { depth = 0; }
        if (siblingCount === void 0) { siblingCount = new DefaultDict(0); }
        var leftPositions = [];
        for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            if (!child)
                continue;
            leftPositions.push(this.davidCalculatePositions(child, depth + 1, siblingCount));
        }
        node.position.top = depth;
        var count = siblingCount.get(depth);
        if (node.children.length >= 1) {
            var leftMost = Math.min.apply(Math, leftPositions);
            var rightMost = Math.max.apply(Math, leftPositions);
            var centered = leftMost + Math.abs(rightMost - leftMost) / 2;
            node.position.left = centered;
        }
        else {
            node.position.left = count;
        }
        siblingCount.set(depth, count + 1);
        return node.position.left;
    };
    DrawTree.prototype.knuthCalculatePositions = function (node, depth) {
        if (depth === void 0) { depth = 0; }
        if (node === undefined)
            return;
        var children = node.children;
        var left = children[0];
        var right = children[1];
        this.knuthCalculatePositions(left, depth + 1);
        node.position.left = this.offsetCount++;
        node.position.top = depth;
        this.knuthCalculatePositions(right, depth + 1);
    };
    DrawTree.prototype.draw = function (node) {
        if (node === undefined)
            return {};
        var left = node.position.left * node.dimension * 1.3;
        var top = node.position.top * node.dimension * 1.3;
        node.element.style.left = left + "px";
        node.element.style.top = top + "px";
        for (var i = 0; i < node.children.length; i++) {
            var child = this.draw(node.children[i]);
            // TODO: draw line
            // this.drawLine(left, top, child.left, child.top)
        }
        return { left: left, top: top };
    };
    DrawTree.prototype.drawLine = function (left, top, childLeft, childTop) {
        // <line stroke-width="1px" stroke="#000000"  x1="0" y1="0" x2="100" y2="100" id="mySVG"/>
        if (!SVG)
            return;
        var line = document.createElement('line');
        SVG.appendChild(line);
        line.setAttribute('stroke', 'white');
        line.setAttribute('stroke-width', '1px');
        line.setAttribute('x1', left.toString());
        line.setAttribute('y1', top.toString());
        line.setAttribute('x2', childLeft.toString());
        line.setAttribute('y2', childTop.toString());
    };
    return DrawTree;
}());
// var svg = d3
//   .select('svg')
//   .attr('width', window.innerWidth)
//   .attr('height', window.innerWidth)
var tree = new DrawTree('O', {
    // E: ['A', 'D'],
    // D: ['B', 'C'],
    O: ['E', 'N'],
    N: ['G', 'M'],
});
