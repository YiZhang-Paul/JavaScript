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
		this.ctx = game.board.playerCtx;
		//current frame state
		this.state = null;
		//set a new game
		this.newGame();
	}
	/**
	 * set up new game
	 */
	newGame() {
		//create assets and participants
		this.user = new User();
		//game ready
		this.state = "ready";
	} 
	/**
	 * reset game
	 */
	resetGame() {
		//reset assets and participants
		this.user.reset();
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
	} 
	/**
	 * draw game assets
	 */
	draw() {
		//clear canvas
		this.ctx.clearRect(0, 0, game.board.width, game.board.height);
		//draw assets and participants
		this.user.draw();
	} 
} 