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
	 * move out cell
	 */
	moveOutCell() {
		let doorCordY = grid.door.spawnRow * game.maze.gridWidth;
		if(this.yCord <= doorCordY) {
			this.state.swapState("outCell");
			this.owner.cell.delete(this);
			//record time moving out cell
			this.owner.resetCooldown();
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
	inCell(timeStep) {}
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