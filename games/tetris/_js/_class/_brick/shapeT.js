/* jslint esversion: 6 */
/**
 * T-shape brick class 
 * @param String
 *
 * color : color of brick
 */
class TBrick extends Brick {
	constructor(color) {
		super(color);
		//brick patterns
		this.up    = [[0, 1, 0, 0],
		           		[1, 1, 1, 0],
		          		[0, 0, 0, 0],
		           		[0, 0, 0, 0]];
		this.down  = [[0, 0, 0, 0],
				          [1, 1, 1, 0],
				          [0, 1, 0, 0],
				          [0, 0, 0, 0]]; 
		this.left  = [[0, 1, 0, 0],
				          [1, 1, 0, 0],
				          [0, 1, 0, 0],
				          [0, 0, 0, 0]];
		this.right = [[0, 1, 0, 0],
			           	[0, 1, 1, 0],
			           	[0, 1, 0, 0],
			           	[0, 0, 0, 0]];
		//current pattern
		this.grids = this[this.orientation];
		//find spawn point
		this.spawnGrid = this.getSpawnGrid();
		this.curGrid = this.spawnGrid;
	}
} 