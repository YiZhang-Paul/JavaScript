/* jslint esversion: 6 */
/**
 * game controls
 */
let control = {
	"keyPressed" : [],
	"keyReleased" : null,
	/**
	 * control keys
	 */
	//rotate clockwise
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
	/**
	 * check key press
	 * @param int
	 *
	 * keyCode : key code of key being checked
	 *
	 * returns non-zero number on key press
	 */
	isDown(keyCode) {
		return this.keyPressed.indexOf(keyCode) + 1;
	} 
}; 