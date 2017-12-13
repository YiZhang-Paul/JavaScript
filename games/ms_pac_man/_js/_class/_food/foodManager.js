/* jslint esversion: 6 */
class FoodManager {

	constructor() {

		this.total = 0;
		this.powerBeans = new Set();
		this.fruit = null;
		this.fruitTimeout = null;
		this.fruitInterval = null;
		this.beanInterval = null;
		this.ctx = game.canvas.food;
		this.setBeans();
		this.blinkPowerBeans();
	}

	reset() {

		this.powerBeans = new Set();

		if(this.fruit !== null) {

			this.fruit.dispose();
		}
	}

	setBean(row, column, type) {

		let bean = type === "l" ? new PowerBean(row, column) : new Bean(row, column);

		if(type === "l") {

			this.powerBeans.add(bean);
		}

		grid.setNode(0, row, column, bean);
		this.total++;
		bean.draw();
	}

	setBeans() {

		this.total = 0;
		this.ctx.clearRect(0, 0, grid.width, grid.height);

		for(let i = 0; i < grid.rows; i++) {

			for(let j = 0; j < grid.columns; j++) {

				let node = grid.getNode(1, i, j);

				if(node.hasOwnProperty("f")) {

					this.setBean(i, j, node.f);
				}
			}
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

	createFruit(type) {

		let row, column, direction;

		if(Math.random() < 0.5) {

			row = Math.random() < 0.5 ? 0 : grid.rows - 1;
			column = Math.floor(Math.random() * (grid.columns - 10)) + 5;
			direction = row === 0 ? "down" : "up";
		}
		else {

			row = Math.floor(Math.random() * (grid.rows - 10)) + 5;
			column = Math.random() < 0.5 ? 0 : grid.columns - 1;
			direction = column === 0 ? "right" : "left";
		}

		return new Fruit(row, column, type, direction);
	}
	/**
	 * fill next fruit queue with random fruit type
	 */
	addFruitType() {

		if(!this.fruitInterval) {

			this.fruitInterval = setInterval(() => {

				let hud = game.manager.hud;

				if(hud.fruitQueue.length < 5) {

					hud.enqueue(Math.floor(Math.random() * 7 + 1));
				}

			}, 1000);//15000
		}
	}

	setNextFruit() {

		let hud = game.manager.hud;

		if(hud.fruitQueue.length && !this.fruit && !this.fruitTimeout) {

			const delay = Math.floor(Math.random() * 10 + 10);

			this.fruitTimeout = setTimeout(() => {

				this.fruit = this.createFruit(hud.fruitQueue[0]);
				hud.dequeue();
				clearTimeout(this.fruitTimeout);
				this.fruitTimeout = null;

			}, 1000);//delay * 1000
		}
	}

	update(timeStep) {

		this.addFruitType();
		this.setNextFruit();

		if(this.fruit !== null) {

			this.fruit.update(timeStep);
		}
	}

	draw() {

		if(this.fruit !== null) {

			this.fruit.draw();
		}
	}
}