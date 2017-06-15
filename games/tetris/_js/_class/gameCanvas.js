/* jslint esversion: 6 */
/**
 * game canvas class
 */
class GameCanvas {
	constructor() {
		this.border = game.gameGrid.gridWidth * 0.4;
		this.width = game.gameGrid.column * game.gameGrid.gridWidth + 2 * this.border;
		this.height = game.gameGrid.row * game.gameGrid.gridWidth + 3 * this.border;
		//game canvases
		this.backCtx = this.makeCanvas(1);
		this.playerCtx = this.makeCanvas(2);
		//draw background 
		this.draw();
	}
	/**
	 * make game canvas
	 * @param int
	 *
	 * zIndex : z-index of canvas
	 *
	 * returns obj {}
	 */
	makeCanvas(zIndex) {
		let canvas = document.createElement("canvas");
		canvas.style.zIndex = zIndex;
		canvas.width = this.width;
		canvas.height = this.height;
		canvas.style.width = this.width + "px";
		canvas.style.height = this.height + "px";
		document.getElementById("main").appendChild(canvas);
		return canvas.getContext("2d");
	}
	/**
	 * draw canvas
	 */ 
	draw() {
		this.backCtx.clearRect(0, 0, this.width, this.height);
		this.backCtx.beginPath();
		this.backCtx.rect(0, 0, this.width, this.height);
		this.backCtx.fillStyle = "slategrey";
		this.backCtx.fill();
		let logicGrid = game.gameGrid.logicGrid;
		let gridWidth = game.gameGrid.gridWidth;
		for(let i = 0; i < logicGrid.length; i++) {
			for(let j = 0; j < logicGrid[i].length; j++) {
				this.backCtx.beginPath();
				this.backCtx.rect(j * gridWidth + this.border, i * gridWidth + this.border, gridWidth, gridWidth);
				this.backCtx.fillStyle = "midnightblue";
				this.backCtx.fill();
				this.backCtx.strokeStyle = "slategrey";
				this.backCtx.stroke();
			}
		}
	} 
} 