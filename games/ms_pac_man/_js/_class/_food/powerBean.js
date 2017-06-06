/* jslint esversion: 6 */
/**
 * power bean class
 * @param int, int
 *
 * row    : row of food cell
 * column : column of food cell
 */
class PowerBean extends Food {
	constructor(row, column) {
		super(row, column);
		this.score = 50;
		this.color = "red";
		this.radius = game.maze.gridWidth * 0.45;
		//draw power bean
		this.draw();
	}
	/**
	 * delete power bean
	 */
	delete() {
		game.manager.totalFood--;
		game.manager.beans.delete(this);
		game.manager.aiManager.enterFlee();
		super.delete();
	} 
} 