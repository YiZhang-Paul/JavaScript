/* jslint esversion: 6 */
(() => {
	document.addEventListener("DOMContentLoaded", () => {
		//initialize and run game
		game.initialize();
		if(game.state == "initialized") {
			game.run();
		}
	});
})();