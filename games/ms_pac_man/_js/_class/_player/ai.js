/* jslint esversion: 6 */
/**
 * AI class
 * @param obj {}
 *
 * owner : manager of ghost
 */
class AI extends Player {
	constructor(owner) {
		super();
		this.owner = owner;
		this.moving = false;
		this.totalStep = 2;
		this.defaultSpeed = Math.round(game.maze.height* 0.0002 * 100) / 100;
		this.speed = this.defaultSpeed;
		this.defaultCropXY = this.cropXY;
		this.state = null;
	}
	/**
	 * reset AI
	 */
	reset() {
		super.reset();
		this.moving = false;
		this.score = 0;
		this.step = 0;
		this.state.swapState(this.name == "blinky" ? "outCell" : "inCell");
		if(this.intervalHandler) {
			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
		}
	} 
	/**
	 * find available moving direction
	 *
	 * returns array []
	 */
	availableDir() {
		let allDir = this.allDirect.slice();
		return allDir.filter(direction => 
			!this.hasWall(direction) && !this.hasDoor(direction));
	} 
	/**
	 * move back and forth
	 */
	turnAround() {
		if(this.collideDist === 0) {
			this.setDirection(this.findOpposite());
		}
	} 
	/**
	 * randomly change direction
	 * @param array []
	 * 
	 * availableDir : all available directions
	 */
	randomDirection(availableDir) {
		if(this.collideDist === 0) {
			let finalDir = availableDir[Math.floor(Math.random() * availableDir.length)];
			let oppositeDir = this.findOpposite();
			if(finalDir != oppositeDir) {
				this.setDirection(finalDir);
			} else if(finalDir == oppositeDir && Math.random() < 0.4) {
				this.setDirection(finalDir);
			} else {
				this.randomDirection(availableDir);
			}
		}
	} 
	/**
	 * move out cell
	 */
	moveOutCell() {
		let doorLeftX = game.maze.width * 0.5 - game.maze.gridWidth * 0.1;
		let doorRightX = game.maze.width * 0.5 + game.maze.gridWidth * 0.1;
		let cellCenterY = (grid.door.spawnRow + 2) * game.maze.gridWidth;
		let inXRange = this.xCord > doorLeftX && this.xCord < doorRightX;
		let inYRange = Math.round(Math.abs(this.yCord - cellCenterY)) < game.maze.gridWidth * 0.5;
		//change directions to move out of cell
		if((this.direction == "up" || this.direction == "down") && !inXRange && inYRange) {
			this.setDirection(this.xCord > game.maze.width * 0.5 ? "left" : "right");
		} else if((this.direction == "left" || this.direction == "right") && inXRange) {
			this.setDirection("up"); 
		} else {
			this.turnAround();
		}
		//check door position
		if(this.yCord <= grid.door.spawnRow * game.maze.gridWidth) {
			this.state.swapState("outCell");
			this.owner.cell.delete(this);
			//record time moving out cell
			this.owner.resetCooldown();
		}
	} 
	/**
	 * initiate process to return 
	 * to normal from flee state
	 */
	intiateFleeToNormal() {
		if(!this.timeoutHandler) {
			this.timeoutHandler = setTimeout(() => {
				//clear time out first
				clearTimeout(this.timeoutHandler);
				this.timeoutHandler = null;
				//finalize transition to normal state
				this.cropXY = this.cropFleeS2XY;
				this.stopAnimation(0);
				this.animatePlayer(4);
				this.finishFleeToNormal();
			}, 7000);
		}
	} 
	/**
	 * final transition
	 */
	finishFleeToNormal() {
		if(!this.timeoutHandler) {
			this.timeoutHandler = setTimeout(() => {
				this.cropXY = this.defaultCropXY;
				this.stopAnimation(0);
				this.state.swapState("outCell");
				//clear time out
				clearTimeout(this.timeoutHandler);
				this.timeoutHandler = null;
			}, 3000);
		}
	} 
	/**
	 * @abstract
	 * change moving direction inside of cell
	 */
	inCellDir() {} 
	/**
	 * change moving direction outside of cell
	 */
	outCellDir() {
		this.randomDirection(this.availableDir());
	} 
	/**
	 * move away from user
	 */
	fleeDir() {
		if(this.collideDist === 0 || this.centerDist === null) {
			let user = game.manager.user;
			let distToUser = user.distToGhost(this.xCord, this.yCord);
			let availableDir = this.availableDir();
			if(distToUser < grid.row * 0.25 * game.maze.gridWidth) {
				//get all available directions to flee
				let fleeDir = [];
				if(this.xCord != user.xCord) {
					fleeDir.push(user.xCord > this.xCord ? "left" : "right");
				}
				if(this.yCord != user.yCord) {
					fleeDir.push(user.yCord > this.yCord ? "up" : "down");
				}
				fleeDir = fleeDir.filter(direction => availableDir.indexOf(direction) != -1);
				if(fleeDir.length) {
					this.setDirection(fleeDir[Math.floor(Math.random() * fleeDir.length)]);
				} else {
					availableDir.splice(availableDir.indexOf(this.findOpposite()), 1);
					this.randomDirection(availableDir);
				}
			} else {
				this.randomDirection(availableDir);
			}
		}
	} 
	/**
	 * retreat to cell
	 */
	retreatDir() {
		let availableDir = this.availableDir();
		if((this.collideDist === 0 || this.centerDist === null) && availableDir.length >= 3) {
			let cellCenterX = game.maze.width * 0.5;
			let cellCenterY =	(grid.door.spawnRow + 2) * game.maze.gridWidth;
			//find route back to cell
			let retreatDir = [];
			if(this.xCord != cellCenterX) {
				retreatDir.push(this.xCord > cellCenterX ? "left" : "right");
			}	
			if(this.yCord != cellCenterY) {
				retreatDir.push(this.yCord > cellCenterY ? "up" : "down");
			}
			retreatDir = retreatDir.filter(direction => availableDir.indexOf(direction) != -1);
			this.setDirection(retreatDir[Math.floor(Math.random() * retreatDir.length)]);
		} else if(this.collideDist === 0) {
			availableDir.splice(availableDir.indexOf(this.findOpposite()), 1);
			this.randomDirection(availableDir);	
		}
	} 
	/**
	 * determine AI tile image crop location
	 * base on current direction and step 
	 */
	cropXY() {
		//determine starting row base on ghost name
		let startRow = 0;
		if(this.name == "blinky") startRow = 2;
		else if(this.name == "pinky") startRow = 3;
		else if(this.name == "inky") startRow = 4;
		else startRow = 5;
		//determine crop index base on current direction
		let index;
		if(this.direction == "up") index = 0;	
		else if(this.direction == "down") index = 1;	
		else if(this.direction == "left") index = 2;	
		else if(this.direction == "right") index = 3;	
		//determine and update crop XY location
		let cropWidth = this.cropWidth + 2;
		this.cropX = (index * 2 + this.step) * cropWidth + 1;
		this.cropY = startRow * cropWidth + 1;
	} 
	/**
	 * determine AI tile image crop location
	 * on flee state stage 1 
	 */
	cropFleeS1XY() {
		//determine and update crop XY location
		let cropWidth = this.cropWidth + 2;
		this.cropX = (4 + this.step) * cropWidth + 1;
		this.cropY = cropWidth + 1;
	}
	/**
	 * determine AI tile image crop location
	 * on flee state stage 2 
	 */
	cropFleeS2XY() {
		//determine and update crop XY location
		let cropWidth = this.cropWidth + 2;
		this.cropX = (4 + this.step) * cropWidth + 1;
		this.cropY = cropWidth + 1;
	}
	/**
	 * determine AI tile image crop location
	 * on retreat state  
	 */
	cropRetreatXY() {
		//determine crop index base on current direction
		let index;
		if(this.direction == "up") index = 0;	
		else if(this.direction == "down") index = 1;	
		else if(this.direction == "left") index = 2;	
		else if(this.direction == "right") index = 3;	
		//determine and update crop XY location
		let cropWidth = this.cropWidth + 2;
		this.cropX = (4 + index) * cropWidth + 1;
		this.cropY = 7 * cropWidth + 1;
	} 
	/**
	 * ghost states
	 */
	//in cell @abstract
	inCell(timeStep) {
		this.speed = this.defaultSpeed * 0.65;
		//check movement in cell
		if(this.moving) {
			this.inCellDir();
			this.move(timeStep);
		}
		//animate ghost
		this.animatePlayer();
	}
	//out cell
	outCell(timeStep) {
		this.speed = this.defaultSpeed;
		//check movement out cell
		if(this.moving) {
			this.outCellDir();
			this.move(timeStep);
		}
		//animate ghost
		this.animatePlayer();
	}
	//flee state
	flee(timeStep) {
		this.speed = this.defaultSpeed * 0.8;
		//check movement
		if(this.moving) {
			this.fleeDir();
			this.move(timeStep);
		}
		//animate ghost
		this.animatePlayer();
		//set timer to go back to normal state
		this.intiateFleeToNormal();
	}
	//retreat mode
	retreat(timeStep) {
		this.speed = this.defaultSpeed * 1.4;
		//check movement
		if(this.moving) {
			this.retreatDir();
			this.move(timeStep);
		}
		//animate ghost
		this.animatePlayer();
		if(this.timeoutHandler) {
			clearTimeout(this.timeoutHandler);
			this.timeoutHandler = null;
		}
	}
	/**
	 * update ghost
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//update ghost behaviour
		this.state.update(timeStep);
	}
} 