/* jslint esversion: 6 */
/**
 * user class
 */
class User extends Player {
	constructor() {
		super();
		this.moving = true;
		//user apperance
		this.tile = document.getElementById("player");
		this.cropX = null;
		this.cropY = null;
		this.cropWidth = 32;
		//user animations
		this.step = 0;
		this.intervalHandler = null;
		this.ctx = game.maze.playerCtx;
		//initialize/reset user location and direction
		this.reset();
		this.cropXY();
	}
	/**
	 * reset user location and direction
	 */
	reset() {
		this.xCord = game.maze.gridWidth * (grid.spawnCol - 0.5);
		this.yCord = game.maze.gridWidth * (grid.spawnRow - 0.5);
		this.direction = "right";
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
		let cropX = (index * 3 + this.step) * this.cropWidth % 256;
		let cropY = Math.floor((index * 3 + this.step) * this.cropWidth / 256) * this.cropWidth;
		[this.cropX, this.cropY] = [cropX, cropY];  
	} 
	/**
	 * update user
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//update step
		if(this.moving && !this.intervalHandler) {
			this.intervalHandler = setInterval(() => {
				this.changeStep();
			}, 200);
		}
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
			                 this.xCord - game.maze.gridWidth * 0.5,
			                 this.yCord - game.maze.gridWidth * 0.5,
			                 game.maze.gridWidth, 
			                 game.maze.gridWidth);
	} 
} 