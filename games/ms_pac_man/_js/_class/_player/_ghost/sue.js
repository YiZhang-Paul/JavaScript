/* jslint esversion: 6 */
class Sue extends AI {

	constructor(manager) {

		super("sue", manager);
		this.defaultState = "inShelter";
		this.ignored = false;
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

	getChaseDestination() {

		if(this.distanceToPlayer(game.manager.user) < game.gridWidth * 8) {
			//ignore user when getting too close
			if(!this.ignored && this.movePath) {

				this.movePath = null;
				this.ignored = true;
			}

			return this.getRandomDestination();
		}

		this.ignored = false;

		return new Node(game.manager.user.row, game.manager.user.column);
	}
}