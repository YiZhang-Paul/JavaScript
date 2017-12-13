/* jslint esversion: 6 */
let utility = {

	getLast(enumerable) {

		return enumerable.slice(-1)[0];
	},

	getRandom(enumerable) {

		return enumerable[Math.floor(Math.random() * enumerable.length)];
	}
};