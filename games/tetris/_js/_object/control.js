/* jslint esversion: 6 */
/**
 * game controls
 */
let control = {
	"moveKey" : [],
  "rotateKey" : [],	
  "keyPressed" : new Map(),
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
	 * record control key
	 * @param array [], int
	 *
	 * keySet  : control key set
	 * keyCode : control key code
	 */
	recordKey(keySet, keyCode) {
		if(!this.isDown(keySet, keyCode)) {
			keySet.push(keyCode);
		}
	}, 
	/**
	 * remove control key
	 * @param array [], int
	 *
	 * keySet  : control key set
	 * keyCode : control key code
	 */
	removeKey(keySet, keyCode) {
		if(this.isDown(keySet, keyCode)) {
			keySet.splice(keySet.indexOf(keyCode), 1);
		}
	},  
	/**
	 * record control key press time
	 * @param int
	 *
	 * keyCode : key code to be checked
	 */
	recordKeyTime(keyCode) {
		if(!this.keyPressed.has(keyCode)) {
			this.keyPressed.set(keyCode, new Date().getTime());
		}
	}, 
	/**
	 * remove control key press time
	 * @param int
	 *
	 * keyCode : key code to be checked
	 */
	removeKeyTime(keyCode) {
		if(this.keyPressed.has(keyCode)) {
			this.keyPressed.delete(keyCode);
		}
	},
	/**
	 * check key press
	 * @param array [], int
	 *
	 * control : control key set to be checked
	 * keyCode : key code of key being checked
	 *
	 * returns non-zero number on key press
	 */
	isDown(control, keyCode) {
		return control.indexOf(keyCode) + 1;
	}, 
	/**
	 * check key held
	 * @param int, int
	 *
	 * keyCode   : key code to be checked
	 * threshold : key hold threshold (ms)
	 */
  isHeld(keyCode, threshold = 3000) {
  	if(this.keyPressed.has(keyCode)) {
  		let pressTime = new Date().getTime() - this.keyPressed.get(keyCode);
  		return pressTime >= threshold;
  	}
  	return false;
  }
}; 