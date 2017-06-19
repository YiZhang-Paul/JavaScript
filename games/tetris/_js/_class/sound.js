/* jslint esversion: 6 */
/**
 * sound class
 */
class Sound {
	constructor() {
		this.allSounds = new Map();
	}
	/**
	 * play sound
	 * @param obj {}, float, float, boolean
	 *
	 * dom    : dom element 
	 * start  : start time of sound file
	 * volume : volumn of sound
	 * loop   : loop sound file
	 */
	playSound(dom, start = 0, volume = 0.5, loop = false) {
		//record sound
		if(!this.allSounds.has(dom)) {
			this.allSounds.set(dom, true);
			dom.addEventListener("ended", () => {
				this.clearSound(dom, start);
			});
		}
		//play sound
		if(this.allSounds.get(dom)) {
			this.allSounds.set(dom, false);
			dom.currentTime = start;
			dom.volume = volume;
			dom.loop = loop;
			dom.play();
		}
	} 
	/**
	 * clear sound
	 * @param obj {}, float
	 *
	 * dom   : dom element
	 * start : start time of sound file
	 */
	clearSound(dom, start = 0) {
		if(!this.allSounds.get(dom)) {
			dom.currentTime = start;
			dom.pause();
			this.allSounds.set(dom, true);
		}
	} 
	/**
	 * clear all sound
	 */
	clearAllSound() {
		let sounds = document.getElementsByTagName("audio");
		[].forEach.call(sounds, sound => {
			this.clearSound(sound);
		});
	} 
} 