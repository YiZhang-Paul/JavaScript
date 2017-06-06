/* jslint esversion: 6 */
/**
 * hud class
 * @param obj {}
 *
 * owner : user 
 */
class HUD {
	constructor(owner) {
		this.owner = owner;
		this.width = game.maze.width;
		this.height = (game.monitor.height - game.maze.height) * 0.5;
		this.fruitQueue = [];
		this.iconWidth = game.maze.gridWidth * 2;
		this.iconGap = this.height * 0.05; 
		this.tile = document.getElementById("player");
		this.ctx = game.maze.uiCtx;
	}
	/**
	 * reset HUD
	 */
	reset() {
		this.fruitQueue = [];
	}
	/**
	 * draw player icon
	 */
	playerIcon() {
		for(let i = 0; i < this.owner.life; i++) {
			this.ctx.drawImage(
				this.tile, 
				33, 
				33, 
				30, 
				30,
				i * (this.iconWidth + this.iconGap),
				game.monitor.height - this.height + this.iconGap,
				this.iconWidth, 
				this.iconWidth
			);
		}	
	} 
	/**
	 * draw fruit icon
	 */
	fruitIcon() {
		for(let i = this.fruitQueue.length - 1; i >= 0; i--) {
			this.ctx.drawImage(
				this.tile, 
				32 * (this.fruitQueue[i] - 1) + 1, 
				192, 
				30, 
				30,
				this.width - (this.fruitQueue.length - i) * (this.iconWidth + this.iconGap),
				game.monitor.height - this.height + this.iconGap,
				this.iconWidth, 
				this.iconWidth
			);
		}
	} 
	/**
	 * draw HUD
	 */
	draw() {
		this.ctx.clearRect(0, game.monitor.height - this.height, this.width, this.height);
		//display player remaining life
		this.playerIcon();
		//display next fruit available
		this.fruitIcon();
	} 
} 