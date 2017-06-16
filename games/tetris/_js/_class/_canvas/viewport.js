/* jslint esversion: 6 */
/**
 * viewport class
 */
class Viewport extends GameCanvas {
	constructor() {
		super();
		this.allGridsWidth = game.grid.gridWidth * game.grid.column;
		this.allGridsHeight = game.grid.gridWidth * game.grid.row;
		//get viewport dimension
		this.getDimension();
		//adjust container div height
		this.adjustContainer();
		//make canvas
		this.backCtx = this.makeCanvas(1, "view");
		this.gridCtx = this.makeCanvas(2, "view");
		//draw canvas
		this.backColor = "darkgrey";
		this.lineColor = "grey";
		this.viewportBG = document.getElementById("viewBG");
		this.draw(); 
	}
	/**
	 * get viewport dimension
	 */
	getDimension() {
		let viewWidth = game.monitor.viewWidth;
		let viewHeight = game.monitor.viewHeight;
		//determine border width
		this.border = viewWidth > viewHeight ?
			(viewHeight - this.allGridsHeight) * 0.33 : (viewWidth - this.allGridsWidth) * 0.5;
		//determine canvas dimension
		this.width = this.allGridsWidth + 2 * this.border;
		this.height = this.allGridsHeight + 3 * this.border;
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
	 * clear viewport background
	 */
	clearBG() {
		this.backCtx.clearRect(0, 0, this.width, this.height);
	} 
	/**
	 * clear grid 
	 */
	clearGrid() {
		this.gridCtx.clearRect(0, 0, this.width, this.height);
	} 
	/**
	 * draw background
	 */
	drawBG() {
		this.backCtx.beginPath();
		this.backCtx.rect(0, 0, this.width, this.height);
		this.backCtx.globalAlpha = 0.65;
		this.backCtx.fillStyle = this.backColor;
		this.backCtx.fill();
		this.backCtx.save();
		this.backCtx.globalAlpha = 0.9;
		this.backCtx.drawImage(
			this.viewportBG, 
			this.border, 
			this.border,
			this.allGridsWidth,
			this.allGridsHeight
		);
		this.backCtx.restore();
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
				this.backCtx.strokeStyle = this.lineColor;
				this.backCtx.stroke();
			}
		}
	} 
	/**
	 * draw viewport
	 */
	draw() {
		this.clearBG();
		this.clearGrid();
		this.drawBG();
		this.drawGrid();
	} 
} 