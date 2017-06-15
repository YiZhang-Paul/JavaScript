/* jslint esversion: 6 */
/**
 * brick class 
 * @param String, String
 *
 * color       : color of brick
 * orientation : orientation of brick
 */
class Brick {
	constructor(color, orientation = "up") {
		this.color = color;
		this.orientation = orientation;
		this.allOrients = ["up", "right", "down", "left"];
		//locations
		this.grids = [];
		this.spawnGrid = [];
		this.curGrid = [];
		//movement and rotations
		this.fallSpeed = 500;
		this.lastFall = 0;
		this.moveSpeed = 50;
		this.lastMove = 0;
		this.rotateSpeed = 175; 
		this.lastRotate = 0;
		//brick appearance
		this.tile = document.getElementById(this.color);
		this.ctx = game.gameCanvas.playerCtx;
	}
	/**
	 * initialize bricks
	 */
	initialize() {
		this.grids = this[this.orientation];
		//find spawn point
		this.spawnGrid = this.getSpawnGrid();
		this.curGrid = this.spawnGrid;
	} 
	/**
	 * determine spawn point
	 *
	 * returns array []
	 */
	getSpawnGrid() {
		//find bottom of brick
		let row; 
		for(row = this.grids.length - 1; row >= 0; row--) {
			if(new Set(this.grids[row]).size != 1) break;
		}
		let column = game.gameGrid.column % 2 === 0 ?
			game.gameGrid.column * 0.5 - 1 : (game.gameGrid.column - 1) * 0.5;
		return [-row, column - 1]; 
	}
	/**
	 * covert key code to in game control
	 * @param int
	 *
	 * keyCode : key code to be converted
	 *
	 * returns String
	 */
	convertKeyCode(keyCode) {
		let action;
		switch(keyCode) {
			case control.W : case control.UP :
				action = "clockWise";
				break;
			case control.S : case control.DOWN :
				action = "down";
				break;
			case control.A : case control.LEFT :
				action = "left";
				break;
			case control.D : case control.RIGHT :
				action = "right";
				break;			
		} 
		return action;
	} 
	/**
	 * check input key
	 */
	checkInput() {
		//check rotation
		if(control.rotateKey.length) {
			let keyCode = control.rotateKey[control.rotateKey.length - 1];
			this.rotate(this.convertKeyCode(keyCode));
		} 
		//check movement
		if(control.moveKey.length) {
			let keyCode = control.moveKey[control.moveKey.length - 1];
			this.move(this.convertKeyCode(keyCode));
		}
	} 
	/**
	 * refresh fall cooldown
	 */
	setFallCD() {
		this.lastFall = new Date().getTime();
	} 
	/**
	 * check fall cooldown
	 */
	onFallCD() {
		return new Date().getTime() - this.lastFall < this.fallSpeed;
	} 
	/**
	 * refresh move cooldown
	 */
	setMoveCD() {
		this.lastMove = new Date().getTime();
	} 
	/**
	 * check move cooldown
	 */
	onMoveCD() {
		return new Date().getTime() - this.lastMove < this.moveSpeed;
	} 
	/**
	 * refresh rotate cooldown
	 */
	setRotateCD() {
		this.lastRotate = new Date().getTime();
	} 
	/**
	 * check rotate cooldown
	 */
	onRotateCD() {
		return new Date().getTime() - this.lastRotate < this.rotateSpeed;
	} 
	/**
	 * forbid moving bricks from the very start
	 */
	forbidMove() {
		let forbidTime = 700;
		this.moveSpeed = forbidTime;
		this.setMoveCD();
		let timeout = setTimeout(() => {
			this.moveSpeed = 50;
			clearTimeout(timeout);
		}, forbidTime);
	} 
	/**
	 * move bricks
	 * @param String
	 *
	 * direction : movement direction
	 */
	move(direction) {
		if(!this.onMoveCD()) {
			switch(direction) {
				case "down" :
					if(this.bottomCollide()) {
						game.manager.checkBrickFell(this);
						return;
					}
					this.curGrid[0]++;
					break;
				case "left" :
				case "right" :
					if(this.sideCollide(direction)) {
						return;
					}
					this.curGrid[1] = direction == "left" ? 
						this.curGrid[1] - 1 : this.curGrid[1] + 1;
					break;
			}
			this.setMoveCD();
		}
	}
	/**
	 * brick fall down 
	 */ 
	fallDown() {
		if(!this.onFallCD()) {
			if(this.bottomCollide()) {
				game.manager.checkBrickFell(this);
				return;
			}
			this.curGrid[0]++;
			this.setFallCD();
		}
	} 
	/**
	 * check if brick can be rotated
	 * @param String
	 *
	 * direction : direction to be checked 
	 *
	 * returns boolean
	 */
	canRotate(direction) {
		let newGrids = this[direction];
		let logicGrid = game.gameGrid.logicGrid;
		for(let i = 0; i < newGrids.length; i++) {
			for(let j = 0; j < newGrids[i].length; j++) {
				if(newGrids[i][j] == 1) {
					let gameGridRow = logicGrid[this.curGrid[0] + i];
					if(this.curGrid[0] + i > logicGrid.length - 1 || 
						 (gameGridRow && gameGridRow[this.curGrid[1] + j]) !== 0) {
						return false;
					}
				}
			}
		}
		return true;
	} 
	/**
	 * get next rotate direction
	 * @param String
	 * 
	 * direction : rotate direction
	 *
	 * returns String
	 */
	nextRotateDir(direction) {
		let curOrientIndex = this.allOrients.indexOf(this.orientation);
		let rotateDir = direction == "clockWise" ? 1 : -1;
		let newOrientIndex = (curOrientIndex + rotateDir) % this.allOrients.length;
		return this.allOrients[newOrientIndex];
	} 
	/**
	 * rotate bricks
	 * @param String
	 * 
	 * direction : rotate direction
	 */
	rotate(direction) {
		let rotateDir = this.nextRotateDir(direction);
		if(!this.onRotateCD() && this.canRotate(rotateDir)) {
			//set new orientation and refresh rotate cooldown
			this.orientation = rotateDir;
			this.grids = this[this.orientation];
			this.setRotateCD();
		}
	} 
	/**
	 * record current brick location on logic grid
	 */
	recordLocation() {
		for(let i = 0; i < this.grids.length; i++) {
			for(let j = 0; j < this.grids[i].length; j++) {
				if(this.curGrid[0] + i >= 0 && this.grids[i][j] == 1) {
					game.gameGrid.logicGrid[this.curGrid[0] + i][this.curGrid[1] + j] = new Block(this.color);
				}
			}
		}
	}
	/**
	 * check bottom collision
	 * 
	 * returns boolean
	 */
	bottomCollide() {
		for(let i = 0; i < this.grids.length; i++) {
			for(let j = 0; j < this.grids[i].length; j++) {
				//check logic grids
				if(this.curGrid[0] + i >= 0 && this.grids[i][j] == 1) {
					let rowBelow = game.gameGrid.logicGrid[this.curGrid[0] + i + 1];
					if(rowBelow === undefined || rowBelow[this.curGrid[1] + j]) {
						return true;
					}
				}
			}
		}
		return false;
	} 
	/**
	 * check side collision
	 * @param String
	 *
	 * direction : direction to be checked
	 * 
	 * returns boolean
	 */
	sideCollide(direction) {
		for(let i = 0; i < this.grids.length; i++) {
			for(let j = 0; j < this.grids[i].length; j++) {
				//check logic grids
				if(this.curGrid[0] + i >= 0 && this.grids[i][j] == 1) {
					let curRow = game.gameGrid.logicGrid[this.curGrid[0] + i];
					let sideColumn = direction == "left" ? 
						curRow[this.curGrid[1] + j - 1] : curRow[this.curGrid[1] + j + 1];
					if(sideColumn === undefined || sideColumn) {
						return true;
					}
				}
			}
		}
		return false;
	} 
	/** 
	 * update brick 
	 */
	update() {
		this.checkInput();
		this.fallDown();
	} 
	/**
	 * draw brick
	 */
	draw() {
		for(let i = 0; i < this.grids.length; i++) {
			for(let j = 0; j < this.grids[i].length; j++) {
				if(this.grids[i][j] == 1) {
					let gridWidth = game.gameGrid.gridWidth;
					let xCord = (this.curGrid[1] + j) * gridWidth + game.gameCanvas.border;
					let yCord = (this.curGrid[0] + i) * gridWidth + game.gameCanvas.border;
					this.ctx.drawImage(this.tile, xCord, yCord, gridWidth, gridWidth);
				}
			}
		}
	} 
} 