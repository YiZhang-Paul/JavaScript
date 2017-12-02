/* jslint esversion: 6 */
let game = {

	state : null, //current game state
	monitor : {   //monitor spec

		"width"  : window.innerWidth,
		"height" : window.innerHeight
	},

	loadAsset() {

		this.maze = new Maze();
		this.manager = new Manager();
	},

	initialize() {

		this.loadAsset();
		/**
		 * game controls
		 */
		document.addEventListener("keydown", event => {
			
			let keyCode = event.keyCode;
			//track movement key pressed
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

		document.addEventListener("keyup", event => {
			
			let keyCode = event.keyCode;
			//track movement key released
			switch(keyCode) {

				case control.W : case control.UP :
				case control.S : case control.DOWN :
				case control.A : case control.LEFT :
				case control.D : case control.RIGHT :
				case control.SPACE :

					control.keyReleased = keyCode;

					if(control.isPressed(keyCode)) {

						control.keyPressed.splice(control.keyPressed.indexOf(keyCode), 1);
					}

					break;
			}
		});
		
		this.state = "initialized";
	},

	run() {
		//fps optimization
		let maxFps = 60, 
		delta = 0, 
		lastFrameRender = 0;
		this.timeStep = Math.round(1000 / maxFps * 100) / 100;
		
		let mainLoop = timestamp => {

			if(timestamp < lastFrameRender + this.timeStep) {
				
				requestAnimationFrame(mainLoop);
				return;
			}
			//update delta time and record most recent render
			delta += timestamp - lastFrameRender;
			lastFrameRender = timestamp;
			//update game
			let counter = 0;

			while(delta > this.timeStep) {

				this.update();
				//update delta time
				delta -= this.timeStep;
				counter++;

				if(counter >= 240) {

					delta = 0; //panic measurement
				}
			}
			//draw game
			if(this.state == "running") {

				this.draw();
			}

			requestAnimationFrame(mainLoop);
		};
		
		requestAnimationFrame(mainLoop);
		this.state = "running";
	},

	stop() {

		this.state = null;
	},

	update() {

		this.manager.update(this.timeStep);
		control.keyReleased = null;
	},

	draw() {
		
		this.manager.draw();
	} 
};