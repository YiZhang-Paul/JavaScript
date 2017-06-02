/* jslint esversion: 6 */
/**
 * user class
 */
class User extends Player {
	constructor() {
		super();
		//initialize location
		this.xCord = game.board.width - game.board.vBorder - this.width;
		this.yCord = (game.board.height - this.height) * 0.5;
		//initialize/reset user
		this.reset();
	}
	/**
	 * reset user
	 */
	reset() {
		//reset location
		this.xCord = game.board.width - game.board.vBorder - this.width;
		this.yCord = (game.board.height - this.height) * 0.5; 
		//reset direction
		this.direction = null;
	} 
	/**
	 * convert key code to direction
	 * @param int
	 * 
	 * keyCode : key code of control key
	 *
	 * returns String
	 */
	keyCodeToDirection(keyCode) {
		let direction = null;
		switch(keyCode) {
			case control.W :
			case control.UP :
				direction = "up";
				break;
			case control.S :
			case control.DOWN :
				direction = "down";
				break;	
		}
		return direction;
	} 
	/**
	 * detect direction change
	 */
	changeDirection() {
		if(control.keyPressed.length) {
			let keyCode = control.keyPressed[control.keyPressed.length - 1];
			this.direction = this.keyCodeToDirection(keyCode);
		} else {
			//clear direction
			this.direction = null;
		}
	} 
	/**
	 * move user
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	move(timeStep) {
		let speed = this.speed * timeStep;
		if(this.direction == "up") {
			//move up
			this.yCord = Math.max(this.minY, this.yCord - speed);
		} else if(this.direction == "down") {
			//move down
			this.yCord = Math.min(this.yCord + speed, this.maxY);
		}
	} 
	/**
	 * update user data
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//check movement
		this.changeDirection();
		if(this.direction) this.move(timeStep); 
	} 
} 