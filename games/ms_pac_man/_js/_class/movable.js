/* jslint esversion: 6 */
class Movable {

	constructor(row, column) {

		this.coordinate = new Point();
		this.row = row;
		this.column = column;
		this.speed = 0;
		this.direction = null;
		this.cropXY = null;	
		this.cropWidth = 32;
		this.tile = document.getElementById("tile");
		this.ctx = null;
	}

	get onNodeCenter() {

		return this.coordinate.isSame(grid.getNodeCenter(this.row, this.column));
	}
	/**
	 * retrieve distance before collision
	 */
	get toCollision() {

		if(!this.hasWall()) {

			return null;
		}

		let adjacent = grid.getAdjacentNode(this.direction, this.row, this.column);

		return this.distanceToNodeCenter(adjacent.row, adjacent.column) - grid.nodeSize;
	}
	/**
	 * retrieve distance to nearest facing node center
	 */
	get toFacingNodeCenter() {

		if(this.onNodeCenter) {

			return grid.nodeSize;
		}

		let adjacent = grid.getAdjacentNode(this.direction, this.row, this.column);

		if(adjacent === null) {

			return null;
		}

		const toAdjacent = this.distanceToNodeCenter(adjacent.row, adjacent.column);

		return toAdjacent > grid.nodeSize ? this.distanceToNodeCenter(this.row, this.column) : toAdjacent;
	}

	get inMazeArea() {

		return this.coordinate.x >= 0 && this.coordinate.x <= grid.width;
	}

	reset() {

		this.getCropXY();
		this.getCurrentPosition();
	}

	getCurrentNode() {

		let node = grid.locateNode(this.coordinate);
		[this.row, this.column] = [node.row, node.column];
	}

	distanceToMovable(movable) {

		return this.coordinate.distanceToPoint(movable.coordinate);
	}
	/**
	 * calculate distance to given node center
	 */
	distanceToNodeCenter(row, column) {

		let center = grid.getNodeCenter(row, column);

		return this.direction === "up" || this.direction === "down" ?
			Math.abs(this.coordinate.y - center.y) : Math.abs(this.coordinate.x - center.x);
	}

	getOppositeWay(direction = this.direction) {

		switch(direction) {

			case "up" : case "down" :

				return direction === "up" ? "down" : "up";

			case "left" : case "right" :

				return direction === "left" ? "right" : "left";
		}

		return direction;
	}

	hasWall(direction = this.direction) {

		let adjacent = grid.getAdjacentNode(direction, this.row, this.column);

		if(adjacent === null) {

			return false;
		}

		return grid.getNode(1, adjacent.row, adjacent.column).hasOwnProperty("w");
	}
	
	hasDoor(direction = this.direction) {

		let adjacent = grid.getAdjacentNode(direction, this.row, this.column);

		if(adjacent === null) {

			return false;
		}

		return grid.getNode(1, adjacent.row, adjacent.column).hasOwnProperty("d");
	}

	/**
	 * @abstract
	 */
	isValidDirection() {}

	setDirection(direction) {

		this.direction = direction;
		this.getCropXY();
	}
	/**
	 * @abstract
	 * adjust speed to ensure object can reach grid center
	 */
	adjustSpeed(speed) {}
	/**
	 * @abstract
	 */
	move(timeStep) {}
	/**
	 * @abstract
	 * calculate tile image crop location
	 */
	getCropXY() {}
	/**
	 * @abstract
	 */
	update(timeStep) {}
	/**
	 * @abstract
	 */
	draw() {}
}