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
		this.direction = null;
		this.allDirections = ["up", "down", "left", "right"];
		this.moveSpeed = Math.round(game.maze.height * 0.001 * 100) / 100;
		this.distanceToCenter = null;
		this.tile = document.getElementById("player");
		this.cropWidth = 32;
		this.cropX = this.cropWidth * (this.type - 1);
		this.cropY = this.cropWidth * 6;
		this.ctx = game.maze.fruitCtx;
	}

	isActive() {

		return new Date() - this.spawnTime < this.minActiveTime;
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

	trackPosition() {

		this.row = Math.floor(this.yCord / game.maze.gridWidth); 
		this.column = Math.floor(this.xCord / game.maze.gridWidth);
	}

	getGridCenterCoordinate() {

		return [

			(this.column + 0.5) * game.maze.gridWidth,
			(this.row + 0.5) * game.maze.gridWidth
		];
	}

	onGridCenter() {

		const [centerX, centerY] = this.getGridCenterCoordinate();

		return centerX === this.xCord && centerY === this.yCord;
	}

	getAdjacentGrid(layer, direction = this.direction, row = this.row, column = this.column) {

		if(direction === "up" && this.row > 0) row--;
		else if(direction === "down" && this.row + 1 < grid.row) row++;
		else if(direction === "left" && this.column > 0) column--;
		else if(direction === "right" && this.column + 1 < grid.column) column++;
		else return [null, null, null];

		return [grid.getGrid(layer, row, column), row, column];
	}

	distanceToGridCenter(row, column) {

		const [centerX, centerY] = this.getGridCenterCoordinate(row, column);

		return this.direction === "up" || this.direction === "down" ? 
			Math.abs(this.yCord - centerY) : Math.abs(this.xCord - centerX);
	}

	distanceToFacingGridCenter() {

		if(this.onGridCenter()) {

			this.distanceToCenter = null;
			return;
		}

		const [, row, column] = this.getAdjacentGrid(1);
		const toAdjacentGrid = this.distanceToGridCenter(row, column);

		this.distanceToCenter = toAdjacentGrid > game.maze.gridWidth ? 
			this.distanceToGridCenter(this.row, this.column) : toAdjacentGrid;
	}

	getOppositeDirection(direction = this.direction) {

		switch(direction) {

			case "up" : case "down" :

				direction = direction === "up" ? "down" : "up";
				break;

			case "left" : case "right" :

				direction = direction === "left" ? "right" : "left";
				break;	
		}

		return direction;
	}

	getDirection() {

		if(this.onGridCenter() || !this.direction) {

			let directions = this.allDirections.filter(direction => direction !== this.getOppositeDirection(this.direction));
			
			if(!this.direction || this.isActive()) {

				directions = directions.filter(direction => this.getAdjacentGrid(1, direction)[0] !== null); 
			}

			if(!this.direction || Math.random() < 0.3) {

				return directions[Math.floor(Math.random() * directions.length)];
			}
		}

		return this.direction;
	}

	adjustSpeed() {

		this.distanceToFacingGridCenter();

		return this.distanceToCenter ? Math.min(this.moveSpeed, this.distanceToCenter) : this.moveSpeed;
	}

	move() {

		const speed = this.adjustSpeed();
		this.direction = this.getDirection();

		if(this.direction === "up" || this.direction === "down") {

			this.yCord += speed * (this.direction === "up" ? -1 : 1);
		}
		else {

			this.xCord += speed * (this.direction === "left" ? -1 : 1);
		}

		this.trackPosition();
	}

	update() {

		this.jump();
		this.move();
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