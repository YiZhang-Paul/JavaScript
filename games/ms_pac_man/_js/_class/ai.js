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
		this.moving = false;
		this.speed = Math.round(game.maze.height* 0.0002 * 100) / 100;
		//initialize/reset AI location and direction
		this.reset();
	}
	/**
	 * reset AI location and direction
	 */
	reset() {
		this.moving = false;
		this.score = 0;
		this.step = 0;
		super.reset();
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
	 * update ghost
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//animate ghost
		this.animatePlayer(2);
		//check movement
		this.move(timeStep);
	}
} 