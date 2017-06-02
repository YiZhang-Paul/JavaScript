/* jslint esversion: 6 */
/**
 * player class
 */
class Player {
	constructor() {
		this.xCord = null;
		this.yCord = null;
		this.width = game.board.hBorder;
		this.height = game.board.height * 0.2;
		this.minY = game.board.hBorder;
		this.maxY = game.board.height - game.board.hBorder - this.height;
		this.speed = Math.round(game.board.height * 0.0005 * 100) / 100;
		this.direction = null;
		this.score = 0;
		this.ctx = game.board.playerCtx;
	}
	/**
	 * draw player
	 */
	draw() {
		this.ctx.beginPath();
		this.ctx.rect(this.xCord, this.yCord, this.width, this.height);
		this.ctx.fillStyle = "white";
		this.ctx.fill();
	} 
} 