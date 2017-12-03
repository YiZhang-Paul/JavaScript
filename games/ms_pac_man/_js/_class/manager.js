/* jslint esversion: 6 */
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
		this.hudShown = false;
		this.state = null;
		this.newGame();
	}

	reset() {

		this.powerBeans = new Set();
		this.fruits.forEach(fruit => fruit.clear());
		this.fruits = new Set();
		this.emptyCells = [];
	}

	makeFood(row, column, type) {

		let food = type === "s" ? new Bean(row, column) : new PowerBean(row, column);

		if(type === "l") {

			this.powerBeans.add(food);
		}

		grid.setGrid(0, row, column, food);
		this.totalFood++;
	}

	makeAllFood() {

		game.maze.fruitCtx.clearRect(0, 0, game.maze.width, game.maze.height);
		this.totalFood = 0;

		for(let i = 0; i < grid.row; i++) {

			for(let j = 0; j < grid.column; j++) {

				let currentGrid = grid.getGrid(1, i, j);

				if(currentGrid && currentGrid.hasOwnProperty("f")) {

					this.makeFood(i, j, currentGrid.f);
				}
			}
		}
	}

	putFruit(row, column, type) {

		let fruit = new Fruit(row, column, type);
		grid.setGrid(0, row, column, fruit);
		this.fruits.add(fruit);
	}

	putRandomFruit() {

		if(this.emptyCells.length > 40 && !this.fruitTimeout) {

			const timeout = Math.floor(Math.random() * 21 + 10) * 1000;
			const index = Math.floor(Math.random() * this.emptyCells.length);
			const type = Math.floor(Math.random() * 7 + 1);
			let cell = this.emptyCells[index];
			//record next fruit
			this.hud.enqueue(type);
			this.fruitTimeout = setTimeout(() => {

				this.putFruit(cell.row, cell.col, type);
				this.emptyCells.splice(index, 1);
				this.hud.dequeue();
				clearTimeout(this.fruitTimeout);
				this.fruitTimeout = null;

			}, timeout);
		}
	}

	blinkPowerBeans() {

		if(!this.beanInterval) {

			this.beanInterval = setInterval(() => {

				this.powerBeans.forEach(bean => {

					bean.blink();
				});

			}, 150);
		}
	}

	newGame() {

		this.reset();
		this.makeAllFood();
		this.user = new User();
		this.aiManager = new AIManager(["blinky", "pinky", "inky", "clyde"]);

		if(this.scoreBoard) {

			this.scoreBoard.reset();	
		} 

		this.scoreBoard = new ScoreBoard(this.user);
		this.hud = new HUD(this.user);
		this.state = new StateMachine(this, "ready");
	}

	resetGame() {

		this.reset();
		this.makeAllFood();
		this.user.reset();
		this.aiManager.reset();
		this.scoreBoard.reset(); 
		this.hud.reset();
		game.maze.reset();
		this.state.reset();
	}

	clearHandlers() {

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

	bufferEnd(callBackList, timeout = 3000) {

		if(!this.timeoutHandler) {

			this.timeoutHandler = setTimeout(() => {
				
				this.clearHandlers();

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
	ready() {

		this.blinkPowerBeans();
		this.scoreBoard.blink();

		if(!this.hudShown && this.hud.tile.complete) {

			this.hud.draw();
			this.hudShown = true;
		}
		//detect game start
		if(control.getActiveKey() !== null) {

			this.state.swapState("ongoing");
			this.aiManager.initiateMove();
			this.aiManager.startAnimate();
		}
	} 
	
	ongoing(timeStep) {

		this.aiManager.update(timeStep);
		this.user.update(timeStep);
		this.putRandomFruit();
	}
	
	buffering() {
		
		this.user.stopAnimation(2);

		if(!this.totalFood) {

			this.bufferAnimation([[game.maze, "blink"]], 225);
			this.bufferEnd([[this, "resetGame"]]);
		} 
		else if(!this.user.life) {

			this.bufferEnd([[this, "newGame"]]);
		} 
		else {

			this.bufferEnd([[this, "resetGame"]]);
		}
	}

	update(timeStep) {

		this.state.update(timeStep);
	}

	draw() {

		this.ctx.clearRect(0, 0, game.maze.width, game.maze.height);
		this.user.draw();
		this.aiManager.draw();	
	}
} 