/* jslint esversion: 6 */
/**
 * I-shape brick class 
 * @param String
 *
 * color : color of brick
 */
class IBrick extends Brick {
	constructor(color) {
		super(color);
		//brick patterns
		this.up    = [[0, 1, 0, 0],
		           		[0, 1, 0, 0],
		          		[0, 1, 0, 0],
		           		[0, 1, 0, 0]];
		this.down  = this.up; 
		this.left  = [[0, 0, 0, 0],
				          [1, 1, 1, 1],
				          [0, 0, 0, 0],
				          [0, 0, 0, 0]];
		this.right = this.left;
		this.initialize();
	}
} 