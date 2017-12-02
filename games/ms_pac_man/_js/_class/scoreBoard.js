/* jslint esversion: 6 */
class ScoreBoard {

	constructor(owner) {

		this.owner = owner;
		this.width = game.maze.width;
		this.height = (game.monitor.height - game.maze.height) * 0.5;
		this.fontSize = this.height * 0.45;
		this.tick = 0;
		this.intervalHandler = null;
		this.ctx = game.maze.uiCtx;
		this.draw();
	}

	reset() {

		if(this.intervalHandler) {
			
			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
		}

		this.tick = 0;
		this.draw();
	}

	updateScore(score = 0) {

		this.owner.score += score;
		this.owner.highestScore = Math.max(this.owner.score, this.owner.highestScore);
		this.draw();
	}

	changeTick() {

		this.tick = this.tick ? 0 : 1;
	}

	blink() {

		if(!this.intervalHandler) {

			this.intervalHandler = setInterval(() => {

				this.changeTick();
				this.draw();

			}, 150);
		}
	}

	drawText(texts) {

		for(let i = 0; i < texts.length; i++) {

			for(let j = 0; j < texts[i].length; j++) {

				if(i || j || this.tick) {

					const xCord = this.width * (0.2 + i * 0.4);
					const yCord = this.height * (0.5 + j * 0.43);
					this.ctx.fillText(texts[i][j], xCord, yCord);
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

			[`${this.owner.playerNum}UP`, this.owner.score],
			["HIGH SCORE", this.owner.highestScore]
		]);
	}
} 