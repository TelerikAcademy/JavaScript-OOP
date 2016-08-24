(function () {
	"use strict";


	console.log('##Scope');

	// let/const have block scope
	const flag = true;  // notice the constant
	if (flag) {
		var a= 1;
		let b= 2;
	}

	console.log(1);
	//console.log(b);  // Will cause an error

	// no hoisting
	function f1() {
		console.log('c:', c);  // prints undefined
		//console.log('d:', d); // error
		var c=3;
		let d=4;
	}
	f1();

	// let with for loop, notice how is is scoped
	for (let i=0; i<4; i++) {
		console.log(i);
	}
	//console.log(i);  // error

})();

