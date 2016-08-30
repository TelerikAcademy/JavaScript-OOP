<!-- section start -->




<!-- section start -->
<!-- attr: { id:'', showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- JavaScript History
  - The ECMAScript standard
- Variables
  - var, let, const
- Data Structures
  - `Set` and `WeakSet`
  - `Map` and `WeakMap`
- Async operations
  - Promises
  - Callbacks with arrow functions
- Modules
  - imports, exports, compitability
- Strings
  - templated strings
  - `repeat()`, `startsWith()`, `endsWith()`, `includes()`
- Numbers
  - Binary, Octal and hexadecimal literals
  - Math methods
- Functions
  - Arraw functions
    - Preserving `this`
  - Generators
- Arrays
  - `Array.of()`
  - `Array.from()`
  - spread operator
- Data Types
  - Symbols
- Objects
  - `Object.asign()`
  - Iterators
  - Properties
- Destructuring
  - Arrays
  - Objects
  - rest operator
- Parameters
  - Default
  - rest operator




<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# JavaScript History
- **JavaScript** is a front-end scripting language developed by Netscape for dynamic content
  - Lightweight, but with limited capabilities
  - Can be used as object-oriented language
  - Embedded in your HTML page
  - Interpreted by the Web browser
- **Client-side**, **mobile**and**desktop** technology
- Simple and flexible
- Powerful to manipulate the DOM




<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Using JavaScript.next
- There are a few ways to use JavaScript.next today
  - Enable tags in Chrome and Firefox
  - Compile to JavaScript 5 using Traceur or Babel	
- A compatibility table for ES6 support can be found at https://kangax.github.io/compat-table/es6/ 




<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# ES6 Variables
- ES6 introduces new ways to declare variables:
  - let – creates a scope variable
    - Accessible only in its scope

```javascript
for(let number of [1, 2, 3, 4]){
  console.log(number);
}
//accessing number here throws exception
```

  - const – creates a constant variable
    - Its value is read-only and cannot be changed

```javascript
const MAX_VALUE = 16;
MAX_VALUE = 15; // throws exception
```







<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# For-of loop

```javascript
The for-of loop iterates over the values
  Of an array
```

- function* generator(maxValue){
-   for(let i = 0; i < maxValue; i+=1) {
-     yield i;
-   }
- }
- let iter = generator(10);
- for(let val of iter()){
-   console.log(val);
- }

```javascript
let sum = 0;
for(let number of [1, 2, 3]) { 
  sum += number; }
```


```javascript
  Of An iteratable object
```







<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Templated Strings in ES6
- ES6 supports templated strings
  - i.e. strings with placeholders:

```javascript
let people = [new Person('Doncho', 'Minkov'), … ];
for (let person of people){
   log(`Fullname: ${person.fname} ${person.lname}`);
}
```

  - Templates escape the strings
    - They do not call eval




<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Classes and Inheritance in ES6
- ES6 introduces classes and a way to create classical OOP

```javascript
class Person extends Mammal {
  constructor(fname, lname, age) {
    super(age);
    this._fname = fname;
    this._lname = lname;
  }
  get fullname() {
    //getter property of fullname
  }
  set fullname(newfullname) {
    //setter property of fullname
  }
  // more class members…
}
```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Classes and Inheritance in ES6
- ES6 introduces classes and a way to create classical OOP

```javascript
class Person extends Mammal {
  constructor(fname, lname, age) {
    super(age);
    this._fname = fname;
    this._lname = lname;
  }
  get fullname() {
    //getter property of fullname
  }
  set fullname(newfullname) {
    //setter property of fullname
  }
  // more class members…
}
```

<div class="fragment balloon" style="top:35.42%; left:54.30%; width:41.45%">Constructor of the class</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Classes and Inheritance in ES6
- ES6 introduces classes and a way to create classical OOP

```javascript
class Person extends Mammal {
  constructor(fname, lname, age) {
    super(age);
    this._fname = fname;
    this._lname = lname;
  }
  get fullname() {
    //getter property of fullname
  }
  set fullname(newfullname) {
    //setter property of fullname
  }
  // more class members…
}
```

<div class="fragment balloon" style="top:56.84%; left:55.19%; width:41.45%">Getters and setters</div>
<div class="fragment balloon" style="top:35.42%; left:54.30%; width:41.45%">Constructor of the class</div>






<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Arrow Functions
- Arrow functions easify the creation of functions:


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Arrow Functions
- Arrow functions easify the creation of functions:

```javascript
numbers.sort(function(a, b){
  return b – a;
});
```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Arrow Functions
- Arrow functions easify the creation of functions:

```javascript
numbers.sort(function(a, b){
  return b – a;
});
```


```javascript
numbers.sort((a, b) => b – a);
```


```javascript
Becomes
```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Arrow Functions
- Arrow functions easify the creation of functions:

```javascript
numbers.sort(function(a, b){
  return b – a;
});
```


```javascript
numbers.sort((a, b) => b – a);
```


```javascript
var fullnames = 
   people.filter(function (person) {
     return person.age >= 18;
   }).map(function (person) {
     return person.fullname;
   });
```


```javascript
Becomes
```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Arrow Functions
- Arrow functions easify the creation of functions:

```javascript
numbers.sort(function(a, b){
  return b – a;
});
```


```javascript
numbers.sort((a, b) => b – a);
```


```javascript
var fullnames = 
   people.filter(function (person) {
     return person.age >= 18;
   }).map(function (person) {
     return person.fullname;
   });
```


```javascript
var fullnames2 = 
  people.filter(p => p.age >= 18)
    .map(p => p.fullname);
```


```javascript
Becomes
```


```javascript
Becomes
```







<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Object Literals
- ES6 adds a new feature (rule) to the way of defining properties:
  - Instead of 

```javascript
let name = 'Doncho Minkov',
    age = 25;
let person = {
  name: name,
  age: age
};
```

  - We can do just:

```javascript
let name = 'Doncho Minkov';
let person = {
  name,
  age
};
```







<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Destructuring Assignments
- Destructuring assignments allow to set values to objects in an easier way:
  - Destructuring assignments with arrays:

```javascript
var [a,b] = [1,2]; //a = 1, b = 2
var [x, , y] = [1, 2, 3] // x = 1, y = 3
var [first, second, ...rest] = people;
```

  - Swap values:

```javascript
[x, y] = [y, x]
```

  - Result of method:

```javascript
function get(){ return [1, 2, 3]; }
var [x, y] = get();
```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Destructuring Assignments
- Destructuring assignments allow to set values to objects in an easier way:
  - Destructuring assignments with objects:

```javascript
var person = {
  name: 'Doncho Minkov',
  address: {
    city: 'Sofia',
    street: 'Aleksander Malinov'
  }
};

var {name, address: {city}} = person;
```







<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Maps and Sets
- ES6 supports maps and sets natively
  - They do pretty much the same as associative arrays, but in cleaner way:

```javascript
let names = new Set();
names.add('Doncho');
names.add('Nikolay');
names.add('Ivaylo');
names.add('Evlogi'); 
names.add('Doncho'); // won't be added
```







<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# ES6 Modules
- ES6 supports modules
  - A way to write JavaScript in different files
    - Each file has its own scope (not the global)
    - Each file decides what to export from its module
  - Export the objects you want from a module:

```javascript
module.exports = {
    Person: Person,
    Mammal: Mammal
}
```

  - To use the module in another file:

```javascript
import classes from './persons'
import {Mammal, Person} form '.persons'
```


```javascript
persons.js
```







<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Extenden parameter handling
- Simple and intuitive default values for function parameters
- Aggregation of remaining arguments into single parameter of variadic functions
- Spreading of elements of an interable collection
- function f (x, y = 7, z = 42) { return x + y + z }
- f(1) // 50

```javascript
function f (x, y, ...a) { return (x + y) * a.length }
f(1, 2, "hello", true, 7) // 9
```


```javascript
var params = [ "hello", true, 7 ]
var other = [ 1, 2, ...params ]
f(1, 2, ...params) // 9
```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# JavaScript.next
- http://academy.telerik.com 




