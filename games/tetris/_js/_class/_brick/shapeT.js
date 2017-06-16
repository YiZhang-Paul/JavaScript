/* jslint esversion: 6 */
/**
 * T-shape brick class 
 * @param String, String
 *
 * color       : color of brick
 * orientation : orientation of brick
 */
class TBrick extends Brick {
	constructor(color, orientation) {
		super(color, orientation);
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
		//icons 
		this.upIcon    = [[0, 0, 0, 0, 0],
		                  [0, 0, 1, 0, 0],
				           		[0, 1, 1, 1, 0],
				          		[0, 0, 0, 0, 0]];
		this.downIcon  = [[0, 0, 0, 0, 0],
						          [0, 1, 1, 1, 0],
						          [0, 0, 1, 0, 0],
						          [0, 0, 0, 0, 0]]; 
		this.leftIcon  = [[0, 0, 0, 0, 0],
		 									[0, 0, 1, 0, 0],
						          [0, 1, 1, 0, 0],
						          [0, 0, 1, 0, 0],
						          [0, 0, 0, 0, 0]];
		this.rightIcon = [[0, 0, 0, 0, 0],
											[0, 0, 1, 0, 0],
					           	[0, 0, 1, 1, 0],
					           	[0, 0, 1, 0, 0],
					           	[0, 0, 0, 0, 0]];			           	
		this.initialize();
	}
} 