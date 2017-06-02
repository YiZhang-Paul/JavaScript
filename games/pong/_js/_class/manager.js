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
		//score board
		this.scoreBoard = new ScoreBoard();
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
		//update score board
		this.scoreBoard.draw();
		//game ready
		this.state = "ready";
	}
	/**
	 * check if ball is in capture range
	 *
	 * returns boolean
	 */
	checkCaptureRange() {
		//check if the ball is at the same height of a player
		let checkRange = player => 
			this.ball.yCord >= player.yCord && 
			this.ball.yCord <= player.yCord + player.height;
		//check capture range base on ball moving direction
		if(this.ball.xCord >= this.ball.minX && 
			 this.ball.xCord <= this.ball.maxX) {
			return this.ball.hDirection == "left" ? checkRange(this.ai) : checkRange(this.user);
		}
	} 
	/**
	 * check game end
	 */
	checkGameEnd() {
		if(this.ball.xCord < game.board.vBorder * 0.5 || 
			 this.ball.xCord > game.board.width - game.board.vBorder * 0.5) {
			//update score
			if(this.ball.hDirection == "left") this.user.score++;
			else this.ai.score++;
			//reset game
			this.resetGame();
		}
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
		if(this.state == "started") {
			//check if ball is capture range
			this.ball.inCaptureRange = this.checkCaptureRange();
			//check game end
			this.checkGameEnd();
		}
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