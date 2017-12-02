/* jslint esversion: 6 */
class StateMachine {

	constructor(owner, defaultState) {

		this.owner = owner;
		this.tracker = [];
		this.defaultState = defaultState;
		this.reset();
	}

	reset() {

		this.tracker = this.defaultState ? [this.defaultState] : this.tracker;
	}

	activeState() {

		return this.tracker.length ? this.tracker[this.tracker.length - 1] : null;
	}

	pushState(state) {

		if(this.activeState() != state) {

			this.tracker.push(state);
		}
	}

	popState() {

		return this.tracker.pop();
	} 
	
	swapState(state) {

		this.popState();
		this.pushState(state);
	}
	
	update(timeStep) {

		if(this.activeState()) {
			//execute corresponding function for current state
			this.owner[this.activeState()](timeStep);
		}
	}
}