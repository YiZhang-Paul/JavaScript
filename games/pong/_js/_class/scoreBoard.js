/* jslint esversion: 6 */
/**
 * score board class
 */
class ScoreBoard {
	constructor() {
		this.width = game.board.width;
		this.height = game.board.height * 0.33;
		this.fontSize = this.height * 0.7;
		this.ctx = game.board.uiCtx;
		//draw score board
		this.draw();
	}
	/**
	 * draw score board
	 */
	draw() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.font = this.fontSize + "px Arial";
		this.ctx.fillStyle = "white";
		//user and AI score
		this.ctx.fillText(game.manager.user.score, 
			                this.width * 0.67 - this.fontSize * 0.5, 
			                this.height * 0.75);
		this.ctx.fillText(game.manager.ai.score, 
			                this.width * 0.33, 
			                this.height * 0.75);
	} 
} 