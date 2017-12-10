/* jslint esversion: 6 */
class AIManager {

	constructor() {

		this.names = ["blinky", "pinky", "inky", "sue"];
		this.ais = null;
		this.shelter = null;
		this.cooldown = 2000;
		this.lastAIOut = 0;
		this.loadAI();
	}

	reset() {

		this.ais.forEach(ai => {

			ai.reset();
		});

		this.shelter = new Set(this.ais.slice(1));
	}

	loadAI() {

		this.blinky = new Blinky(this);
		this.pinky = new Pinky(this);
		this.inky = new Inky(this);
		this.sue = new Sue(this);
		this.ais = [this.blinky, this.pinky, this.inky, this.sue];
		this.shelter = new Set(this.ais.slice(1));
	}
	/**
	 * set cooldown when AI leaves shelter
	 */
	setCooldown() {

		this.lastAIOut = new Date().getTime();
	}

	onCooldown(cooldown = this.cooldown) {

		return this.lastAIOut + cooldown > new Date().getTime();
	}
	/**
	 * initiate movement for all AIs on game start 
	 */
	initiateMove() {

		this.ais.forEach(ai => {

			let timeout = setTimeout(() => {

				clearTimeout(timeout);
				ai.moving = true;

			}, ai.state.peek() === "chasing" ? 1000 : this.cooldown);
		});
	}

	stopMove() {

		this.ais.forEach(ai => {

			ai.moving = false;
		});
	}

	startAnimation() {

		this.ais.forEach(ai => {

			ai.animationOn = true;
		});
	}
	/**
	 * trigger flee state for all AIs out of shelter
	 */
	triggerFlee() {

		this.ais.forEach(ai => {

			const state = ai.state.peek();

			if(new Set(["chasing", "flee", "transition"]).has(state)) {

				ai.getCropLocation = ai.fleeCropLocation;
				ai.stopAnimation(0);
				ai.movePath = null;
				//reset flee timer
				ai.fleeTimestamp = new Date().getTime();
				ai.state.swap("flee");
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