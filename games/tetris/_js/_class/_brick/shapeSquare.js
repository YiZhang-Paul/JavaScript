/* jslint esversion: 6 */
/**
 * square brick class
 * @param String
 *
 * color : color of brick
 */
class Square extends Brick {
	constructor(color) {
		super(color);
		//brick patterns
		this.up    = [[0, 1, 1, 0],
		           		[0, 1, 1, 0],
		          		[0, 0, 0, 0],
		           		[0, 0, 0, 0]];
		this.down  = this.up; 
		this.left  = this.up;
		this.right = this.up;
		this.initialize();
	}
} 