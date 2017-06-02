/* jslint esversion: 6 */
/**
 * AI class
 */
class AI extends Player {
	constructor() {
		super();
		//initialize/reset AI location and direction
		this.reset();
	}
	/**
	 * reset AI
	 */
	reset() {
		//reset AI location
		this.xCord = game.board.vBorder; 
		this.yCord = (game.board.height - this.height) * 0.5;
		//reset direction
		this.direction = null;
	} 
	/**
	 * follow ball movement 
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	followBall(timeStep) {
		let speed = this.speed * timeStep;
		let centerY = this.yCord + this.height * 0.5;
		let ballY = game.manager.ball.yCord;
		//check ball Y-Coordinate
		if(ballY > centerY) {
			this.direction = "down";
			//move down 
			let endY = centerY + speed > ballY ? ballY - this.height * 0.5 : this.yCord + speed;
			this.yCord = Math.min(endY, this.maxY);
		} else if(ballY < centerY) {
			this.direction = "up";
			//move up
			let endY = centerY - speed < ballY ? ballY - this.height * 0.5 : this.yCord - speed; 
			this.yCord = Math.max(this.minY, endY);
		}
	} 
	/**
	 * set AI direction
	 */
	setDiretcion() {

	} 
	/**
	 * move AI
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	move(timeStep) {
		if(game.manager.state == "started") {
			this.followBall(timeStep);
		}
	} 
	/**
	 * randomize moving direction when ball approaches 
	 */
	randomDirection() {
		let chance = Math.floor(Math.random() * 10);
		//30% chance for no movement
		if(chance < 3) {
			return;
		}
		if(this.yCord < game.board.height * 0.5) {
			this.direction = chance < 7 ? "down" : "up"; 
		} else {
			this.direction = chance < 7 ? "up" : "down";
		}
	} 
	/**
	 * update AI data
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		let ball = game.manager.ball;
		let playerDist = game.manager.user.xCord - this.xCord - this.width;
		if(!this.direction && ball.xCord - ball.minX < ball.radius) {
			//randomize moving direction to change ball direction on contact
			this.randomDirection();
		} else {
			//check movement
			this.move(timeStep);
		}
	} 
}