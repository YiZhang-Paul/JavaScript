/* jslint esversion: 6 */
/**
 * manager class
 * handles all game assets
 */
class Manager {
	constructor() {
		this.totalFood = 0;
		//make all food
		this.makeAllFood();
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
		let gridWidth = game.maze.gridWidth;
		let xCord = gridWidth * (column + 0.5); 
		let yCord = gridWidth * (row + 0.5);
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
} 