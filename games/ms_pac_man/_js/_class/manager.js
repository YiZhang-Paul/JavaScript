/* jslint esversion: 6 */
/**
 * manager class
 * handles all game assets
 */
class Manager {
	constructor() {
		this.totalFood = 0;
		//create a new game
		this.newGame();
		this.ctx = game.maze.playerCtx;
		this.timeoutHandler = null;
		this.state = new StateMachine(this, "ready");
	}
	/**
	 * generate food
	 * @param int, int, char
	 *
	 * row    : row of food cell
	 * column : column of food cell
	 * type   : type of food
	 */
	makeFood(row, column, type) {
		grid.maze[0][row][column] = new Food(row, column, type);
		this.totalFood++;
	} 
	/**
	 * generate all food on game start
	 */
	makeAllFood() {
		for(let i = 0; i < grid.row; i++) {
			for(let j = 0; j < grid.column; j++) {
				let curGrid = grid.getGrid(1, i, j);
				if(curGrid && curGrid.f) this.makeFood(i, j, curGrid.f);	
			}
		}
	} 
	/**
	 * create new game
	 */
	newGame() {
		//create all food
		this.makeAllFood();
		//all players
		this.user = new User();
	} 
	/**
	 * reset game
	 */
	resetGame() {
		//create all food
		this.makeAllFood();	
		this.user.reset();
		this.state.reset();
	} 
	/**
	 * game states
	 */
	//ready state
	ready() {
		//detect game start
		if(control.keyPressed.length) {
			this.state.swapState("ongoing");
		}
	} 
	//ongoing state
	ongoing(timeStep) {
		this.user.update(timeStep);
	}
	//buffering state
	buffering() {
		//clear user animation
		this.user.stopAnimation();
		//start counter to reset/create new game
		if(!this.timeoutHandler) {
			this.timeoutHandler = setTimeout(() => {
				if(this.totalFood === 0) this.resetGame(); 
				else if(this.user.life === 0) this.newGame();
				else this.user.respawn(); 
				//clear time out
				clearTimeout(this.timeoutHandler);
				this.timeoutHandler = null;
			}, 3500);
		}
	}
	/**
	 * update assets and players
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		this.state.update(timeStep);
	} 
	/**
	 * draw assets and players
	 */
	draw() {
		this.ctx.clearRect(0, 0, game.maze.width, game.maze.height);
		//draw players 
		this.user.draw();
	}
} 