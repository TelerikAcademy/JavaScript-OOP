function outer(x) {
	function middle(y) {
		function inner(z) {
			return x + ' ' + y + ' ' + z;
		}
		return inner;
	}
	return middle;
}


var system = outer(4);
system = system(4);
system = system(2);
console.log('System ' + system);

var names = outer('Peter');
names = names('Georgiev');
names = names('Petrov');
console.log('Hi! I am ' + names);