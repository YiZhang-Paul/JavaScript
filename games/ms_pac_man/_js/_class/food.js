/* jslint esversion: 6 */
/**
 * food class
 * @param int, int, char
 *
 * row    : row of food cell
 * column : column of food cell
 * type   : type of food
 */
class Food {
	constructor(row, column, type) {
		this.row = row;
		this.column = column;
		this.xCord = game.maze.gridWidth * (column + 0.5); 
		this.yCord = game.maze.gridWidth * (row + 0.5);
		this.type = type;
		[this.score, this.radius] = this.getFoodStat(type);
		this.color = "pink";
		this.ctx = game.maze.backCtx;
		//draw food
		this.draw();
	}
	/**
	 * determine food stats
	 * @param char
	 *
	 * type : food type
	 * 
	 * returns array []
	 */
	getFoodStat(type) {
		let score = 0, radius = 0; 
		switch(type) {
			case "s" :
				score = 10;
				radius = game.maze.gridWidth * 0.2;
				break;
			case "l" :
				score = 50;
				radius = game.maze.gridWidth * 0.35;
				break;
		}
		return [score, radius];
	} 
	/**
	 * clear food
	 */
	clear() {
		let gridWidth = game.maze.gridWidth;
		this.ctx.clearRect(this.column * gridWidth, 
											 this.row * gridWidth,
											 gridWidth, gridWidth);
		grid.maze[0][this.row][this.column] = null;
		game.manager.totalFood--;
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