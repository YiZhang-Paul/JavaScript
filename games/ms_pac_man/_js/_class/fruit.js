/* jslint esversion: 6 */
/**
 * fruit class
 * @param int, int, char
 *
 * row    : row of food cell
 * column : column of food cell
 * type   : type of food
 */
class Fruit extends Food {
	constructor(row, column, type) {
		super(row, column);
		this.score = 500;
		//fruit appearance
		this.tile = document.getElementById("player");
		this.cropX = null;
		this.cropY = null;
		this.cropWidth = 30;
		this.ctx = game.maze.fruitCtx;
	}
	/**
	 * determine fruit crop image location
	 */
	cropXY() {

	} 
	/**
	 * draw fruit
	 */
	draw() {
		this.ctx.clearRect(0, 0, game.maze.width, game.maze.height);
		this.cropXY();
		this.ctx.drawImage(
			this.tile, 
			this.cropX, 
			this.cropY,
			this.cropWidth, 
			this.cropWidth,
			this.xCord - game.maze.gridWidth * 0.8,
			this.yCord - game.maze.gridWidth * 0.8,
			game.maze.gridWidth * 1.6, 
			game.maze.gridWidth * 1.6
		);
	} 
} 