/* jslint esversion: 6 */
/**
 * AI manager class
 * @param array []
 *
 * nameList : list of ghost names
 */
class AIManager {
	constructor(nameList) {
		//create AIs
		this.blinky = new Blinky(this);
		this.pinky = new Pinky(this);
		this.inky = new Inky(this);
		this.clyde = new Clyde(this); 
		//all AIs
		this.ais = [this.blinky, this.pinky, this.inky, this.clyde];
		this.cell = new Set(this.ais.slice(1));
		//cooldown to move out cell
		this.cooldown = 3000;
		//time stamp of last AI moving out cell
		this.lastAIOut = 0; 
	}
	/**
	 * reset AIs
	 */
	reset() {
		this.ais.forEach(ai => {
			ai.reset();
		});
	} 
	/**
	 * reset cooldown
	 */
	resetCooldown() {
		this.lastAIOut = new Date();
	} 
	/**
	 * check cooldown for moving out cell
	 * @param int 
	 *
	 * cooldown : cooldown to move out cell (ms)
	 *
	 * returns boolean
	 */
	onCooldown(cooldown = this.cooldown) {
		return new Date() - this.lastAIOut < cooldown;
	}
	/**
	 * initiate move
	 */
	initiateMove() {
		this.ais.forEach(ai => {
			if(ai.state.activeState() == "outCell") {
				setTimeout(() => {
					ai.moving = true;
				}, 1000);
			} else {
				setTimeout(() => {
					ai.moving = true;
				}, this.cooldown);
			}
		});
	} 
	/**
	 * stop movement
	 */
	stopMove() {
		this.ais.forEach(ai => {
			ai.moving = false;
		});
	} 
	/**
	 * start animation
	 */
	startAnimate() {
		this.ais.forEach(ai => {
			ai.animateOn = true;
		});
	} 
	/**
	 * update AIs
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		this.ais.forEach(ai => {
			ai.update(timeStep);
		});
	} 
	/**
	 * draw AIs
	 */
	draw() {
		this.ais.forEach(ai => {
			ai.draw();
		});
	} 
} 