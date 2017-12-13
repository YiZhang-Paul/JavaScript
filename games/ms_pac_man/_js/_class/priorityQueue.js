/* jslint esversion: 6 */
class PriorityQueue {

	constructor() {

		this.heaps = new Map();
	}

	get size() {

		let total = 0;

		this.heaps.forEach(heap => {

			total += heap.length;
		});

		return total;
	}

	enqueue(priority, node) {

		if(!this.heaps.has(priority)) {

			this.heaps.set(priority, []);
		}

		this.heaps.get(priority).push(node);
	}

	dequeue() {

		const maxHeap = Math.min(...this.heaps.keys());
		let heap = this.heaps.get(maxHeap);
		let node = heap.shift();

		if(!heap.length) {

			this.heaps.delete(maxHeap);
		}

		return node;
	}
}