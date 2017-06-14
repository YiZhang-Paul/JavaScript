/* jslint esversion: 6 */
/**
 * L-shape brick class facing left
 * @param String
 *
 * color : color of brick
 */
class LBrickLeft extends Brick {
	constructor(color) {
		super(color);
		//brick patterns
		this.up    = [[0, 1, 0, 0],
		           		[0, 1, 0, 0],
		          		[1, 1, 0, 0],
		           		[0, 0, 0, 0]];
		this.down  = [[0, 1, 1, 0],
				          [0, 1, 0, 0],
				          [0, 1, 0, 0],
				          [0, 0, 0, 0]]; 
		this.left  = [[0, 0, 0, 0],
				          [1, 1, 1, 0],
				          [0, 0, 1, 0],
				          [0, 0, 0, 0]];
		this.right = [[1, 0, 0, 0],
			           	[1, 1, 1, 0],
			           	[0, 0, 0, 0],
			           	[0, 0, 0, 0]];
		//current pattern
		this.grids = this[this.orientation];
		//find spawn point
		this.spawnGrid = this.getSpawnGrid();
		this.curGrid = this.spawnGrid;
		this.tile = document.getElementById(this.color);
	}
} 