/* jslint esversion: 6 */
(() => {
	document.addEventListener("DOMContentLoaded", () => {
		//intialize and run game
		//game.initialize();
		if(game.state == "initialized") {
			game.run();
		}
	});
})();