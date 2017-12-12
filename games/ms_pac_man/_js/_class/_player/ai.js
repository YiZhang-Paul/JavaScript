/* jslint esversion: 6 */
class AI extends Player {

	constructor(name, manager) {

		super(name);
		this.manager = manager;
		this.moving = false;
		this.totalTicks = 2;
		this.defaultSpeed = Math.round(game.mazeHeight * 0.02) / 100;
		this.speed = this.defaultSpeed;
		this.fleeTimestamp = null;
		this.fleeTime = 5000;
		this.dodged = false;
		this.transitionTime = 3000; //transition time between flee and normal state
		this.movePath = null;
		this.defaultState = null;
		this.defaultCropLocation = this.getCropLocation;
		this.pathfinder = new PathFinder(this);
		this.state = null;
	}

	get destination() {

		return this.movePath ? this.movePath[this.movePath.length - 1] : null;
	}

	reset() {

		this.moving = false;
		this.score = 200;
		this.tick = 0;
		this.getCropLocation = this.defaultCropLocation;
		this.movePath = null;
		this.state = new StateMachine(this, this.defaultState);
		super.reset();
	}

	onFlee() {

		return this.fleeTimestamp + this.fleeTime > new Date().getTime();
	}

	onTransition() {

		if(this.onFlee()) {

			return false;
		}

		return this.fleeTimestamp + this.fleeTime + this.transitionTime > new Date().getTime();
	}

	atWormhole() {

		let grid = gameGrid.getGrid(1, this.row, this.column);

		if(grid === null || grid.b !== "p") {

			return false;
		}

		return this.column < 3 || this.column > gameGrid.columns - 4;
	}

	pickRandom(enumerable) {

		return enumerable[Math.floor(Math.random() * enumerable.length)];
	}

	turnAround() {

		if(this.toCollision === 0) {

			super.setDirection(this.getOppositeWay());
		}
	}

	isValidDirection(direction) {

		const isOpposite = direction === this.getOppositeWay();

		return isOpposite || (this.inMazeArea() && !this.hasWall(direction));
	}
	/**
	 * retrieve grid that is given number of grids ahead of user on given direction 
	 */
	getGridAheadOfUser(direction, total = 2) {

		let grid = new Node(game.manager.user.row, game.manager.user.column);

		if(!gameGrid.exist(grid.row, grid.column)) {

			return null;
		}

		for(let i = 0; i < 2; i++) {

			grid = this.getAdjacentGrid(direction, grid.row, grid.column);

			if(!grid || !gameGrid.isAccessible(grid.row, grid.column)) {

				return null;
			}
		}

		return grid;
	}

	getInShelter() {

		let position = gameGrid.getGrid(1, this.row, this.column);

		if(position && position.hasOwnProperty("c")) {
			//move left and right while entering shelter
			super.setDirection(this.x < game.mazeWidth * 0.5 ? "left" : "right");
			//restore default tile set
			this.getCropLocation = this.defaultCropLocation;
			this.stopAnimation(0);
			this.movePath = null;
			//inform AI manager
			this.manager.shelter.add(this);
			this.manager.setCooldown();
			this.state.swap("inShelter");
		}
	}
	/**
	 * change moving direction inside of shelter
	 */
	setInShelterDirection() {

		const doorWidth = game.gridWidth * 0.2;
		const doorLeft = (game.mazeWidth - doorWidth) * 0.5;
		const doorRight = (game.mazeWidth + doorWidth) * 0.5;
		const centerY = (gameGrid.door.row + 2) * game.gridWidth;
		const inDoorRange = this.x > doorLeft && this.x < doorRight;
		const inYRange = Math.round(Math.abs(this.y - centerY)) < game.gridWidth * 0.5;
		//change directions to move out of shelter
		if((this.direction === "up" || this.direction === "down") && !inDoorRange && inYRange) {

			super.setDirection(this.x > game.mazeWidth * 0.5 ? "left" : "right");
		}
		else if((this.direction === "left" || this.direction === "right") && inDoorRange) {

			this.state.swap("exitingShelter");
		}
		else {

			this.turnAround();
		}
	}

	getOutShelter() {

		if(this.direction === "up" && this.hasDoor("down")) {

			this.manager.shelter.delete(this);
			this.manager.setCooldown();
			this.state.swap("chasing");
		}
	}

	killUser() {

		if(this.distanceToPlayer(game.manager.user) < game.gridWidth) {

			game.manager.user.life--;
			game.manager.state.swap("onUserKill");
		}
	}

	setPath(destination) {

		if(!this.movePath) {

			this.movePath = this.pathfinder.getPath(destination);
		}
	}

	checkPath() {

		let target = this.movePath[0];

		if(this.onGridCenter(target.row, target.column)) {

			this.movePath.shift();

			if(!this.movePath.length) {

				this.movePath = null;
			}
		}
	}

	updatePath(destination) {

		if(this.inMazeArea() && !this.atWormhole()) {

			this.setPath(destination);
			this.checkPath();
		}
		else {

			this.movePath = null;
		}
	}

	setDirection() {

		let direction;
		let target = this.movePath[0];
		const [centerX, centerY] = this.getGridCenter(target.row, target.column);

		if(this.y === centerY) {

			direction = this.x < centerX ? "right" : "left";
		}
		else if(this.x === centerX) {

			direction = this.y < centerY ? "down" : "up";
		}
		else if(this.direction !== "up" || !this.hasDoor("down")) {

			[this.x, this.y] = this.getGridCenter(this.row, this.column);
			this.setDirection();
			return;
		}

		if(direction && this.isValidDirection(direction)) {

			super.setDirection(direction);
		}
	}
	/**
	 * start transition from flee state back to normal state
	 */
	startTransition() {

		if(!this.onFlee()) {

			this.stopAnimation(0);
			this.playAnimation(4);
			this.state.swap("transition");
		}
	}
	/**
	 * finish transition from flee state back to normal state
	 */
	endTransition() {

		if(!this.onTransition()) {

			this.getCropLocation = this.defaultCropLocation;
			this.stopAnimation(0);
			this.movePath = null;
			this.state.swap("chasing");
		}
	}

	getRandomDestination() {

		return this.pickRandom(gameGrid.accessible.all);
	}
	/**
	 * @abstract
	 */
	getChaseDestination() {}

	triggerRetreat() {

		this.getCropLocation = this.retreatCropLocation;
		this.stopAnimation(0);
		this.movePath = null;
		this.state.swap("retreat");
	}

	getUserPath() {

		let user = game.manager.user;
		let path = [new Node(user.row, user.column)];
		let nextNode = user.getAdjacentGrid();

		while(nextNode && gameGrid.isAccessible(nextNode.row, nextNode.column)) {

			path.push(nextNode);
			nextNode = this.getAdjacentGrid(user.direction, nextNode.row, nextNode.column);
		}

		return path;
	}

	isValidFleePath(fleePath, userPath) {

		if(fleePath.length < 2 || this.pathfinder.containsNode(fleePath, userPath[0])) {

			return false;
		}

		if(this.pathfinder.containsNode(userPath, this)) {

			const nextDirection = game.directions.find(direction => {

				return this.pathfinder.isSamePosition(fleePath[1], this.getAdjacentGrid(direction));
			});

			return nextDirection !== game.manager.user.getOppositeWay();
		}

		return true;
	}

	getFleeDestination() {

		if(!game.manager.user.inChaseRange(this) || !this.movePath) {

			this.dodged = false;

			return this.getRandomDestination();
		}

		let destination;
		let fleePath;
		let userPath = this.getUserPath();
		//try avoid running into user
		if(!this.pathfinder.isSamePosition(this, game.manager.user) && !this.atWormhole()) {

			for(let i = 0; i < 50; i++) {

				destination = this.getRandomDestination();
				fleePath = this.pathfinder.getPath(destination);

				if(!this.pathfinder.coincides(fleePath, userPath) || this.isValidFleePath(fleePath, userPath)) {

					break;
				}
			}
		}
		//update new destination
		if(!this.dodged && this.movePath) {

			this.movePath = fleePath;
			this.dodged = true;
		}

		return destination;
	}
	/**
	 * determine AI tile image crop location
	 */
	getCropLocation() {

		const row = this.manager.names.indexOf(this.name) + 2;
		const index = game.directions.indexOf(this.direction);
		this.cropX = (index * 2 + this.tick) * this.cropWidth;
		this.cropY = row * this.cropWidth;
	}
	/**
	 * determine AI tile image crop location when fleeing
	 */
	fleeCropLocation() {

		this.cropX = (4 + this.tick) * this.cropWidth + 1;
		this.cropY = this.cropWidth + 1;
	}
	/**
	 * determine AI tile image crop location when retreating
	 */
	retreatCropLocation() {

		const index = game.directions.indexOf(this.direction);
		this.cropX = (4 + index) * this.cropWidth + 1;
		this.cropY = 7 * this.cropWidth;
	}
	/**
	 * ghost states
	 */
	inShelter(timeStep) {

		this.speed = this.defaultSpeed * 0.65;

		if(this.moving) {

			this.setInShelterDirection();
			this.move(timeStep);
			this.getOutShelter();
		}

		this.playAnimation();
	}

	exitingShelter(timeStep) {

		if(this.moving) {

			super.setDirection("up");
			this.move(timeStep);
			this.getOutShelter();
		}

		this.playAnimation();
	}

	chasing(timeStep) {

		this.speed = this.defaultSpeed;

		if(this.moving) {

			this.updatePath(this.getChaseDestination());

			if(this.movePath) {

				this.setDirection();
			}

			this.move(timeStep);
		}

		this.playAnimation();
		this.killUser();
	}

	flee(timeStep) {

		this.speed = this.defaultSpeed * 0.8;

		if(this.moving) {

			this.updatePath(this.getFleeDestination());

			if(this.movePath) {

				this.setDirection();
			}

			this.move(timeStep);
		}

		this.playAnimation();
		this.startTransition();
	}
	/**
	 * transition state from flee to normal
	 */
	transition(timeStep) {

		this.speed = this.defaultSpeed * 0.8;

		if(this.moving) {

			this.updatePath(this.getFleeDestination());

			if(this.movePath) {

				this.setDirection();
			}

			this.move(timeStep);
		}

		this.endTransition();
	}

	retreat(timeStep) {

		this.speed = this.defaultSpeed * 1.4;

		if(this.moving) {

			this.updatePath(new Node(gameGrid.retreat.row, gameGrid.retreat.column));

			if(this.movePath) {

				this.setDirection();
			}
			
			this.move(timeStep);
		}

		this.playAnimation();
		this.getInShelter();
	}
	
	update(timeStep) {

		this.state.update(timeStep);
	}
}