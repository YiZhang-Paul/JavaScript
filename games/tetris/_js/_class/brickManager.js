/* jslint esversion: 6 */
/**
 * brick manager class
 */
class BrickManager {
	constructor() {
		this.bricks = new Set();
		this.curBrick = null;
		this.nextBrick = null;
	}
	/**
	 * generate random brick
	 *
	 * returns obj {}
	 */
	randomBrick() {
		let allColors = document.getElementsByClassName("color");
		let color = allColors[Math.floor(Math.random() * allColors.length)].id; 
	} 
} 