/* jslint esversion: 6 */
class PowerBean extends Bean {

	constructor(row, column) {

		super(row, column);
		this.tick = 0;
		this.score = 50;
		this.radius = grid.nodeSize * 0.45;
	}

	dispose() {

		game.manager.foodManager.powerBeans.delete(this);
		game.manager.aiManager.fleeModeOn();
		super.dispose();
	}

	nextTick() {

		this.tick = this.tick ? 0 : 1;
	}

	blink() {

		this.nextTick();

		if(this.tick) {

			this.draw();
		}
		else {

			this.erase();
		}
	}
}