/* jslint esversion: 6 */
class Pinky extends AI {

	constructor(manager) {
	
		super("pinky", manager);
		this.defaultState = "inShelter";
		this.reset();
	}

	setInShelterDirection() {

		if(this.manager.shelter.has(this.manager.blinky) || this.manager.onCooldown()) {

			this.turnAround();
		} 
		else {

			super.setInShelterDirection();
		}
	}

	getChaseDestination() {
		//two grids ahead of user
		let gridAhead = this.getGridAheadOfUser(game.manager.user.direction);

		if(gridAhead) {

			return gridAhead;
		}
		//find other alternative grids of same distance to user
		let otherGrids = game.directions.map(direction => this.getGridAheadOfUser(direction))
		                                .filter(grid => grid !== null);
		
		return otherGrids.length ? this.pickRandom(otherGrids) : this.getRandomDestination();
	}
}