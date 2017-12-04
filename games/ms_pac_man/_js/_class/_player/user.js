/* jslint esversion: 6 */
class User extends Player {

	constructor() {
	
		super();
		this.name = "user";
		this.playerNumber = 1;
		this.life = 4;
		this.highestScore = 0;
		this.killCount = 0;
		this.totalTicks = 3;
		this.speed = Math.round(game.maze.height * 0.00025 * 100) / 100;
		this.reset();
	}

	reset() {

		super.reset();
		this.score = 0;
		this.tick = 2;
	}

	keyCodeToDirection(keyCode) {

		let direction;

		switch(keyCode) {

			case control.W : case control.UP :
			case control.S : case control.DOWN :

				direction = keyCode === control.W || keyCode === control.UP ? "up" : "down";
				break;

			case control.A : case control.LEFT :
			case control.D : case control.RIGHT :

				direction = keyCode === control.A || keyCode === control.LEFT ? "left" : "right";
				break;
		}

		return direction;
	}

	canTurn(direction) {

		const isOpposite = direction === this.getOppositeDirection();
		const inMazeArea = this.xCord >= 0 && this.xCord <= game.maze.width;
		const canMove = !this.hasWall(direction) && !this.hasDoor(direction);

		return isOpposite || (this.onGridCenter() && inMazeArea && canMove);
	}

	checkMoveKey() {

		const keyCode = control.getActiveKey();

		if(keyCode !== null) {

			const direction = this.keyCodeToDirection(keyCode);

			if(this.canTurn(direction)) {

				this.setDirection(direction);
			}
		}
	}

	eatFood() {

		if(!this.distanceToCenter) {

			let currentGrid = this.getPosition();

			if(currentGrid instanceof Food) {

				if(currentGrid instanceof PowerBean) {

					this.killCount = 0;
				}

				game.manager.totalFood--;
				game.manager.scoreBoard.updateScore(currentGrid.score);
				currentGrid.clear();
				//check game end
				if(game.manager.totalFood === 0) {

					game.manager.state.swapState("buffering");
				}
			}
		}
	}

	eatFruit() {

		let fruit = game.manager.activeFruit;

		if(fruit && fruit.row === this.row && fruit.column === this.column) {

			game.manager.scoreBoard.updateScore(fruit.score);
			game.manager.popUps.add(new ScorePopup(fruit.xCord, fruit.yCord, fruit.score));
			fruit.clear();
		}
	}

	distanceToGhost(ghost) {

		return Math.hypot((this.xCord - ghost.xCord), (this.yCord - ghost.yCord));
	}

	killGhost() {

		game.manager.aiManager.ais.forEach(ghost => {

			if(ghost.state.activeState() === "flee") {
				
				const distance = this.distanceToGhost(ghost);

				if(distance < game.maze.gridWidth * 0.5) {
				
					this.killCount = Math.min(this.killCount + 1, 4);
					const score = Math.pow(2, this.killCount - 1) * ghost.score;
					game.manager.scoreBoard.updateScore(score);
					game.manager.popUps.add(new ScorePopup(ghost.xCord, ghost.yCord, score));
					ghost.enterRetreat();
				}
			}
		});
	}

	getCropXY() {

		const index = ["up", "down", "left", "right"].indexOf(this.direction);
		this.cropX = (index * 3 + this.tick) * this.cropWidth % 256;
		this.cropY = Math.floor((index * 3 + this.tick) * this.cropWidth / 256) * this.cropWidth;
	}

	update(timeStep) {

		this.animationOn = this.collisionDistance !== 0;
		this.animatePlayer(this.totalTicks, 100, 0);
		//movment
		this.checkMoveKey();
		this.move(timeStep);
		//eat food and kill ghost
		this.eatFood();
		this.eatFruit();
		this.killGhost();
	} 
}