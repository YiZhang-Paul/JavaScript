/* jslint esversion: 6 */
class Food {

	constructor(row, column) {

		this.row = row;
		this.column = column;
		this.x = (column + 0.5) * game.gridWidth;
		this.y = (row + 0.5) * game.gridWidth;
		this.tick = 0;
		this.score = 0;
		this.color = "red";
		this.radius = null;
		this.tile = null;
		this.ctx = game.canvas.food;
	}

	erase() {

		this.ctx.clearRect(

			this.x - 0.5 * game.gridWidth,
			this.y - 0.5 * game.gridWidth,
			game.gridWidth,
			game.gridWidth
		);
	}

	dispose() {

		gameGrid.setGrid(0, this.row, this.column, null);
		game.manager.emptyGrids.push(new Node(this.row, this.column));
		this.erase();
	}

	nextTick() {

		this.tick = this.tick ? 0 : 1;
	}

	blink() {

		this.nextTick();

		if(this.tick) {

			this.draw();
		}
		else {

			this.erase();
		}
	}

	draw() {

		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}
}