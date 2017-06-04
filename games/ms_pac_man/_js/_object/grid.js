/* jslint esversion: 6 */
/**
 * grid object
 * contains maze information
 */
let grid = {
	row      : 31, //total number of rows 
	column   : 28, //total number of columns
	user     : {
		spawnRow : 24, //spawning row
		spawnCol : 14, //spawning column
	},
	blinky   : {
		spawnRow : 24, //spawning row
		spawnCol : 14, //spawning column
	},
	pinky    : {
		spawnRow : 24, //spawning row
		spawnCol : 14, //spawning column
	},
	inky     : {
		spawnRow : 24, //spawning row
		spawnCol : 14, //spawning column
	},
	clyde    : {
		spawnRow : 24, //spawning row
		spawnCol : 14, //spawning column
	},
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
	[{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"}],
	[{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"}],
	[{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
	[{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
	[{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"}], 
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"}],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}], 
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null],
	[   null,   null,{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},   null,   null],
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},   null,   null,{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null],
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null,   null,   null,   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null],
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},   null,   null,   null,   null,   null,   null,{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null], 
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null,   null,   null,   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"}],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null], 
	[   null,   null,{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},   null,   null],
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"}],
	[{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}], 
	[{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
	[{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],  
	[{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
	[{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
	[{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"}],
	[{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"}]
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