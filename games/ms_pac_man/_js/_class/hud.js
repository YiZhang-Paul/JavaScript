/* jslint esversion: 6 */
class HUD {

	constructor(originator) {

		this.originator = originator;
		this.width = grid.width;
		this.height = (game.monitor.height - grid.height) * 0.5;
		this.fruitQueue = [];
		this.iconWidth = grid.nodeSize * 2;
		this.margin = this.height * 0.05;
		this.cropWidth = 32;
		this.tile = document.getElementById("tile");
		this.ctx = game.canvas.userInterface;
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

	showRemainLife() {
		//display remaining lives excluding current player life
		for(let i = 0; i < this.originator.life - 1; i++) {
		
			this.ctx.drawImage(

				this.tile,
				this.cropWidth,
				this.cropWidth,
				this.cropWidth,
				this.cropWidth,
				i * (this.iconWidth + this.margin),
				game.monitor.height - this.height + this.margin,
				this.iconWidth,
				this.iconWidth
			);
		}
	}

	showNextFruits() {
		//display fruit queue from left to right
		for(let i = this.fruitQueue.length - 1; i >= 0; i--) {

			this.ctx.drawImage(

				this.tile,
				this.cropWidth * (this.fruitQueue[i] - 1),
				this.cropWidth * 6,
				this.cropWidth,
				this.cropWidth,
				this.width - (this.fruitQueue.length - i) * (this.iconWidth + this.margin),
				game.monitor.height - this.height + this.margin,
				this.iconWidth,
				this.iconWidth
			);
		}
	}

	draw() {

		this.ctx.clearRect(0, game.monitor.height - this.height, this.width, this.height);
		this.showRemainLife();
		this.showNextFruits();
	}
}