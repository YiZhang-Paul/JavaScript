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
	/**
	 * key code of last key pressed
	 */
	get activeKey() {

		if(!this.keyPressed.length) {

			return null;
		}

		return utility.getLast(this.keyPressed);
	},

	isPressed(keyCode) {

		return this.keyPressed.includes(keyCode);
	},

	push(keyCode) {

		if(!this.isPressed(keyCode)) {

			this.keyPressed.push(keyCode);
		}
	},

	remove(keyCode) {

		if(this.isPressed(keyCode)) {

			const index = this.keyPressed.indexOf(keyCode);
			this.keyPressed.splice(index, 1);
		}
	}
};