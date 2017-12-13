/* jslint esversion: 6 */
class Maze {

	constructor(width, height) {

		this.width = width;
		this.height = height;
		this.tick = 0;
		this.tile = null;
		this.ctx = game.canvas.background;
		this.draw();
	}

	reset() {

		this.tick = 0;
		this.draw();
	}

	nextTick() {

		this.tick = this.tick ? 0 : 1;
	}
	/**
	 * blink maze borders
	 */
	blink() {

		this.nextTick();
		this.draw();
	}

	draw() {

		this.tile = document.getElementById(this.tick ? "maze_clipped" : "maze");
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.drawImage(this.tile, 0, 0, this.width, this.height);
	}
}