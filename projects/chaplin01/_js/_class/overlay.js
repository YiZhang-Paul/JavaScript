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
			let overlay = event.target;
			overlay.parentNode.removeChild(overlay);
		}
	}
} 