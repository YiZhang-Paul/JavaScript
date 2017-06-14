/* jslint esversion: 6 */
/**
 * right facing L-shape brick class 
 * @param String
 *
 * color : color of brick
 */
class LRight extends Brick {
	constructor(color) {
		super(color);
		//brick patterns
		this.up    = [[0, 1, 0, 0],
		           		[0, 1, 0, 0],
		          		[0, 1, 1, 0],
		           		[0, 0, 0, 0]];
		this.down  = [[1, 1, 0, 0],
				          [0, 1, 0, 0],
				          [0, 1, 0, 0],
				          [0, 0, 0, 0]]; 
		this.left  = [[0, 0, 1, 0],
				          [1, 1, 1, 0],
				          [0, 0, 0, 0],
				          [0, 0, 0, 0]];
		this.right = [[0, 0, 0, 0],
			           	[1, 1, 1, 0],
			           	[1, 0, 0, 0],
			           	[0, 0, 0, 0]];
		//current pattern
		this.grids = this[this.orientation];
		//find spawn point
		this.spawnGrid = this.getSpawnGrid();
		this.curGrid = this.spawnGrid;
	}
} 