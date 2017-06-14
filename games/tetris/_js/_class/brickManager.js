/* jslint esversion: 6 */
/**
 * brick manager class
 */
class BrickManager {
	constructor() {
		this.allOrients = ["up", "right", "down", "left"];
		this.curBrick = null;
		this.nextBrick = null;
		this.rowToClear = null;
		this.brickTimeout = null;
		this.swipeTimeout = null;
		this.resetTimeout = null;
		this.state = null;
		this.reset();
	}
	/**
	 * reset manager
	 */
	reset() {
		this.curBrick = this.randomBrick();
		this.nextBrick = this.randomBrick();
		this.rowToClear = new Set();
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
	 *
	 * returns int
	 */
	checkRow() {
		for(let i = game.gameGrid.logicGrid.length - 1; i >= 0; i--) {
			if(game.gameGrid.logicGrid[i].every(grid => grid !== 0)) {
				this.rowToClear.add(i);
			}
		}
		return this.rowToClear.size;
	} 
	/**
	 * clear a filled row
	 */
	clearRow() {
		let newGrid = [];
		for(let i = game.gameGrid.logicGrid.length - 1; i >= 0; i--) {
			//insert rows that are not filled
			if(!this.rowToClear.has(i)) {
				newGrid.unshift(game.gameGrid.logicGrid[i]);
			}
		}
		//replace cleared rows with empty rows
		for(let i = 0; i < this.rowToClear.size; i++) {
			newGrid.unshift(new Array(game.gameGrid.column).fill(0));
		}
		this.rowToClear = new Set();
		game.gameGrid.logicGrid = newGrid;
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
		if(this.checkGameEnd()) {
			this.state.swapState("buffering");
		} else if(this.checkRow()) {
			this.state.swapState("clearing");
		} else {
			this.createNext();
		}
	} 
	/**
	 * check game end
	 * 
	 * returns boolean
	 */
	checkGameEnd() {
		return game.gameGrid.logicGrid[0].some(grid => grid !== 0);
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
			}, 600);
		}
	}
	//buffering state
	buffering() {
		if(!this.resetTimeout) {
			this.resetTimeout = setTimeout(() => {
				game.reset();
				clearTimeout(this.resetTimeout);
				this.resetTimeout = null;
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
	 * draw fallen bricks
	 */
	drawFellBrick() {
		let logicGrid = game.gameGrid.logicGrid;
		for(let i = 0; i < logicGrid.length; i++) {
			for(let j = 0; j < logicGrid[i].length; j++) {
				if(logicGrid[i][j] instanceof Block) {
					logicGrid[i][j].draw(i, j);
				}
			}
		}
	} 
	/**
	 * draw all bricks
	 */
	draw() {
		if(this.curBrick) {
			this.curBrick.draw();
		}
		this.drawFellBrick();
	} 
} 