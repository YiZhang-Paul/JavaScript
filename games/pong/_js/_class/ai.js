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
	 * update AI data
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//check movement
		this.move(timeStep);
	} 
}