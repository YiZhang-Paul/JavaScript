/* jslint esversion: 6 */
class AIManager {

	constructor(nameList) {

		this.ais = null;
		this.shelter = null;
		this.cooldown = 3000;
		this.lastAIOut = 0; 
		this.createAIs();
	}

	createAIs() {

		this.blinky = new Blinky(this);
		this.pinky = new Pinky(this);
		this.inky = new Inky(this);
		this.clyde = new Clyde(this);
		this.ais = [this.blinky, this.pinky, this.inky, this.clyde];
		this.shelter = new Set(this.ais.slice(1));
	}

	reset() {

		this.ais.forEach(ai => {

			ai.reset();
		});

		this.shelter = new Set(this.ais.slice(1));
	}

	resetCooldown() {

		this.lastAIOut = new Date();
	}

	onCooldown(cooldown = this.cooldown) {

		return new Date() - this.lastAIOut < cooldown;
	}

	initiateMove() {

		this.ais.forEach(ai => {

			setTimeout(() => {

				ai.moving = true;

			}, ai.state.activeState() === "outShelter" ? 1000 : this.cooldown);
		});
	}

	stopMove() {

		this.ais.forEach(ai => {

			ai.moving = false;
		});
	}

	startAnimate() {

		this.ais.forEach(ai => {

			ai.animationOn = true;
		});
	}

	enterFlee() {

		this.ais.forEach(ai => {

			let activeState = ai.state.activeState();

			if(activeState === "outShelter" || activeState === "flee") {
				
				ai.getCropXY = ai.fleeCropXY;
				ai.stopAnimation(0);
				ai.state.swapState("flee");

				if(activeState === "flee" && ai.timeoutHandler) {
					
					clearTimeout(ai.timeoutHandler);
					ai.timeoutHandler = null;
				}
			} 
		});
	}

	update(timeStep) {

		this.ais.forEach(ai => {

			ai.update(timeStep);
		});
	}

	draw() {

		this.ais.forEach(ai => {

			ai.draw();
		});
	} 
}