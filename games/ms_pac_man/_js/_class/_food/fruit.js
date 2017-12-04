/* jslint esversion: 6 */
class Fruit extends Food {

	constructor(row, column, type, direction) {

		super(row, column);
		this.type = type;
		this.score = 500;
		this.spawnTime = new Date();
		this.minActiveTime = 30000;
		this.falling = false;
		this.jumpHeight = 0;
		this.maxJumpHeight = game.maze.gridWidth;
		this.jumpSpeed = game.maze.gridWidth * 0.1;
		this.direction = direction;
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

		game.manager.activeFruit = null;
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

		Player.prototype.trackPosition.call(this);

		if(!grid.canGetGrid(this.row, this.column)) {

			this.clear();
		}
	}

	getPosition(layer = 0) {

		return Player.prototype.getPosition.call(this, layer);	
	}

	getGridCenterCoordinate(row = this.row, column = this.column) {

		return Player.prototype.getGridCenterCoordinate.call(this, row, column);
	}

	onGridCenter(row = this.row, column = this.column) {

		return Player.prototype.onGridCenter.call(this, row, column);
	}

	getAdjacentGrid(layer, direction = this.direction, row = this.row, column = this.column) {

		return Player.prototype.getAdjacentGrid.call(this, layer, direction, row, column);
	}

	distanceToGridCenter(row, column) {

		return Player.prototype.distanceToGridCenter.call(this, row, column);
	}

	distanceToFacingGridCenter() {

		Player.prototype.distanceToFacingGridCenter.call(this);
	}

	getOppositeDirection(direction = this.direction) {

		return Player.prototype.getOppositeDirection.call(this, direction);
	}

	getValidDirections() {

		return this.allDirections.filter(direction => {

			return direction !== this.getOppositeDirection(this.direction);
		});
	}

	isValidGrid(target) {

		if(!target) {

			return false;
		}

		return ["w", "b", "c", "d"].every(key => !target.hasOwnProperty(key));
	}

	canPassThrough(direction) {

		let [row, column] = [this.row, this.column];

		for(let i = 0; i < 3; i++) {

			if(direction === "up" || direction === "down") {

				row += direction === "up" ? -1 : 1;
			}
			else {

				column += direction === "left" ? -1 : 1;
			}

			if(!grid.canGetGrid(row, column)) {

				return false;
			}
		}

		return this.isValidGrid(grid.getGrid(1, row, column));
	}

	getDirection() {

		let currentGrid = this.getPosition(1);

		if(this.onGridCenter() && this.isActive() && (currentGrid.f || currentGrid.p)) {

			if(this.isValidGrid(this.getAdjacentGrid(1)[0]) && Math.random() < 0.7) {

				return this.direction;
			}

			let directions = this.getValidDirections();
			const direction = directions[Math.floor(Math.random() * directions.length)];
			let target = this.getAdjacentGrid(1, direction)[0];
			
			if(this.isValidGrid(target) || (Math.random() < 0.2 && this.canPassThrough(direction))) {

				return direction;
			}
			
			return this.getDirection();
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