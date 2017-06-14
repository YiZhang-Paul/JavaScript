/* jslint esversion: 6 */
/**
 * left facing L-shape brick class 
 * @param String
 *
 * color : color of brick
 */
class LLeft extends Brick {
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
		this.initialize();
	}
} 