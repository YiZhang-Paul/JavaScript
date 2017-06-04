/* jslint esversion: 6 */
/**
 * player class
 */
class Player {
	constructor() {
		this.name = null;
		this.xCord = null;
		this.yCord = null;
		this.row = null;
		this.column = null;
		this.direction = null;
		this.allDirect = ["up", "down", "left", "right"];
		this.speed = null;
		this.score = 0;
		this.animateOn = false;
		this.collideDist = null; //distance before collision
		this.centerDist = null;  //distance to current grid center
		//player apperance
		this.tile = document.getElementById("player");
		this.cropX = null;
		this.cropY = null;
		this.cropWidth = 30;
		//player animation
		this.step = 0;
		this.totalStep = 0;
		this.timeoutHandler = null;
		this.intervalHandler = null;
		this.ctx = game.maze.playerCtx;
	}
	/**
	 * reset player
	 */
	reset() {
		this.xCord = game.maze.gridWidth * (grid[this.name].spawnCol - 0.1);
		this.yCord = game.maze.gridWidth * (grid[this.name].spawnRow - 0.5);
		this.direction = grid[this.name].direction;
		this.collideDist = null;
		this.centerDist = null;
		this.animateOn = false;
		//update current row and column
		this.trackGrid();
		//update crop XY location
		this.cropXY();
	} 
	/**
	 * track current grid location
	 */
	trackGrid() {
		this.row = Math.floor(this.yCord / game.maze.gridWidth); 
		this.column = Math.floor(this.xCord / game.maze.gridWidth);
	} 
	/**
	 * check current tile
	 * 
	 * returns obj {}
	 */
	currentTile() {
		return grid.getGrid(0, this.row, this.column);		
	} 
	/**
	 * retrieve center coordinate of 
	 * a given tile
	 *
	 * row    : row of given tile
	 * column : column of given tile
	 *
	 * returns array []
	 */
	centerCord(row, column) {
		return [(column + 0.5) * game.maze.gridWidth, (row + 0.5) * game.maze.gridWidth];
	} 
	/**
	 * check if player is on center
	 * of current grid 
	 *
	 * returns boolean
	 */
	onCenter() {
		let [centerX, centerY] = this.centerCord(this.row, this.column);
		return centerX == this.xCord && centerY == this.yCord;
	} 
	/**
	 * find distance to a grid
	 * @param int, int
	 *
	 * row    : row of target grid
	 * column : column of target grid
	 */
	distToTile(row, column) {
		let [centerX, centerY] = this.centerCord(row, column);
		return this.direction == "up" || this.direction == "down" ? 
			Math.abs(this.yCord - centerY) : Math.abs(this.xCord - centerX);
	} 
	/**
	 * check adjacent tile on 
	 * current facing direction
	 * @param int, String
	 *
	 * layer     : layer of maze 
	 * direction : direction of adjacent tile (optional)
	 * 
	 * returns array []
	 */
	adjacentTile(layer, direction = this.direction) {
		let row = this.row, column = this.column;
		if(direction == "up" && this.row > 0) {
			row--;
		}	else if(direction == "down" && this.row + 1 < grid.row) {
			row++;	
		} else if(direction == "left" && this.column > 0) {
			column--;	
		} else if(direction == "right" && this.column + 1 < grid.column) {
			column++;	
		} else {
			return [null, null, null];	
		} 
		return [grid.getGrid(layer, row, column), row, column]; 
	} 
	/**
	 * detect wall existence on given direction
	 * @param String
	 *
	 * direction : direction to check
	 */
	hasWall(direction) {
		let adjacentTile = this.adjacentTile(1, direction)[0];
		return adjacentTile && adjacentTile.w;
	} 
	/**
	 * detect door existence on given direction
	 * @param String
	 *
	 * direction : direction to check
	 */
	hasDoor(direction) {
		let adjacentTile = this.adjacentTile(1, direction)[0];
		return adjacentTile && adjacentTile.d;
	} 
	/**
	 * find opposite direction
	 * @param String
	 *
	 * direction : direction to find opposite for
	 *
	 * returns String
	 */
	findOpposite(direction = this.direction) {
		switch(direction) {
			case "up" :
			case "down" :
				direction = direction == "up" ? "down" : "up";
				break;
			case "left" :
			case "right" :
				direction = direction == "left" ? "right" : "left";
				break;	
		}
		return direction;
	} 
	/**
	 * collision detection
	 * find distance before collision
	 * 
	 * returns float
	 */
	getCollideDist() {
		//check adjacent tile
		let [, row, column] = this.adjacentTile(1);
		if(this.hasWall(this.direction)) {
			//get adjacent tile's center coordinate
			this.collideDist = this.distToTile(row, column) - game.maze.gridWidth;
			return;
		}
		this.collideDist = null;
	} 
	/**
	 * grid center detection
	 * find distance before next grid center
	 * on current moving direction
	 *
	 * returns float
	 */ 
	getCenterDist() {
		if(this.onCenter()) {
			this.centerDist = null;
			return;	
		}
		//check current location relative to current grid
		let [curCenterX, curCenterY] = this.centerCord(this.row, this.column);
		let locationToGrid;
		if(this.xCord == curCenterX) {
			locationToGrid = this.yCord > curCenterY ? "down" : "up";
		} else {
			locationToGrid = this.xCord > curCenterX ? "right" : "left";
		}
		//find distance to grid center
		let centerDist;
		if(locationToGrid == "down" && this.direction == "up" ||
			 locationToGrid == "up" && this.direction == "down" ||
			 locationToGrid == "left" && this.direction == "right"||
			 locationToGrid == "right" && this.direction == "left") {
			centerDist = this.distToTile(this.row, this.column);
		} else {
			let [, row, column] = this.adjacentTile(1);
			centerDist = this.distToTile(row, column);
		}
		this.centerDist = centerDist;
	} 
	/**
	 * move user
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	move(timeStep) {
		//calculate speed
		let speed = this.speed * timeStep;
		//check for collision and distance to center
		this.getCollideDist();
		this.getCenterDist();
		//determine speed and move 
		if(this.collideDist !== null) {
			speed = Math.min(speed, this.collideDist);
		} else {
			speed = this.centerDist ? Math.min(speed, this.centerDist) : speed;
		}
		if(this.direction == "up" || this.direction == "down") {
			this.yCord -= (this.direction == "up" ? 1 : -1) * speed;
		} else if(this.direction == "left" || this.direction == "right") {
			this.xCord -= (this.direction == "left" ? 1 : -1) * speed;
		}
		//check worm holes
		this.crossBridge();
		//update current row and column
		this.trackGrid();
	} 
	/**
	 * warp through worm holes
	 */
	crossBridge() {
		let gridWidth = game.maze.gridWidth;
		if(this.xCord < -gridWidth) {
			this.xCord = game.maze.width + gridWidth;
		} else if(this.xCord > game.maze.width + gridWidth) {
			this.xCord = -gridWidth;
		}
	}
	/**
	 * @abstract
	 * determine player tile image crop location
	 * base on current direction and step 
	 */
	cropXY() {}
	/**
	 * set new direction
	 * @param String
	 * 
	 * direction : new direction
	 */
	setDirection(direction) {
		this.direction = direction;
		//update crop XY location
		this.cropXY();
	} 
	/**
	 * change current step
	 * @param int
	 *
	 * totalStep : total step of current player state
	 */
	changeStep(totalStep = this.totalStep) {
		//loop step from 0 to 2 and repeat
		this.step = (this.step + 1) % totalStep;
		//update crop XY location
		this.cropXY();
	} 
	/**
	 * animate player
	 * @param int, int
	 *
	 * totalStep : total step of player current state
	 * speed     : animation speed
	 */
	animatePlayer(totalStep, speed = 100) {
		this.animateOn = this.collideDist === null;
		if(this.animateOn && !this.intervalHandler) {
			this.intervalHandler = setInterval(() => {
				//update step
				this.changeStep(totalStep);
			}, speed);
		} else if(!this.animateOn && this.intervalHandler) {
			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
		}	
	} 
	/**
	 * stop user animation
	 * @param int
	 *
	 * step : player step
	 */
	stopAnimation(step) {
		if(this.intervalHandler) {
			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
			//reset step 
			this.step = step;
			this.cropXY();
		}
	} 
	/**
	 * @abstract
	 * update player
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {} 
	/**
	 * draw player
	 */
	draw() {
		this.ctx.drawImage(this.tile, this.cropX, this.cropY,
			                 this.cropWidth, this.cropWidth,
			                 this.xCord - game.maze.gridWidth * 0.8,
			                 this.yCord - game.maze.gridWidth * 0.8,
			                 game.maze.gridWidth * 1.6, 
			                 game.maze.gridWidth * 1.6);
	} 
} 