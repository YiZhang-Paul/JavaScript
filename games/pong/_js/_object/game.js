/* jslint esversion: 6 */
/**
 * game object
 * main loop and core components
 */
let game = {
	state : null, //current game state
	monitor : {   //monitor spec
		"width"  : window.innerWidth,
		"height" : window.innerHeight
	}, 
	/**
	 * load game assets
	 */
	loadAsset() {
		//create game board
		this.board = new Board(this.monitor.width, this.monitor.height, 0.2, 0.01);
	}, 
	/**
	 * initialize game
	 */
	initialize() {
		this.loadAsset();
		/**
		 * game controls
		 */
		document.addEventListener("keydown", event => {
			let keyCode = event.keyCode;
			//track movement key pressed
			switch(keyCode) {
				case control.W :
				case control.UP :
				case control.S :
				case control.DOWN :
					if(!control.isDown(keyCode)) {
						control.keyPressed.push(keyCode);
					}
					break;
			}
		}); 
		document.addEventListener("keyup", event => {
			let keyCode = event.keyCode;
			//track movement key released
			switch(keyCode) {
				case control.W :
				case control.UP :
				case control.S :
				case control.DOWN :
				case control.SPACE :
					if(control.isDown(keyCode)) {
						control.keyPressed.splice(control.keyPressed.indexOf(keyCode), 1);
						control.keyReleased = keyCode;
					}
					break;
			}
		});
		//initialization successful
		this.state = "initialized";
	}, 
	/**
	 * run game
	 */
	run() {
		//fps optimization
		let maxFps = 60, 
		delta = 0, 
		lastFrameRender = 0;
		this.timeStep = Math.round(1000 / maxFps * 100) / 100;
		//main loop
		mainLoop = timestamp => {
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
			if(this.state == "running") this.draw();
			requestAnimationFrame(mainLoop);
		};
		//game running 
		requestAnimationFrame(mainLoop);
		this.state = "running";
	},
	/**
	 * stop game
	 */ 
	stop() {
		this.state = null;
	},
	/**
	 * update game
	 */ 
	update() {
		control.keyReleased = null;
	},
	/**
	 * draw game
	 */ 
	draw() {

	} 
};