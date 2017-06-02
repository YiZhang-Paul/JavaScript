/* jslint esversion: 6 */
/**
 * game manager class
 * manages user, AI and
 * other game related assets
 */
class Manager {
	constructor() {
		//assets and participants
		this.user = null;
		this.ai = null;
		this.ball = null;
		this.ctx = game.board.playerCtx;
		//current frame state
		this.state = null;
		this.starter = "user";
	}
	/**
	 * set up new game
	 */
	newGame() {
		//create assets and participants
		this.user = new User();
		this.ai = new AI();
		this.ball = new Ball(this.starter == "user" ? this.user : this.ai);
		//game ready
		this.state = "ready";
	} 
	/**
	 * reset game
	 */
	resetGame() {
		//reset assets and participants
		this.user.reset();
		this.ai.reset();
		this.ball.reset();
		//game ready
		this.state = "ready";
	}
	/**
	 * update game assets
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//detect frame start
		if(control.keyReleased == control.SPACE) {
			this.state = "started";
		}
		//update assets and participants
		this.user.update(timeStep);
		this.ai.update(timeStep);
		this.ball.update(timeStep);
	} 
	/**
	 * draw game assets
	 */
	draw() {
		//clear canvas
		this.ctx.clearRect(0, 0, game.board.width, game.board.height);
		//draw assets and participants
		this.user.draw();
		this.ai.draw();
		this.ball.draw();
	} 
} 