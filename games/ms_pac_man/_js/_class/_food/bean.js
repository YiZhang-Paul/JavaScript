/* jslint esversion: 6 */
class Bean extends Food {

	constructor(row, column) {

		super(row, column);
		this.score = 10;
		this.radius = game.gridWidth * 0.2;
	}
}