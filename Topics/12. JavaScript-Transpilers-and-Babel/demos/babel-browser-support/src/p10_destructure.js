(function () {
	"use strict";
	console.log("##Destructure");

	var [a, b, c] = [1, 2, 'w'] ;  // a=1, b=2, c='w'

	// swap:
	var a=10;
	var b=20;
	[a, b] = [b, a];   // a=20, b=10

	// fields in function parameters
	var book = {
		id: 99,
		title: 'Stranger in a Strange Land',
		author: 'Robert Heinlein',
		year: 1961
	};

	var xx = {
		id: 42
	};

	function getId({id}) {
		return id
	}

	function formattedTitle({title, author}) {
		return title + ' by ' + author
	}

	console.log(getId(book));
	console.log(formattedTitle(book));

})();


