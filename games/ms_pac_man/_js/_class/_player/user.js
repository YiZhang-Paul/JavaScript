/* jslint esversion: 6 */
/**
 * user class
 */
class User extends Player {
	constructor() {
		super();
		this.name = "user";
		this.life = 1;
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
	 * check movement controls
	 */
	checkMoveKey() {
		if(control.keyPressed.length) {
			let keyCode = control.keyPressed[control.keyPressed.length - 1];
			//change direction
			let direction = this.keyCodeToDirection(keyCode);
			if(direction == this.findOpposite()) {
				this.setDirection(direction);
			} else if(this.xCord >= 0 && this.xCord <= game.maze.width) {
				if(!this.hasWall(direction) && this.onCenter()) {
					this.setDirection(direction);
				}
			}
		}
	} 
	/**
	 * eat food 
	 */
	eatFood() {
		//check current grid
		if(this.centerDist === null) {
			let curGrid = this.currentTile();
			if(curGrid instanceof Food) {
				if(curGrid.type == "l") {
					game.manager.beans.delete(curGrid);
					game.manager.aiManager.enterFlee();
				}
				//update and display score
				this.score += curGrid.score;
				this.highestScore = Math.max(this.score, this.highestScore);
				game.manager.scoreBoard.draw();
				curGrid.clear();
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
		let gridWidth = game.maze.gridWidth;
		//check distance to a ghost
		game.manager.aiManager.ais.forEach(ghost => {
			let distance = this.distToGhost(ghost.xCord, ghost.yCord);
			if(ghost.state.activeState() == "flee" && distance < gridWidth * 0.5) {
				this.score += ghost.score;
				//change crop function
				ghost.cropXY = ghost.cropRetreatXY;
				ghost.stopAnimation(0);
				ghost.state.swapState("retreat");
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
		this.animateOn = this.collideDist === null;
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