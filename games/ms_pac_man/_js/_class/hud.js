/* jslint esversion: 6 */
class HUD {

	constructor(owner) {

		this.owner = owner;
		this.width = game.maze.width;
		this.height = (game.monitor.height - game.maze.height) * 0.5;
		this.fruitQueue = [];
		this.iconWidth = game.maze.gridWidth * 2;
		this.margin = this.height * 0.05; 
		this.tile = document.getElementById("player");
		this.ctx = game.maze.uiCtx;
		this.draw();
	}

	reset() {

		this.fruitQueue = [];
		this.draw();
	}

	enqueue(type) {

		this.fruitQueue.push(type);
		this.draw();
	}

	dequeue() {

		this.fruitQueue.shift();
		this.draw();
	}

	showPlayerIcon() {

		for(let i = 0; i < this.owner.life; i++) {

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
		this.showPlayerIcon();
		this.showFruitIcon();
	}
} 