/* jslint esversion: 6 */
/**
 * user class
 */
class User extends Player {
	constructor() {
		super();
		this.name = "user";
		this.life = 4;
		this.totalStep = 3;
		this.speed = Math.round(game.maze.height* 0.00025 * 100) / 100;
		//initialize/reset user
		this.reset();
	}
	/**
	 * reset user
	 */
	reset() {
		this.score = 0;
		this.step = 2;
		super.reset();
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
	 * check movement controls
	 */
	checkMoveKey() {
		if(control.keyPressed.length) {
			let keyCode = control.keyPressed[control.keyPressed.length - 1];
			//change direction
			let direction = this.keyCodeToDirection(keyCode);
			if(direction == this.findOpposite()) {
				this.setDirection(direction);
			} else if(this.xCord >= 0 && this.xCord <= game.maze.width) {
				if(!this.hasWall(direction) && this.onCenter()) {
					this.setDirection(direction);
				}
			}
		}
	} 
	/**
	 * eat food 
	 */
	eatFood() {
		//check current grid
		if(this.centerDist === null) {
			let curGrid = this.currentTile();
			if(curGrid instanceof Food) {
				this.score += curGrid.score;
				curGrid.clear();
			}
		}
	} 
	/**
	 * determine user tile image crop location
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
	 * update user
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//animate user
		this.animatePlayer();
		//check movment
		this.checkMoveKey();
		this.move(timeStep);
		//eat food
		this.eatFood();
	} 
} 