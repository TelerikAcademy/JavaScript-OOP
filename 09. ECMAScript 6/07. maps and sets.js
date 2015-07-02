// set
let s = new Set();
s.add('hello')
    .add('goodbye')
    .add('hello');

console.log(`s.size = ${s.size}`);
console.log(`s.has('hello') = ${s.has("hello")}`);
for (let key of s.values())
{ // insertion order
    console.log(key);
}

// map
let m = new Map();
m.set('hello', 42);
m.set(s, 34);
console.log(`m.get(s) = ${m.get(s)}`);
console.log(`m.get(s) = ${m.get('hello')}`);
console.log(`m.size = ${m.size}`);
for (let [ key, val ] of m.entries()) {
    console.log(key + " = " + val);
}