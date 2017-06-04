/* jslint esversion: 6 */
/**
 * inky class
 * @param obj {}
 *
 * owner : manager of AI
 */
class Inky extends AI {
	constructor(owner) {
		super(owner);
		this.name = "inky";
		this.state = new StateMachine(this, "inCell");
		//initialize/reset AI
		super.reset();
	}
}