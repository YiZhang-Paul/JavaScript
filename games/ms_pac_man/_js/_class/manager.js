/* jslint esversion: 6 */
/**
 * manager class
 * handles all game assets
 */
class Manager {
	constructor() {
		this.totalFood = 0;
		//create a new game
		this.newGame();
		this.ctx = game.maze.playerCtx;
	}
	/**
	 * generate food
	 * @param int, int, String
	 *
	 * row    : row of food cell
	 * column : column of food cell
	 * type   : type of food
	 */
	makeFood(row, column, type) {
		let xCord = game.maze.gridWidth * (column + 0.5); 
		let yCord = game.maze.gridWidth * (row + 0.5);
		grid.maze[0][row][column] = new Food(xCord, yCord, type);
		this.totalFood++;
	} 
	/**
	 * generate all food on game start
	 */
	makeAllFood() {
		for(let i = 0; i < grid.row; i++) {
			for(let j = 0; j < grid.column; j++) {
				let curGrid = grid.getGrid(1, i, j);
				if(curGrid && curGrid.f) this.makeFood(i, j, curGrid.f);	
			}
		}
	} 
	/**
	 * create new game
	 */
	newGame() {
		//create all food
		this.makeAllFood();
		//all players
		this.user = new User();
	} 
	/**
	 * update assets and players
	 * @param float
	 * 
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		//update players
		this.user.update(timeStep);
	} 
	/**
	 * draw assets and players
	 */
	draw() {
		this.ctx.clearRect(0, 0, game.maze.width, game.maze.height);
		//draw players 
		this.user.draw();
	}
} 