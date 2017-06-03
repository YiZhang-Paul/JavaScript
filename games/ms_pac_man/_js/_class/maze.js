/* jslint esversion: 6 */
/**
 * maze class
 */
class Maze {
	constructor() {
		this.width = null;
		this.height = null;
		if(game.monitor.width > game.monitor.height) {
			this.height = game.monitor.height * 0.8;
			this.width = this.height / 499 * 450; 
		} else {
			this.width = game.monitor.width * 0.8;
			this.height = this.width / 450 * 499;
		}
		//create game canvases
		this.backCtx = this.makeCanvase(this.width, this.height, 1);
		this.playerCtx = this.makeCanvase(this.width, this.height, 2);
		this.uiCtx = this.makeCanvase(this.width, this.height, 3);
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
		let tile = document.getElementById("maze");
		this.backCtx.drawImage(tile, 0, 0, this.width, this.height);
	} 
} 