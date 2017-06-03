/* jslint esversion: 6 */
/**
 * player class
 */
class Player {
	constructor() {
		this.xCord = null;
		this.yCord = null;
		this.row = null;
		this.column = null;
		this.direction = null;
		this.speed = null;
	}
	/**
	 * track current grid location
	 */
	trackGrid() {
		this.row = Math.floor(this.yCord / game.maze.gridWidth); 
		this.column = Math.floor(this.xCord / game.maze.gridWidth);
	} 
	/**
	 * check current tile
	 * 
	 * returns obj {}
	 */
	currentTile() {
		return grid.getGrid(0, this.row, this.column);		
	} 
	/**
	 * check adjacent tile on 
	 * current facing direction
	 * @param int
	 *
	 * layer : layer of maze 
	 * 
	 * returns obj {}
	 */
	adjacentTile(layer) {
		let row = this.row, column = this.column;
		if(this.direction == "up" && this.row > 0) {
			row--;
		}	else if(this.direction == "down" && this.row + 1 < grid.row) {
			row++;	
		} else if(this.direction == "left" && this.column > 0) {
			column--;	
		} else if(this.direction == "right" && this.column + 1 < grid.column) {
			column++;	
		} else {
			return null;	
		} 
		return grid.getGrid(layer, row, column); 
	} 
} 