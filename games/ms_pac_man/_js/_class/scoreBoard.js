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
		this.step = 0;
		this.intervalHandler = null;
		this.ctx = game.maze.uiCtx;
		this.draw();
		//initialize/reset score board
		this.reset();
	}
	/**
	 * reset score board
	 */
	reset() {
		this.step = 0;
		if(this.intervalHandler) {
			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
		}
		this.draw();
	} 
	/**
	 * update and display current score
	 * @param int
	 *
	 * score : score received
	 */
	refreshScore(score = 0) {
		this.owner.score += score;
		this.owner.highestScore = Math.max(this.owner.score, this.owner.highestScore);
		this.draw();
	} 
	/**
	 * change step
	 */
	changeStep() {
		this.step = this.step ? 0 : 1;
	} 
	/**
	 * blink player indicator
	 */
	blinkCurPlayer() {
		if(!this.intervalHandler) {
			this.intervalHandler = setInterval(() => {
				this.changeStep();
				this.draw();
			}, 150);
		}
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
		//draw score board
		let scores = [[`${this.owner.playerNum}UP`, this.owner.score], 
									["HIGH SCORE", this.owner.highestScore]];
		for(let i = 0; i < scores.length; i++) {
			for(let j = 0; j < scores[i].length; j++) {
				if(!i && !j && !this.step) {
					continue;
				}
				this.ctx.fillText(
					scores[i][j], 
					this.width * (0.2 + i * 0.4), 
					this.height * (0.05 + j * 0.05)
				);
			}
		}
	} 
} 