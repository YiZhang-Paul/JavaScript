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
		this.gridWidth = null;
		if(game.monitor.width > game.monitor.height) {
			this.gridWidth = Math.floor(game.monitor.height * 0.9 / this.row);
		} else {
			this.gridWidth = Math.floor(game.monitor.width * 0.9 / this.column);
		}
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