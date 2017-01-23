/* globals console */

let maxParams = "items";
let maxBody = `
let maxItem = items[0];
for (let item of items) {
	maxItem = Math.max(item, maxItem);
}
return maxItem;
`;

let maxFunc = new Function(maxParams, maxBody);
console.log(maxFunc([1, 2, 3, 4]));