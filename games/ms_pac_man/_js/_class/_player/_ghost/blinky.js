/* jslint esversion: 6 */
class Blinky extends AI {

	constructor(manager) {

		super("blinky", manager);
		this.defaultState = "outShelter";
		this.reset();
	}
}