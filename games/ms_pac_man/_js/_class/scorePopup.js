/* jslint esversion: 6 */
class ScorePopUp {

	constructor(x, y, value) {

		this.coordinate = new Point(x, y);
		this.value = value;
		this.spawnTime = new Date().getTime();
		this.duration = 1500;
		this.cropXY = null;
		this.cropWidth = 32;
		this.tile = document.getElementById("tile");
		this.ctx = game.canvas.scorePopUp;
		this.getCropXY();
	}

	get inDuration() {

		return this.spawnTime + this.duration > new Date().getTime();
	}

	erase() {

		this.ctx.clearRect(

			this.coordinate.x - grid.nodeSize * 0.9,
			this.coordinate.y - grid.nodeSize * 0.9,
			grid.nodeSize * 1.8,
			grid.nodeSize * 1.8
		);
	}

	dispose() {

		game.manager.popUps.delete(this);
		this.erase();
	}

	getCropXY() {

		if(this.value === 500) {

			this.cropXY = new Point(224, 192);
		}
		else {

			const x = (Math.log2(this.value / 100) - 1) * this.cropWidth;
			this.cropXY = new Point(x, 224);
		}
	}

	draw() {

		this.erase();

		this.ctx.drawImage(

			this.tile,
			this.cropXY.x,
			this.cropXY.y,
			this.cropWidth,
			this.cropWidth,
			this.coordinate.x - grid.nodeSize * 0.9,
			this.coordinate.y - grid.nodeSize * 0.9,
			grid.nodeSize * 1.8,
			grid.nodeSize * 1.8
		);
	}
}