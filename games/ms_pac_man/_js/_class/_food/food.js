/* jslint esversion: 6 */
/**
 * food class
 * @param int, int
 *
 * row    : row of food cell
 * column : column of food cell
 */
class Food {
	constructor(row, column) {
		this.row = row;
		this.column = column;
		this.xCord = (column + 0.5) * game.maze.gridWidth;
		this.yCord = (row + 0.5) * game.maze.gridWidth;
		this.step = 0;
		this.score = 0;
		this.color = null;
		this.radius = null;
		this.tile = null;
		this.ctx = game.maze.foodCtx;
	}
	/**
	 * clear food
	 */
	clear() {
		let gridWidth = game.maze.gridWidth;
		this.ctx.clearRect(
			this.column * gridWidth, 
			this.row * gridWidth,
			gridWidth, 
			gridWidth
		);
	} 
	/**
	 * change step
	 */
	changeStep() {
		this.step = this.step ? 0 : 1;
	}
	/**
	 * blink food
	 */
	blink() {
		this.changeStep();
		if(this.step) this.draw();
		else this.clear();
	} 
	/**
	 * draw food
	 */
	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.xCord, this.yCord, this.radius, 0, 2 * Math.PI);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}
} 