/* jslint esversion: 6 */
class PowerBean extends Food {

	constructor(row, column) {

		super(row, column);
		this.score = 50;
		this.color = "red";
		this.radius = game.maze.gridWidth * 0.45;
		this.draw();
	}

	clear() {

		game.manager.powerBeans.delete(this);
		game.manager.aiManager.enterFlee();
		super.clear();
	}
}