(function () {
	"use strict";
	console.log("##Generator");
	

	// putting * after function indicates that it is a generator
	function* oddsGenerator() {
		const max=10
		var odd = 1

		do {
			yield odd    // value to be returned
			odd += 2
		} while (odd < max)
	}

	var odds= oddsGenerator()
	for (let odd of odds) {
		console.log(odd)
	}


})();

