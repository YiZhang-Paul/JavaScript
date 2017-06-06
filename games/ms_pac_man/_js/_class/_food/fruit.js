/* jslint esversion: 6 */
/**
 * fruit class
 * @param int, int, char
 *
 * row    : row of food cell
 * column : column of food cell
 * type   : fruit type
 */
class Fruit extends Food {
	constructor(row, column, type) {
		super(row, column);
		this.type = type;
		this.score = 500;
		//fruit appearance
		this.tile = document.getElementById("player");
		this.cropX = null;
		this.cropY = null;
		this.cropWidth = 30;
		this.cropXY();
	}
	/**
	 * determine crop image location
	 */
	cropXY() {
		//determine crop index base on fruit type
		let index;
		if(this.type == 1) index = 0;	
		else if(this.type == 2) index = 1;	
		else if(this.type == 3) index = 2;	
		else if(this.type == 4) index = 3;
		else if(this.type == 5) index = 4;
		else if(this.type == 6) index = 5;
		else index = 6;	
		//determine and update crop XY location
		let cropWidth = this.cropWidth + 2;
		this.cropX = index * cropWidth + 1;
		this.cropY = cropWidth * 6 + 1;
	} 
	/**
	 * draw fruit
	 */
	draw() {
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