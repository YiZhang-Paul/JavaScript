/* jslint esversion: 6 */
class Fruit extends Movable {

	constructor(row, column, type, direction) {

		super(row, column);
		this.coordinate = grid.getNodeCenter(this.row, this.column);
		this.type = type;
		this.score = 500;
		this.spawnTime = new Date().getTime();
		this.duration = 30000;
		this.falling = false;
		this.jumpHeight = 0;
		this.maxJumpHeight = grid.nodeSize;
		this.jumpSpeed = grid.nodeSize * 0.1;
		this.direction = direction;
		this.speed = Math.round(grid.height * 0.01) / 100;
		this.cropXY = null;	
		this.cropWidth = 32;
		this.ctx = game.canvas.fruit;
		this.getCropXY();
	}

	get inDuration() {

		return this.spawnTime + this.duration > new Date().getTime();
	}

	erase() {

		this.ctx.clearRect(

			this.coordinate.x - grid.nodeSize * 2,
			this.coordinate.y - grid.nodeSize * 2,
			grid.nodeSize * 4,
			grid.nodeSize * 4
		);
	}

	dispose() {

		game.manager.foodManager.fruit = null;
		this.erase();
	}

	getCurrentNode() {

		super.getCurrentNode();
		//self-dispose when going out of maze area
		if(!grid.exist(this.row, this.column)) {

			this.dispose();
		}
	}

	getCropXY() {

		const x = this.cropWidth * (this.type - 1);
		const y = this.cropWidth * 6;

		this.cropXY = new Point(x, y);
	}

	jump() {

		if(this.jumpHeight >= this.maxJumpHeight) {

			this.falling = true;
		}
		else if(this.jumpHeight <= 0) {

			this.falling = false;
		}

		this.jumpHeight += this.jumpSpeed * (this.falling ? -1 : 1);
	}

	filterOppositeWay() {

		const opposite = this.getOppositeWay();

		return game.directions.filter(direction => direction !== opposite);
	}
	/**
	 * check if the obstacle is less than 2 nodes thick
	 */
	canPass(direction) {

		let [row, column] = [this.row, this.column];

		for(let i = 0; i < 3; i++) {

			if(direction === "up" || direction === "down") {

				row += direction === "up" ? -1 : 1;
			}
			else {

				column += direction === "left" ? -1 : 1;
			}

			if(!grid.exist(row, column)) {

				return false;
			}
		}

		return grid.isAccessible(row, column);
	}

	setDirection() {

		if(this.onNodeCenter && this.inDuration && grid.isAccessible(this.row, this.column)) {

			let adjacent = grid.getAdjacentNode(this.direction, this.row, this.column);
			//70% chance to keep going in current direction if possible
			if(grid.isAccessible(adjacent.row, adjacent.column) && Math.random() < 0.7) {

				return;
			}

			const direction = utility.getRandom(this.filterOppositeWay());
			adjacent = grid.getAdjacentNode(direction, this.row, this.column);
			//20% chance to pass through obstacles if possible
			if((adjacent && grid.isAccessible(adjacent.row, adjacent.column)) || 
			   (Math.random() < 0.2 && this.canPass(direction))) {

				this.direction = direction;
			}
			else {
				//retry finding moving direction
				this.setDirection();
			}
		}
	}

	adjustSpeed(speed) {

		const toNodeCenter = this.toFacingNodeCenter;

		return toNodeCenter ? Math.min(speed, toNodeCenter) : speed;
	}

	move(timeStep) {

		const speed = this.adjustSpeed(this.speed * timeStep);

		if(this.direction === "up" || this.direction === "down") {

			this.coordinate.y += speed * (this.direction === "up" ? -1 : 1);
		}
		else {

			this.coordinate.x += speed * (this.direction === "left" ? -1 : 1);
		}

		this.getCurrentNode();
	}

	update(timeStep) {

		this.jump();
		this.setDirection();
		this.move(timeStep);
	}

	draw() {

		this.erase();

		this.ctx.drawImage(

			this.tile,
			this.cropXY.x,
			this.cropXY.y,
			this.cropWidth,
			this.cropWidth,
			this.coordinate.x - grid.nodeSize * 0.8,
			this.coordinate.y - grid.nodeSize * 0.8 - this.jumpHeight,
			grid.nodeSize * 1.6,
			grid.nodeSize * 1.6
		);
	}
}