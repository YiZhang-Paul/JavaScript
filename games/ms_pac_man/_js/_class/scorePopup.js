/* jslint esversion: 6 */
class ScorePopup {

	constructor(x, y, value) {

		this.x = x;
		this.y = y;
		this.value = value;
		this.spawn = new Date().getTime();
		this.lifespan = 1500;
		this.cropX = null;
		this.cropY = null;
		this.cropWidth = 32;
		this.tile = document.getElementById("player");
		this.ctx = game.canvas.popup;
		this.getCropPosition();
	}

	isAlive() {

		return this.spawn + this.lifespan > new Date().getTime();
	}

	erase() {

		this.ctx.clearRect(

			this.x - game.gridWidth * 0.9,
			this.y - game.gridWidth * 0.9,
			game.gridWidth * 1.8,
			game.gridWidth * 1.8
		);
	}

	dispose() {

		game.manager.popUps.delete(this);
		this.erase();
	}

	getCropPosition() {

		if(this.value === 500) {

			[this.cropX, this.cropY] = [224, 192];
		}
		else {

			this.cropX = (Math.log2(this.value / 100) - 1) * this.cropWidth;
			this.cropY = 224;
		}
	}

	draw() {

		this.erase();

		this.ctx.drawImage(

			this.tile,
			this.cropX,
			this.cropY,
			this.cropWidth,
			this.cropWidth,
			this.x - game.gridWidth * 0.9,
			this.y - game.gridWidth * 0.9,
			game.gridWidth * 1.8,
			game.gridWidth * 1.8
		);
	}
}