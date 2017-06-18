/* jslint esversion: 6 */
/**
 * sound class
 * @param obj {}, obj {}
 *
 * tracks : music sound tracks
 * clips  : sound clips 
 */
class Sound {
	constructor(tracks, clips) {
		this.tracks = tracks;
		this.clips = clips;
		this.cleared = false;
		this.timeoutHandler = null;
	}
	/**
	 * play sound
	 * @param String, String, obj {}, float, boolean
	 *
	 * type  : type of sound
	 * src   : source URL of sound file
	 * dom   : dom element 
	 * start : start time of sound file
	 * loop  : loop sound file
	 */
	playSound(type, src, dom, start, loop) {
		this.cleared = false;
		if(dom.src.search(src) == -1) {
			dom.src = src;
			dom.volume = type == "track" ? 0.15 : 1;
			dom.currentTime = start || 0;
			dom.loop = loop;
		}
		dom.play();
		dom.currentTime = start || 0;
	} 
	/**
	 * clear sound
	 * @param String, obj {}, float
	 *
	 * src   : source URL of sound file 
	 * dom   : dom element
	 * start : start time of sound file
	 */
	clearSound(src, dom, start) {
		if(!this.timeoutHandler && !this.cleared && dom.src.search(src) != -1) {
			this.timeoutHandler = setTimeout(() => {
				dom.currentTime = start || 0;
				dom.pause();
				this.cleared = true;
				clearTimeout(this.timeoutHandler);
				this.timeoutHandler = null;
			}, 300);
		}
	} 
} 