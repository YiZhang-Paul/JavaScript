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
		this.intervalHandler = null;
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
		this.aiManager = new AIManager(["blinky", "pinky", "inky", "clyde"]);
	} 
	/**
	 * reset game
	 */
	resetGame() {
		//create all food
		this.makeAllFood();	
		this.user.reset();
		this.aiManager.reset();
		game.maze.reset();
		this.state.reset();
	} 
	/**
	 * clear time out and interval
	 */
	clearHandler() {
		if(this.timeoutHandler) {
			clearTimeout(this.timeoutHandler);
			this.timeoutHandler = null;
		}
		if(this.intervalHandler) {
			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
		}
	} 
	/**
	 * play buffering animation
	 * @param array [], int
	 *
	 * callBackList : list containing caller and call back name 
	 * interval     : interval between each function call (ms)
	 */
	bufferAnimation(callBackList, interval) {
		if(!this.intervalHandler) {
			this.intervalHandler = setInterval(() => {
				callBackList.forEach(set => {
					let caller = set[0];
					caller[set[1]]();
				});
			}, interval);
		}
	} 
	/**
	 * action after buffer ends
	 * @param array [], int
	 *
	 * callBackList : list containing caller and call back name 
	 * timeout      : timeout to execute call back function (ms)
	 */
	bufferEnd(callBackList, timeout = 3500) {
		if(!this.timeoutHandler) {
			this.timeoutHandler = setTimeout(() => {
				callBackList.forEach(set => {
					let caller = set[0];
					caller[set[1]]();
				});
				//clear time out and interval
				this.clearHandler();
			}, timeout);
		}
	} 
	/**
	 * game states
	 */
	//ready state
	ready() {
		//detect game start
		if(control.keyPressed.length) {
			this.state.swapState("ongoing");
			this.aiManager.initiateMove();
			this.aiManager.startAnimate();
		}
	} 
	//ongoing state
	ongoing(timeStep) {
		this.aiManager.update(timeStep);
		this.user.update(timeStep);
	}
	//buffering state
	buffering() {
		//clear user animation
		this.user.stopAnimation(2);
		//reset/create new game
		if(!this.totalFood) {
			this.bufferAnimation([[game.maze, "blink"]], 550);
			this.bufferEnd([[this, "resetGame"]]);
		} else if(!this.user.life) {
			this.bufferEnd(this.newGame);
		} else {
			this.bufferEnd(this.user.respawn);
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
		this.aiManager.draw();
	}
} 