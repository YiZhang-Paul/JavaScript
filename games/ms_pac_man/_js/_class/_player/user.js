/* jslint esversion: 6 */
/**
 * user class
 */
class User extends Player {
	constructor() {
		super();
		this.name = "user";
		this.playerNum = 1;
		this.life = 3;
		this.highestScore = 0;
		this.totalStep = 3;
		this.speed = Math.round(game.maze.height* 0.00025 * 100) / 100;
		//initialize/reset user
		this.reset();
	}
	/**
	 * reset user
	 */
	reset() {
		super.reset();
		this.score = 0;
		this.step = 2;
	} 
	/**
	 * convert key code to direction
	 * @param int
	 *
	 * keyCode : key code to be converted
	 * 
	 * returns String
	 */
	keyCodeToDirection(keyCode) {
		let direction;
		switch(keyCode) {
			case control.W : case control.UP :
			case control.S : case control.DOWN :
				direction = keyCode == control.W || keyCode == control.UP ? "up" : "down";
				break;
			case control.A : case control.LEFT :
			case control.D : case control.RIGHT :
				direction = keyCode == control.A || keyCode == control.LEFT ? "left" : "right";
				break;
		}
		return direction;
	} 
	/**
	 * check if user can turn into new directions
	 * @param String
	 *
	 * direction : new direction to be checked
	 *
	 * returns boolean
	 */
	canTurn(direction) {
		let isOpposite = direction == this.findOpposite();
		let withinBoard = this.xCord >= 0 && this.xCord <= game.maze.width;
		let walkable = !this.hasWall(direction) && !this.hasDoor(direction);
		return isOpposite || (withinBoard && walkable && this.onCenter());
	} 
	/**
	 * check movement controls
	 */
	checkMoveKey() {
		if(control.keyPressed.length) {
			let keyCode = control.keyPressed[control.keyPressed.length - 1];
			//change direction
			let direction = this.keyCodeToDirection(keyCode);
			if(this.canTurn(direction)) {
				this.setDirection(direction);
			}
		}
	} 
	/**
	 * eat food 
	 */
	eatFood() {
		if(!this.centerDist) {
			let curGrid = this.currentTile();
			if(curGrid instanceof Food) {
				//special beans eaten
				if(curGrid instanceof PowerBean) {
					game.manager.beans.delete(curGrid);
					game.manager.aiManager.enterFlee();
				} else if(curGrid instanceof Fruit) {
					game.manager.fruits.delete(curGrid);
				}
				//record empty cell
				game.manager.emptyCells.push({row : curGrid.row, col : curGrid.column});
				//update and display score
				game.manager.scoreBoard.refreshScore(curGrid.score);
				curGrid.clear();
				grid.maze[0][curGrid.row][curGrid.column] = null;
				//check game end
				if(--game.manager.totalFood === 0) {
					game.manager.state.swapState("buffering");
				}
			}
		}
	} 
	/**
	 * find distance to a ghost
	 * @param float, float
	 *
	 * xCord : X-Coordinate of target ghost
	 * yCord : Y-Coordinate of target ghost
	 */
	distToGhost(xCord, yCord) {
		return Math.hypot((this.xCord - xCord), (this.yCord - yCord));
	} 
	/**
	 * eat ghost
	 */
	eatGhost() {
		game.manager.aiManager.ais.forEach(ghost => {
			if(ghost.state.activeState() == "flee") {
				//check distance to a ghost
				let distance = this.distToGhost(ghost.xCord, ghost.yCord);
				if(distance < game.maze.gridWidth * 0.5) {
					game.manager.scoreBoard.refreshScore(ghost.score);
					//enter retreat mode
					ghost.enterRetreat();
				}
			} 
		});
	} 
	/**
	 * determine user tile image crop location
	 * base on current direction and step 
	 */
	cropXY() {
		//determine crop index base on current direction
		let index;
		if(this.direction == "up") index = 0;	
		else if(this.direction == "down") index = 1;	
		else if(this.direction == "left") index = 2;	
		else if(this.direction == "right") index = 3;	
		//determine and update crop XY location
		let cropWidth = this.cropWidth + 2;
		this.cropX = (index * 3 + this.step) * cropWidth % 256 + 1;
		this.cropY = Math.floor((index * 3 + this.step) * cropWidth / 256) * cropWidth + 1;
	} 
	/**
	 * update user
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		this.animateOn = this.collideDist !== 0;
		//animate user
		this.animatePlayer();
		//check movment
		this.checkMoveKey();
		this.move(timeStep);
		//eat food
		this.eatFood();
		//eat ghost
		this.eatGhost();
	} 
} 