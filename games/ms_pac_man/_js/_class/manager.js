/* jslint esversion: 6 */
/**
 * manager class
 * handles all game assets
 */
class Manager {
	constructor() {
		this.user = null;
		this.aiManager = null;
		this.scoreBoard = null;
		this.totalFood = 0;
		this.powerBeans = new Set();
		this.fruits = new Set();
		this.emptyCells = [];
		this.timeoutHandler = null;
		this.fruitTimeout = null;
		this.intervalHandler = null;
		this.beanInterval = null;
		this.ctx = game.maze.playerCtx;
		this.state = null;
		//create a new game
		this.newGame();
	}
	/**
	 * reset manager
	 */
	reset() {
		this.powerBeans = new Set();
		this.fruits.forEach(fruit => fruit.clear());
		this.fruits = new Set();
		this.emptyCells = [];
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
		let food;
		if(type == "s") {
			food = new Bean(row, column);
		} else if(type == "l") {
			food = new PowerBean(row, column);
			this.powerBeans.add(food);
		}
		grid.maze[0][row][column] = food;
		this.totalFood++;
	} 
	/**
	 * generate all food on game start
	 */
	makeAllFood() {
		game.maze.fruitCtx.clearRect(0, 0, game.maze.width, game.maze.height);
		this.totalFood = 0;
		for(let i = 0; i < grid.row; i++) {
			for(let j = 0; j < grid.column; j++) {
				let curGrid = grid.getGrid(1, i, j);
				if(curGrid && curGrid.f) this.makeFood(i, j, curGrid.f);	
			}
		}
	} 
	/**
	 * place fruit
	 * @param int, int, int
	 *
	 * row    : row of food cell
	 * column : column of food cell
	 * type   : type of fruit
	 */
	putFruit(row, column, type) {
		let fruit = new Fruit(row, column, type);
		grid.maze[0][row][column] = fruit;
		this.fruits.add(fruit);
	} 
	/**
	 * put random fruit on random places
	 * on random interval
	 */
	randomFruit() {
		if(this.emptyCells.length > 40 && !this.fruitTimeout) {
			let timeout = Math.floor(Math.random() * 21 + 10) * 1000;
			let cellIndex = Math.floor(Math.random() * this.emptyCells.length);
			let cell = this.emptyCells[cellIndex];
			let type = Math.floor(Math.random() * 7 + 1);
			//record next fruit
			this.hud.fruitQueue.push(type);
			this.fruitTimeout = setTimeout(() => {
				this.putFruit(cell.row, cell.col, type);
				this.emptyCells.splice(cellIndex, 1);
				this.hud.fruitQueue.shift();
				//clear time out
				clearTimeout(this.fruitTimeout);
				this.fruitTimeout = null;
			}, timeout);
		}
	}
	/**
	 * blink all beans
	 */
	blinkBean() {
		if(!this.beanInterval) {
			this.beanInterval = setInterval(() => {
				this.powerBeans.forEach(bean => {
					bean.blink();
				});
			}, 150);
		}
	} 
	/**
	 * create new game
	 */
	newGame() {
		this.reset();
		//create all food
		this.makeAllFood();
		//all players
		this.user = new User();
		this.aiManager = new AIManager(["blinky", "pinky", "inky", "clyde"]);
		if(this.scoreBoard) {
			this.scoreBoard.reset();	
		} 
		this.scoreBoard = new ScoreBoard(this.user);
		this.hud = new HUD(this.user);
		this.state = new StateMachine(this, "ready");
	} 
	/**
	 * reset game
	 */
	resetGame() {
		this.reset();
		//create all food
		this.makeAllFood();	
		//reset assets and players
		this.user.reset();
		this.aiManager.reset();
		//reset score board
		this.scoreBoard.reset(); 
		this.hud.reset();
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
		if(this.fruitTimeout) {
			clearTimeout(this.fruitTimeout);
			this.fruitTimeout = null;
		}
		if(this.intervalHandler) {
			clearInterval(this.intervalHandler);
			this.intervalHandler = null;
		}
		if(this.beanInterval) {
			clearInterval(this.beanInterval);
			this.beanInterval = null;
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
	bufferEnd(callBackList, timeout = 3000) {
		if(!this.timeoutHandler) {
			this.timeoutHandler = setTimeout(() => {
				//clear time out and interval
				this.clearHandler();
				callBackList.forEach(set => {
					let caller = set[0];
					caller[set[1]]();
				});
			}, timeout);
		}
	} 
	/**
	 * game states
	 */
	//ready state
	ready() {
		this.blinkBean();
		this.scoreBoard.blink();
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
		//put random fruit
		this.randomFruit();
	}
	//buffering state
	buffering() {
		//clear user animation
		this.user.stopAnimation(2);
		//reset/create new game
		if(!this.totalFood) {
			this.bufferAnimation([[game.maze, "blink"]], 225);
			this.bufferEnd([[this, "resetGame"]]);
		} else if(!this.user.life) {
			this.bufferEnd([[this, "newGame"]]);
		} else {
			this.bufferEnd([[this, "resetGame"]]);
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
		this.fruits.forEach(fruit => {
			fruit.clear();
			fruit.draw();
		});
		this.hud.draw();		
	}
} 