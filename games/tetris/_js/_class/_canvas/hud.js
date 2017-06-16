/* jslint esversion: 6 */
/**
 * HUD manager class
 */
class HUD extends GameCanvas {
	constructor() {
		super();
		this.opacity = 0.65;
		this.holdCtx = this.makeCanvas(1, "hold");
		this.nextCtx = this.makeCanvas(1, "next");
		this.scoreCtx = this.makeCanvas(1, "score"); 
		this.levelCtx = this.makeCanvas(1, "level");
		this.goalCtx = this.makeCanvas(1, "goal");
		this.drawHold();
		this.drawNext();
		this.drawScore();
		this.drawLevel();
		this.drawGoal();
	}	
	/**
	 * draw holding brick
	 */
	drawHold() {
		let holdDiv = document.getElementById("hold");
		this.holdCtx.beginPath();
		this.holdCtx.rect(0, 0, holdDiv.offsetWidth, holdDiv.offsetHeight);
		this.holdCtx.globalAlpha = this.opacity;
		this.holdCtx.fillStyle = "black";
		this.holdCtx.fill();
	} 
	/**
	 * draw next brick
	 */
	drawNext() {
		let nextDiv = document.getElementById("next");
		this.nextCtx.beginPath();
		this.nextCtx.rect(0, 0, nextDiv.offsetWidth, nextDiv.offsetHeight);
		this.nextCtx.globalAlpha = this.opacity;
		this.nextCtx.fillStyle = "black";
		this.nextCtx.fill();
	}
	/**
	 * draw current score
	 */
	drawScore() {
		let scoreDiv = document.getElementById("score");
		this.scoreCtx.beginPath();
		this.scoreCtx.rect(0, 0, scoreDiv.offsetWidth, scoreDiv.offsetHeight);
		this.scoreCtx.globalAlpha = this.opacity;
		this.scoreCtx.fillStyle = "black";
		this.scoreCtx.fill();
	} 
	/**
	 * draw current level
	 */
	drawLevel() {
		let levelDiv = document.getElementById("level");
		this.levelCtx.beginPath();
		this.levelCtx.rect(0, 0, levelDiv.offsetWidth, levelDiv.offsetHeight);
		this.levelCtx.globalAlpha = this.opacity;
		this.levelCtx.fillStyle = "black";
		this.levelCtx.fill();
	}
	/**
	 * draw goal
	 */
	drawGoal() {
		let goalDiv = document.getElementById("goal");
		this.goalCtx.beginPath();
		this.goalCtx.rect(0, 0, goalDiv.offsetWidth, goalDiv.offsetHeight);
		this.goalCtx.globalAlpha = this.opacity;
		this.goalCtx.fillStyle = "black";
		this.goalCtx.fill();
	}    
} 