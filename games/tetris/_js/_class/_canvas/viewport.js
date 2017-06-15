/* jslint esversion: 6 */
/**
 * viewport class
 */
class Viewport extends GameCanvas {
	constructor() {
		super();
		//make canvas
		this.backCtx = this.makeCanvas(1, "view"); 
		this.gridCtx = this.makeCanvas(2, "view");
		//determine canvas dimension
		let viewDiv = document.getElementById("view");
		this.width = viewDiv.offsetWidth;
		this.height = viewDiv.offsetHeight;
		//determine border width
		let gridWidth = game.grid.gridWidth;
		this.vBorder = (this.width - game.grid.column * gridWidth) * 0.5; 
		this.hBorder = (this.height - game.grid.row * gridWidth) * 0.33;
		//draw canvas
		this.draw(); 
	}
	/**
	 * draw background
	 */
	drawBG() {
		this.backCtx.beginPath();
		this.backCtx.rect(0, 0, this.width, this.height);
		this.backCtx.fillStyle = "slategrey";
		this.backCtx.fill();
	} 
	/**
	 * draw grids
	 */
	drawGrid() {
		for(let i = 0; i < game.grid.logicGrid.length; i++) {
			for(let j = 0; j < game.grid.logicGrid[i].length; j++) {
				this.backCtx.beginPath();
				this.backCtx.rect(
					j * game.grid.gridWidth + this.vBorder, 
					i * game.grid.gridWidth + this.hBorder, 
					game.grid.gridWidth, 
					game.grid.gridWidth
				);
				this.backCtx.fillStyle = "midnightblue";
				this.backCtx.fill();
				this.backCtx.strokeStyle = "slategrey";
				this.backCtx.stroke();
			}
		}
	} 
	/**
	 * draw viewport
	 */
	draw() {
		this.backCtx.clearRect(0, 0, this.width, this.height);
		this.drawBG();
		this.drawGrid();
	} 
} 