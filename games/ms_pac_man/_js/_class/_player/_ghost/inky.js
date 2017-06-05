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
		this.reset();
	}
	/**
	 * change moving direction inside of cell
	 */
	inCellDir() {
		if(this.owner.cell.has(this.owner.blinky) ||
			 this.owner.cell.has(this.owner.pinky) ||
			 this.owner.onCooldown()) {
			this.turnAround();
		} else {
			this.moveOutCell();
		}
	} 
}