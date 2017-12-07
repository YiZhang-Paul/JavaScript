/* jslint esversion: 6 */
class PriorityQueue {

	constructor() {

		this.queue = new Map();
	}

	get size() {

		let total = 0;

		this.queue.forEach(heap => {

			total += heap.length;
		});

		return total;
	}

	put(priority, node) {

		if(!this.queue.has(priority)) {

			this.queue.set(priority, []);
		}

		this.queue.get(priority).push(node);
	}

	dequeue() {

		const topPriority = Math.min(...this.queue.keys());
		let heap = this.queue.get(topPriority);
		let node = heap.shift();

		if(!heap.length) {

			this.queue.delete(topPriority);
		}

		return node;
	}
}