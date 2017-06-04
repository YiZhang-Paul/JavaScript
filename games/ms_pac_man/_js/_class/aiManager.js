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
		this.ais = [];
		nameList.forEach(name => {
			this.ais.push(new AI(name));
		});
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
	 * initiate move
	 */
	initiateMove() {
		this.ais.forEach(ai => {
			ai.moving = true;
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