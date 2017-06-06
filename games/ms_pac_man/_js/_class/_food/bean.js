/* jslint esversion: 6 */
/**
 * bean class
 * @param int, int
 *
 * row    : row of food cell
 * column : column of food cell
 */
class Bean extends Food {
	constructor(row, column) {
		super(row, column);
		this.score = 10;
		this.color = "red";
		this.radius = game.maze.gridWidth * 0.2;
		//draw bean
		this.draw();
	}
} 