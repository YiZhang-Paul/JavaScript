/* jslint esversion: 6 */
/**
 * user class
 */
class User extends Player {
	constructor() {
		super();
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
			case control.W :
			case control.UP :
				direction = "up";
				break;
			case control.S :
			case control.DOWN :
				direction = "down";
				break;
			case control.A :
			case control.LEFT :
				direction = "left";
				break;
			case control.D :
			case control.RIGHT :
				direction = "right";
				break;
		}
		return direction;
	} 
	/**
	 * change moving direction
	 */
	changeDirection() {
		if(control.keyPressed.length) {
			let keyCode = control.keyPressed[control.keyPressed.length - 1];
			//change direction
			let direction = this.keyCodeToDirection(keyCode);
			if(direction == this.findOpposite(this.direction)) {
				this.direction = direction;
				this.cropXY();
			} else {
				let adjacentTile = this.adjacentTile(1, direction)[0];
				let [curCenterX, curCenterY] = this.centerCord(this.row, this.column);
				let notWall = !adjacentTile || !adjacentTile.w;
				let onCenter = this.xCord == curCenterX && this.yCord == curCenterY; 
				if(notWall && onCenter) {
					this.direction = direction;
					this.cropXY();
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
		let [adjacentTile, row, column] = this.adjacentTile(1);
		if(adjacentTile && adjacentTile.w) {
			//get adjacent tile's center coordinate
			let [centerX, centerY] = this.centerCord(row, column);
			let tileDistance = centerX == this.xCord ? 
				Math.abs(centerY - this.yCord) : Math.abs(centerX - this.xCord);
			return tileDistance - game.maze.gridWidth;
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
		//check current location relative to current grid
		let [curCenterX, curCenterY] = this.centerCord(this.row, this.column);
		if(this.xCord == curCenterX && this.yCord == curCenterY) {
			return;	
		}
		let locationToGrid;
		if(this.xCord == curCenterX) {
			locationToGrid = this.yCord - curCenterY > 0 ? "down" : "up";
		} else {
			locationToGrid = this.xCord - curCenterX > 0 ? "right" : "left";
		}
		//find distance to grid center
		let centerDist;
		if(locationToGrid == "down" && this.direction == "up" ||
			 locationToGrid == "up" && this.direction == "down" ||
			 locationToGrid == "left" && this.direction == "right"||
			 locationToGrid == "right" && this.direction == "left") {
			centerDist = Math.hypot((this.xCord - curCenterX), (this.yCord - curCenterY));
		} else {
			let [, row, column] = this.adjacentTile(1);
			let [centerX, centerY] = this.centerCord(row, column);
			centerDist = Math.hypot((this.xCord - centerX), (this.yCord - centerY));
		}
		return centerDist;
	} 
	/**
	 * move user
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	move(timeStep) {
		let speed = this.speed * timeStep;
		//check for collision
		let collideDist = this.collideDist();
		if(collideDist !== undefined) {
			let [curCenterX, curCenterY] = this.centerCord(this.row, this.column);
			speed = Math.min(speed, collideDist);
		} else {
			let centerDist = this.centerDist();
			speed = centerDist ? Math.min(speed, centerDist) : speed;
		}
		//indicate current movement
		this.moving = speed !== 0;
		if(this.direction == "up" || this.direction == "down") {
			this.yCord = this.direction == "up" ? this.yCord - speed : this.yCord + speed;
		} else if(this.direction == "left" || this.direction == "right") {
			this.xCord = this.direction == "left" ? this.xCord - speed : this.xCord + speed;
		}
		//update current row and column
		this.trackGrid();
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
			}, 120);
		} else if(!this.moving && this.intervalHandler) {
			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
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
		this.changeDirection();
		this.move(timeStep);
	} 
	/**
	 * draw user
	 */
	draw() {
		this.ctx.drawImage(this.tile, 
			                 this.cropX, 
			                 this.cropY,
			                 this.cropWidth,
			                 this.cropWidth,
			                 this.xCord - game.maze.gridWidth * 0.8,
			                 this.yCord - game.maze.gridWidth * 0.8,
			                 game.maze.gridWidth * 1.6, 
			                 game.maze.gridWidth * 1.6);
	} 
} 