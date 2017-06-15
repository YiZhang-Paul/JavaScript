/* jslint esversion: 6 */
/**
 * viewport class
 */
class Viewport extends GameCanvas {
	constructor() {
		super();
		//get viewport dimension
		this.border = null;
		this.getDimension();
		//adjust container div height
		this.adjustContainer();
		//make canvas
		this.backCtx = this.makeCanvas(1, "view"); 
		this.gridCtx = this.makeCanvas(2, "view");
		//draw canvas
		this.backColor = "slategrey";
		this.gridColor = "midnightblue";
		this.draw(); 
	}
	/**
	 * get viewport dimension
	 */
	getDimension() {
		let allGridsWidth = game.grid.gridWidth * game.grid.column;
		let allGridsHeight = game.grid.gridWidth * game.grid.row;
		let viewWidth = game.monitor.viewWidth;
		let viewHeight = game.monitor.viewHeight;
		//determine border width
		this.border = viewWidth > viewHeight ?
			(viewHeight - allGridsHeight) * 0.33 : (viewWidth - allGridsWidth) * 0.5;
		//determine canvas dimension
		this.width = allGridsWidth + 2 * this.border;
		this.height = allGridsHeight + 3 * this.border;
	} 
	/**
	 * adjust container dimension
	 */
	adjustContainer() {
		let container = document.getElementById("main");
		container.style.width = Math.floor(this.width / 0.4) + "px";
		container.style.height = Math.floor(this.height / 0.98) + "px";
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
		this.gridCtx.rect(0, 0, this.width, this.border);
		this.gridCtx.fillStyle = this.backColor;
		this.gridCtx.fill();
	} 
	/**
	 * draw background
	 */
	drawBG() {
		this.backCtx.beginPath();
		this.backCtx.rect(0, 0, this.width, this.height);
		this.backCtx.fillStyle = this.backColor;
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
					j * game.grid.gridWidth + this.border, 
					i * game.grid.gridWidth + this.border, 
					game.grid.gridWidth, 
					game.grid.gridWidth
				);
				this.backCtx.fillStyle = this.gridColor;
				this.backCtx.fill();
				this.backCtx.strokeStyle = this.backColor;
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