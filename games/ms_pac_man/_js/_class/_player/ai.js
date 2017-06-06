/* jslint esversion: 6 */
/**
 * AI class
 * @param obj {}
 *
 * owner : manager of ghost
 */
class AI extends Player {
	constructor(owner) {
		super();
		this.owner = owner;
		this.moving = false;
		this.totalStep = 2;
		this.defaultSpeed = Math.round(game.maze.height* 0.0002 * 100) / 100;
		this.speed = this.defaultSpeed;
		this.retreatPath = null;
		this.defaultCropXY = this.cropXY;
		this.state = null;
	}
	/**
	 * reset AI
	 */
	reset() {
		this.moving = false;
		this.score = 200;
		this.step = 0;
		this.cropXY = this.defaultCropXY;
		this.state.swapState(this.name == "blinky" ? "retreat" : "inCell");
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
	/**
	 * find available moving direction
	 *
	 * returns array []
	 */
	availableDir() {
		let allDir = this.allDirect.slice();
		return allDir.filter(direction => 
			!this.hasWall(direction) && !this.hasDoor(direction));
	} 
	/**
	 * move back and forth
	 */
	turnAround() {
		if(this.collideDist === 0) {
			this.setDirection(this.findOpposite());
		}
	} 
	/**
	 * randomly change direction
	 * @param array []
	 * 
	 * availableDir : all available directions
	 */
	randomDirection(availableDir) {
		if(this.collideDist === 0) {
			let finalDir = availableDir[Math.floor(Math.random() * availableDir.length)];
			if(finalDir != this.findOpposite()) {
				this.setDirection(finalDir);
			} else if(Math.random() < 0.4) {
				this.setDirection(finalDir);
			} else {
				this.randomDirection(availableDir);
			}
		}
	} 
	/**
	 * move out cell
	 */
	moveOutCell() {
		let doorWidth = game.maze.gridWidth * 0.2;
		let doorLeftX = (game.maze.width - doorWidth) * 0.5;
		let doorRightX = (game.maze.width + doorWidth) * 0.5;
		let cellCenterY = (grid.door.spawnRow + 2) * game.maze.gridWidth;
		let inXRange = this.xCord > doorLeftX && this.xCord < doorRightX;
		let inYRange = Math.round(Math.abs(this.yCord - cellCenterY)) < game.maze.gridWidth * 0.5;
		//change directions to move out of cell
		if((this.direction == "up" || this.direction == "down") && !inXRange && inYRange) {
			this.setDirection(this.xCord > game.maze.width * 0.5 ? "left" : "right");
		} else if((this.direction == "left" || this.direction == "right") && inXRange) {
			this.setDirection("up"); 
		} else {
			this.turnAround();
		}
		//check door
		if(this.hasDoor("down")) {
			this.owner.cell.delete(this);
			this.owner.resetCooldown();
			this.state.swapState("outCell");
		}
	} 
	/**
	 * initiate process to return 
	 * to normal from flee state
	 */
	intiateFleeToNormal() {
		if(!this.timeoutHandler) {
			this.timeoutHandler = setTimeout(() => {
				//clear time out first
				clearTimeout(this.timeoutHandler);
				this.timeoutHandler = null;
				//start transition back to normal
				this.cropXY = this.cropFleeS2XY;
				this.stopAnimation(0);
				this.animatePlayer(4);
				this.finishFleeToNormal();
			}, 7000);
		}
	} 
	/**
	 * final transition
	 */
	finishFleeToNormal() {
		if(!this.timeoutHandler) {
			this.timeoutHandler = setTimeout(() => {
				//clear time out
				clearTimeout(this.timeoutHandler);
				this.timeoutHandler = null;
				//finalize transition to normal state
				this.cropXY = this.defaultCropXY;
				this.stopAnimation(0);
				this.state.swapState("outCell");
			}, 3000);
		}
	} 
	/**
	 * @abstract
	 * change moving direction inside of cell
	 */
	inCellDir() {} 
	/**
	 * change moving direction outside of cell
	 */
	outCellDir() {
		this.randomDirection(this.availableDir());
	} 
	/**
	 * move away from user
	 */
	fleeDir() {
		if(this.collideDist === 0 || this.centerDist === null) {
			let user = game.manager.user;
			let distToUser = user.distToGhost(this.xCord, this.yCord);
			let availableDir = this.availableDir();
			if(distToUser < grid.row * 0.25 * game.maze.gridWidth) {
				//get all available directions to flee
				let fleeDir = [];
				if(this.xCord != user.xCord) {
					fleeDir.push(user.xCord > this.xCord ? "left" : "right");
				}
				if(this.yCord != user.yCord) {
					fleeDir.push(user.yCord > this.yCord ? "up" : "down");
				}
				fleeDir = fleeDir.filter(direction => availableDir.indexOf(direction) != -1);
				if(fleeDir.length) {
					this.setDirection(fleeDir[Math.floor(Math.random() * fleeDir.length)]);
				} else {
					availableDir.splice(availableDir.indexOf(this.findOpposite()), 1);
					this.randomDirection(availableDir);
				}
			} else {
				this.randomDirection(availableDir);
			}
		}
	} 
	/**
	 * retreat to cell
	 */
	retreatDir() {
		let availableDir = this.availableDir();
		if((this.collideDist === 0 || this.centerDist === null) && availableDir.length >= 3) {
			let cellCenterX = game.maze.width * 0.5;
			let cellCenterY =	(grid.door.spawnRow + 2) * game.maze.gridWidth;
			//find route back to cell
			let retreatDir = [];
			if(this.xCord != cellCenterX) {
				retreatDir.push(this.xCord > cellCenterX ? "left" : "right");
			}	
			if(this.yCord != cellCenterY) {
				retreatDir.push(this.yCord > cellCenterY ? "up" : "down");
			}
			retreatDir = retreatDir.filter(direction => availableDir.indexOf(direction) != -1);
			this.setDirection(retreatDir[Math.floor(Math.random() * retreatDir.length)]);
		} else if(this.collideDist === 0) {
			availableDir.splice(availableDir.indexOf(this.findOpposite()), 1);
			this.randomDirection(availableDir);	
		}
	} 
	/**
	 * get total number of tiles needed to 
	 * traverse from one tile to another tile
	 * @param obj {], obj {}
	 *
	 * start : starting tile 
	 * end   : ending tile
	 *
	 * returns int
	 */
	getTravelDist(start, end) {
		return Math.abs(start.row - end.row) + Math.abs(start.column - end.column);
	} 
	/**
	 * find metric
	 * @param obj {], obj {}
	 *
	 * start : starting tile 
	 * end   : ending tile
	 *
	 * returns int
	 */
	getMetric(start, end) {
		let gScore = this.getTravelDist(start, new Node(this.row, this.column));
		let hScore = this.getTravelDist(start, end);
		let fScore = gScore + hScore;
		let distToEnd = Math.hypot((start.row - end.row), (start.column - end.column));
		let distToSelf = Math.hypot((start.row - this.row), (start.column - this.column));
		return fScore + distToEnd - distToSelf;
	}
	/**
	 * find tile with lowest metric
	 * @param array [], obj {}
	 *
	 * tileList : list of candidate tiles
	 * end      : ending tile
	 *
	 * returns obj {}
	 */
	getBestTile(tileList, end) {
		tileList.sort((tile1, tile2) => {
			return this.getMetric(tile1, end) - this.getMetric(tile2, end);
		});
		return tileList[0];
	} 
	/**
	 * get all walkable neighbour tiles
	 * @param obj {}, array [] 
	 *
	 * curTile : current tile
	 * banList : list of tiles to skip
	 * 
	 * returns array []
	 */
	getNeighbours(curTile, banList) {
		let nodeBanned = (row, col) => banList.findIndex(node => node.row == row && node.column == col) != -1;
		//find adjacent tiles on all four directions
		let adjacentTiles = this.allDirect.map(direction => this.adjacentTile(1, direction, curTile.row, curTile.column));
		//find all walkable neighbours
		let neighbours = adjacentTiles.filter(neighbour => 
			neighbour[0] && !neighbour[0].w && !neighbour[0].b && !nodeBanned(neighbour[1], neighbour[2]));
		//return all neighbour nodes 
		return neighbours.map(neighbour => new Node(neighbour[1], neighbour[2]));
	}
	/**
	 * find shortest path to retreat
	 * @param obj {}
	 *
	 * end : destination tile
	 */
	getRetreatPath(end = this.xCord < game.maze.width * 0.5 ? new Node(15, 14) : new Node(15, 15)) {
		//starting node
		let start = new Node(this.row, this.column);
		let path = [start], visited = [start];
		let queue = this.getNeighbours(start, visited);
		while(queue.length) {
			//find best tile and add to current path
			let bestTile = this.getBestTile(queue, end);
			path.push(bestTile);
			visited = [...visited, ...queue];
			if(bestTile.row == end.row && bestTile.column == end.column) {
				break;
			} else {
				queue = this.getNeighbours(path[path.length - 1], visited);
			}
		}
	} 
	/**
	 * enter retreat mode
	 */
	enterRetreat() {
		this.cropXY = this.cropRetreatXY;
		this.stopAnimation(0);
		this.state.swapState("retreat");
	} 
	/**
	 * ghost eat user
	 */
	eatUser() {
		//check distance to user
		let distance = game.manager.user.distToGhost(this.xCord, this.yCord);
		if(distance < game.maze.gridWidth) {
			game.manager.user.life--;
			game.manager.state.swapState("buffering");
		}
	} 
	/**
	 * determine AI tile image crop location
	 * base on current direction and step 
	 */
	cropXY() {
		//determine starting row base on ghost name
		let startRow = 0;
		if(this.name == "blinky") startRow = 2;
		else if(this.name == "pinky") startRow = 3;
		else if(this.name == "inky") startRow = 4;
		else startRow = 5;
		//determine crop index base on current direction
		let index;
		if(this.direction == "up") index = 0;	
		else if(this.direction == "down") index = 1;	
		else if(this.direction == "left") index = 2;	
		else if(this.direction == "right") index = 3;	
		//determine and update crop XY location
		let cropWidth = this.cropWidth + 2;
		this.cropX = (index * 2 + this.step) * cropWidth + 1;
		this.cropY = startRow * cropWidth + 1;
	} 
	/**
	 * determine AI tile image crop location
	 * on flee state stage 1 
	 */
	cropFleeS1XY() {
		//determine and update crop XY location
		let cropWidth = this.cropWidth + 2;
		this.cropX = (4 + this.step) * cropWidth + 1;
		this.cropY = cropWidth + 1;
	}
	/**
	 * determine AI tile image crop location
	 * on flee state stage 2 
	 */
	cropFleeS2XY() {
		//determine and update crop XY location
		let cropWidth = this.cropWidth + 2;
		this.cropX = (4 + this.step) * cropWidth + 1;
		this.cropY = cropWidth + 1;
	}
	/**
	 * determine AI tile image crop location
	 * on retreat state  
	 */
	cropRetreatXY() {
		//determine crop index base on current direction
		let index;
		if(this.direction == "up") index = 0;	
		else if(this.direction == "down") index = 1;	
		else if(this.direction == "left") index = 2;	
		else if(this.direction == "right") index = 3;	
		//determine and update crop XY location
		let cropWidth = this.cropWidth + 2;
		this.cropX = (4 + index) * cropWidth + 1;
		this.cropY = 7 * cropWidth + 1;
	} 
	/**
	 * ghost states
	 */
	//in cell @abstract
	inCell(timeStep) {
		this.speed = this.defaultSpeed * 0.65;
		//check movement in cell
		if(this.moving) {
			this.inCellDir();
			this.move(timeStep);
		}
		//animate ghost
		this.animatePlayer();
	}
	//out cell
	outCell(timeStep) {
		this.speed = this.defaultSpeed;
		//check movement out cell
		if(this.moving) {
			this.outCellDir();
			this.move(timeStep);
			//eat user
			this.eatUser();
		}
		//animate ghost
		this.animatePlayer();
	}
	//flee state
	flee(timeStep) {
		this.speed = this.defaultSpeed * 0.8;
		//check movement
		if(this.moving) {
			this.fleeDir();
			this.move(timeStep);
		}
		//animate ghost
		this.animatePlayer();
		//set timer to go back to normal state
		this.intiateFleeToNormal();
	}
	//retreat mode
	retreat(timeStep) {
		this.speed = this.defaultSpeed * 1.4;
		//check movement
		if(this.moving) {
			this.retreatDir();
			this.move(timeStep);
		}
		//animate ghost
		this.animatePlayer();
		//clear time out
		if(this.timeoutHandler) {
			clearTimeout(this.timeoutHandler);
			this.timeoutHandler = null;
		}
	}
	/**
	 * update ghost
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//update ghost behaviour
		this.state.update(timeStep);
	}
} 