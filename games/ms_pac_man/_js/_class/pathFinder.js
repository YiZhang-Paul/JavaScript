/* jslint esversion: 6 */
class PathFinder {

	constructor(originator) {

		this.originator = originator;
	}

	isSamePosition(node1, node2) {

		return node1.row === node2.row && node1.column === node2.column;
	}

	coincides(path1, path2) {

		let nodes = new Set(path1.map(node => this.getKey(node)));

		return path2.some(node => nodes.has(this.getKey(node)));
	}

	containsNode(path, node) {

		return path.some(pathNode => this.isSamePosition(pathNode, node));
	}

	getKey(node) {

		return `${node.row},${node.column}`;
	}

	getHeuristic(candidate, end) {

		return Math.abs(candidate.row - end.row) + Math.abs(candidate.column - end.column);
	}

	getStartNode() {

		return new Node(this.originator.row, this.originator.column);
	}

	getCandidates(node) {

		let candidates = this.originator.getAllAdjacentGrids(node.row, node.column);

		return candidates.filter(candidate => {

			let grid = gameGrid.getGrid(1, candidate.row, candidate.column);
			const isRetreat = this.originator.state.peek() === "retreat";

			if(isRetreat && (grid.hasOwnProperty("d") || grid.b === "s")) {

				return true;
			}

			return ["w", "d", "b"].every(key => !grid.hasOwnProperty(key)) || grid.b === "p";
		});
	}
	/**
	 * @param {Array} [candidates] - nodes to be visited
	 * @param {Node} [current] - current node
	 * @param {Node} [end] - end node
	 */
	evaluateCandidates(candidates, current, end, allCosts, toVisit) {

		candidates.forEach(candidate => {

			const key = this.getKey(candidate);
			const cost = allCosts.get(this.getKey(current)) + 1;

			if(!allCosts.has(key) || cost < allCosts.get(key)) {

				allCosts.set(key, cost);
				toVisit.enqueue(cost + this.getHeuristic(candidate, end), candidate);
				candidate.parent = current;
			}
		});
	}

	searchEndNode(end) {

		let currentNode;
		let start = this.getStartNode();
		//nodes to be visited
		let toVisit = new PriorityQueue();
		toVisit.enqueue(1, start);
		//moving cost from starting point to other nodes
		let costs = new Map();
		costs.set(this.getKey(start), 0);

		while(toVisit.size) {

			currentNode = toVisit.dequeue();

			if(this.isSamePosition(currentNode, end)) {

				break;
			}

			let candidates = this.getCandidates(currentNode);
			this.evaluateCandidates(candidates, currentNode, end, costs, toVisit);
		}

		return currentNode;
	}

	getPath(end) {

		let path = [];
		let node = this.searchEndNode(end);

		while(node.parent !== null) {

			path.push(node);
			node = node.parent;
		}

		return [...path, node].reverse();
	}
}