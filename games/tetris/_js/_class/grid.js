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
		let viewport = document.getElementById("view");
		if(viewport.offsetWidth > viewport.offsetHeight) {
			this.gridWidth = Math.floor(viewport.offsetHeight / this.row);
		} else {
			this.gridWidth = Math.floor(viewport.offsetWidth / this.column);
		}
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