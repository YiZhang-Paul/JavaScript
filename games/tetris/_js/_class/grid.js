/* jslint esversion: 6 */
/**
 * grid class
 * @param int, int
 *
 * row    : total row of grid
 * column : total column of grid 
 */
class Grid {
	constructor(row, column) {
		this.row = row;
		this.column = column;
		this.logicGrid = this.generateGrid();
		//determine grid width
		let widthByColumn = Math.floor(game.monitor.viewWidth / (this.column + 0.5));
		let widthByRow = Math.floor(game.monitor.viewHeight / (this.row + 0.5));
		this.gridWidth = widthByColumn < widthByRow ? widthByColumn : widthByRow;
	}
	/**
	 * reset grid
	 */
	reset() {
		this.logicGrid = this.generateGrid();
	} 
	/**
	 * generate game grid
	 *
	 * returns array []
	 */
	generateGrid() {
		let grid = [];
		for(let i = 0; i < this.row; i++) {
			grid.push(new Array(this.column).fill(0));
		}
		return grid;
	} 
} 