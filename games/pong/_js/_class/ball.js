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
	} 
	/**
	 * bounce ball
	 */
	bounce() {
		//check collision on horizontal direction
		if(this.inCaptureRange) {
			if(this.xCord == this.minX || this.xCord == this.maxX) {
				this.hDirection = this.xCord == this.minX ? "right" : "left";
			}
		}
		//check collision on vertical direction
		if(this.yCord == this.minY || this.yCord == this.maxY) {
			this.vDirection = this.yCord == this.minY ? "down" : "up";
		}
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