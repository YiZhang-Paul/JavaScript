/* jslint esversion: 6 */
class Food {

	constructor(row, column) {

		this.row = row;
		this.column = column;
		this.xCord = (column + 0.5) * game.maze.gridWidth;
		this.yCord = (row + 0.5) * game.maze.gridWidth;
		this.tick = 0;
		this.score = 0;
		this.color = null;
		this.radius = null;
		this.tile = null;
		this.ctx = game.maze.foodCtx;
	}

	erase() {

		this.ctx.clearRect(

			this.xCord - 0.5 * game.maze.gridWidth,
			this.yCord - 0.5 * game.maze.gridWidth,
			game.maze.gridWidth,
			game.maze.gridWidth
		);
	}

	clear() {

		grid.setGrid(0, this.row, this.column, null);
		game.manager.emptyCells.push({row : this.row, col : this.column});
		this.erase();
	}
	
	changeTick() {

		this.tick = this.tick ? 0 : 1;
	}
	
	blink() {

		this.changeTick();

		if(this.tick) {

			this.draw();
		}
		else {

			this.erase();
		}
	}

	draw() {

		this.ctx.beginPath();
		this.ctx.arc(this.xCord, this.yCord, this.radius, 0, 2 * Math.PI);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}
}