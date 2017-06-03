/* jslint esversion: 6 */
/**
 * maze class
 */
class Maze {
	constructor() {
		this.gridWidth = null;
		if(game.monitor.width > game.monitor.height) {
			this.gridWidth = Math.floor(game.monitor.height * 0.9 / grid.row);
		} else {
			this.gridWidth = Math.floor(game.monitor.width * 0.9 / grid.column);
		}
		this.width = this.gridWidth * grid.column;
		this.height = this.gridWidth * grid.row;
		//create game canvases
		this.backCtx = this.makeCanvase(this.width, this.height, 1);
		this.playerCtx = this.makeCanvase(this.width, this.height, 2);
		this.uiCtx = this.makeCanvase(this.width, this.height, 3);
		this.tile = document.getElementById("maze");
		//draw maze
		this.draw();
	}
	/**
	 * create game canvas
	 * @param float, float, int
	 *
	 * width  : canvas width
	 * height : canvas height
	 * zIndex : canvas z-index
	 * returns obj {}
	 */
	makeCanvase(width, height, zIndex) {
		let canvas = document.createElement("canvas");
		canvas.style.zIndex = zIndex;
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";
		document.getElementById("board").appendChild(canvas);
		return canvas.getContext("2d");
	} 
	/** 
	 * draw maze
	 */
	draw() {
		this.backCtx.drawImage(this.tile, 0, 0, this.width, this.height);
	} 
} 