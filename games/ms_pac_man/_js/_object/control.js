/* jslint esversion: 6 */
let control = {

	keyPressed : [],
	/**
	 * control keys
	 */
	//move up
	W     : 87,
	UP    : 38,
	//move down
	S     : 83,
	DOWN  : 40,
	//move left
	A     : 65,
	LEFT  : 37,
	//move right
	D     : 68,
	RIGHT : 39,

	isPressed(keyCode) {

		return this.keyPressed.includes(keyCode);
	},
	/**
	 * retrieve key code of last key pressed
	 */
	getActiveKey() {

		if(!this.keyPressed.length) {

			return null;
		}

		return this.keyPressed[this.keyPressed.length - 1]; 
	}
};