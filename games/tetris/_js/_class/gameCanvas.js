/* jslint esversion: 6 */
/**
 * game canvas class
 * @param int, String
 *
 * zIndex : z-index of canvas
 * divID  : ID of div to be attached
 */
class GameCanvas {
	constructor(zIndex, divID) {
		//make canvas
		this.ctx = this.makeCanvas(zIndex, divID);
		//draw canvas 
		this.draw();
	}
	/**
	 * make game canvas
	 * @param int, String
	 *
	 * zIndex : z-index of canvas
	 * divID  : ID of div to be attached
	 *
	 * returns obj {}
	 */
	makeCanvas(zIndex, divID) {
		let parentDiv = document.getElementById(divID);
		let width = parentDiv.offsetWidth;
		let height = parentDiv.offsetHeight;
		//create canvas
		let canvas = document.createElement("canvas");
		canvas.style.zIndex = zIndex;
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";
		parentDiv.appendChild(canvas);
		return canvas.getContext("2d");
	}
	/**
	 * @abstract
	 * draw canvas
	 */
	draw() {}  
} 