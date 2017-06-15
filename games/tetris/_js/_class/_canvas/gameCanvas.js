/* jslint esversion: 6 */
/**
 * game canvas class
 */
class GameCanvas {
	constructor() {
		this.width = null;
		this.height = null;
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
		let canvas = document.createElement("canvas");
		canvas.style.zIndex = zIndex;
		canvas.width = this.width;
		canvas.height = this.height;
		canvas.style.width = this.width + "px";
		canvas.style.height = this.height + "px";
		document.getElementById(divID).appendChild(canvas);
		return canvas.getContext("2d");
	}
	/**
	 * @abstract
	 * draw canvas
	 */
	draw() {}  
} 