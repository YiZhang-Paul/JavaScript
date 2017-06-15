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
		this.bgColor = "slategrey";
		this.gridColor = "midnightblue";
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
	 * clear viewport
	 */
	clear() {
		this.gridCtx.clearRect(0, 0, this.width, this.height);
	} 
	/**
	 * draw top panel
	 */
	drawTopPanel() {
		this.gridCtx.beginPath();
		this.gridCtx.rect(0, 0, this.width, this.hBorder);
		this.gridCtx.fillStyle = this.bgColor;
		this.gridCtx.fill();
	} 
	/**
	 * draw background
	 */
	drawBG() {
		this.backCtx.beginPath();
		this.backCtx.rect(0, 0, this.width, this.height);
		this.backCtx.fillStyle = this.bgColor;
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
				this.backCtx.fillStyle = this.gridColor;
				this.backCtx.fill();
				this.backCtx.strokeStyle = this.bgColor;
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