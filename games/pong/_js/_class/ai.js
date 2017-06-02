/* jslint esversion: 6 */
/**
 * AI class
 */
class AI extends Player {
	constructor() {
		super();
		//initialize/reset AI location and direction
		this.reset();
	}
	/**
	 * reset AI
	 */
	reset() {
		//reset AI location
		this.xCord = game.board.vBorder; 
		this.yCord = (game.board.height - this.height) * 0.5;
		//reset direction
		this.direction = null;
	} 
	/**
	 * move AI
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	move() {

	} 
	/**
	 * set AI direction
	 */
	setDiretcion() {

	} 
	/**
	 * update AI data
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//check movement
		this.move(timeStep);
	} 
}