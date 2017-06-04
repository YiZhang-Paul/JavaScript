/* jslint esversion: 6 */
/**
 * pinky class
 * @param obj {}
 *
 * owner : manager of AI
 */
class Pinky extends AI {
	constructor(owner) {
		super(owner);
		this.name = "pinky";
		this.state = new StateMachine(this, "inCell");
		//initialize/reset AI
		super.reset();
	}
}