(function () {
	"use strict";
	console.log("##Promise");

	// a slow function that returns data
	function findGuy() {
		sleep(100); // simulate a slow operation
		let guy = {
			isBad: Math.random() < 0.5
		}
		return guy
	}

	// create a promise
	let badGuyPromise = new Promise(
			function(resolve, reject) {
				let guy = findGuy()
				if (guy.isBad) {
					resolve("the guy is bad")
				} else {
					reject('the guy is ok')
				}
			}
	)

	badGuyPromise
			.then(badGuy => console.log(badGuy))
			.catch(msg => console.log(msg))


	// do not do this at home
	function sleep(milliseconds) {
		let start = new Date().getTime()
		while (true) {
			if ((new Date().getTime() - start) > milliseconds) break
		}
	}


})();


