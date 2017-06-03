/* jslint esversion: 6 */
/**
 * finite state machine class
 * @param obj {}
 *
 * owner : owner of the state machine
 */
class StateMachine {
	constructor(owner) {
		this.owner = owner;
		this.tracker = [];
	}
	/**
	 * return active state
	 *
	 * returns String
	 */
	activeState() {
		let length = this.tracker.length;
		return length ? this.tracker[length - 1] : null;
	} 
	/**
	 * push state
	 * @param String
	 *
	 * state : new state
	 */
	pushState(state) {
		if(this.activeState() != state) {
			this.tracker.push(state);
		}
	} 
	/**
	 * pop state
	 */
	popState() {
		this.tracker.pop();
	} 
	/**
	 * swap current active state
	 * @param String
	 *
	 * state : new state to replace current active state
	 */
	swapState(state) {
		if(this.tracker.length) {
			this.popState();	
		}
		this.pushState(state); 
	} 
	/**
	 * update current active state
	 */
	update() {
		let activeState = this.activeState();
		if(activeState) this.owner[activeState](); 
	} 
} 