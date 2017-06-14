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
		this.rowToClear = [];
		this.brickTimeout = null;
		this.swipeTimeout = null;
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
		this.rowToClear = [];
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
		if(!this.brickTimeout) {
			this.fellBricks.add(this.curBrick);
			this.curBrick = null;
			this.brickTimeout = setTimeout(() => {
				//set next bricks 
				this.curBrick = this.nextBrick;
				this.nextBrick = this.randomBrick();
				clearTimeout(this.brickTimeout);
				this.brickTimeout = null;
			}, 500);
		}
	} 
	/**
	 * check if a row is filled
	 * and determine total number
	 * of rows to be cleared
	 */
	checkRow() {
		for(let i = game.gameGrid.logicGrid.length - 1; i >= 0; i--) {
			if(game.gameGrid.logicGrid[i].every(grid => grid == 1)) {
				this.rowToClear.push(i);
			}
		}
	} 
	/**
	 * clear a filled row
	 */
	clearRow() {
		for(let i = 0; i < this.rowToClear.length; i++) {
			game.gameGrid.logicGrid.splice(this.rowToClear[i], 1);
			game.gameGrid.logicGrid.unshift(new Array(game.gameGrid.column).fill(0));
		}
	} 
	/**
	 * check game condition when brick fell on the groud 
	 * @param obj {}
	 *
	 * brick : brick to be checked
	 */
	checkBrickFell(brick) {
		//record fallen brick location
		brick.recordLocation();
		this.checkRow();
		if(this.rowToClear.length) {
			this.state.swapState("clearing");
		} else {
			this.createNext();
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
	//clearing state
	clearing() {
		if(!this.swipeTimeout) {
			this.swipeTimeout = setTimeout(() => {
				//clear row and generate next brick
				this.clearRow();
				this.createNext();
				this.state.swapState("ongoing");
				clearTimeout(this.swipeTimeout);
				this.swipeTimeout = null;
			}, 3000);
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