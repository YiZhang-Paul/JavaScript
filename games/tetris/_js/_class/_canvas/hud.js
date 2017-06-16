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
		let widthByRow = Math.round(div.offsetHeight / brick.grids.length);
		let widthByColumn = Math.round(div.offsetWidth / brick.grids[0].length);
		let gridWidth = widthByRow > widthByColumn ? widthByColumn : widthByRow;
		for(let i = 0; i < brick.grids.length; i++) {
			for(let j = 0; j < brick.grids[0].length; j++) {
				if(brick.grids[i][j] == 1) {
					let xCord = j * gridWidth;
					let yCord = i * gridWidth;
					ctx.drawImage(brick.tile, xCord, yCord, gridWidth, gridWidth);
				}
			}
		}
	} 
	/**
	 * reset HUD
	 */
	reset() {
		this.updateBricks();
		this.draw();
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
		let curBrick = game.brickManager.curBrick; 
		let nextBrick = game.brickManager.nextBrick;
		this.curBrick.tile = curBrick.tile;
		this.curBrick.grids = curBrick[curBrick.orientation + "Icon"].slice();
		this.nextBrick.tile = nextBrick.tile;
		this.nextBrick.grids = nextBrick[nextBrick.orientation + "Icon"].slice();
	} 
	/**
	 * draw hold and next bricks notification
	 */
	notifyBricks() {
		this.drawHold();
		this.drawNext();
	} 
	/**
	 * draw numbers
	 * @param float, String, float, float
	 *
	 * number     : number to be drawn
	 * id         : div ID 
	 * fontSize   : font size
	 * lineHeight : line height of text
	 *
	 */
	drawNumber(number, id, fontSize = 25, lineHeight = 0.7) {
		let div = document.getElementById(id);
		let ctx = this[id + "Ctx"];
		ctx.font = fontSize + "px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = "white";
		ctx.fillText(
			number,
			div.offsetWidth * 0.5,
			div.offsetHeight * lineHeight
		);
	} 
	/**
	 * draw current score
	 */
	drawScore() {
		this.drawBG("score");
		this.drawNumber(game.brickManager.score, "score");
	} 
	/**
	 * draw current level
	 */
	drawLevel() {
		this.drawBG("level");
		this.drawNumber(game.brickManager.level, "level", 45);
	}
	/**
	 * draw goal
	 */
	drawGoal() {
		this.drawBG("goal");
		this.drawNumber(game.brickManager.goal, "goal", 35);
	}  
	/**
	 * draw next level and goal notification
	 */ 
	notifyLevel() {
		this.drawLevel();
		this.drawGoal();
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