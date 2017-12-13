/* jslint esversion: 6 */
let game = {

	state      : null,
	timeStep   : null,
	maze       : null,
	manager    : null,
	directions : ["up", "down", "left", "right"],

	monitor : {

		width  : window.innerWidth,
		height : window.innerHeight 
	},

	canvas : {

		background    : null,
		food          : null,
		fruit         : null,
		player        : null,
		userInterface : null,
		scorePopUp    : null
	},

	createCanvas(width, height, zIndex) {

		let canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";
		canvas.style.zIndex = zIndex;
		document.getElementById("board").appendChild(canvas);

		return canvas.getContext("2d");
	},

	loadCanvas() {

		this.canvas.background = this.createCanvas(grid.width, grid.height, 1);
		this.canvas.food = this.createCanvas(grid.width, grid.height, 2);
		this.canvas.fruit = this.createCanvas(grid.width, grid.height, 3);
		this.canvas.player = this.createCanvas(grid.width, grid.height, 4);
		this.canvas.userInterface = this.createCanvas(grid.width, this.monitor.height, 5);
		this.canvas.scorePopUp = this.createCanvas(grid.width, grid.height, 6);
	},

	loadAsset() {

		grid.initialize(this.monitor);
		this.loadCanvas();
		this.maze = new Maze(grid.width, grid.height);
		this.manager = new Manager();
	},

	checkKeyDown() {

		document.addEventListener("keydown", event => {

			const keyCode = event.keyCode;

			switch(keyCode) {

				case control.W : case control.UP :
				case control.S : case control.DOWN :
				case control.A : case control.LEFT :
				case control.D : case control.RIGHT :

					control.push(keyCode);

					break;
			}
		});
	},

	checkKeyUp() {

		document.addEventListener("keyup", event => {

			const keyCode = event.keyCode;

			switch(keyCode) {

				case control.W : case control.UP :
				case control.S : case control.DOWN :
				case control.A : case control.LEFT :
				case control.D : case control.RIGHT :

					control.remove(keyCode);

					break;
			}
		});
	},

	initialize() {

		this.loadAsset();
		this.checkKeyDown();
		this.checkKeyUp();
		this.state = "initialized";
	},

	run() {
		//fps optimization
		const maxFPS = 60;
		let delta = 0;
		let lastFrameRender = 0;
		this.timeStep = Math.round(1000 / maxFPS * 100) / 100;
		
		const mainLoop = timestamp => {

			if(timestamp < lastFrameRender + this.timeStep) {

				requestAnimationFrame(mainLoop);

				return;
			}

			let totalUpdate = 0;
			//update delta time and record most recent render
			delta += timestamp - lastFrameRender;
			lastFrameRender = timestamp;

			while(delta	> this.timeStep) {

				this.update();
				delta = ++totalUpdate >= 240 ? 0 : delta - this.timeStep;
			}

			this.draw();
			requestAnimationFrame(mainLoop);
		};

		requestAnimationFrame(mainLoop);
		this.state = "running";
	},

	update() {

		this.manager.update(this.timeStep);
	},

	draw() {

		this.manager.draw();
	}
};