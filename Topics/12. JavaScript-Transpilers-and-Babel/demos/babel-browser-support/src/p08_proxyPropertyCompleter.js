(function () {
	"use strict";
	console.log("##Proxy property autocomplete");
	
	// suppose you have an object x that you want to set 
// a property graph on it like: x.y.z.w = 'hello'
	var x = {};
	x.y.z.w = 'hello'  // error: y is not defined

// you can do this:
	x = {
		y: {
			z: {
				w: 'hello'
			}
		}
	}
// which is tedious and NOT correct
// how if x.y was already defined, the above approach will override it!!

// Use proxy to handle the problem:
	var propertyHandler = {
		get(target, propName) {
			if (propName in target) return target[propName];
			target[propName] = new Proxy({}, propertyHandler)
			return target[propName]
		}
	}

	var obj = new Proxy({}, propertyHandler)
	obj.a.b.c = 'hello'

	console.log(obj)
	

})();

