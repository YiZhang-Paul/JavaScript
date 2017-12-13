/* jslint esversion: 6 */
class Player extends Movable {

	constructor(name) {

		this.name = name;
		this.score = 0;
		this.tick = 0;
		this.totalTicks = 0;
		this.animationOn = false;
		this.interval = null;
		this.ctx = game.canvas.player;
	}

	reset() {

		let stats = gameGrid[this.name];
		this.x = game.gridWidth * stats.column;
		this.y = game.gridWidth * (stats.row + 0.5);
		this.direction = stats.direction;
		this.animationOn = false;

		if(this.interval) {

			clearInterval(this.interval);
			this.interval = null;
		}
	}

	inChaseRange(chased) {

		return this.distanceToPlayer(chased) < game.gridWidth * 8;
	}

	canTurn() {

		if(this.onGridCenter()) {

			return true;
		}

		if(this.toCollision !== 0) {

			return false; 
		}

		const [x, y] = this.getGridCenter(this.row, this.column);

		return this.direction === "left" || this.direction === "right" ? this.x === x : this.y === y;
	}
	/**
	 * adjust speed to ensure player can reach grid center
	 */
	adjustSpeed(speed) {

		this.distanceToCollision();
		this.distanceToFacingGridCenter();

		if(this.toCollision !== null) {

			return Math.min(speed, this.toCollision);
		}

		return this.toGridCenter ? Math.min(speed, this.toGridCenter) : speed;
	}
	/**
	 * check for wormholes on both side of maze
	 */
	checkWormhole() {

		const left = -game.gridWidth;
		const right = game.mazeWidth + game.gridWidth;

		if(this.x < left || this.x > right) {

			this.x = this.x < left ? right : left;
		}
	}

	move(timeStep) {

		const speed = this.adjustSpeed(this.speed * timeStep);

		if(this.direction === "up" || this.direction === "down") {

			this.y -= speed * (this.direction === "up" ? 1 : -1);
		}
		else {

			this.x -= speed * (this.direction === "left" ? 1 : -1);
		}

		this.checkWormhole();
		this.trackCurrentGrid();
	}

	nextTick(totalTicks = this.totalTicks) {

		this.tick = (this.tick + 1) % totalTicks;
		this.getCropLocation();
	}

	playAnimation(totalTicks, speed = 100, endTick = this.tick) {

		if(this.animationOn && !this.interval) {

			this.interval = setInterval(() => {

				this.nextTick(totalTicks);

			}, speed);
		}
		else if(!this.animationOn) {

			this.stopAnimation(endTick);
		}
	}

	stopAnimation(tick) {

		if(this.interval) {

			clearInterval(this.interval);
			this.interval = null;
			this.tick = tick;
			this.getCropLocation();
		}
	}
	

	draw() {

		this.ctx.drawImage(

			this.tile,
			this.cropX,
			this.cropY,
			this.cropWidth,
			this.cropWidth,
			this.x - game.gridWidth * 0.8,
			this.y - game.gridWidth * 0.8,
			game.gridWidth * 1.6,
			game.gridWidth * 1.6
		);
	}
}