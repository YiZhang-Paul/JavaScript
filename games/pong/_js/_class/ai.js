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
	 * move to ball ending location
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	moveToEndY(timeStep) {
		let speed = this.speed * timeStep;
		let centerY = this.yCord + this.height * 0.5;
		let destinationY = game.manager.ball.destinationY;
		if(destinationY > centerY) {
			this.direction = "down";
			//move down
			let endY = centerY + speed > destinationY ? destinationY - this.height * 0.5 : this.yCord + speed;
			this.yCord = Math.min(endY, this.maxY);
		} else if(destinationY < centerY) {
			this.direction = "up";
			//move up
			let endY = centerY - speed < destinationY ? destinationY - this.height * 0.5 : this.yCord - speed;
			this.yCord = Math.max(this.minY, endY);
		} else {
			this.direction = null;
		}
	} 
	/**
	 * move AI
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	move(timeStep) {
		let ball = game.manager.ball;
		let playerDist = game.manager.user.xCord - this.xCord - this.width;
		if(!this.direction && ball.xCord - ball.minX < ball.radius) {
			//randomize moving direction to change ball direction on contact
			this.randomDirection();
		} else if(ball.xCord - ball.minX < playerDist * 0.25 && 
			        ball.hDirection == "left") {
			this.moveToEndY(timeStep);
		} else {
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
			this.direction = chance < 6 ? "down" : "up"; 
		} else {
			this.direction = chance < 6 ? "up" : "down";
		}
	} 
	/**
	 * update AI data
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//check movement
		if(game.manager.state == "started") this.move(timeStep);
	} 
}