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
		this.color = "red";
		this.foodCtx = game.maze.foodCtx;
		this.beanCtx = game.maze.beanCtx;
		this.fruitCtx = game.maze.fruitCtx;
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
				radius = game.maze.gridWidth * 0.45;
				break;
		}
		return [score, radius];
	} 
	/**
	 * clear food
	 */
	clear() {
		let gridWidth = game.maze.gridWidth;
		let ctx;
		if(this.type == "s") ctx = this.foodCtx;
		else if(this.type == "l") ctx = this.beanCtx;
		else ctx = this.fruitCtx;
		ctx.clearRect(this.column * gridWidth, 
											 this.row * gridWidth,
											 gridWidth, gridWidth);
		grid.maze[0][this.row][this.column] = null;
	} 
	/**
	 * draw all food
	 */
	draw() {
		if(this.type == "s") this.drawFood();
		else if(this.type == "l") this.drawBean();
	}
	/**
	 * draw food
	 */
	drawFood() {
		this.foodCtx.beginPath();
		this.foodCtx.arc(this.xCord, this.yCord, this.radius, 0, 2 * Math.PI);
		this.foodCtx.fillStyle = this.color;
		this.foodCtx.fill();
	}
	/**
	 * draw special bean
	 */
	drawBean() {
		this.beanCtx.beginPath();
		this.beanCtx.arc(this.xCord, this.yCord, this.radius, 0, 2 * Math.PI);
		this.beanCtx.fillStyle = this.color;
		this.beanCtx.fill();
	} 
	/**
	 * draw fruit
	 */
	drawFruit() {

	} 
} 