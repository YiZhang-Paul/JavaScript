/* jslint esversion: 6 */
/**
 * game controls
 */
let control = {
	"moveKey" : [],
  "rotateKey" : [],	
  "keyHeld" : new Map(),
  "keyTapped" : new Map(),
  "keyPressed" : new Set(),
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
		if(!this.isDown(keyCode, keySet)) {
			keySet.push(keyCode);
		}
		//always record key pressed
		if(!this.keyPressed.has(keyCode)) {
			this.keyPressed.add(keyCode);
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
		if(this.isDown(keyCode, keySet)) {
			keySet.splice(keySet.indexOf(keyCode), 1);
		}
		//alway remove key released
		if(this.keyPressed.has(keyCode)) {
			this.keyPressed.delete(keyCode);
		}
	},  
	/**
	 * record control key press time
	 * @param int
	 *
	 * keyCode : key code to be checked
	 */
	recordKeyHeld(keyCode) {
		if(!this.keyHeld.has(keyCode)) {
			this.keyHeld.set(keyCode, new Date().getTime());
		}
	}, 
	/**
	 * remove control key press time
	 * @param int
	 *
	 * keyCode : key code to be checked
	 */
	removeKeyHeld(keyCode) {
		if(this.keyHeld.has(keyCode)) {
			this.keyHeld.delete(keyCode);
		}
	},
	/**
	 * record control key tapped time
	 * @param int
	 *
	 * keyCode : key code to be checked
	 */
	recordKeyTap(keyCode) {
		this.keyTapped.set(keyCode, new Date().getTime());
	}, 
	/**
	 * 
	 */
	/**
	 * check key press
	 * @param int, array []
	 *
	 * keyCode : key code of key being checked
	 * control : control key set to be checked
	 *
	 * returns non-zero number on key press
	 */
	isDown(keyCode, control = this.keyPressed) {
		return control.indexOf(keyCode) + 1;
	}, 
	/**
	 * check key held
	 * @param int, int
	 *
	 * keyCode   : key code to be checked
	 * threshold : key hold threshold (ms)
	 */
  isHeld(keyCode, threshold = 400) {
  	if(this.keyHeld.has(keyCode)) {
  		let pressTime = new Date().getTime() - this.keyHeld.get(keyCode);
  		return pressTime >= threshold;
  	}
  	return false;
  },
  /**
   * check key tap
   * @param int, int
   *
   * keyCode   : key code to be checked
   * threshold : key tap threshold (ms)
   */
  isTapped(keyCode, threshold = 100) {
  	if(this.keyPressed.has(keyCode)) {
  		let tapTime = new Date().getTime() - this.keyTapped.get(keyCode);
  		return tapTime <= threshold;
  	}
  	return false;
  } 
}; 