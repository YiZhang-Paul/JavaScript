/* jslint esversion: 6 */
let game = {

	state      : null,
	timeStep   : null,
	gridWidth  : null,
	maze       : null,
	mazeWidth  : null,
	mazeHeight : null,
	manager    : null,
	directions : ["up", "down", "left", "right"],

	monitor : {

		width  : window.innerWidth,
		height : window.innerHeight 
	},

	canvas : {

		back   : null,
		food   : null,
		fruit  : null,
		player : null,
		ui     : null,
		popup  : null
	},
	/**
	 * calculate game grid width base on monitor dimensions
	 */
	getGridSize() {

		return this.monitor.width > this.monitor.height ? 
			Math.floor(this.monitor.height * 0.8 / gameGrid.rows) :
			Math.floor(this.monitor.width * 0.8 / gameGrid.columns);
	},

	getMazeSize() {

		this.gridWidth = this.getGridSize();
		this.mazeWidth = this.gridWidth * gameGrid.columns;
		this.mazeHeight = this.gridWidth * gameGrid.rows;
	},

	getCanvas(width, height, zIndex) {

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

		this.canvas.back = this.getCanvas(this.mazeWidth, this.mazeHeight, 1); 
		this.canvas.food = this.getCanvas(this.mazeWidth, this.mazeHeight, 2); 
		this.canvas.fruit = this.getCanvas(this.mazeWidth, this.mazeHeight, 3); 
		this.canvas.player = this.getCanvas(this.mazeWidth, this.mazeHeight, 4); 
		this.canvas.ui = this.getCanvas(this.mazeWidth, this.monitor.height, 5); 
		this.canvas.popup = this.getCanvas(this.mazeWidth, this.mazeHeight, 6); 
	},

	loadAsset() {

		gameGrid.getAccessibleGrids();
		this.getMazeSize();
		this.loadCanvas();
		this.maze = new Maze(this.mazeWidth, this.mazeHeight);
		this.manager = new Manager();
	},

	checkKeyDown() {

		document.addEventListener("keydown", event => {

			const keyCode = event.keyCode;
			//movement keys
			switch(keyCode) {

				case control.W : case control.UP :
				case control.S : case control.DOWN :
				case control.A : case control.LEFT :
				case control.D : case control.RIGHT :

					if(!control.isPressed(keyCode)) {

						control.keyPressed.push(keyCode);
					}

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

					if(control.isPressed(keyCode)) {

						const index = control.keyPressed.indexOf(keyCode);
						control.keyPressed.splice(index, 1);
					}

					break;
			}
		});
	},

	initialize() {

		this.loadAsset();
		//game controls
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
			//update delta time and record most recent render
			delta += timestamp - lastFrameRender;
			lastFrameRender = timestamp;
			//update game
			let counter = 0;

			while(delta	> this.timeStep) {

				this.update();
				delta = ++counter >= 240 ? 0 : delta - this.timeStep;
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