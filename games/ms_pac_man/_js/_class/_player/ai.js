/* jslint esversion: 6 */
class AI extends Player {

	constructor(owner) {
	
		super();
		this.owner = owner;
		this.moving = false;
		this.totalTicks = 2;
		this.defaultSpeed = Math.round(game.maze.height * 0.0002 * 100) / 100;
		this.speed = this.defaultSpeed;
		this.endPoint = null;
		this.retreatPath = null;
		this.defaultState = null;
		this.defaultCropXY = this.getCropXY;
		this.state = null;
	}

	reset() {

		this.moving = false;
		this.score = 200;
		this.tick = 0;
		this.getCropXY = this.defaultCropXY;
		this.retreatPath = null;
		this.state = new StateMachine(this, this.defaultState);

		if(this.intervalHandler) {

			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
		}

		if(this.timeoutHandler) {

			clearTimeout(this.timeoutHandler);
			this.timeoutHandler = null; 
		}

		super.reset();
	}
	
	getValidDirection() {

		return this.allDirections.filter(direction => {

			return !this.hasWall(direction) && !this.hasDoor(direction);
		});
	}
	
	canTurn(direction) {

		const isOpposite = direction === this.getOppositeDirection();
		const inMazeArea = this.xCord >= 0 && this.xCord <= game.maze.width;

		return isOpposite || (inMazeArea && !this.hasWall(direction));
	}

	turnAround() {

		if(this.collisionDistance === 0) {

			this.setDirection(this.getOppositeDirection());
		}
	}

	randomDirection(directions) {

		if(this.collisionDistance === 0) {

			const direction = directions[Math.floor(Math.random() * directions.length)];

			if(direction != this.getOppositeDirection() || Math.random() < 0.4) {

				this.setDirection(direction);
			}
			else {

				this.randomDirection(directions);
			}
		}
	}

	getInShelter() {

		let currentGrid = this.getPosition(1);

		if(currentGrid && currentGrid.hasOwnProperty("c")) {

			this.getCropXY = this.defaultCropXY;
			this.stopAnimation(0);
			this.setDirection(this.xCord < game.maze.width * 0.5 ? "left" : "right");
			game.manager.aiManager.shelter.add(this);
			this.retreatPath = null;
			this.state.swapState("inShelter");
			this.owner.resetCooldown();
		}
	}

	moveOutShelter() {

		const doorWidth = game.maze.gridWidth * 0.2;
		const doorLeftX = (game.maze.width - doorWidth) * 0.5;
		const doorRightX = (game.maze.width + doorWidth) * 0.5;
		const shelterCenterY = (grid.door.spawnRow + 2) * game.maze.gridWidth;
		const inDoorRange = this.xCord > doorLeftX && this.xCord < doorRightX;
		const inYRange = Math.round(Math.abs(this.yCord - shelterCenterY)) < game.maze.gridWidth * 0.5;
		//change directions to move out of cell
		if((this.direction === "up" || this.direction === "down") && !inDoorRange && inYRange) {

			this.setDirection(this.xCord > game.maze.width * 0.5 ? "left" : "right");
		} 
		else if((this.direction === "left" || this.direction === "right") && inDoorRange) {

			this.setDirection("up"); 
		} 
		else {

			this.turnAround();
		}
		
		if(this.hasDoor("down")) {

			this.owner.shelter.delete(this);
			this.owner.resetCooldown();
			this.state.swapState("outShelter");
		}
	}
	/**
	 * stage 1 of transition from flee state back to normal state
	 */
	startFleeToNormal() {

		if(!this.timeoutHandler) {

			this.timeoutHandler = setTimeout(() => {
				
				clearTimeout(this.timeoutHandler);
				this.timeoutHandler = null;
				//start transition back to normal
				this.getCropXY = this.fleeCropXY;
				this.stopAnimation(0);
				this.animatePlayer(4);
				this.finishFleeToNormal();

			}, 50000);
		}
	}
	/**
	 * stage 2 of transition from flee state back to normal state
	 */
	finishFleeToNormal() {

		if(!this.timeoutHandler) {

			this.timeoutHandler = setTimeout(() => {
				
				clearTimeout(this.timeoutHandler);
				this.timeoutHandler = null;
				//finalize transition to normal state
				this.getCropXY = this.defaultCropXY;
				this.stopAnimation(0);
				this.state.swapState("outShelter");

			}, 3000);
		}
	}
	/**
	 * @abstract
	 * change moving direction inside of cell
	 */
	inShelterDirection() {}

	outShelterDirection() {

		this.randomDirection(this.getValidDirection());
	}

	fleeDirection() {

		if(this.collisionDistance === 0 || this.distanceToCenter === null) {

			let fleeDirections = [];
			let directions = this.getValidDirection();
			//pick all directions the ghost can flee to
			if(game.manager.user.distanceToGhost(this) < grid.row * 0.25 * game.maze.gridWidth) {

				if(this.xCord != game.manager.user.xCord) {

					fleeDirections.push(game.manager.user.xCord > this.xCord ? "left" : "right");
				}

				if(this.yCord != game.manager.user.yCord) {

					fleeDirections.push(game.manager.user.yCord > this.yCord ? "up" : "down");
				}

				fleeDirections = fleeDirections.filter(direction => directions.includes(direction));
			}

			if(fleeDirections.length) {

				this.setDirection(fleeDirections[Math.floor(Math.random() * fleeDirections.length)]);
			}
			else {

				directions.splice(directions.indexOf(this.getOppositeDirection()), 1);
				this.randomDirection(directions);
			}
		}
	}

	retreatDirection() {
		
		let target = this.retreatPath[0];

		if(this.onGridCenter(target.row, target.column)) {

			this.retreatPath.shift();
			target = this.retreatPath[0];
		}

		let direction;
		let [centerX, centerY] = this.getGridCenterCoordinate(target.row, target.column);

		if(this.yCord === centerY) {

			direction = this.xCord < centerX ? "right" : "left";
		} 
		else if(this.xCord === centerX) {

			direction = this.yCord < centerY ? "down" : "up";
		}
		else {

			[this.xCord, this.yCord] = this.getGridCenterCoordinate(this.row, this.column);
			this.retreatDirection();
			console.log("ag");
			return;
		}

		if(direction && this.canTurn(direction)) {

			this.setDirection(direction);	
		}
	}

	updateRetreatPath() {

		if(this.retreatPath) {

			let target = this.retreatPath[0];

			if(this.retreatPath.length === 1 && this.onGridCenter(target.row, target.column)) {

				this.retreatPath = null;
			}
		}
	}

	getPathLength(start, end) {

		return Math.abs(start.row - end.row) + Math.abs(start.column - end.column);
	}
	/**
	 * calculate tile weight for A* algorithm
	 */
	getWeight(start, end, origin) {

		const gScore = this.getPathLength(start, origin);
		const hScore = this.getPathLength(start, end);
		const fScore = gScore + hScore;
		const distanceToEnd = Math.hypot((start.row - end.row), (start.column - end.column));
		const distanceToSelf = Math.hypot((start.row - origin.row), (start.column - origin.column));

		return fScore + distanceToEnd - distanceToSelf;
	}

	getBestGrid(grids, end, origin = this) {

		grids.sort((grid1, grid2) => {

			return this.getWeight(grid1, end, origin) - this.getWeight(grid2, end, origin);
		});

		return grids[0];
	}

	getNeighbours(grid, visited) {

		let isVisited = (row, col) => {

			return visited.some(node => node.row === row && node.column === col);
		};
		//find all accessible neighbours
		let neighbours = this.getAllAdjacentGrids(1, grid.row, grid.column).filter(neighbour => {

			return !neighbour[0].w && !neighbour[0].b && !isVisited(neighbour[1], neighbour[2]);
		});
		//return all neighbour nodes 
		return neighbours.map(neighbour => new Node(neighbour[1], neighbour[2]));
	}

	getRetreatPath(end = this.xCord < game.maze.width * 0.5 ? new Node(14, 13) : new Node(14, 14)) {
		
		this.endPoint = end;
		let start = new Node(this.row, this.column);
		let path = [];
		let visited = [start];
		let toVisit = this.getNeighbours(start, visited);

		while(toVisit.length) {

			let bestGrid = this.getBestGrid(toVisit, end, start);
			path.push(bestGrid);
			visited = [...visited, ...toVisit];

			if(bestGrid.row === end.row && bestGrid.column === end.column) {

				break;
			}

			toVisit = this.getNeighbours(path[path.length - 1], visited);
		}

		if(this.hasEndPoint(path)) {

			this.retreatPath = path;
		}
	}

	hasEndPoint(path = this.retreatPath) {

		let lastNode = path[path.length - 1];
		return lastNode.row === this.endPoint.row && lastNode.column === this.endPoint.column;
	}

	enterRetreat() {

		this.getCropXY = this.retreatCropXY;
		this.stopAnimation(0);
		this.state.swapState("retreat");
	}

	killUser() {

		if(game.manager.user.distanceToGhost(this) < game.maze.gridWidth) {

			game.manager.user.life--;
			game.manager.state.swapState("buffering");
		}
	}

	getCropXY() {
		//determine starting row base on ghost name
		const row = ["blinky", "pinky", "inky", "clyde"].indexOf(this.name) + 2;
		//determine crop index base on current direction
		const index = ["up", "down", "left", "right"].indexOf(this.direction);
		this.cropX = (index * 2 + this.tick) * this.cropWidth;
		this.cropY = row * this.cropWidth;
	}

	fleeCropXY() {
		
		this.cropX = (4 + this.tick) * this.cropWidth + 1;
		this.cropY = this.cropWidth + 1;
	}

	retreatCropXY() {
		
		const index = ["up", "down", "left", "right"].indexOf(this.direction);	
		this.cropX = (4 + index) * this.cropWidth + 1;
		this.cropY = 7 * this.cropWidth;
	} 
	/**
	 * ghost states
	 */
	inShelter(timeStep) {

		this.speed = this.defaultSpeed * 0.65;
		
		if(this.moving) {

			this.inShelterDirection();
			this.move(timeStep);
		}
		
		this.animatePlayer();
	}

	outShelter(timeStep) {

		this.speed = this.defaultSpeed;
		
		if(this.moving) {

			this.outShelterDirection();
			this.move(timeStep);
			this.killUser();
		}
		
		this.animatePlayer();
	}
	
	flee(timeStep) {

		this.speed = this.defaultSpeed * 0.8;
		
		if(this.moving) {

			this.fleeDirection();
			this.move(timeStep);
		}
		
		this.animatePlayer();
		this.startFleeToNormal();
	}
	
	retreat(timeStep) {

		this.speed = this.defaultSpeed * 1.4;
		
		if(this.moving) {
			
			if(!this.retreatPath) {

				this.getRetreatPath();
			} 

			this.updateRetreatPath();

			if(this.retreatPath) {

				this.retreatDirection();
			} 
			else {

				this.randomDirection(this.getValidDirection());
			}

			this.move(timeStep);
			this.getInShelter();
		}
		
		this.animatePlayer();
		
		if(this.timeoutHandler) {

			clearTimeout(this.timeoutHandler);
			this.timeoutHandler = null;
		}
	}

	update(timeStep) {

		this.state.update(timeStep);
	}
}