/* jslint esversion: 6 */
class Point {

	constructor(x = null, y = null) {

		this.x = x;
		this.y = y;
	}

	isSame(point) {

		return this.x === point.x && this.y === point.y;
	}

	distanceToPoint(point) {

		return Math.hypot((this.x - point.x), (this.y - point.y));
	}
}