/* jslint esversion: 6 */
/**
 * HUD manager class
 */
class HUD extends GameCanvas {
	constructor() {
		super();
		//current holding brick and next brick 
		this.curBrick = {tile : null, grids : null};
		this.nextBrick = {tile : null, grids : null};
		this.updateBricks();
		//make canvas
		this.holdCtx = this.makeCanvas(1, "hold");
		this.nextCtx = this.makeCanvas(1, "next");
		this.scoreCtx = this.makeCanvas(1, "score"); 
		this.levelCtx = this.makeCanvas(1, "level");
		this.goalCtx = this.makeCanvas(1, "goal");
		this.draw();
	}	
	/**
	 * draw background
	 * @param String, String, float
	 *
	 * id          : div ID
	 * color       : background color
	 * globalAlpha : background opacity 
	 */
	drawBG(id, color = "black", globalAlpha = 0.6) {
		let div = document.getElementById(id);
		let ctx = this[id + "Ctx"];
		ctx.clearRect(0, 0, div.offsetWidth, div.offsetHeight);
		ctx.beginPath();
		ctx.save();
		ctx.globalAlpha = globalAlpha;
		ctx.rect(0, 0, div.offsetWidth, div.offsetHeight);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.restore();
	}	 
	/**
	 * draw brick icon
	 * @param String
	 *
	 * id : div ID
	 */
	drawIcon(id) {
		let div = document.getElementById(id);
		let ctx = this[id + "Ctx"];	
		let brick = id == "hold" ? this.curBrick : this.nextBrick;
		let gridWidth = div.offsetWidth > div.offsetHeight ? 
			Math.floor(div.offsetHeight / 6) : Math.floor(div.offsetWidth / 0.6);
		for(let i = 0; i < brick.grids.length; i++) {
			for(let j = 0; j < brick.grids[i].length; j++) {
				if(brick.grids[i][j] == 1) {
					let xCord = (j + 1) * gridWidth;
					let yCord = (i + 1) * gridWidth;
					ctx.drawImage(brick.tile, xCord, yCord, gridWidth, gridWidth);
				}
			}
		}
	} 
	/**
	 * draw holding brick
	 */
	drawHold() {
		this.drawBG("hold");
		this.drawIcon("hold");
	} 
	/**
	 * draw next brick
	 */
	drawNext() {
		this.drawBG("next");
		this.drawIcon("next");
	}
	/**
	 * update hold and next bricks to be notified
	 */
	updateBricks() {
		let manager = game.brickManager;
		this.curBrick.tile = manager.curBrick.tile;
		this.curBrick.grids = manager.curBrick.grids.slice();
		this.nextBrick.tile = manager.nextBrick.tile;
		this.nextBrick.grids = manager.nextBrick.grids.slice();
	} 
	/**
	 * draw hold and next bricks notification
	 */
	notifyBricks() {
		this.drawHold();
		this.drawNext();
	} 
	/**
	 * draw current score
	 */
	drawScore() {
		this.drawBG("score");
	} 
	/**
	 * draw current level
	 */
	drawLevel() {
		this.drawBG("level");
	}
	/**
	 * draw goal
	 */
	drawGoal() {
		this.drawBG("goal");
	}   
	/**
	 * draw all hud
	 */ 
	draw() {
		this.drawHold();
		this.drawNext();
		this.drawScore();
		this.drawLevel();
		this.drawGoal();
	} 
} 