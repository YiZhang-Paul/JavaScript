/* jslint esversion: 6 */
class Player extends Movable {

	constructor(name) {

		super();
		this.name = name;
		this.tick = 0;
		this.totalTicks = null;
		this.interval = null;
		this.ctx = game.canvas.player;
	}

	initialize() {

		let stats = grid[this.name];
		const x = grid.nodeSize * stats.column;
		const y = grid.nodeSize * (stats.row + 0.5);
		this.coordinate = new Point(x, y);
		this.direction = stats.direction;
	}

	reset() {

		this.initialize();

		if(this.interval !== null) {

			clearInterval(this.interval);
			this.interval = null;
		}
	}

	adjustSpeed(speed) {

		const toCollision = this.toCollision;
		const toNodeCenter = this.toFacingNodeCenter;

		if(toCollision !== null) {

			return Math.min(speed, toCollision);
		}

		return toNodeCenter ? Math.min(speed, toNodeCenter) : speed;
	}

	crossWormhole() {

		const left = -grid.nodeSize;
		const right = grid.width + grid.nodeSize;

		if(this.coordinate.x < left || this.coordinate.x > right) {

			this.coordinate.x = this.coordinate.x < left ? right : left;
		}
	}

	move(timeStep) {

		const speed = this.adjustSpeed(this.speed * timeStep);

		if(this.direction === "up" || this.direction === "down") {

			this.coordinate.y -= speed * (this.direction === "up" ? 1 : -1);
		}
		else {

			this.coordinate.x -= speed * (this.direction === "left" ? 1 : -1);
		}

		this.crossWormhole();
		this.getCurrentNode();
	}

	nextTick(totalTicks = this.totalTicks) {

		this.tick = (this.tick + 1) % totalTicks;
		this.getCropXY();
	}

	playAnimation(totalTicks, speed = 100, endTick = this.tick) {

		if(!this.interval && this.onAnimation) {

			this.interval = setInterval(() => {

				this.nextTick(totalTicks);

			}, speed);
		}
		else if(!this.onAnimation) {

			this.stopAnimation(endTick);
		}
	}

	stopAnimation(endTick) {

		if(this.interval) {

			clearInterval(this.interval);
			this.interval = null;
			this.tick = endTick;
			this.getCropXY();
		}
	}

	draw() {

		this.ctx.drawImage(

			this.tile,
			this.cropXY.x,
			this.cropXY.y,
			this.cropWidth,
			this.cropWidth,
			this.coordinate.x - grid.nodeSize * 0.8,
			this.coordinate.y - grid.nodeSize * 0.8,
			grid.nodeSize * 1.6,
			grid.nodeSize * 1.6
		);
	}
}