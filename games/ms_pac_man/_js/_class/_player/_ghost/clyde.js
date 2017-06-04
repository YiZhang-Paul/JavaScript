/* jslint esversion: 6 */
/**
 * clyde class
 * @param obj {}
 *
 * owner : manager of AI
 */
class Clyde extends AI {
	constructor(owner) {
		super(owner);
		this.name = "clyde";
		this.state = new StateMachine(this, "inCell");
		//initialize/reset AI
		super.reset();
	}
}