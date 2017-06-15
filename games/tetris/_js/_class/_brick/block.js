/* jslint esversion: 6 */
/**
 * block class 
 * @param String
 *
 * color : color of block
 */
class Block {
	constructor(color) {
		this.color = color;
		this.tile = document.getElementById(this.color);
		this.ctx = game.gameCanvas.playerCtx;
	}
	/**
	 * draw block
	 * @param int, int
	 *
	 * row    : current row of block
	 * column : current column of block
	 */
	draw(row, column) {
		let gridWidth = game.gameGrid.gridWidth;
		let xCord = column * gridWidth;
		let yCord = row * gridWidth;
		this.ctx.drawImage(this.tile, xCord, yCord, gridWidth, gridWidth);
	} 
} 