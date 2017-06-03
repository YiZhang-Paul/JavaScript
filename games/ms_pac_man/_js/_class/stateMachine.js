/* jslint esversion: 6 */
/**
 * finite state machine class
 * @param obj {}, String
 *
 * owner     : owner of the state machine
 * initState : initial state 
 */
class StateMachine {
	constructor(owner, initState) {
		this.owner = owner;
		this.tracker = [];
		this.initState = initState;
		if(initState) this.pushState(initState); 
	}
	/**
	 * reset state machine
	 */
	reset() {
		this.tracker = this.initState ? [this.initState] : [];
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
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		let activeState = this.activeState();
		if(activeState) this.owner[activeState](timeStep); 
	} 
} 