/* jslint esversion: 6 */
class Manager {

	constructor() {

		this.user = null;
		this.aiManager = null;
		this.scoreBoard = null;
		this.totalFood = 0;
		this.powerBeans = new Set();
		this.popUps = new Set();
		this.activeFruit = null;
		this.emptyGrids = [];
		this.timeout = null;
		this.interval = null;
		this.fruitTimeout = null;
		this.fruitInterval = null;
		this.beanInterval = null;
		this.hudLoaded = false;
		this.state = null;
		this.newGame();
	}

	reset() {

		this.powerBeans = new Set();
		this.popUps = new Set();
		this.emptyGrids = [];

		if(this.activeFruit !== null) {

			this.activeFruit.dispose();
		}
	}

	newGame() {

		this.reset();
		this.setAllFood();
		this.user = new User();
		this.aiManager = new AIManager();

		if(this.scoreBoard) {

			this.scoreBoard.reset();
		}

		this.scoreBoard = new ScoreBoard(this.user);
		this.hud = new HUD(this.user);
		this.state = new StateMachine(this, "onCall");
	}

	resetGame() {

		this.reset();
		this.setAllFood();
		this.user.reset();
		this.aiManager.reset();
		this.scoreBoard.reset();
		this.hud.reset();
		game.maze.reset();
		this.state.reset();
	}

	resetRound() {
		//retain current user score
		const score = this.user.score;
		this.user.reset();
		this.user.score = score;
		this.aiManager.reset();
		this.scoreBoard.reset();
		this.hud.draw();
		game.maze.reset();
		this.state.reset();
		//clear current active fruit
		if(this.activeFruit) {

			this.activeFruit.dispose();
		}
	}
	/**
	 * set single food of given type on maze
	 */
	setFood(row, column, type) {

		let food = type === "l" ? new PowerBean(row, column) : new Bean(row, column);

		if(type === "l") {

			this.powerBeans.add(food);
		}

		gameGrid.setGrid(0, row, column, food);
		this.totalFood++;
		food.draw();
	}

	setAllFood() {

		game.canvas.food.clearRect(0, 0, game.mazeWidth, game.mazeHeight);
		this.totalFood = 0;

		for(let i = 0; i < gameGrid.rows; i++) {

			for(let j = 0; j < gameGrid.columns; j++) {

				let position = gameGrid.getGrid(1, i, j);

				if(position && position.hasOwnProperty("f")) {

					this.setFood(i, j, position.f);
				}
			}
		}
	}
	/**
	 * generate next fruit types in queue
	 */
	fillFruitQueue() {

		if(!this.fruitInterval) {

			this.fruitInterval = setInterval(() => {

				if(this.hud.fruitQueue.length < 5) {
					//pick random fruit type
					this.hud.enqueue(Math.floor(Math.random() * 7 + 1));
				}

			}, 15000);
		}
	}

	createFruit(type) {

		let row, column, direction;

		if(Math.random() < 0.5) {

			row = Math.random() < 0.5 ? 0 : gameGrid.rows - 1;
			column = Math.floor(Math.random() * (gameGrid.columns - 10)) + 5;
			direction = row === 0 ? "down" : "up";
		}
		else {

			row = Math.floor(Math.random() * (gameGrid.rows - 10)) + 5;
			column = Math.random() < 0.5 ? 0 : gameGrid.columns - 1;
			direction = column === 0 ? "right" : "left";
		}

		return new Fruit(row, column, type, direction);
	}

	setFruit() {

		if(this.hud.fruitQueue.length && !this.activeFruit && !this.fruitTimeout) {

			const delay = Math.floor(Math.random() * 10) + 10;

			this.fruitTimeout = setTimeout(() => {

				this.activeFruit = this.createFruit(this.hud.fruitQueue[0]);
				this.hud.dequeue();
				clearTimeout(this.fruitTimeout);
				this.fruitTimeout = null;

			}, delay * 1000);
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

	clearAllHandlers() {

		clearTimeout(this.timeout);
		this.timeout = null;
		clearTimeout(this.fruitTimeout);
		this.fruitTimeout = null;
		clearInterval(this.interval);
		this.interval = null;
		clearInterval(this.beanInterval);
		this.beanInterval = null;
		clearInterval(this.fruitInterval);
		this.fruitInterval = null;
	}

	bufferAnimation(callbacks, delay) {

		if(!this.interval) {

			this.interval = setInterval(() => {

				callbacks.forEach(set => {

					let caller = set[0];
					caller[set[1]]();
				});

			}, delay);
		}
	}

	bufferEnd(callbacks, delay = 1500) {

		if(!this.timeout) {

			this.timeout = setTimeout(() => {

				this.clearAllHandlers();

				callbacks.forEach(set => {

					let caller = set[0];
					caller[set[1]]();
				});

			}, delay);
		}
	}
	/**
	 * game states
	 */
	onCall() {

		this.blinkPowerBeans();
		this.scoreBoard.blink();

		if(!this.hudLoaded && this.hud.tile.complete) {

			this.hud.draw();
			this.hudLoaded = true;
		}
		//detect game start
		if(control.getActiveKey() !== null) {

			this.state.swap("ongoing");
			this.aiManager.initiateMove();
			this.aiManager.startAnimation();
		}
	}

	ongoing(timeStep) {

		this.aiManager.update(timeStep);
		this.user.update(timeStep);
		this.fillFruitQueue();
		this.setFruit();

		if(this.activeFruit) {

			this.activeFruit.update();
		}
	}

	onGhostKill(timeStep) {

		if(!this.timeout) {

			const delay = 5000;

			this.timeout = setTimeout(() => {

				clearTimeout(this.timeout);
				this.timeout = null;
				this.state.swap("ongoing");

				this.aiManager.ais.forEach(ai => {
					//add back lost time on flee state
					if(ai.state.peek() === "flee" || ai.state.peek() === "transition") {

						ai.fleeTimestamp += delay;
					}
				});

			}, delay);
		}

		this.aiManager.ais.forEach(ai => {

			if(ai.state.peek() === "retreat" && ai.name !== this.user.lastGhostKilled) {

				ai.update(timeStep);
			}
		});
	}

	onUserKill() {

		if(!this.timeout) {

			this.user.stopAnimation(2);

			this.timeout = setTimeout(() => {
				
				clearTimeout(this.timeout);
				this.timeout = null;
				this.state.swap("onUserDeath");

			}, 1500);
		}
	}

	onUserDeath() {

		this.user.playDeathAnimation();
	}

	resetting() {

		this.user.stopAnimation(2);

		if(!this.totalFood) {

			this.bufferAnimation([[game.maze, "blink"]], 225);
			this.bufferEnd([[this, "resetGame"]], 3000);
		}
		else if(!this.user.life) {

			this.bufferEnd([[this, "newGame"]]);
		}
		else {

			this.bufferEnd([[this, "resetRound"]]);
		}
	}

	update(timeStep) {

		this.state.update(timeStep);
	}

	drawPlayers() {

		if(this.state.peek() !== "onGhostKill") {

			this.user.draw();
		}

		if(!this.user.dying) {

			this.aiManager.draw();
		}
	}

	drawPopups() {

		this.popUps.forEach(popup => {

			if(popup.isAlive()) {

				popup.draw();
			}
			else {

				popup.dispose();
			}
		});
	}

	draw() {

		game.canvas.player.clearRect(0, 0, game.mazeWidth, game.mazeHeight);
		this.drawPlayers();
		this.drawPopups();

		if(this.activeFruit) {

			this.activeFruit.draw();
		}
	}
}