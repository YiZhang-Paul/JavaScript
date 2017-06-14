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
		this.orientation = orientation;
		this.grids = [];
		this.spawnGrid = [];
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
	 * check input key
	 */
	checkInput() {
		if(control.keyPressed.length) {
			
		}
	} 
	/**
	 * move bricks
	 */
	move() {

	} 
	/**
	 * rotate bricks
	 */
	rotate() {

	} 
	/** 
	 * update brick 
	 */
	update() {
		this.rotate();
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