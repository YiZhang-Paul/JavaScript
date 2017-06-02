/* jslint esversion: 6 */
/**
 * game board class
 * @param float, float, float, float
 *
 * width   : game board width
 * height  : game board height
 * vBorder : vertical border width (%percentage width)
 * hBorder : horizontal border width (%percentage height)
 */
class Board {
	constructor(width, height, vBorder, hBorder) {
		this.width = width;
		this.height = height;
		this.vBorder = this.width * vBorder;
		this.hBorder = this.height * hBorder;
		//create canvas and retrieve drawing contexts
		this.backCtx = this.makeCanvas(this.width, this.height, 1);
		this.playerCtx = this.makeCanvas(this.width, this.height, 2);
		this.uiCtx = this.makeCanvas(this.width, this.height * 0.33, 3);
		//draw game board
		this.draw();
	}
	/**
	 * create canvas
	 * @param float, float, int
	 *
	 * width  : canvas width
	 * height : canvas height
	 * zIndex : canvas z-index
	 *
	 * returns obj {}
	 */
	makeCanvas(width, height, zIndex) {
		let canvas = document.createElement("canvas");
		canvas.style.zIndex = zIndex;
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";
		document.getElementById("board").appendChild(canvas);
		//return 2D drawing context
		return canvas.getContext("2d");
	} 
	/**
	 * draw game board
	 */
	draw() {
		this.backCtx.beginPath();
		//draw top and bottom borders
		this.backCtx.rect(this.vBorder, 0, this.width - this.vBorder * 2, this.hBorder);
		this.backCtx.rect(this.vBorder, this.height - this.hBorder, this.width - this.vBorder * 2, this.hBorder);
		//draw dotted line in between
		let dots = Math.floor(this.height / this.hBorder - 2);
		dots += dots % 2 ? 0 : 1;
		let dotWidth = this.hBorder;
		let dotHeight = (this.height - this.hBorder * 2) / dots;
		let center = (this.width - dotWidth) * 0.5;
		for(let i = 0; i < dots; i++) {
			if(i % 2 === 0) {
				this.backCtx.rect(center, (i + 1) * dotHeight, dotWidth, dotHeight);
			}
		}
		this.backCtx.fillStyle = "white";
		this.backCtx.fill();
	} 
}