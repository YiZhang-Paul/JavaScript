/* jslint esversion: 6 */
/**
 * ball class
 * @param obj {}
 *
 * owner : current owner of the ball
 */
class Ball {
	constructor(owner) {
		this.owner = owner;
		this.moving = false;
		this.inCaptureRange = false;
		//ball stats
		this.radius = game.board.hBorder;
		this.minX = game.board.vBorder + game.manager.ai.width + this.radius;
		this.maxX = game.board.width - game.board.vBorder - game.manager.user.width - this.radius;
		this.minY = game.board.hBorder + this.radius;
		this.maxY = game.board.height - game.board.hBorder - this.radius;
		this.speed = Math.round(game.board.width * 0.0002 * 100) / 100;
		this.vDirection = null;
		this.hDirection = null;
		this.vVelocity = 0;
		this.hVelocity = 0;
		this.xCord = null;
		this.yCord = null;
		this.destinationY = null;
		this.ctx = game.board.playerCtx;
		//initialize/reset ball location and movement
		this.reset();
	}
	/**
	 * reset ball
	 */
	reset() {
		//reset ball location
		let distToBorder = game.board.vBorder + this.owner.width + this.radius;
		this.xCord = this.owner === game.manager.user ? game.board.width - distToBorder : distToBorder;
		this.yCord = game.board.height * 0.5;
		//reset ball movement
		this.vDirection = null;
		this.hDirection = null;
		this.vVelocity = 0;
		this.hVelocity = 0;
		//indicate ball stop
		this.moving = false;
	} 
	/**
	 * stick to owner
	 */
	stick() {
		this.yCord = this.owner.yCord + this.owner.height * 0.5;
	} 
	/**
	 * set initial movment speed 
	 * and initial direction
	 */
	initiateMove() {
		this.hDirection = this.owner === game.manager.user ? "left" : "right";
		this.hVelocity = this.speed;
		//set vertical speed depending on owner current direction
		if(this.owner.direction) {
			this.vDirection = this.owner.direction;
			this.vVelocity = this.owner.speed * 0.3;
		}
		//indicate ball moving
		this.moving = true;
	}
	/**
	 * move ball
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	move(timeStep) {
		let vVelocity = this.vVelocity * timeStep;
		let hVelocity = this.hVelocity * timeStep;
		//move vertically
		if(this.vDirection == "up") {
			this.yCord = Math.max(this.minY, this.yCord - vVelocity);
		} else if(this.vDirection == "down") {
			this.yCord = Math.min(this.yCord + vVelocity, this.maxY);
		}
		//move horizontally
		if(this.hDirection == "left") {
			this.xCord = this.inCaptureRange ? 
				Math.max(this.minX, this.xCord - hVelocity) : this.xCord - hVelocity;
		} else if(this.hDirection == "right") {
			this.xCord = this.inCaptureRange ?
			  Math.min(this.xCord + hVelocity, this.maxX) : this.xCord + hVelocity;
		}
		//calculate Y-Coordinate of end location
		if(this.hDirection == "left") {
			this.destinationY = this.endLocation();
		}
	} 
	/**
	 * bounce ball
	 */
	bounce() {
		//check collision on horizontal direction
		if(this.inCaptureRange) {
			if(this.xCord == this.minX || this.xCord == this.maxX) {
				this.hDirection = this.xCord == this.minX ? "right" : "left";
				//check moving direction of player collided with ball
				let finalDirect = this.hDirection == "right" ? game.manager.ai.direction : game.manager.user.direction; 
				//change ball speed base on its verical direction relative to player direction
				this.vVelocity = this.vDirection == finalDirect ? 
					Math.min(this.vVelocity * 1.5, this.speed * 3) : Math.max(this.speed * 0.2, this.vVelocity * 0.67);
				//change vertical moving direction 
				this.vDirection = finalDirect;
			}
		}
		//check collision on vertical direction
		if(this.yCord == this.minY || this.yCord == this.maxY) {
			this.vDirection = this.yCord == this.minY ? "down" : "up";
		}
	} 
	/**
	 * calculate Y-Coordinate of 
	 * ball's final location
	 *
	 * returns float
	 */
	endLocation() {
		let destinationY;
		if(!this.vVelocity) {
			destinationY = this.yCord;
		} else {
			let board = game.board;
			let distToPlayer = this.hDirection == "left" ? 
				this.xCord - this.minX : this.maxX - this.xCord;
			//find horizontal travel distance before first vertical bounce
			let vBounce1 = this.vDirection == "up" ? this.yCord - board.hBorder : board.height - this.yCord - board.hBorder;
			let hBounce1 = vBounce1 /	this.vVelocity * this.hVelocity;
			//check if a bounce will happen within game board area
			if(hBounce1 >= distToPlayer) {
				let scale = hBounce1 / (hBounce1 - distToPlayer);
				destinationY = this.vDirection == "up" ? this.yCord / scale : this.yCord * scale;
			} else {
				//horizontal travel distance for a full bounce
				let fullBounce = (board.height - board.hBorder * 2) / this.vVelocity * this.hVelocity;
				let totalBounce = Math.floor((distToPlayer - hBounce1) / fullBounce) + 1;
				//remaining vertical travel distance before going out of game board area
				let vDistance = (distToPlayer - hBounce1) % fullBounce / this.hVelocity * this.vVelocity;
				//final direction after all bounces
				let finalDir = totalBounce % 2 ? (this.vDirection == "up" ? "down" : "up") : this.vDirection;
				destinationY = finalDir == "up" ? board.height - board.hBorder - vDistance : board.hBorder + vDistance;
			}
		}
		return destinationY;
	} 
	/**
	 * update ball data
	 * @param float
	 *
	 * timeStep : game loop time step
	 */
	update(timeStep) {
		if(game.manager.state == "ready") {
			//stick to owner before game start
			this.stick();
		} else if(game.manager.state == "started") {
			//set initial speed and direction
			if(!this.moving) {
				this.initiateMove();
			}
			//move ball and check for bouncing
			this.move(timeStep);
			this.bounce();
		}
	} 
	/**
	 * draw ball
	 */
	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.xCord, this.yCord, this.radius, 0, 2 * Math.PI);
		this.ctx.fillStyle = "white";
		this.ctx.fill();
	}
} 