/* jslint esversion: 6 */
class Inky extends AI {

	constructor(manager) {

		super("inky", manager);
		this.defaultState = "inShelter";
		this.reset();
	}

	setDirectionInShelter() {

		if(this.manager.shelter.has(this.manager.blinky) ||
		   this.manager.shelter.has(this.manager.pinky) ||
		   this.manager.onCooldown()) {

			this.turnAround();
		} 
		else {
			
			super.setDirectionInShelter();
		}
	} 
}