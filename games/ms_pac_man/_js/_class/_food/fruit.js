/* jslint esversion: 6 */
class Fruit extends Food {

	constructor(row, column, type) {

		super(row, column);
		this.type = type;
		this.score = 500;
		this.spawnTime = new Date();
		this.minActiveTime = 15000;
		this.falling = false;
		this.jumpHeight = 0;
		this.maxJumpHeight = game.maze.gridWidth;
		this.jumpSpeed = game.maze.gridWidth * 0.1;
		this.allDirections = ["up", "down", "left", "right"];
		this.moveSpeed = Math.round(game.maze.height * 0.0002 * 100) / 100;
		this.tile = document.getElementById("player");
		this.cropWidth = 32;
		this.cropX = this.cropWidth * (this.type - 1);
		this.cropY = this.cropWidth * 6;
		this.ctx = game.maze.fruitCtx;
	}

	erase() {

		this.ctx.clearRect(

			this.xCord - game.maze.gridWidth * 2,
			this.yCord - game.maze.gridWidth * 2,
			game.maze.gridWidth * 4,
			game.maze.gridWidth * 4
		);
	}
	
	clear() {

		game.manager.fruits.delete(this);
		super.clear();
		this.erase();
	}

	jump() {

		if(this.jumpHeight >= this.maxJumpHeight) {

			this.falling = true;
		}
		else if(this.jumpHeight <= 0) {

			this.falling = false;
		}

		this.jumpHeight += this.jumpSpeed * (this.falling ? -1 : 1);
	}

	move() {


	}

	update() {

		this.jump();
	}

	draw() {

		this.erase();

		this.ctx.drawImage(

			this.tile, 
			this.cropX, 
			this.cropY,
			this.cropWidth, 
			this.cropWidth,
			this.xCord - game.maze.gridWidth * 0.8,
			this.yCord - game.maze.gridWidth * 0.8 - this.jumpHeight,
			game.maze.gridWidth * 1.6, 
			game.maze.gridWidth * 1.6
		);
	}
}