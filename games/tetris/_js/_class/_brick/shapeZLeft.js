/* jslint esversion: 6 */
/**
 * left facing Z-shape brick class 
 * @param String
 *
 * color : color of brick
 */
class ZLeft extends Brick {
	constructor(color) {
		super(color);
		//brick patterns
		this.up    = [[0, 0, 1, 0],
		           		[0, 1, 1, 0],
		          		[0, 1, 0, 0],
		           		[0, 0, 0, 0]];
		this.down  = this.up; 
		this.left  = [[0, 0, 0, 0],
				          [1, 1, 0, 0],
				          [0, 1, 1, 0],
				          [0, 0, 0, 0]];
		this.right = this.left;
		//current pattern
		this.grids = this[this.orientation];
		//find spawn point
		this.spawnGrid = this.getSpawnGrid();
		this.curGrid = this.spawnGrid;
	}
} 