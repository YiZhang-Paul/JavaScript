/* jslint esversion: 6 */
class PowerBean extends Food {

	constructor(row, column) {

		super(row, column);
		this.score = 50;
		this.radius = game.gridWidth * 0.45;
	}

	dispose() {

		game.manager.powerBeans.delete(this);
		game.manager.aiManager.triggerFlee();
		super.dispose();
	}
}