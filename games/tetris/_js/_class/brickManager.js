/* jslint esversion: 6 */
/**
 * brick manager class
 */
class BrickManager {
	constructor() {
		this.allOrients = ["up", "right", "down", "left"];
		this.fellBricks = null;
		this.curBrick = null;
		this.nextBrick = null;
		this.timeoutHandler = null;
		this.state = null;
		this.reset();
	}
	/**
	 * reset manager
	 */
	reset() {
		this.fellBricks = new Set();
		this.curBrick = this.randomBrick();
		this.nextBrick = this.randomBrick();
		this.state = new StateMachine(this, "ready");
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
	 * create next bricks
	 */ 
	createNext() {
		if(!this.timeoutHandler) {
			this.fellBricks.add(this.curBrick);
			this.curBrick = null;
			this.timeoutHandler = setTimeout(() => {
				//set next bricks 
				this.curBrick = this.nextBrick;
				this.nextBrick = this.randomBrick();
				clearTimeout(this.timeoutHandler);
				this.timeoutHandler = null;
			}, 500);
		}
	} 
	/**
	 * manager states
	 */ 
	//ready state
	ready() {
		//detect game start
		if(control.keyReleased == control.SPACE) {
			this.state.swapState("ongoing");
		}
	} 
	//ongoing state
	ongoing() {
		if(this.curBrick) {
			this.curBrick.update();
		}
	}
	/**
	 * update manager
	 */
	update() {
		this.state.update();
	}
	/**
	 * draw all bricks
	 */
	draw() {
		if(this.curBrick) {
			this.curBrick.draw();
		}
		this.fellBricks.forEach(brick => {
			brick.draw();
		});
	} 
} 