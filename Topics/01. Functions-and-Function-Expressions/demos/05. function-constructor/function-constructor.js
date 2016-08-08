var maxParams,
	maxBody,
	max;

maxParams = 'items';
maxBody =
	'var maxItem = items[0];' +
	'for (var i = 1; i < items.length; i += 1) {' +
	'	if (maxItem < items[i]) {' +
	'		maxItem = items[i];' +
	'	}' +
	'}' +
	'return maxItem;';
max = new Function(maxParams, maxBody);
console.log(max([1, 2, 3, 4]));