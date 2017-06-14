/* jslint esversion: 6 */
/**
 * brick manager class
 */
class BrickManager {
	constructor() {
		this.fellBricks = new Set();
		this.curBrick = null;
		this.nextBrick = null;
		this.allOrients = ["up", "right", "down", "left"];
		this.state = "ready";
	}
	/**
	 * reset manager
	 */
	reset() {
		this.fellBricks = new Set();
		this.curBrick = null;
		this.nextBrick = null;
		this.state = "ready";
	} 
	/**
	 * generate random brick
	 *
	 * returns obj {}
	 */
	randomBrick() {
		//determine random color
		let allColors = document.getElementsByClassName("color");
		let color = allColors[Math.floor(Math.random() * allColors.length)].id; 
		//determine random type
		let type = Math.floor(Math.random() * 7);
		//determine random orientation
		let orientation = this.allOrients[Math.floor(Math.random() * this.allOrients.length)];
		//create brick
		let brick;
		if(type === 0) brick = new LLeft(color, orientation);
		else if(type == 1) brick = new Square(color, orientation);
		else if(type == 2) brick = new LRight(color, orientation);
		else if(type == 3) brick = new TBrick(color, orientation);
		else if(type == 4) brick = new IBrick(color, orientation);
		else if(type == 5) brick = new ZLeft(color, orientation);
		else brick = new ZRight(color, orientation);
		return brick;
	} 
	/**
	 * update manager
	 */
	update() {
		
	}
	/**
	 * draw all bricks
	 */
	draw() {

	} 
} 