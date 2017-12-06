/* jslint esversion: 6 */
class Sue extends AI {

	constructor(manager) {

		super("sue", manager);
		this.defaultState = "inShelter";
		this.reset();
	}

	setInShelterDirection() {

		if(this.manager.shelter.size > 1 || this.manager.onCooldown()) {

			this.turnAround();
		} 
		else {
			
			super.setInShelterDirection();
		}
	}
}