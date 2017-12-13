/* jslint esversion: 6 */
class State {

	constructor(originator, defaultState) {

		this.originator = originator;
		this.defaultState = defaultState;
		this.states = defaultState ? [defaultState] : [];
	}
	/**
	 * current active state
	 */
	get activeState() {

		return this.peek();
	}
	/**
	 * change current active state
	 */
	set activeState(state) {

		this.pop();
		this.push(state);
	}

	reset() {

		this.states = this.defaultState ? [this.defaultState] : [];
	}

	peek() {

		if(!this.states.length) {

			return null;
		}

		return this.states.slice(-1)[0];
	}

	push(state) {

		if(this.activeState !== state) {

			this.states.push(state);
		}
	}

	pop() {

		return this.states.pop();
	}

	update(timeStep) {

		if(this.activeState) {
			//execute corresponding method for current state
			this.originator[this.activeState](timeStep);
		}
	}
}