/* jslint esversion: 6 */
class Fruit extends Food {

	constructor(row, column, type) {

		super(row, column);
		this.type = type;
		this.score = 500;
		this.tile = document.getElementById("player");
		this.cropWidth = 32;
		this.cropX = this.cropWidth * (this.type - 1);
		this.cropY = this.cropWidth * 6;
		this.ctx = game.maze.fruitCtx;
		this.draw();
	}

	erase() {

		this.ctx.clearRect(

			this.xCord - game.maze.gridWidth * 0.8,
			this.yCord - game.maze.gridWidth * 0.8,
			game.maze.gridWidth * 1.6,
			game.maze.gridWidth * 1.6
		);
	}
	
	clear() {

		game.manager.fruits.delete(this);
		super.clear();
		this.erase();
	}

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