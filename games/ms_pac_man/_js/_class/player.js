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
	 * retrieve center coordinate of 
	 * a given tile
	 *
	 * row    : row of given tile
	 * column : column of given tile
	 *
	 * returns array []
	 */
	centerCord(row, column) {
		return [(column + 0.5) * game.maze.gridWidth, (row + 0.5) * game.maze.gridWidth];
	} 
	/**
	 * check if player is on center
	 * of current grid 
	 *
	 * returns boolean
	 */
	onCenter() {
		let [centerX, centerY] = this.centerCord(this.row, this.column);
		return centerX == this.xCord && centerY == this.yCord;
	} 
	/**
	 * find distance to a grid
	 * @param int, int
	 *
	 * row    : row of target grid
	 * column : column of target grid
	 */
	distToTile(row, column) {
		let [centerX, centerY] = this.centerCord(row, column);
		return Math.hypot((centerX - this.xCord), (centerY - this.yCord));
	} 
	/**
	 * find opposite direction
	 * @param String
	 *
	 * direction : direction to find opposite for
	 *
	 * returns String
	 */
	findOpposite(direction) {
		switch(direction) {
			case "up" :
			case "down" :
				direction = direction == "up" ? "down" : "up";
				break;
			case "left" :
			case "right" :
				direction = direction == "left" ? "right" : "left";
				break;	
		}
		return direction;
	} 
	/**
	 * check adjacent tile on 
	 * current facing direction
	 * @param int, String
	 *
	 * layer     : layer of maze 
	 * direction : direction of adjacent tile (optional)
	 * 
	 * returns array []
	 */
	adjacentTile(layer, direction = this.direction) {
		let row = this.row, column = this.column;
		if(direction == "up" && this.row > 0) {
			row--;
		}	else if(direction == "down" && this.row + 1 < grid.row) {
			row++;	
		} else if(direction == "left" && this.column > 0) {
			column--;	
		} else if(direction == "right" && this.column + 1 < grid.column) {
			column++;	
		} else {
			return [null, null, null];	
		} 
		return [grid.getGrid(layer, row, column), row, column]; 
	} 
	/**
	 * detect wall existence on given direction
	 * @param String
	 *
	 * direction : direction to check
	 */
	hasWall(direction) {
		let adjacentTile = this.adjacentTile(1, direction)[0];
		return adjacentTile && adjacentTile.w;
	} 
} 