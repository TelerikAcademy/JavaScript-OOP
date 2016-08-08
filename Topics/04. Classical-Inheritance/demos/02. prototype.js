//adding a repeat method to the String type
String.prototype.repeat = function (count) {
	var str,
		pattern,
		i;
	pattern = String(this);
	if (!count) {
		return pattern;
	}
	str = '';
	for (i = 0; i < count; i += 1) {
		str += pattern;
	}
	return str;
};

console.log('-'.repeat(23));