/* jslint esversion: 6 */
class Inky extends AI {

	constructor(manager) {

		super("inky", manager);
		this.defaultState = "inShelter";
		this.reset();
	}

	setInShelterDirection() {

		if(this.manager.shelter.has(this.manager.blinky) ||
		   this.manager.shelter.has(this.manager.pinky) ||
		   this.manager.onCooldown()) {

			this.turnAround();
		} 
		else {
			
			super.setInShelterDirection();
		}
	}

	getChaseDestination() {

		return new Node(1, 1);
	}
}