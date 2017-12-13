/* jslint esversion: 6 */
class Bean {

	constructor(row, column) {

		this.row = row;
		this.column = column;
		this.coordinate = new Point(this.x, this.y);
		this.score = 10;
		this.color = "red";
		this.radius = grid.nodeSize * 0.2;
		this.ctx = game.canvas.food;
	}

	get x() {

		return (this.column + 0.5) * grid.nodeSize;
	}

	get y() {

		return (this.row + 0.5) * grid.nodeSize;
	}

	erase() {

		this.ctx.clearRect(

			this.coordinate.x - 0.5 * grid.nodeSize,
			this.coordinate.y - 0.5 * grid.nodeSize,
			grid.nodeSize,
			grid.nodeSize
		);
	}

	dispose() {

		grid.setNode(0, this.row, this.column, null);
		this.erase();
	}

	draw() {

		this.ctx.beginPath();
		this.ctx.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, Math.PI * 2);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}
}