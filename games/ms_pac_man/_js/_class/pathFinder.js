/* jslint esversion: 6 */
class PathFinder {

	constructor(originator) {

		this.originator = originator;
	}

	getPathLength(start, end) {

		return Math.abs(start.row - end.row) + Math.abs(start.column - end.column);
	}

	getStraightLineDistance(start, end) {

		return Math.hypot((start.row - end.row), (start.column - end.column));
	}
	/**
	 * calculate weight of given node for A* algorithm
	 * @param {Node} [current] - node to be tested
	 * @param {Node} [start] - starting point of current path
	 * @param {Node} [end] - destination node
	 */
	getWeight(current, start, end) {

		const gScore = this.getPathLength(current, start);
		const hScore = this.getPathLength(current, end);
		const distanceToStart = this.getStraightLineDistance(current, start);
		const distanceToEnd = this.getStraightLineDistance(current, end);

		return gScore + hScore + distanceToEnd - distanceToStart;
	}

	isSamePosition(node1, node2) {

		return node1.row === node2.row && node1.column === node2.column;
	}

	isVisited(target, visited) {

		return visited.some(node => this.isSamePosition(node, target));
	}
	/**
	 * retrieve all unvisited and accessible neighbours
	 */
	getNeighbours(current, visited) {

		let neighbours = this.originator.getAllAdjacentGrids(current.row, current.column);

		return neighbours.filter(node => {
			//grid information on meta layer
			let grid = gameGrid.getGrid(1, node.row, node.column);

			return !grid.w && !grid.b && !this.isVisited(node, visited);
		});
	}

	getLowestWeightedNode(nodes, end, start = this.originator) {

		nodes.sort((node1, node2) => {

			return this.getWeight(node1, start, end) - this.getWeight(node2, start, end);
		});

		return nodes[0];
	}

	getPath(end) {

		let start = new Node(this.originator.row, this.originator.column);
		let path = [];
		let visited = [start];
		let toVisit = this.getNeighbours(start, visited);

		while(toVisit.length) {

			let nextNode = this.getLowestWeightedNode(toVisit, end, start);
			path.push(nextNode);
			visited = [...visited, ...toVisit];

			if(nextNode.row === end.row && nextNode.column === end.column) {

				break;
			}
			//update nodes to visit
			toVisit = this.getNeighbours(path[path.length - 1], visited);
		}

		return path;
	}
}