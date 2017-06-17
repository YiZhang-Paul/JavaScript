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
		this.fallSpeed = this.getFallSpeed();
		this.lastFall = 0;
		this.moveDownSpeed = 50;
		this.lastMoveDown = 0;
		this.sideMoveSpeed = 50;
		this.lastSideMove = 0;
		this.rotateSpeed = 175; 
		this.lastRotate = 0;
		this.hardLandDistance = 9;
		//brick appearance
		this.tile = document.getElementById(this.color);
		this.ctx = game.viewport.gridCtx;
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
			if(new Set(this.grids[row]).has(1)) break;
		}
		let column = game.grid.column % 2 === 0 ?
			game.grid.column * 0.5 - 1 : (game.grid.column - 1) * 0.5;
		return [-row - 1, column - 1]; 
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
	 * determine fall speed
	 *
	 * returns int
	 */
	getFallSpeed() {
		let level = game.brickManager ? game.brickManager.level : 1;
		return Math.max(500 - (level - 1) * 35, 45);
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
	 * refresh move down cooldown
	 */
	setMoveDownCD() {
		this.lastMoveDown = new Date().getTime();
	} 
	/**
	 * check move down cooldown
	 */
	onMoveDownCD() {
		return new Date().getTime() - this.lastMoveDown < this.moveDownSpeed;
	} 
	/**
	 * refresh side move cooldown
	 */
	setSideMoveCD() {
		this.lastSideMove = new Date().getTime();
	} 
	/**
	 * check side move cooldown
	 */
	onSideMoveCD() {
		return new Date().getTime() - this.lastSideMove < this.sideMoveSpeed;
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
	 * forbid moving down bricks from the very start
	 */
	forbidMove() {
		let forbidTime = 250;
		this.moveDownSpeed = forbidTime;
		this.setMoveDownCD();
		//reset key hold
		control.keyTapped = new Map();
		let timeout = setTimeout(() => {
			this.moveDownSpeed = 50;
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
		switch(direction) {
			//move down
			case "down" :
				if(!this.onMoveDownCD()) {
					if(this.bottomCollide()) {
						game.brickManager.checkBrickFell(this);
						return;
					}
					this.curGrid[0]++;
					this.setMoveDownCD();
				}
				break;
			//side move
			case "left" :
			case "right" :
				if(!this.onSideMoveCD()) {
					if(this.sideCollide(direction)) {
						return;
					}
					this.curGrid[1] = direction == "left" ? 
					this.curGrid[1] - 1 : this.curGrid[1] + 1;
					this.setSideMoveCD();
				}
				break;
		}
	}
	/**
	 * calculate landing location
	 * 
	 * returns int
	 */
	getLandingLocation() {
		let startRow = this.curGrid[0]; 
		let endRow = startRow;
		while(!this.bottomCollide(endRow)) {
			endRow++;
		}
		//calculate hard land distance
		this.hardLandDistance = endRow - startRow;
		return endRow;
	} 
	/**
	 * hard landing
	 */
	hardLand() {
		this.curGrid[0] = this.getLandingLocation();
		game.brickManager.checkBrickFell(this);
	} 
	/**
	 * brick fall down 
	 */ 
	fallDown() {
		if(!this.onFallCD()) {
			if(this.bottomCollide()) {
				game.brickManager.checkBrickFell(this);
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
		let logicGrid = game.grid.logicGrid;
		for(let i = 0; i < newGrids.length; i++) {
			for(let j = 0; j < newGrids[i].length; j++) {
				if(newGrids[i][j] == 1) {
					let gridRow = logicGrid[this.curGrid[0] + i];
					if(this.curGrid[0] + i > logicGrid.length - 1 || 
						 (gridRow && gridRow[this.curGrid[1] + j]) !== 0) {
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
					game.grid.logicGrid[this.curGrid[0] + i][this.curGrid[1] + j] = new Block(this.color);
				}
			}
		}
	}
	/**
	 * check bottom collision
	 * @param int 
	 *
	 * row : current row
	 *
	 * returns boolean
	 */
	bottomCollide(row = this.curGrid[0]) {
		for(let i = 0; i < this.grids.length; i++) {
			for(let j = 0; j < this.grids[i].length; j++) {
				//check logic grids
				if(row + i >= 0 && this.grids[i][j] == 1) {
					let rowBelow = game.grid.logicGrid[row + i + 1];
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
				if(this.grids[i][j] == 1) {
					let logicGrid = game.grid.logicGrid;
					let curRow = this.curGrid[0] + i;
					let nextColumn = direction == "left" ? this.curGrid[1] + j - 1 : this.curGrid[1] + j + 1;
					//check side boundary
					let outBound = nextColumn < 0 || nextColumn > logicGrid[0].length - 1;
					//check other bricks
					let hitOtherBrick = logicGrid[curRow] && logicGrid[curRow][nextColumn] instanceof Block;
					if(outBound || hitOtherBrick) {
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
		if(control.isTapped(control.S) || control.isTapped(control.DOWN)) {
			this.hardLand();
		} else {
			this.checkInput();
			this.fallDown();
		}
	} 
	/**
	 * draw brick
	 */
	draw() {
		for(let i = 0; i < this.grids.length; i++) {
			for(let j = 0; j < this.grids[i].length; j++) {
				if(this.grids[i][j] == 1 && this.curGrid[0] + i >= 0) {
					let gridWidth = game.grid.gridWidth;
					let viewport = game.viewport;
					let xCord = (this.curGrid[1] + j) * gridWidth + viewport.border;
					let yCord = (this.curGrid[0] + i) * gridWidth + viewport.border;
					this.ctx.drawImage(this.tile, xCord, yCord, gridWidth, gridWidth);
				}
			}
		}
	} 
} 