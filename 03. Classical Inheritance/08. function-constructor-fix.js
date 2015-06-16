function Person(name, age) {
	if (!(this instanceof arguments.callee)) {
		return new Person(name, age);
	}
	this.name = name;
	this.age = age;
}


var p1 = new Person('With new', 12);
var p3 = new Person('With new 2', 12);
var p2 = Person('Withoud new', 13);
console.log(p1);

console.log(p2);


console.log(p3);