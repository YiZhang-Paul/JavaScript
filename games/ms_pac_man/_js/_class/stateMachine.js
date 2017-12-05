/* jslint esversion: 6 */
class StateMachine {

	constructor(originator, defaultState) {

		this.originator = originator;
		this.defaultState = defaultState;
		this.states = defaultState ? [defaultState] : [];
	}

	reset() {

		this.states = this.defaultState ? [this.defaultState] : [];
	}
	/**
	 * retrieve current active state
	 */
	peek() {

		if(!this.states.length) {

			return null;
		}

		return this.states[this.states.length - 1];
	}

	push(state) {

		if(this.peek() !== state) {

			this.states.push(state);
		}
	}

	pop() {

		return this.states.pop();
	}
	/**
	 * change current active state
	 */
	swap(state) {

		this.pop();
		this.push(state);
	}

	update(timeStep) {

		if(this.peek()) {
			//execute corresponding method for current state
			this.originator[this.peek()](timeStep);
		}
	}
}