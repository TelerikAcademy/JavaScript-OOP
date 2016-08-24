/* globals console */

function numberToDigitNames(n) {
    let numberString = n.toString();
    let digitNames = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    let numberWithDigitNames = [];

    for (let digit of numberString) {
        numberWithDigitNames.push(digitNames[digit]);
    }

    return numberWithDigitNames.join("-");
}

console.log(`The function ${numberToDigitNames.name}() takes ${numberToDigitNames.length} parameters"`);

let numbers = [1, 12, 123, 1234, 12345, 123456, 1234567, 12345678, 123456789, 1234567890];

let numbersWithDigitNames = numbers.map(numberToDigitNames);

console.log(numbersWithDigitNames.join("\n"));