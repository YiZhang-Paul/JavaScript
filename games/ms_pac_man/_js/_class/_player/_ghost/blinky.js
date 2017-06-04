/* jslint esversion: 6 */
/**
 * blinky class
 * @param obj {}
 *
 * owner : manager of AI
 */
class Blinky extends AI {
	constructor(owner) {
		super(owner);
		this.name = "blinky";
		this.state = new StateMachine(this, "outCell");
		//initialize/reset AI
		super.reset();
	}
	/**
	 * change moving direction inside of cell
	 */
	inCellDir() {
		if(this.owner.onCooldown()) {
			this.turnAround();
		} else {
			this.moveOutCell();
		}
	} 
}