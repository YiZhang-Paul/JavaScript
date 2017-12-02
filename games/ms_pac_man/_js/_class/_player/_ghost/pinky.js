/* jslint esversion: 6 */
class Pinky extends AI {

	constructor(owner) {
	
		super(owner);
		this.name = "pinky";
		this.defaultState = "inShelter";
		this.reset();
	}

	inShelterDirection() {

		if(this.owner.shelter.has(this.owner.blinky) || this.owner.onCooldown()) {

			this.turnAround();
		} 
		else {

			this.moveOutShelter();
		}
	} 
}