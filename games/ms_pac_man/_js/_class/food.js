/* jslint esversion: 6 */
/**
 * food class
 * @param float, float, char
 *
 * xCord : X-Coordinate of food
 * yCord : Y-Coordinate of food
 * type : food type
 */
class Food {
	constructor(xCord, yCord, type) {
		this.xCord = xCord;
		this.yCord = yCord;
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
		let gridWidth = game.maze.gridWidth;
		let score = 0, radius = 0; 
		switch(type) {
			case "s" :
				score = 10;
				radius = gridWidth * 0.2;
				break;
			case "l" :
				score = 50;
				radius = gridWidth * 0.35;
				break;
		}
		return [score, radius];
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