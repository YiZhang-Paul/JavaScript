/* jslint esversion: 6 */
/**
 * user class
 */
class User extends Player {
	constructor() {
		super();
		this.score = 0;
		this.life = 4;
		this.moving = false;
		this.speed = Math.round(game.maze.height* 0.00025 * 100) / 100;
		//user apperance
		this.tile = document.getElementById("player");
		this.cropX = null;
		this.cropY = null;
		this.cropWidth = 32;
		//user animations
		this.step = 2;
		this.intervalHandler = null;
		this.ctx = game.maze.playerCtx;
		//initialize/reset user location and direction
		this.reset();
	}
	/**
	 * reset user location and direction
	 */
	reset() {
		this.score = 0;
		this.step = 2;
		this.intervalHandler = null;
		this.xCord = game.maze.gridWidth * (grid.spawnCol - 0.5);
		this.yCord = game.maze.gridWidth * (grid.spawnRow - 0.5);
		this.direction = "right";
		//update current row and column
		this.trackGrid();
		//update crop XY location
		this.cropXY();
	} 
	/**
	 * convert key code to direction
	 * @param int
	 *
	 * keyCode : key code to be converted
	 * 
	 * returns String
	 */
	keyCodeToDirection(keyCode) {
		let direction;
		switch(keyCode) {
			case control.W : case control.UP :
			case control.S : case control.DOWN :
				direction = keyCode == control.W || keyCode == control.UP ? "up" : "down";
				break;
			case control.A : case control.LEFT :
			case control.D : case control.RIGHT :
				direction = keyCode == control.A || keyCode == control.LEFT ? "left" : "right";
				break;
		}
		return direction;
	} 
	/**
	 * change direction
	 * @param String
	 * 
	 * direction : new direction
	 */
	changeDirection(direction) {
		this.direction = direction;
		//update crop XY location
		this.cropXY();
	} 
	/**
	 * check movement controls
	 */
	checkMoveKey() {
		if(control.keyPressed.length) {
			let keyCode = control.keyPressed[control.keyPressed.length - 1];
			//change direction
			let direction = this.keyCodeToDirection(keyCode);
			if(direction == this.findOpposite(this.direction)) {
				this.changeDirection(direction);
			} else if(this.xCord >= 0 && this.xCord <= game.maze.width) {
				if(!this.hasWall(direction) && this.onCenter()) {
					this.changeDirection(direction);
				}
			}
		}
	} 
	/**
	 * collision detection
	 * find distance before collision
	 * 
	 * returns float
	 */
	collideDist() {
		//check adjacent tile
		let [, row, column] = this.adjacentTile(1);
		if(this.hasWall(this.direction)) {
			//get adjacent tile's center coordinate
			return this.distToTile(row, column) - game.maze.gridWidth;
		}
	} 
	/**
	 * grid center detection
	 * find distance before next grid center
	 * on current moving direction
	 *
	 * returns float
	 */ 
	centerDist() {
		if(this.onCenter()) {
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
		return centerDist;
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
	 * move user
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	move(timeStep) {
		//calculate speed
		let speed = this.speed * timeStep;
		//check for collision
		let collideDist = this.collideDist();
		if(collideDist !== undefined) {
			speed = Math.min(speed, collideDist);
		} else {
			let centerDist = this.centerDist();
			//eat food
			if(!centerDist) this.eatFood();
			speed = centerDist ? Math.min(speed, centerDist) : speed;
		}
		//indicate current movement
		this.moving = speed !== 0;
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
	 * eat food 
	 */
	eatFood() {
		//check current grid
		let curGrid = this.currentTile();
		if(curGrid instanceof Food) {
			this.score += curGrid.score;
			curGrid.clear();
		}
	} 
	/**
	 * change current step
	 */
	changeStep() {
		//loop step from 0 to 2 and repeat
		this.step = (this.step + 1) % 3;
		//update crop XY location
		this.cropXY();
	} 
	/**
	 * determine player tile image crop location
	 * base on current direction and step 
	 */
	cropXY() {
		//determine crop index base on current direction
		let index;
		if(this.direction == "up") index = 0;	
		else if(this.direction == "down") index = 1;	
		else if(this.direction == "left") index = 2;	
		else if(this.direction == "right") index = 3;	
		//determine and update crop XY location
		this.cropX = (index * 3 + this.step) * this.cropWidth % 256;
		this.cropY = Math.floor((index * 3 + this.step) * this.cropWidth / 256) * this.cropWidth;
	} 
	/**
	 * animate user
	 */
	animateUser() {
		if(this.moving && !this.intervalHandler) {
			this.intervalHandler = setInterval(() => {
				//update step
				this.changeStep();
			}, 100);
		} else if(!this.moving && this.intervalHandler) {
			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
		}	
	} 
	/**
	 * stop user animation
	 */
	stopAnimation() {
		if(this.intervalHandler) {
			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
			//reset step 
			this.step = 2;
			this.cropXY();
		}
	} 
	/**
	 * update user
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//animate user
		this.animateUser();
		//check movment
		this.checkMoveKey();
		this.move(timeStep);
	} 
	/**
	 * draw user
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