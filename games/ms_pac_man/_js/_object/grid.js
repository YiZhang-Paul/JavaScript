/* jslint esversion: 6 */
/**
 * grid object
 * contains maze information
 */
let grid = {
	row      : 31, //total number of rows 
	column   : 28, //total number of columns
	door     : {
		spawnRow : 13, //spawning row
		spawnCol : [14, 15], //spawning column
	},
	user     : {
		spawnRow : 24, //spawning row
		spawnCol : 14, //spawning column
		direction : "right"
	},
	blinky   : {
		spawnRow  : 12, //spawning row
		spawnCol  : 14, //spawning column
		direction : "left"
	},
	pinky    : {
		spawnRow  : 15, //spawning row
		spawnCol  : 14, //spawning column
		direction : "down"
	},
	inky     : {
		spawnRow  : 15, //spawning row
		spawnCol  : 12, //spawning column
		direction : "up"
	},
	clyde    : {
		spawnRow  : 15, //spawning row
		spawnCol  : 16, //spawning column
		direction : "right"
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
	[{w:"w"},{f:"l"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"l"},{w:"w"}],
	[{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"}], 
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[   null,   null,   null,{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},   null,   null,   null],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}], 
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null],
	[   null,   null,{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},   null,   null],
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{d:"d"},{d:"d"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null],
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null,   null,   null,   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null],
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},   null,   null,   null,   null,   null,   null,{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null], 
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null,   null,   null,   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[   null,   null,   null,{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},   null,   null,   null],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null], 
	[   null,   null,{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},   null,   null],
	[   null,   null,{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},   null,   null],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"}],
	[{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}], 
	[{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
	[{w:"w"},{f:"l"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"l"},{w:"w"}],  
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