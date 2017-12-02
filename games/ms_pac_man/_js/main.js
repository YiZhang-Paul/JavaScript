/* jslint esversion: 6 */
(() => {
	document.addEventListener("DOMContentLoaded", () => {

		game.initialize();

		if(game.state == "initialized") {

			game.run();
		}
	});
})();