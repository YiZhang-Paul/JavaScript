/* jslint esversion: 6 */
class Pacman extends Player {

	constructor() {

		super("pacman");
		this.number = 1;
		this.life = 4;
		this.score = 0;
		this.highScore = 0;
		this.killCount = 0;
		this.totalTicks = 3;
		this.speed = Math.round(grid.height * 0.025) / 100;
		this.dying = false;
		this.lastGhostKilled = null;
		this.deathTimeout = null;
		this.deathInterval = null;
		this.initialize();
	}

	reset() {

		super.reset();
		this.score = 0;
		this.tick = 2;
		this.dying = false;
	}

	inChaseRange(chased) {

		return this.distanceToMovable(chased) < grid.nodeSize * 8;
	}

	isValidDirection(direction) {

		const isOpposite = direction === this.getOppositeWay();
		const canMove = !this.hasWall(direction) && !this.hasDoor(direction);

		return isOpposite || (this.onNodeCenter && this.inMazeArea && canMove);
	}

	keyCodeToDirection(keyCode) {

		switch(keyCode) {

			case control.W : case control.UP :
			case control.S : case control.DOWN :

				return keyCode === control.W || keyCode === control.UP ? "up" : "down";

			case control.A : case control.LEFT :
			case control.D : case control.RIGHT :

				return keyCode === control.A || keyCode === control.LEFT ? "left" : "right";
		}

		return this.direction;
	}

	checkMoveKey() {

		const keyCode = control.activeKey;

		if(keyCode !== null) {

			const direction = this.keyCodeToDirection(keyCode);

			if(this.isValidDirection(direction)) {

				this.setDirection(direction);
			}
		}
	}

	getCropXY() {

		const index = game.directions.indexOf(this.direction);
		const x = (index * 3 + this.tick) * this.cropWidth % 256;
		const y = Math.floor((index * 3 + this.tick) * this.cropWidth / 256) * this.cropWidth;
	
		this.cropXY = new Point(x, y);
	}

	getDeathCropXY(tick) {

		const x = tick % 8 * this.cropWidth;
		const y = (Math.floor(tick / 8) + 8) * this.cropWidth;

		this.cropXY = new Point(x, y);
	}

	playDeathAnimation() {

		if(!this.deathTimeout && !this.deathInterval) {

			let tick = 0;
			this.dying = true;
			this.getDeathCropXY(tick);

			this.deathTimeout = setTimeout(() => {

				this.deathInterval = setInterval(() => {

					this.getDeathCropXY(++tick);

					if(tick === 13) {

						this.stopDeathAnimation();
					}

				}, 140);

			}, 1500);
		}
	}
}