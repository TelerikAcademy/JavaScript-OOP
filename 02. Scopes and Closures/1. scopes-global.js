function stringRepeat(ch, times) {
	//global variable
	//'use strict' //solves this
	str = '';
	for (var i = 0; i < times; i += 1) {
		str += ch;
	}
	return str;
}

console.log(stringRepeat('-', 20));
console.log(str);