/* jslint esversion: 6 */
let gameGrid = {

	rows    : 31, 
	columns : 28,
	/**
	 * game object default locations
	 */
	door : {

		row    : 13,
		column : [14, 15],
	},

	user : {

		row       : 23,
		column    : 14,
		direction : "right"
	},

	blinky : {

		row       : 11,
		column    : 14,
		direction : "left"
	},

	pinky : {

		row       : 14,
		column    : 14,
		direction : "down"
	},

	inky : {

		row       : 14,
		column    : 12,
		direction : "up"
	},

	sue : {

		row  	  : 14,
		column    : 16,
		direction : "up"
	},

	layout : [[
	//logic layer
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
	//meta layer
	[{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"}],
	[{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"}],
	[{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
	[{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"}],
	[{w:"w"},{f:"l"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"l"},{w:"w"}], 
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[{b:"p"},{b:"p"},{b:"p"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{b:"p"},{b:"p"},{b:"p"}],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}], 
	[{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
	[{b:"b"},{b:"b"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
	[{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{d:"d"},{d:"d"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
	[{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{b:"b"},{b:"b"},{b:"s"},{b:"s"},{b:"b"},{b:"b"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
	[{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{b:"p"},{b:"p"},{b:"p"},{w:"w"},{c:"b"},{c:"b"},{c:"b"},{c:"b"},{c:"b"},{c:"b"},{w:"w"},{b:"p"},{b:"p"},{b:"p"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}], 
	[{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{b:"b"},{b:"b"},{b:"b"},{b:"b"},{b:"b"},{b:"b"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[{b:"p"},{b:"p"},{b:"p"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{b:"p"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{b:"p"},{b:"p"},{b:"p"}],
	[{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"}],
	[{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{b:"p"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}], 
	[{b:"b"},{b:"b"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{w:"w"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
	[{b:"b"},{b:"b"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{w:"w"},{f:"s"},{w:"w"},{b:"b"},{b:"b"}],
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
	 * check if given grid exists
	 */
	exist(row, column) {

		if(this.layout[0][row] === undefined) {

			return false;
		}

		return this.layout[0][row][column] !== undefined;
	},

	getGrid(layer, row, column) {

		if(!this.exist(row, column)) {

			return null;
		}

		return this.layout[layer][row][column];
	},

	setGrid(layer, row, column, content) {

		if(this.exist(row, column)) {

			this.layout[layer][row][column] = content;
		}
	}
};