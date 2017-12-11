/* jslint esversion: 6 */
class Blinky extends AI {

	constructor(manager) {

		super("blinky", manager);
		this.defaultState = "chasing";
		this.reset();
	}

	setInShelterDirection() {

		if(this.manager.onCooldown()) {

			this.turnAround();
		}
		else {

			super.setInShelterDirection();
		}
	}

	getChaseDestination() {

		return new Node(game.manager.user.row, game.manager.user.column);
	}
}