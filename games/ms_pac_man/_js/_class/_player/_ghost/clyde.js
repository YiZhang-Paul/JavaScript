/* jslint esversion: 6 */
class Clyde extends AI {

	constructor(owner) {

		super(owner);
		this.name = "clyde";
		this.defaultState = "inShelter";
		this.reset();
	}

	inShelterDirection() {

		if(this.owner.shelter.size > 1 || this.owner.onCooldown()) {

			this.turnAround();
		} 
		else {
			
			this.moveOutShelter();
		}
	}
}