/* jslint esversion: 6 */
class Manager {

	constructor() {

		this.state = null;
		this.maze = null;
		this.pacman = null;
		this.aiManager = null;
		this.foodManager = null;
		this.scoreBoard = null;
		this.popUps = new Set();
		this.timeout = null;
		this.interval = null;
		this.ctx = game.canvas.player;
		this.loadGame();
	}

	reset() {

		this.popUps = new Set();
		this.maze.reset();
		this.pacman.reset();
		this.aiManager.reset();
		this.scoreBoard.reset();
		this.state.reset();
	}

	loadGame() {

		this.popUps = new Set();
		this.maze = new Maze(grid.width, grid.height);
		this.pacman = new Pacman();
		//this.aiManager = new AIManager();
		this.foodManager = new FoodManager();
		this.hud = new HUD(this.pacman);

		if(this.scoreBoard) {

			this.scoreBoard.reset();
		}
		else {

			this.scoreBoard = new ScoreBoard(this.pacman);
		}

		this.state = new State(this, "loaded");
	}

	startGame() {

		if(control.activeKey !== null) {

			this.state.activeState = "ongoing";
		}
	}
	/**
	 * game states
	 */
	loaded() {

		this.hud.load();
		this.startGame();
	}

	ongoing(timeStep) {

		this.foodManager.update(timeStep);
	}

	update(timeStep) {

		this.state.update(timeStep);
	}

	drawPopUps() {

		this.popUps.forEach(popUp => {

			if(popUp.inDuration) {

				popUp.draw();
			}
			else {

				popUp.dispose();
			}
		});
	}

	draw() {

		this.ctx.clearRect(0, 0, grid.width, grid.height);
		this.foodManager.draw();
		this.drawPopUps();
	}
}