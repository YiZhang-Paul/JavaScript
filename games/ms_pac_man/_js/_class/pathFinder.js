/* jslint esversion: 6 */
class Pathfinder {

	constructor(originator) {

		this.originator = originator;
	}
	/**
	 * check if two paths will collide with each other
	 */
	coincides(path1, path2) {

		let nodes = new Set(path1.map(node => node.key));

		return path2.some(node => nodes.has(node.key));
	}

	contains(path, node) {

		return path.some(pathNode => pathNode.isSame(node));
	}

	getHeuristic(candidate, end) {

		return Math.abs(candidate.row - end.row) + Math.abs(candidate.column - end.column);
	}
	/**
	 * retrieve accessible neighbours on all four directions
	 */
	getNodesToVisit(current) {

		let nodes = grid.getAdjacentNodes(current.row, current.column);

		return nodes.filter(node => {

			node = grid.getNode(1, node.row, node.column);
			//allow entering shelter when AI is retreating
			const retreating = this.originator.state.activeState === "retreat";

			if(retreating && (node.hasOwnProperty("d") || node.b === "s")) {

				return true;
			}

			return ["w", "d", "b"].every(key => !node.hasOwnProperty(key)) || node.b === "p";
		});
	}
	/**
	 * @param {Array} [nodes] - nodes to be visited
	 * @param {Map} [costs] - travel distance from nodes to start point
	 * @param {PriorityQueue} [toVisit] - node priorities
	 */
	evaluateNodes(nodes, current, end, costs, toVisit) {

		nodes.forEach(node => {

			const key = node.key;
			const cost = costs.get(current.key) + 1;
			//record or update travel cost when better route is found
			if(!costs.has(key) || cost < costs.get(key)) {

				costs.set(key, cost);
				toVisit.enqueue(cost + this.getHeuristic(node, end), node);
				node.parent = current;
			}
		});
	}

	searchEndNode(end) {

		let current;
		let start = new Node(this.originator.row, this.originator.column);
		//nodes to visit
		let toVisit = new PriorityQueue();
		toVisit.enqueue(0, start);
		//travel cost from start point to other nodes
		let costs = new Map();
		costs.set(start.key, 0);

		while(toVisit.size) {

			current = toVisit.dequeue();
			//a path is found
			if(current.isSame(end)) {

				break;
			}

			let otherNodes = this.getNodesToVisit(current);
			this.evaluateNodes(otherNodes, current, end, costs, toVisit);
		}

		return current;
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