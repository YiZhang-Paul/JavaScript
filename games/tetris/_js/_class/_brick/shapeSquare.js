/* jslint esversion: 6 */
/**
 * square brick class
 * @param String, String
 *
 * color       : color of brick
 * orientation : orientation of brick
 */
class Square extends Brick {
	constructor(color, orientation) {
		super(color, orientation);
		//brick patterns
		this.up    = [[0, 1, 1, 0],
		           		[0, 1, 1, 0],
		          		[0, 0, 0, 0],
		           		[0, 0, 0, 0]];
		this.down  = this.up; 
		this.left  = this.up;
		this.right = this.up;
		//icons
		this.upIcon    = [[0, 0, 0, 0],
		           				[0, 1, 1, 0],
		          				[0, 1, 1, 0],
		           				[0, 0, 0, 0]];
		this.downIcon  = this.upIcon; 
		this.leftIcon  = this.upIcon;
		this.rightIcon = this.upIcon;
		this.initialize();
	}
} 