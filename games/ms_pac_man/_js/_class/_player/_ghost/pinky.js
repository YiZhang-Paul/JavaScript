/* jslint esversion: 6 */
class Pinky extends AI {

	constructor(manager) {
	
		super("pinky", manager);
		this.defaultState = "inShelter";
		this.reset();
	}

	setInShelterDirection() {

		if(this.manager.shelter.has(this.manager.blinky) || this.manager.onCooldown()) {

			this.turnAround();
		} 
		else {

			super.setInShelterDirection();
		}
	} 
}