(function () {
	"use strict";
	console.log("##Function");
	

	// default parameters
	function address(city, state='MI', country='USA') {
		return {city, state, country}
	}

	console.log(address('Dayton', 'OH'));
	console.log(address('Detroit'));

	// Rest parameters
	function family(father, mother, ...children) {
		children = children.sort()
		return `${father} and ${mother} have ${children.length} children`
	}
	console.log(family('bill', 'belle', 'a', 'x', 'b'));


})();
