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
		this.foodCtx = this.makeCanvase(this.width, this.height, 2);
		this.beanCtx = this.makeCanvase(this.width, this.height, 3);
		this.fruitCtx = this.makeCanvase(this.width, this.height, 4);
		this.playerCtx = this.makeCanvase(this.width, this.height, 5);
		this.uiCtx = this.makeCanvase(this.width, this.height, 6);
		this.tanTile = document.getElementById("maze");
		this.transparentTile = document.getElementById("maze_transparent");
		this.step = 0;
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
	 * reset maze
	 */
	reset() {
		this.step = 0;
		this.draw();
	} 
	/**
	 * change step
	 */
	changeStep() {
		this.step = this.step ? 0 : 1;
	} 
	/**
	 * blink maze
	 */
	blink() {
		this.changeStep();
		this.draw();
	} 
	/** 
	 * draw maze
	 */
	draw() {
		this.backCtx.clearRect(0, 0, this.width, this.height);
		if(this.step === 0) {
			this.backCtx.drawImage(this.tanTile, 0, 0, this.width, this.height);
		} else {
			this.backCtx.drawImage(this.transparentTile, 0, 0, this.width, this.height);
		}
	} 
} 