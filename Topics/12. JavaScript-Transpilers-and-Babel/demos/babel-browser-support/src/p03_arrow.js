(function () {
	"use strict";
	console.log("##Arrow");
	
	
	// another way to define functions
	function add1(a,b) {
		return a+b;
	}

	var add2 = function(a,b) {
		return a+b;
	}

	var add3 = (a,b) => a+b;

	// use with array.map
	var numbers = [1, 2, 3, 4];

	var squares1= numbers.map(function(n) { return n*n; });
	var squares2= numbers.map(n => n*n);

	console.log(squares1);
	console.log(squares2);

	// Lexical "this"
	var div = {
		color: "red",
		children: [
			{id: "e1", color: "blue"},
			{id: "e2", color: "blue"}
		],
		setChildrenColor1: function() {
			this.children.forEach(function(child) {
				//child.color = this.color; //error b/c this not captured
			})
		},
		setChildrenColor2: function() {
			var that = this;
			this.children.forEach(function(child) {
				child.color = that.color;
			})
		},
		setChildrenColor3: function() {
			this.children.forEach(child => child.color = this.color);
		}
	}
	div.setChildrenColor1();
	console.log("after setChildrenColor1", div.children[0].color);
	div.setChildrenColor2();
	console.log("after setChildrenColor2", div.children[0].color);
	div.setChildrenColor3();
	console.log("after setChildrenColor3", div.children[0].color);
	

})();



