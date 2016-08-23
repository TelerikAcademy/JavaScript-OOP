/* globals console*/

function sum(...items) {
    if (Array.isArray(items[0])) {
        items = items[0];
    }

    let itemsSum = 0;
    if (typeof items[0] !== "number") {
        itemsSum = "";
    }

    for (let item of items) {
        itemsSum += item;
    }

    return itemsSum;
}

console.log(sum([1, 2, 3, 4, 5, 6]));
console.log(sum(["Peter", " ", "Ivanov"]));