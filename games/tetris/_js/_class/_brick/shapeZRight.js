/* jslint esversion: 6 */
/**
 * right facing Z-shape brick class 
 * @param String, String
 *
 * color       : color of brick
 * orientation : orientation of brick
 */
class ZRight extends Brick {
	constructor(color, orientation) {
		super(color, orientation);
		//brick patterns
		this.up    = [[0, 1, 0, 0],
		           		[0, 1, 1, 0],
		          		[0, 0, 1, 0],
		           		[0, 0, 0, 0]];
		this.left  = [[0, 0, 0, 0],
				          [0, 1, 1, 0],
				          [1, 1, 0, 0],
				          [0, 0, 0, 0]];
		this.down  = this.up; 
		this.right = this.left;
		//icons
		this.upIcon    = [[0, 0, 0, 0, 0],
											[0, 0, 1, 0, 0],
				           		[0, 0, 1, 1, 0],
				          		[0, 0, 0, 1, 0],
				           		[0, 0, 0, 0, 0]];
		this.leftIcon  = [[0, 0, 0, 0, 0],
						          [0, 0, 1, 1, 0],
						          [0, 1, 1, 0, 0],
						          [0, 0, 0, 0, 0]];
		this.downIcon  = this.upIcon; 
		this.rightIcon = this.leftIcon;
		this.initialize();
	}
} 