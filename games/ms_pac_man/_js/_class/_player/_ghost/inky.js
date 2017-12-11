/* jslint esversion: 6 */
class Inky extends AI {

	constructor(manager) {

		super("inky", manager);
		this.defaultState = "inShelter";
		this.reset();
	}

	setInShelterDirection() {

		if(this.manager.shelter.has(this.manager.blinky) ||
		   this.manager.shelter.has(this.manager.pinky) ||
		   this.manager.onCooldown()) {

			this.turnAround();
		} 
		else {
			
			super.setInShelterDirection();
		}
	}

	getChaseDestination() {

		let gridAhead;
		//extend search range to find grid ahead of user
		for(let i = 2; i <= 5; i++) {

			gridAhead = this.getGridAheadOfUser(game.manager.user.direction, i);

			if(gridAhead) {

				break;
			}
		}

		if(!gridAhead) {

			return this.getRandomDestination();
		}
		//calculate destination taking consideration of Blinky's location
		let blinky = game.manager.aiManager.blinky;
		const newRow = gridAhead.row + (gridAhead.row - blinky.row);
		const newColumn = gridAhead.column + (gridAhead.column - blinky.column);

		return gameGrid.isAccessible(newRow, newColumn) ? new Node(newRow, newColumn) : this.getRandomDestination();
	}
}