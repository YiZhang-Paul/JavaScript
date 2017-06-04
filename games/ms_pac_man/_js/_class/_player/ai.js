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
		this.speed = Math.round(game.maze.height* 0.0002 * 100) / 100;
		this.state = null;
	}
	/**
	 * reset AI
	 */
	reset() {
		this.moving = false;
		this.score = 0;
		this.step = 0;
		super.reset();
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
			this.setDirection(finalDir);
		}
	} 
	/**
	 * @abstract
	 * change moving direction inside of cell
	 */
	inCellDir() {} 
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
			//if(this.name == "clyde") console.log(1);
			this.setDirection("right");
		} else if((this.direction == "left" || this.direction == "right") && inXRange) {
			//if(this.name == "clyde") console.log(2);
			this.setDirection("up"); 
		} else {
			//if(this.name == "clyde") console.log(3);
			this.turnAround();
		}
		//check door position
		let doorCordY = grid.door.spawnRow * game.maze.gridWidth;
		if(this.yCord <= doorCordY) {
			this.state.swapState("outCell");
			this.owner.cell.delete(this);
			//record time moving out cell
			this.owner.resetCooldown();
		}
	} 
	/**
	 * change moving direction outside of cell
	 */
	outCellDir() {
		let availableDir = this.allDirect.slice().filter(direction => {
			return !this.hasWall(direction) && !this.hasDoor(direction);
		});
		this.randomDirection(availableDir);
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
		this.cropX = (index * 2 + this.step) * this.cropWidth;
		this.cropY = startRow * this.cropWidth;
	} 
	/**
	 * ghost states
	 */
	//in cell @abstract
	inCell(timeStep) {
		//check movement in cell
		if(this.moving) {
			this.inCellDir();
			this.move(timeStep);
		}
	}
	//out cell
	outCell(timeStep) {
		//check movement out cell
		if(this.moving) {
			this.outCellDir();
			this.move(timeStep);
		}
	}
	/**
	 * update ghost
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//animate ghost
		this.animatePlayer();
		//update ghost behaviour
		this.state.update(timeStep);
	}
} 