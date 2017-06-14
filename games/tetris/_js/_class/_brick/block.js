/* jslint esversion: 6 */
/**
 * block class 
 * @param String, int, int
 *
 * color : color of block
 * row   : current row of block on game grid
 * colum : current column of block on game grid
 */
class Block {
	constructor(color, row, column) {
		this.color = color;
		this.row = row;
		this.column = column;
		this.tile = document.getElementById(this.color);
		this.ctx = game.gameCanvas.playerCtx;
	}
	/**
	 * block fall down 
	 * @param int
	 *
	 * rowNum : number of rows to fall down
	 */
	fallDown(rowNum = 1) {
		this.row += rowNum;
	} 
	/**
	 * draw block
	 */
	draw() {
		let gridWidth = game.gameGrid.gridWidth;
		let xCord = this.column * gridWidth;
		let yCord = this.row * gridWidth;
		this.ctx.drawImage(this.tile, xCord, yCord, gridWidth, gridWidth);
	} 
} 