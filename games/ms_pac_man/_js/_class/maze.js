/* jslint esversion: 6 */
class Maze {

	constructor() {

		[this.width, this.height, this.gridWidth] = this.getDimension();
		//create game canvases
		this.backCtx = this.getCanvas(this.width, this.height, 1);
		this.foodCtx = this.getCanvas(this.width, this.height, 2);
		this.fruitCtx = this.getCanvas(this.width, this.height, 3);
		this.playerCtx = this.getCanvas(this.width, this.height, 4);
		this.uiCtx = this.getCanvas(this.width, game.monitor.height, 5);
		this.popUpCtx = this.getCanvas(this.width, this.height, 6); 
		//maze tile sets
		this.tick = 0;
		this.tanTile = document.getElementById("maze");
		this.clippedTile = document.getElementById("maze_clipped");
		this.draw();
	}

	getDimension() {

		const gridWidth = game.monitor.width > game.monitor.height ? 
			Math.floor(game.monitor.height * 0.8 / grid.row) :
			Math.floor(game.monitor.width * 0.8 / grid.column);

		return [gridWidth * grid.column, gridWidth * grid.row, gridWidth];
	}

	getCanvas(width, height, zIndex) {

		let canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";
		canvas.style.zIndex = zIndex;
		document.getElementById("board").appendChild(canvas);

		return canvas.getContext("2d");
	}
	
	reset() {

		this.tick = 0;
		this.draw();
	} 
	
	changeTick() {

		this.tick = this.tick ? 0 : 1;
	}
	
	blink() {

		this.changeTick();
		this.draw();
	}

	draw() {

		let tile = this.tick ? this.clippedTile : this.tanTile;
		this.backCtx.clearRect(0, 0, this.width, this.height);
		this.backCtx.drawImage(tile, 0, 0, this.width, this.height);
	} 
}