/* jslint esversion: 6 */
class HUD {

	constructor(originator) {

		this.originator = originator;
		this.width = game.mazeWidth;
		this.height = (game.monitor.height - game.mazeHeight) * 0.5;
		this.fruitQueue = [];
		this.iconWidth = game.gridWidth * 2;
		this.margin = this.height * 0.05;
		this.tile = document.getElementById("tile");
		this.ctx = game.canvas.ui;
		this.draw();
	}

	reset() {

		this.fruitQueue = [];
		this.draw();
	}
	/**
	 * add new fruit type to fruit queue
	 */
	enqueue(type) {

		this.fruitQueue.push(type);
		this.draw();
	}
	/**
	 * remove fruit type from queue start
	 */
	dequeue() {

		this.fruitQueue.shift();
		this.draw();
	}

	showUserIcon() {
		//display remaining lives excluding current life
		for(let i = 0; i < this.originator.life - 1; i++) {

			this.ctx.drawImage(

				this.tile,
				32,
				32,
				32,
				32,
				i * (this.iconWidth + this.margin),
				game.monitor.height - this.height + this.margin,
				this.iconWidth,
				this.iconWidth
			);
		}
	}

	showFruitIcon() {
		//display fruit queue from left to right
		for(let i = this.fruitQueue.length - 1; i >= 0; i--) {

			this.ctx.drawImage(

				this.tile,
				32 * (this.fruitQueue[i] - 1),
				192,
				32,
				32,
				this.width - (this.fruitQueue.length - i) * (this.iconWidth + this.margin),
				game.monitor.height - this.height + this.margin,
				this.iconWidth,
				this.iconWidth
			);
		}
	}

	draw() {

		this.ctx.clearRect(0, game.monitor.height - this.height, this.width, this.height);
		this.showUserIcon();
		this.showFruitIcon();
	}
}