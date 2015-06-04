function sum(items) {
	var i,
		itemsSum;

	itemsSum = undefined;
	for (i = 0; i < items.length; i += 1) {
		itemsSum += items[i];
	}
	return itemsSum;
}

console.log(sum([1, 2, 3, 4, 5, 6]));
console.log(sum(['Peter', ' ', 'Ivanov']));