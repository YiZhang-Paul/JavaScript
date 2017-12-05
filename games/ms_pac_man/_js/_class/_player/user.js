/* jslint esversion: 6 */
class User extends Player {

	constructor() {

		super("user");
		this.number = 1;
		this.life = 4;
		this.highScore = 0;
		this.killCount = 0;
		this.totalTicks = 3;
		this.speed = Math.round(game.maze.height * 0.025) / 100;
		this.dying = false;
		this.deathTimeout = null;
		this.deathInterval = null;
		this.reset();
	}

	reset() {

		super.reset();
		this.dying = false;
		this.score = 0;
		this.tick = 2;
	}

	keyCodeToDirection(keyCode) {

		switch(keyCode) {

			case control.W : case control.UP :
			case control.S : case control.DOWN :

				return keyCode === control.W || keyCode === control.UP ? "up" : "down";

			case control.A : case control.LEFT :
			case control.D : case control.RIGHT :

				return keyCode === control.A || keyCode === control.LEFT ? "left" : "right";
		}

		return this.direction;
	}

	isValidDirection(direction) {

		const isOpposite = direction === this.getOppositeWay();
		const inMazeArea = this.x >= 0 && this.x <= game.maze.width;
		const canMove = !this.hasWall(direction) && !this.hasDoor(direction);

		return isOpposite || (this.onGridCenter() && inMazeArea && canMove);
	}

	checkMoveKey() {

		const keyCode = control.getActiveKey();

		if(keyCode !== null) {

			const direction = this.keyCodeToDirection(keyCode);

			if(this.isValidDirection(direction)) {

				this.setDirection(direction);
			}
		}
	}

	distanceToGhost(ghost) {

		return Math.hypot((this.x - ghost.x), (this.y - ghost.y));
	}

	canKillGhost(ghost) {

		if(ghost.state.peek() !== "flee") {

			return false;
		}

		return this.distanceToGhost(ghost) < game.gridWidth * 0.5;
	}

	killGhost() {

		game.manager.aiManager.ais.forEach(ai => {

			if(this.canKillGhost(ai)) {
				//calculate score by total ghost kills during current visit 
				const score = Math.pow(2, this.killCount++ - 1) * ai.score;
				//display scores
				game.manager.scoreBoard.update(score);
				game.manager.popUps.add(new ScorePopup(ai.x, ai.y, score));
				game.manager.state.swap("ghostKilled");
				ai.enterRetreat();
			}
		});
	}

	consumeFood() {

		if(this.onGridCenter()) {

			let position = gameGrid.getGrid(0, this.row, this.column);

			if(position instanceof Food) {
				//refresh kill count on power bean consumption for ghost kill score calculation
				this.killCount = position instanceof PowerBean ? 0 : this.killCount;
				game.manager.scoreBoard.update(position.score);
				position.dispose();
				//check game end
				if(--game.manager.totalFood === 0) {

					game.manager.state.swap("resetting");
				}
			}
		}
	}

	consumeFruit() {

		let fruit = game.manager.activeFruit;

		if(fruit && fruit.row === this.row && fruit.column === this.column) {

			game.manager.scoreBoard.update(fruit.score);
			game.manager.popUps.add(new ScorePopup(fruit.x, fruit.y, fruit.score));
			fruit.dispose();
		}
	}
	/**
	 * determine user tile image crop location
	 */
	getCropLocation() {

		const index = game.directions.indexOf(this.direction);
		this.cropX = (index * 3 + this.tick) * this.cropWidth % 256;
		this.cropY = Math.floor((index * 3 + this.tick) * this.cropWidth / 256) * this.cropWidth;
	}
	/**
	 * determine user tile image crop location for death animation
	 */
	getDeathCropLocation(deathTick) {

		this.cropX = deathTick % 8 * this.cropWidth;
		this.cropY = (Math.floor(deathTick / 8) + 8) * this.cropWidth;
	}

	playDeathAnimation() {

		if(!this.deathTimeout && !this.deathInterval) {

			let deathTick = 0;
			this.dying = true;
			this.getDeathCropLocation(deathTick);

			this.deathTimeout = setTimeout(() => {

				this.deathInterval = setInterval(() => {

					this.getDeathCropLocation(++deathTick);

					if(deathTick === 13) {

						this.stopDeathAnimation();
					}

				}, 140);

			}, 1500);
		}
	}

	stopDeathAnimation() {

		clearTimeout(this.deathTimeout);
		this.deathTimeout = null;
		clearInterval(this.deathInterval);
		this.deathInterval = null;
		game.manager.state.swap("resetting");
	}

	update(timeStep) {

		this.animationOn = this.toCollision !== 0;
		this.playAnimation(this.totalTicks, 100, 0);
		//movement
		this.checkMoveKey();
		this.move(timeStep);
		//check food and ghost
		this.consumeFood();
		this.consumeFruit();
		this.killGhost();
	}
}