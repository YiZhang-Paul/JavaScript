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
		this.ctx = game.canvasManager.viewport.gridCtx;
	}
	/**
	 * draw block
	 * @param int, int
	 *
	 * row    : current row of block
	 * column : current column of block
	 */
	draw(row, column) {
		let gridWidth = game.grid.gridWidth;
		let viewport = game.canvasManager.viewport;
		let xCord = column * gridWidth + viewport.vBorder;
		let yCord = row * gridWidth + viewport.hBorder;
		this.ctx.drawImage(this.tile, xCord, yCord, gridWidth, gridWidth);
	} 
} 