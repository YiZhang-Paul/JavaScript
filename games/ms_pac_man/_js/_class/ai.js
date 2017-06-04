/* jslint esversion: 6 */
/**
 * AI class
 * @param String
 *
 * name : ghost name
 */
class AI extends Player {
	constructor(name) {
		super();
		this.name = name;
		this.score = 0;
		this.moving = false;
		this.speed = Math.round(game.maze.height* 0.0002 * 100) / 100;
		//AI apperance
		this.tile = document.getElementById("player");
		this.cropX = null;
		this.cropY = null;
		this.cropWidth = 32;
		//AI animations
		this.step = 0;
		this.intervalHandler = null;
		this.ctx = game.maze.playerCtx;
		//initialize/reset AI location and direction
		this.reset();
	}
	/**
	 * reset AI location and direction
	 */
	reset() {
		this.step = 0;
		this.xCord = game.maze.gridWidth * (grid[this.name].spawnCol - 0.1);
		this.yCord = game.maze.gridWidth * (grid[this.name].spawnRow - 0.5);
		this.direction = grid[this.name].direction;
		//update current row and column
		this.trackGrid();
		//update crop XY location
		this.cropXY();
	} 
	/**
	 * change steps
	 */
	changeStep() {
		this.step = this.step ? 0 : 1;
		//update crop XY location
		this.cropXY();
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
	 * animate user
	 */
	animateGhost() {
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
	 * update ghost
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//animate user
		this.animateGhost();
	}
	/** 
	 * draw ghost
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