/* jslint esversion: 6 */
class Player {

	constructor(name) {

		this.name = name;
		this.x = null;
		this.y = null;
		this.row = null;
		this.column = null;
		this.direction = null;
		this.speed = 0;
		this.score = 0;
		this.toCollision = null;  //distance before collision
		this.toGridCenter = null; //distance to center of nearest facing grid
		this.tile = document.getElementById("player");
		this.cropX = null;
		this.cropY = null;
		this.cropWidth = 32;
		this.tick = 0;
		this.totalTicks = 0;
		this.animationOn = false;
		this.interval = null;
		this.ctx = game.canvas.player;
	}

	reset() {

		let stats = gameGrid[this.name];
		this.x = game.gridWidth * stats.column;
		this.y = game.gridWidth * (stats.row + 0.5);
		this.direction = stats.direction;
		this.toCollision = null;
		this.toGridCenter = null;
		this.animationOn = false;
		this.getCropLocation();
		//update current row and column
		this.trackCurrentGrid();
	}

	trackCurrentGrid() {

		this.row = Math.floor(this.y / game.gridWidth);
		this.column = Math.floor(this.x / game.gridWidth);
	}
	/**
	 * get center coordinate of a given grid
	 */
	getGridCenter(row, column) {

		return [

			(column + 0.5) * game.gridWidth,
			(row + 0.5) * game.gridWidth
		];
	}

	onGridCenter(row = this.row, column = this.column) {

		const [centerX, centerY] = this.getGridCenter(row, column);

		return centerX === this.x && centerY === this.y;
	}
	/**
	 * retrieve row and column of adjacent grid on given direction
	 */
	getAdjacentGrid(direction = this.direction, row = this.row, column = this.column) {

		if(direction === "up" && this.row > 0) row--;
		else if(direction === "down" && this.row < gameGrid.rows - 1) row++;
		else if(direction === "left" && this.column > 0) column--;
		else if(direction === "right" && this.column < gameGrid.columns - 1) column++;
		else return null;

		return new Node(row, column);
	}
	/**
	 * retrieve row and column of all adjacent grids
	 */
	getAllAdjacentGrids(row = this.row, column = this.column) {

		return game.directions.map(direction => {

			return this.getAdjacentGrid(direction, row, column);
		
		}).filter(grid => grid !== null);
	}
	/**
	 * calculate distance to center of given grid
	 */
	distanceToGridCenter(row, column) {

		const [centerX, centerY] = this.getGridCenter(row, column);

		return this.direction === "up" || this.direction === "down" ?
			Math.abs(this.y - centerY) : Math.abs(this.x - centerX);
	}
	/**
	 * calculate distance to center of nearest facing grid
	 */
	distanceToFacingGridCenter() {

		if(this.onGridCenter()) {

			this.toGridCenter = null;
		}
		else {

			let adjacent = this.getAdjacentGrid();
			const toAdjacent = this.distanceToGridCenter(adjacent.row, adjacent.column);

			this.toGridCenter = toAdjacent > game.gridWidth ?
				this.distanceToGridCenter(this.row, this.column) : toAdjacent;
		}
	}

	hasWall(direction = this.direction) {

		let adjacent = this.getAdjacentGrid(direction);

		if(adjacent === null) {

			return false;
		}

		return gameGrid.getGrid(1, adjacent.row, adjacent.column).hasOwnProperty("w");
	}

	hasDoor(direction = this.direction) {

		let adjacent = this.getAdjacentGrid(direction);

		if(adjacent === null) {

			return false;
		}

		return gameGrid.getGrid(1, adjacent.row, adjacent.column).hasOwnProperty("d");
	}

	distanceToCollision() {

		if(this.hasWall()) {

			let adjacent = this.getAdjacentGrid();
			this.toCollision = this.distanceToGridCenter(adjacent.row, adjacent.column) - game.gridWidth;
		}
		else {

			this.toCollision = null;
		}
	}

	getOppositeWay(direction = this.direction) {

		switch(direction) {

			case "up" : case "down" :

				return direction === "up" ? "down" : "up";

			case "left" : case "right" :

				return direction === "left" ? "right" : "left";
		}

		return direction;
	}
	/**
	 * @abstract
	 * check if player can turn to given direction
	 */
	isValidDirection(direction) {}

	setDirection(direction) {

		this.direction = direction;
		this.getCropLocation();
	}
	/**
	 * adjust speed to ensure player can reach grid center
	 */
	adjustSpeed(speed) {

		this.distanceToCollision();
		this.distanceToFacingGridCenter();

		if(this.toCollision !== null) {

			return Math.min(speed, this.toCollision);
		}

		return this.toGridCenter ? Math.min(speed, this.toGridCenter) : speed;
	}
	/**
	 * check for wormholes on both side of maze
	 */
	checkWormhole() {

		const left = -game.gridWidth;
		const right = game.mazeWidth + game.gridWidth;

		if(this.x < left || this.x > right) {

			this.x = this.x < left ? right : left;
		}
	}

	move(timeStep) {

		const speed = this.adjustSpeed(this.speed * timeStep);

		if(this.direction === "up" || this.direction === "down") {

			this.y -= speed * (this.direction === "up" ? 1 : -1);
		}
		else {

			this.x -= speed * (this.direction === "left" ? 1 : -1);
		}

		this.checkWormhole();
		this.trackCurrentGrid();
	}
	/**
	 * @abstract
	 * determine player tile image crop location
	 */
	getCropLocation() {}

	nextTick(totalTicks = this.totalTicks) {

		this.tick = (this.tick + 1) % totalTicks;
		this.getCropLocation();
	}

	playAnimation(totalTicks, speed = 100, endTick = this.tick) {

		if(this.animationOn && !this.interval) {

			this.interval = setInterval(() => {

				this.nextTick(totalTicks);

			}, speed);
		}
		else if(!this.animationOn) {

			this.stopAnimation(endTick);
		}
	}

	stopAnimation(tick) {

		if(this.interval) {

			clearInterval(this.interval);
			this.interval = null;
			this.tick = tick;
			this.getCropLocation();
		}
	}
	/**
	 * @abstract
	 */
	update(timeStep) {}

	draw() {

		this.ctx.drawImage(

			this.tile,
			this.cropX,
			this.cropY,
			this.cropWidth,
			this.cropWidth,
			this.x - game.gridWidth * 0.8,
			this.y - game.gridWidth * 0.8,
			game.gridWidth * 1.6,
			game.gridWidth * 1.6
		);
	}
}