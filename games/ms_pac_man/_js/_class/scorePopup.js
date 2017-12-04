/* jslint esversion: 6 */
class ScorePopup {

	constructor(xCord, yCord, value) {

		this.xCord = xCord;
		this.yCord = yCord;
		this.value = value;
		this.cropX = null;
		this.cropY = null;
		this.cropWidth = 32;
		this.tile = document.getElementById("player");
		this.ctx = game.maze.popUpCtx;
		this.timeoutHandler = null;
		this.draw();
	}

	clear() {

		this.ctx.clearRect(
		
			this.xCord - game.maze.gridWidth * 0.9,
			this.yCord - game.maze.gridWidth * 0.9,
            game.maze.gridWidth * 1.8,
			game.maze.gridWidth * 1.8
		);
	}

	autoClear() {

		if(!this.timeoutHandler) {

			this.timeoutHandler = setTimeout(() => {

				clearTimeout(this.timeoutHandler);
				this.timeoutHandler = null;
				this.clear();

			}, 1500);
		}
	}

	getCropXY() {

		const isFiveHundred = this.value === 500;
		this.cropX = isFiveHundred ? 224 : (Math.log2(this.value / 100) - 1) * this.cropWidth;
		this.cropY = isFiveHundred ? 192 : 224;
	}

	draw() {

		this.getCropXY();
		this.ctx.drawImage(

			this.tile,
			this.cropX,
			this.cropY,
			this.cropWidth,
			this.cropWidth,
			this.xCord - game.maze.gridWidth * 0.9,
			this.yCord - game.maze.gridWidth * 0.9,
            game.maze.gridWidth * 1.8,
			game.maze.gridWidth * 1.8
		);

		this.autoClear();
	}
}