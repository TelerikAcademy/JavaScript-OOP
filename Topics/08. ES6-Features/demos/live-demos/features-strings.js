/* globals console setTimeout document */

//templated string, string literals, multiline strings

let fullname = "John Doe";

console.log(fullname.startsWith("John"));
console.log(fullname.indexOf("John") === 0);

console.log(fullname.endsWith("John"));
console.log(fullname.endsWith("Doe"));
console.log(fullname.indexOf("Doe") === (fullname.length - "Doe".length));

console.log("-".repeat(20));
console.log(fullname.includes("John"));
console.log(fullname.includes("john"));
console.log(fullname.includes("n D"));
console.log(fullname.includes("Doe"));
console.log(fullname.indexOf("Doe") >= 0);