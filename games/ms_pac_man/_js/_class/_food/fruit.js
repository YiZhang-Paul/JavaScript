/* jslint esversion: 6 */
class Fruit extends Food {

	constructor(row, column, type, direction) {

		super(row, column);
		this.type = type;
		this.score = 500;
		this.spawn = new Date().getTime();
		this.lifespan = 30000;
		this.falling = false;
		this.jumpHeight = 0;
		this.maxJumpHeight = game.gridWidth;
		this.jumpSpeed = game.gridWidth * 0.1;
		this.direction = direction;
		this.moveSpeed = Math.round(game.mazeHeight * 0.1) / 100;
		this.toGridCenter = null;
		this.tile = document.getElementById("player");
		this.cropWidth = 32;
		this.cropX = this.cropWidth * (this.type - 1);
		this.cropY = this.cropWidth * 6;
		this.ctx = game.canvas.fruit;
	}

	isActive() {

		return this.spawn + this.lifespan > new Date().getTime();
	}

	erase() {

		this.ctx.clearRect(

			this.x - game.gridWidth * 2,
			this.y - game.gridWidth * 2,
			game.gridWidth * 4,
			game.gridWidth * 4
		);
	}

	dispose() {

		game.manager.activeFruit = null;
		this.erase();
	}

	trackCurrentGrid() {

		Player.prototype.trackCurrentGrid.call(this);

		if(!gameGrid.exist(this.row, this.column)) {

			this.dispose();
		}
	}
	/**
	 * get center coordinate of a given grid
	 */
	getGridCenter(row = this.row, column = this.column) {

		return Player.prototype.getGridCenter.call(this, row, column);
	}

	onGridCenter(row = this.row, column = this.column) {

		return Player.prototype.onGridCenter.call(this, row, column);
	}
	/**
	 * retrieve row and column of adjacent grid on given direction
	 */
	getAdjacentGrid(direction = this.direction, row = this.row, column = this.column) {

		return Player.prototype.getAdjacentGrid.call(this, direction, row, column);
	}
	/**
	 * calculate distance to center of given grid
	 */
	distanceToGridCenter(row, column) {

		return Player.prototype.distanceToGridCenter.call(this, row, column);
	}
	/**
	 * calculate distance to center of nearest facing grid
	 */
	distanceToFacingGridCenter() {

		Player.prototype.distanceToFacingGridCenter.call(this);
	}

	getOppositeWay(direction = this.direction) {

		return Player.prototype.getOppositeWay.call(this, direction);
	}
	/**
	 * jump up and down
	 */
	jump() {

		if(this.jumpHeight >= this.maxJumpHeight) {

			this.falling = true;
		}
		else if(this.jumpHeight <= 0) {

			this.falling = false;
		}

		this.jumpHeight += this.jumpSpeed * (this.falling ? -1 : 1);
	}
	/**
	 * find all directions other than opposite direction
	 */
	filterOppositeWay() {

		const opposite = this.getOppositeWay(this.direction);

		return game.directions.filter(direction => direction !== opposite);
	}

	isValidGrid(target) {

		return target && (target.hasOwnProperty("f") || target.hasOwnProperty("p"));
	}
	/**
	 * check if the obstacle is less than 2 grids thick to be able to pass
	 */
	canPass(direction) {

		let [row, column] = [this.row, this.column];

		for(let i = 0; i < 3; i++) {

			if(direction === "up" || direction === "down") {

				row += direction === "up" ? -1 : 1;
			}
			else {

				column += direction === "left" ? -1 : 1;
			}

			if(!gameGrid.exist(row, column)) {

				return false;
			}
		}

		return this.isValidGrid(gameGrid.getGrid(1, row, column));
	}
	/**
	 * adjust speed to ensure fruit can reach grid center
	 */
	adjustSpeed() {

		this.distanceToFacingGridCenter();

		return this.toGridCenter ? Math.min(this.moveSpeed, this.toGridCenter) : this.moveSpeed;
	}

	getDirection() {

		let position = gameGrid.getGrid(1, this.row, this.column);

		if(this.onGridCenter() && this.isActive() && this.isValidGrid(position)) {

			let adjacent = this.getAdjacentGrid();
			//70% chance to keep going in current direction if possible
			if(this.isValidGrid(gameGrid.getGrid(1, adjacent.row, adjacent.column)) && Math.random() < 0.7) {

				return this.direction;
			}

			let directions = this.filterOppositeWay();
			const direction = directions[Math.floor(Math.random() * directions.length)];
			let target = this.getAdjacentGrid(direction);
			//20% chance to pass through obstacles if possible
			if(this.isValidGrid(gameGrid.getGrid(1, target.row, target.column)) || (Math.random() < 0.2 && this.canPass(direction))) {

				return direction;
			}
			//retry finding moving direction
			return this.getDirection();
		}

		return this.direction;
	}

	move() {

		const speed = this.adjustSpeed();
		this.direction = this.getDirection();

		if(this.direction === "up" || this.direction === "down") {

			this.y += speed * (this.direction === "up" ? -1 : 1);
		}
		else {

			this.x += speed * (this.direction === "left" ? -1 : 1);
		}

		this.trackCurrentGrid();
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
			this.x - game.gridWidth * 0.8,
			this.y - game.gridWidth * 0.8 - this.jumpHeight,
			game.gridWidth * 1.6,
			game.gridWidth * 1.6
		);
	}
}