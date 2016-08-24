(function () {
	"use strict";
	console.log("##Enhanced Object Literals");
	
	
	// New object features
	let p= 42

	var obj = {
		a: 1,
		p,   // shorthand is similar to p: p
		['b' + 2*3]: 'computed property',
		findMeaningOfLife(age) {
			return age<0 ? 0 : 42
		}
	}
	console.log(obj.b6)
	console.log(obj.findMeaningOfLife(1));


})();


