/* jslint esversion: 6 */
class Inky extends AI {

	constructor(owner) {

		super(owner);
		this.name = "inky";
		this.defaultState = "inShelter";
		this.reset();
	}

	inShelterDirection() {

		if(this.owner.shelter.has(this.owner.blinky) ||
		   this.owner.shelter.has(this.owner.pinky) ||
		   this.owner.onCooldown()) {

			this.turnAround();
		} 
		else {
			
			this.moveOutShelter();
		}
	} 
}