/* jslint esversion: 6 */
class Bean extends Food {

	constructor(row, column) {

		super(row, column);
		this.score = 10;
		this.color = "red";
		this.radius = game.maze.gridWidth * 0.2;
		this.draw();
	}
}