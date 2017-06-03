/* jslint esversion: 6 */
/**
 * grid object
 * contains maze information
 */
let grid = {
	row    : 31, //total number of rows 
	column : 28, //total number of columns
	//maze layers
	maze  : [[
	//layer 1
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null], 
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null], 
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null], 
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null], 
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null], 
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null] 
	], [
	//layer 2
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
	[   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null],
	[   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null],
	[   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null],
	[   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null], 
	[   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null],
	[   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null],
	[   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null],
	[{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"}],
	[   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null], 
	[   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null],
	[   null,   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,   null],
	[   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null],
	[   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null],
	[   null,   null,   null,{f:"s"},   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,{f:"s"},   null,   null,   null], 
	[   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null],
	[   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null],
	[{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"}],
	[   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null],
	[   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null], 
	[   null,   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,   null],
	[   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null],
	[   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null],
	[   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null],
	[   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null], 
	[   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null],
	[   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null],  
	[   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null],
	[   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,   null,   null,   null,   null,{f:"s"},   null,   null,{f:"s"},   null,   null,   null,   null,{f:"s"},   null],
	[   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null],
	[   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null]
	]],
	/**
	 * retrieve grid value
	 * @param int, int, int
	 *
	 * layer  :
	 * row    : 
	 * column :
	 *
	 * returns obj {}
	 */  
	getGrid(layer, row, column) {
		return this.maze[layer][row][column];
	} 

};