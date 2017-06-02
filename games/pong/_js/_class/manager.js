/* jslint esversion: 6 */
/**
 * game manager class
 * manages user, AI and
 * other game related assets
 */
class Manager {
	constructor() {
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
		//game ready
		this.state = "ready";
	} 
	/**
	 * reset game
	 */
	resetGame() {

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
	} 
	/**
	 * draw game assets
	 */
	draw() {
		//clear canvas
		this.ctx.clearRect(0, 0, game.board.width, game.board.height);
	} 
} 