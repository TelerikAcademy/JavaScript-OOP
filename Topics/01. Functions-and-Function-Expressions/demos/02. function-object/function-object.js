function numberToDigitNames(number) {
	var digitNames,
		numberWithDigitNames,
		i,
		numberString;
	numberString = number.toString();
	digitNames = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
	numberWithDigitNames = [];
	for (i = 0; i < numberString.length; i += 1) {
		numberWithDigitNames.push(digitNames[numberString[i]]);
	}

	return numberWithDigitNames.join('-');
}

console.log('The function "' + numberToDigitNames.name + '()" takes ' + numberToDigitNames.length + ' parameters');

var numbers = [1, 12, 123, 1234, 12345, 123456, 1234567, 12345678, 123456789, 1234567890];

var numbersWithDigitNames = numbers.map(numberToDigitNames);

console.log(numbersWithDigitNames.join('\n'));