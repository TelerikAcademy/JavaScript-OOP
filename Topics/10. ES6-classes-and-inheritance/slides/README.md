<!-- section start -->




<!-- section start -->
<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Table of Contents
- JavaScript History
  - The ECMAScript standard
- Using JavaScript.Next
  - Running JavaScript.Next in the browsers
    - Chrome Harmony, Firefox Nightly
    - Compiling to JS5 – Traceur, Babel
- ECMAScript 6 features
  - Variables: var, let, const
  - OOP: classes, inheritance, super, get/set
  - Functions: generators, iterators, arrow functions, comprehensions, for-of


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- ECMAScript 6 features:
  - Data Structures: set/weakset, map/weakmap
  - Async operations: built-in promises
  - Modules: imports, exports, compitability
  - Objects: computed properties, shorthand properties, Object.is(), Object.assign(), proxies
  - Others: templates, Math and Number extensions




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Using JavaScript.next
- There are a few ways to use JavaScript.next today
  - Enable tags in Chrome and Firefox
  - Compile to JavaScript 5 using Traceur or Babel	
- A compatibility table for ES6 support can be found at https://kangax.github.io/compat-table/es6/ 




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Arrow Functions
- Arrow functions easify the creation of functions:


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Arrow Functions
- Arrow functions easify the creation of functions:

```javascript
numbers.sort(function(a, b){
  return b – a;
});
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# JavaScript.next
- http://academy.telerik.com 




