/* jslint esversion: 6 */
let control = {

	"keyPressed" : [],
	"keyReleased" : null,
	/**
	 * control keys
	 */
	//move up
	"W" : 87,
	"UP" : 38,
	//move down
	"S" : 83,
	"DOWN" : 40,
	//move left
	"A" : 65,
	"LEFT" : 37,
	//move right
	"D" : 68,
	"RIGHT" : 39,
	//pause key
	"SPACE" : 32,
	
	isPressed(keyCode) {

		return this.keyPressed.includes(keyCode);
	},

	getActiveKey() {

		return this.keyPressed.length ? this.keyPressed[this.keyPressed.length - 1] : null;
	}
}; 