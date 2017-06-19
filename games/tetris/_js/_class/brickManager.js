/* jslint esversion: 6 */
/**
 * brick manager class
 */
class BrickManager {
	constructor() {
		this.allOrients = ["up", "right", "down", "left"];
		this.lastBrick = null;
		this.curBrick = null;
		this.nextBrick = null;
		this.rowToClear = null;
		this.tetris = false;
		this.score = null;
		this.level = null;
		this.goal = null;
		//time out handlers
		this.brickTimeout = null;
		this.swipeTimeout = null;
		this.resetTimeout = null;
		//interval handlers
		this.swipeInterval = null;
		this.state = null;
		this.reset();
	}
	/**
	 * reset manager
	 */
	reset() {
		this.lastBrick = null;
		this.makeBricks();
		this.rowToClear = new Set();
		this.tetris = false;
		this.score = 0;
		this.level = 1;
		this.goal = this.getGoal(this.level);
		if(game.hud) game.hud.reset();	
		this.state = new StateMachine(this, "ready");
	} 
	/**
	 * go to next level
	 */
	nextLevel() {
		//play sound effect
		game.sound.playSound(document.getElementById("level_up"));
		this.lastBrick = null;
		this.makeBricks();
		this.rowToClear = new Set();
		this.tetris = false;
		this.goal = this.getGoal(++this.level);
		game.hud.notifyLevel();
		this.state = new StateMachine(this, "ongoing");
	} 
	/**
	 * calculate goal for current level
	 * @param int
	 *
	 * level : current level
	 *
	 * returns int
	 */
	getGoal(level) {
		return level * ((level - 1) * 150 + 600);
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
	 * generate bricks
	 */
	makeBricks() {
		this.curBrick = this.randomBrick();
		this.nextBrick = this.randomBrick();
	}
	/**
	 * swap current brick to next brick
	 */
	swapBrick() {
		this.curBrick = this.nextBrick;
		this.nextBrick = this.randomBrick();
		game.hud.updateBricks();
	} 
	/**
	 * create next bricks
	 */ 
	createNext() {
		if(!this.brickTimeout) {
			this.curBrick = null;
			this.brickTimeout = setTimeout(() => {
				//set next bricks 
				this.swapBrick();
				this.curBrick.forbidMove();
				clearTimeout(this.brickTimeout);
				this.brickTimeout = null;
			}, 500);
		}
	} 
	/**
	 * blink filled row
	 */
	blinkRow() {
		if(!this.swipeInterval) {
			this.swipeInterval = setInterval(() => {
				this.rowToClear.forEach(row => {
					game.grid.logicGrid[row].forEach(block => {
						block.changeTile();
					});
				});
			}, 100);
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
		let tetris = 0;
		for(let i = game.grid.logicGrid.length - 1; i >= 0; i--) {
			if(game.grid.logicGrid[i].every(grid => grid !== 0)) {
				this.rowToClear.add(i);
				if(++tetris == 4) {
					this.tetris = true;
				}
				continue;
			}
			tetris = 0;
		}
		return this.rowToClear.size;
	} 
	/**
	 * check score
	 */
	checkScore() {
		//calculate row clear score
		let multiplier = this.lastBrick.hardLandDistance ? 1.5 : 1; 
		this.score += this.tetris ? 
			(this.rowToClear.size + 4) * 100 * multiplier : this.rowToClear.size * 100 * multiplier;
		//play sound effect
		game.sound.playSound(document.getElementById(this.tetris ? "tetris" : "row_clear"));
		//calculate hard land bonus
		this.score += this.lastBrick.hardLandDistance * 5;
		this.tetris = false;
		this.lastBrick = null;
		//display score 
		game.hud.drawScore();
	} 
	/**
	 * check goal
	 */
	checkGoal() {
		if(this.score >= this.goal) {
			this.nextLevel();
		}
	} 
	/**
	 * clear a filled row
	 */
	clearRow() {
		let newGrid = [];
		for(let i = game.grid.logicGrid.length - 1; i >= 0; i--) {
			//insert rows that are not filled
			if(!this.rowToClear.has(i)) {
				newGrid.unshift(game.grid.logicGrid[i]);
			}
		}
		//replace cleared rows with empty rows
		for(let i = 0; i < this.rowToClear.size; i++) {
			newGrid.unshift(new Array(game.grid.column).fill(0));
		}
		//calculate score
		this.checkScore();
		this.rowToClear = new Set();
		game.grid.logicGrid = newGrid;
		//check goal
		this.checkGoal();
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
			//record last brick
			this.lastBrick = brick;
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
		return game.grid.logicGrid[0].some(grid => grid !== 0);
	} 
	/**
	 * manager states
	 */ 
	//ready state
	ready() {
		game.viewport.displayMsg();
		//detect game start
		if(control.keyReleased == control.SPACE) {
			game.viewport.clearMsg(true);
			this.state.swapState("ongoing");
		}
	} 
	//ongoing state
	ongoing() {
		if(this.curBrick) {
			this.curBrick.update();
		}
		//play background music
		game.sound.playSound(document.getElementById("bgMusic"), 0, 0.4, true);
	}
	//clearing state
	clearing() {
		if(!this.swipeTimeout) {
			this.blinkRow();
			//clear filled rows
			this.swipeTimeout = setTimeout(() => {
				clearInterval(this.swipeInterval);
				this.swipeInterval = null;
				//clear row and generate next brick
				this.clearRow();
				this.createNext();
				this.state.swapState("ongoing");
				clearTimeout(this.swipeTimeout);
				this.swipeTimeout = null;
			}, 700);
		}
	}
	//buffering state
	buffering() {
		if(!this.resetTimeout) {
			//clear game sound
			game.sound.clearAllSound();
			//play sound effect
			game.sound.playSound(document.getElementById("game_end"));
			this.resetTimeout = setTimeout(() => {
				game.reset();
				clearTimeout(this.resetTimeout);
				this.resetTimeout = null;
			}, 3500);
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
		let logicGrid = game.grid.logicGrid;
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