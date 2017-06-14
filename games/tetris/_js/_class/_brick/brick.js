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
		this.allOrients = ["up", "right", "down", "left"];
		this.orientation = orientation;
		//locations
		this.grids = [];
		this.spawnGrid = [];
		this.curGrid = [];
		//movement and rotations
		this.fallSpeed = 500;
		this.lastFall = 0;
		this.moveSpeed = 70;
		this.lastMove = 0;
		this.rotateSpeed = 200; 
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
		return [3 - row, column - 2]; 
	}
	/**
	 * covert key code to in game control
	 * @param int
	 *
	 * keyCode : key code to be converted
	 *
	 * returns String
	 */
	converKeyCode(keyCode) {
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
			this.rotate(this.converKeyCode(keyCode));
		} 
		//check movement
		if(control.moveKey.length) {
			let keyCode = control.moveKey[control.moveKey.length - 1];
			this.move(this.converKeyCode(keyCode));
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
	 * move bricks
	 * @param String
	 *
	 * direction : movement direction
	 */
	move(direction) {
		if(!this.onMoveCD()) {
			switch(direction) {
				case "down" :
					this.curGrid[0]++;
					break;
				case "left" :
					this.curGrid[1]--;
					break;
				case "right" :
					this.curGrid[1]++;
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
			this.curGrid[0]++;
			this.setFallCD();
		}
	} 
	/**
	 * rotate bricks
	 * @param String
	 * 
	 * direction : rotate direction
	 */
	rotate(direction) {
		if(!this.onRotateCD()) {
			//determine new orientation
			let curOrientIndex = this.allOrients.indexOf(this.orientation);
			let rotateDir = direction == "clockWise" ? 1 : -1;
			let newOrientIndex = (curOrientIndex + rotateDir) % this.allOrients.length;
			//set new orientation and refresh rotate cooldown
			this.orientation = this.allOrients[newOrientIndex];
			this.grids = this[this.orientation];
			this.setRotateCD();
		}
	} 
	/** 
	 * update brick 
	 */
	update() {
		this.checkInput();
		//this.fallDown();
	} 
	/**
	 * draw brick
	 */
	draw() {
		for(let i = 0; i < this.grids.length; i++) {
			for(let j = 0; j < this.grids[i].length; j++) {
				if(this.grids[i][j] == 1) {
					let gridWidth = game.gameGrid.gridWidth;
					let xCord = (this.curGrid[1] + j) * gridWidth;
					let yCord = (this.curGrid[0] + i) * gridWidth;
					this.ctx.drawImage(this.tile, xCord, yCord, gridWidth, gridWidth);
				}
			}
		}
	} 
} 