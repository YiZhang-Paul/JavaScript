/* jslint esversion: 6 */
/**
 * overlay class
 */
class Overlay {
	constructor() {
		this.overlay = this.createOverlay();
		//add event listeners
		this.overlay.addEventListener("click", event => {
			this.clickOverlay(event);
		});
		window.addEventListener("resize", () => {
			this.resizeOverlay();	
		});
		window.addEventListener("scroll", () => {
			this.scrollOverlay();
		});
	}
	/**
	 * create overlay
	 *
	 * returns obj {}
	 */
	createOverlay() {
		let overlay = document.createElement("div");
		overlay.id = "overlay";
		overlay.className = "overlay";
		//create container
		overlay.appendChild(this.createContainer());
		document.body.appendChild(overlay);
		return overlay;
	} 
	/** 
	 * create content holder
	 */
	createContainer() {
		let container = document.createElement("div");
		container.id = "container";
		container.className = "container";
		return container;
	} 
	/**
	 * handles brower events
	 */
	//click event
	clickOverlay(event) {
		//remove overlay and event listeners
		if(event.target.className == "overlay") {
			window.removeEventListener("resize", this.resizeOverlay);
			window.removeEventListener("scroll", this.scrollOverlay);
			let overlay = event.target;
			overlay.parentNode.removeChild(overlay);
		}
	}
	//resize event
	resizeOverlay() {
		this.overlay.style.width = window.innerWidth + "px";
		this.overlay.style.height = window.innerHeight + "px";
	}
	//scroll event
	scrollOverlay() {
		this.overlay.style.top = window.pageYOffset + "px";
		this.overlay.style.left = window.pageXOffset + "px";
	} 
} 