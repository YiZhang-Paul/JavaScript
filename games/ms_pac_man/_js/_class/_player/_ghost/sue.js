/* jslint esversion: 6 */
class Sue extends AI {

	constructor(manager) {

		super("sue", manager);
		this.defaultState = "inShelter";
		this.reset();
	}

	setDirectionInShelter() {

		if(this.manager.shelter.size > 1 || this.manager.onCooldown()) {

			this.turnAround();
		} 
		else {
			
			super.setDirectionInShelter();
		}
	}
}