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
	 */ 
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
		speed = collideDist !== undefined ? Math.min(speed, collideDist) : speed;
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