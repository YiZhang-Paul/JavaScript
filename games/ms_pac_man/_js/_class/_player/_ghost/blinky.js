/* jslint esversion: 6 */
class Blinky extends AI {

	constructor(owner) {

		super(owner);
		this.name = "blinky";
		this.defaultState = "outShelter";
		this.reset();
	}

	inCellDir() {
		
		this.moveOutShelter();
	} 
}