/* jslint esversion: 6 */
class Player {

	constructor() {

		this.name = null;
		this.xCord = null;
		this.yCord = null;
		this.row = null;
		this.column = null;
		this.direction = null;
		this.allDirections = ["up", "down", "left", "right"];
		this.speed = 0;
		this.score = 0;
		this.collisionDistance = null;
		this.distanceToCenter = null;
		//player appearance
		this.tile = document.getElementById("player");
		this.cropX = null;
		this.cropY = null;
		this.cropWidth = 32;
		//player animation
		this.tick = 0;
		this.totalTicks = 0;
		this.animationOn = false;
		this.timeoutHandler = null;
		this.intervalHandler = null;
		this.ctx = game.maze.playerCtx;
	}

	reset() {

		this.xCord = game.maze.gridWidth * (grid[this.name].spawnCol);
		this.yCord = game.maze.gridWidth * (grid[this.name].spawnRow + 0.5);
		this.direction = grid[this.name].direction;
		this.collisionDistance = null;
		this.distanceToCenter = null;
		this.animationOn = false;
		//update current row and column
		this.trackPosition();
		//update crop XY location
		this.getCropXY();
	}

	trackPosition() {

		this.row = Math.floor(this.yCord / game.maze.gridWidth); 
		this.column = Math.floor(this.xCord / game.maze.gridWidth);
	}

	getPosition(layer = 0) {

		return grid.getGrid(layer, this.row, this.column);		
	}

	getGridCenterCoordinate(row, column) {

		return [

			(column + 0.5) * game.maze.gridWidth,
			(row + 0.5) * game.maze.gridWidth
		];
	}

	onGridCenter(row = this.row, column = this.column) {

		const [centerX, centerY] = this.getGridCenterCoordinate(row, column);

		return centerX === this.xCord && centerY === this.yCord;
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

	getAdjacentGrid(layer, direction = this.direction, row = this.row, column = this.column) {

		if(direction === "up" && this.row > 0) row--;
		else if(direction === "down" && this.row + 1 < grid.row) row++;
		else if(direction === "left" && this.column > 0) column--;
		else if(direction === "right" && this.column + 1 < grid.column) column++;
		else return [null, null, null];

		return [grid.getGrid(layer, row, column), row, column];
	}

	getAllAdjacentGrids(layer, row = this.row, column = this.column) {

		return this.allDirections.map(direction => getAdjacentGrid(layer, direction, row, column))
								 .filter(grid => grid[0]);
	}

	hasWall(direction = this.direction) {

		let targetGrid = this.getAdjacentGrid(1, direction)[0];

		return targetGrid && targetGrid.hasOwnProperty("w");
	}

	hasDoor(direction = this.direction) {

		let targetGrid = this.getAdjacentGrid(1, direction)[0];

		return targetGrid && targetGrid.hasOwnProperty("d");
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

	getCollisionDistance() {

		if(this.hasWall()) {

			const [, row, column] = this.getAdjacentGrid(1);
			this.collisionDistance = this.distanceToGridCenter(row, column) - game.maze.gridWidth;
		} 
		else {

			this.collisionDistance = null;
		}
	}

	adjustSpeed(speed) {
		//check for collision and distance to center
		this.getCollisionDistance();
		this.distanceToFacingGridCenter();

		if(this.collisionDistance !== null) {

			return Math.min(speed, this.collisionDistance);
		} 
		
		return this.distanceToCenter ? Math.min(speed, this.distanceToCenter) : speed;
	}

	move(timeStep) {
		
		const speed = this.adjustSpeed(this.speed * timeStep);

		if(this.direction === "up" || this.direction === "down") {

			this.yCord -= (this.direction === "up" ? 1 : -1) * speed;
		} 
		else {

			this.xCord -= (this.direction === "left" ? 1 : -1) * speed;
		}
		//check worm holes
		this.checkWormHole();
		//update current row and column
		this.trackPosition();
	}

	checkWormHole() {

		const leftBound = -game.maze.gridWidth;
		const rightBound = game.maze.width + game.maze.gridWidth;

		if(this.xCord < leftBound || this.xCord > rightBound) {

			this.xCord = this.xCord < leftBound ? rightBound : leftBound;
		}
	}
	/**
	 * @abstract method
	 * determine player tile image crop location
	 * base on current direction and step
	 */
	getCropXY() {}

	setDirection(direction) {

		this.direction = direction;
		this.getCropXY();
	}

	changeTick(totalTick = this.totalTicks) {

		this.tick = (this.tick + 1) % totalTick;
		this.getCropXY();
	}

	animatePlayer(totalTick, speed = 100) {

		if(this.animationOn && !this.intervalHandler) {

			this.intervalHandler = setInterval(() => {
				
				this.changeTick(totalTick);

			}, speed);
		} 
		else if(!this.animationOn && this.intervalHandler) {

			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
		}	
	}

	stopAnimation(tick) {

		if(this.intervalHandler) {

			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
			this.tick = tick;
			this.getCropXY();
		}
	}
	/**
	 * @abstract
	 * update player
	 */
	update(timeStep) {}

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