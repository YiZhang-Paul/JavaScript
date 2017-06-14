/* jslint esversion: 6 */
/**
 * brick class 
 * @param String, String
 *
 * color       : color of brick
 * orientation : orientation of brick
 */
class Brick {
	constructor(color, orientation = "down") {
		this.color = color;
		this.allOrients = ["up", "right", "down", "left"];
		this.orientation = orientation;
		this.grids = [];
		this.spawnGrid = [];
		this.lastMove = 0;
		this.defaultMoveSpeed = 1000;
		this.moveSpeed = 500;
		this.rotateSpeed = 200; 
		this.lastRotate = 0;
		this.tile = null;
		this.ctx = game.gameCanvas.playerCtx;
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
		} 
		return action;
	} 
	/**
	 * check input key
	 */
	checkInput() {
		if(control.rotateKey.length) {
			let keyCode = control.rotateKey[control.rotateKey.length - 1];
			this.rotate(this.converKeyCode(keyCode));
		}
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
	 */
	move() {

	}
	/**
	 * brick fall down 
	 */ 
	fallDown() {

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
	} 
	/**
	 * draw brick
	 */
	draw() {
		for(let i = 0; i < this.grids.length; i++) {
			for(let j = 0; j < this.grids[i].length; j++) {
				if(this.grids[i][j] == 1) {
					let gridWidth = game.gameGrid.gridWidth;
					let xCord = (this.spawnGrid[1] + j) * gridWidth;
					let yCord = (this.spawnGrid[0] + i) * gridWidth;
					this.ctx.drawImage(this.tile, xCord, yCord, gridWidth, gridWidth);
				}
			}
		}
	} 
} 