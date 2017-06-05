/* jslint esversion: 6 */
/**
 * score board class
 * @param obj {}
 *
 * owner : user
 */
class ScoreBoard {
	constructor(owner) {
		this.owner = owner;
		this.width = game.maze.width;
		this.height = game.monitor.height;
		this.fontSize = this.height * 0.05;
		this.ctx = game.maze.uiCtx;
		//draw score board
		this.draw();
	}
	/**
	 * draw score board
	 */
	draw() {
		this.ctx.clearRect(0, 0, game.maze.width, game.monitor.height);
		this.ctx.font = this.fontSize + "px 'Lucida Console'";
		this.ctx.textAlign = "center";
		this.ctx.fillStyle = "white";
		//display scores
		let scores = [["1UP", this.owner.score], 
									["HIGH SCORE", this.owner.highestScore]];
		for(let i = 0; i < scores.length; i++) {
			for(let j = 0; j < scores[i].length; j++) {
				this.ctx.fillText(
					scores[i][j], 
					this.width * (0.2 + i * 0.4), 
					this.height * (0.05 + j * 0.05)
				);
			}
		}
	} 
} 