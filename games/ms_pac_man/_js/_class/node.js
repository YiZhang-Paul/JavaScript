/* jslint esversion: 6 */
class Node {

	constructor(row, column, parent = null) {

		this.row = row;
		this.column = column;
		this.parent = parent;
	}

	get key() {

		return `${this.row},${this.column}`;
	}

	isSame(node) {

		return this.row === node.row && this.column === node.column;
	}
}