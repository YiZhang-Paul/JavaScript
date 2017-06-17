/* jslint esversion: 6 */
/**
 * game object
 * contains main loop
 */
let game = {
	state : null, //current game state
	monitor : {   //monitor spec
		"width"      : window.innerWidth,
		"height"     : window.innerHeight,
		"viewWidth"  : window.innerWidth * 0.4 * 0.4,
		"viewHeight" : window.innerHeight * 0.96 * 0.98
	},
	/**
	 * load game assets
	 */
	loadAsset() {
		//generate game grid
		this.grid = new Grid(25, 15); 
		//create viewport
		this.viewport = new Viewport();
		//brick manager
		this.brickManager = new BrickManager();
		//create game HUD
		this.hud = new HUD();
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
			if(keyCode != 123) event.preventDefault();
			//track movement key pressed
			switch(keyCode) {
				case control.W : case control.UP :
					control.recordKey(control.rotateKey, keyCode);
					control.recordKeyHeld(keyCode);
					break;
				case control.S : case control.DOWN :
				case control.A : case control.LEFT :
				case control.D : case control.RIGHT :
					control.recordKey(control.moveKey, keyCode);
					control.recordKeyHeld(keyCode);
					break;
			}
		}); 
		document.addEventListener("keyup", event => {
			let keyCode = event.keyCode;
			if(keyCode != 123) event.preventDefault();
			//track movement key released
			switch(keyCode) {
				case control.W : case control.UP :
				case control.S : case control.DOWN :
				case control.A : case control.LEFT :
				case control.D : case control.RIGHT :
				case control.SPACE :
					//record key released
					control.keyReleased = keyCode;
					control.recordKeyTap(keyCode);
					//remove key pressed
					control.removeKey(control.rotateKey, keyCode);
					control.removeKey(control.moveKey, keyCode);
					control.removeKeyHeld(keyCode);
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
		let maxFps = 30,
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
	 * reset game
	 */
	reset() {
		this.grid.reset();
		this.brickManager.reset();
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
		this.brickManager.update();
		control.keyReleased = null;
	},
	/**
	 * draw game
	 */ 
	draw() {
		this.viewport.draw();
		this.brickManager.draw();
		this.hud.notifyBricks();
	}  
}; 