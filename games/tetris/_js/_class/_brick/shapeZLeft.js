/* jslint esversion: 6 */
/**
 * left facing Z-shape brick class 
 * @param String, String
 *
 * color       : color of brick
 * orientation : orientation of brick
 */
class ZLeft extends Brick {
	constructor(color, orientation) {
		super(color, orientation);
		//brick patterns
		this.up    = [[0, 0, 1, 0],
		           		[0, 1, 1, 0],
		          		[0, 1, 0, 0],
		           		[0, 0, 0, 0]];
		this.left  = [[0, 0, 0, 0],
				          [1, 1, 0, 0],
				          [0, 1, 1, 0],
				          [0, 0, 0, 0]];
		this.down  = this.up; 
		this.right = this.left;
		this.initialize();
	}
} 