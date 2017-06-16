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
		this.defaultTile = document.getElementById(this.color);
		this.blinkTile = document.getElementById("blink");
		this.tile = this.defaultTile;
		this.step = 0;
		this.ctx = game.viewport.gridCtx;
	}
	/**
	 * change tile
	 */
	changeTile() {
		this.step = this.step ? 0 : 1;
		this.tile = this.step ? this.defaultTile : this.blinkTile;
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
		let viewport = game.viewport;
		let xCord = column * gridWidth + viewport.border;
		let yCord = row * gridWidth + viewport.border;
		this.ctx.drawImage(this.tile, xCord, yCord, gridWidth, gridWidth);
	} 
} 