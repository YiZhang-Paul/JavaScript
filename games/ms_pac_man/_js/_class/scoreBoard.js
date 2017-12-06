/* jslint esversion: 6 */
class ScoreBoard {

	constructor(originator) {

		this.originator = originator;
		this.width = game.mazeWidth;
		this.height = (game.monitor.height - game.mazeHeight) * 0.5;
		this.fontSize = this.height * 0.45;
		this.tick = 0;
		this.interval = null;
		this.ctx = game.canvas.ui;
		this.draw();
	}

	reset() {

		if(this.interval) {

			clearInterval(this.interval);
			this.interval = null;
		}

		this.tick = 0;
		this.draw();
	}

	nextTick() {

		this.tick = this.tick ? 0 : 1;
	}
	/** 
	 * blink current active player number
	 */
	blink() {

		if(!this.interval) {

			this.interval = setInterval(() => {

				this.nextTick();
				this.draw();

			}, 150);
		}
	}

	update(score = 0) {

		this.originator.score += score;
		this.originator.highScore = Math.max(this.originator.score, this.originator.highScore);
		this.draw();
	}

	drawText(text) {

		for(let i = 0; i < text.length; i++) {

			for(let j = 0; j < text[i].length; j++) {

				if(i || j || this.tick) {

					const x = this.width * (0.2 + i * 0.4);
					const y = this.height * (0.5 + j * 0.43);
					this.ctx.fillText(text[i][j], x, y);
				}
			}
		}
	}

	draw() {

		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.font = this.fontSize + "px 'Lucida Console'";
		this.ctx.textAlign = "center";
		this.ctx.fillStyle = "white";

		this.drawText([

			[`${this.originator.number}UP`, this.originator.score],
			["HIGH SCORE", this.originator.highScore]
		]);
	}
}