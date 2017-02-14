<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# ES2015 Features
##  The new cool stuff in JS
<article class="signature">
	<p class="signature-course">JavaScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="https://telerikacademy.com" class="signature-link">https://telerikacademy.com</a>
</article>

<!-- section start -->
<!-- attr: { id:'', showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- JavaScript History
  - The ECMAScript standard
- Variables
  - `var`, `let`, `const`
- Data Structures
  - `Set` and `WeakSet`
  - `Map` and `WeakMap`
- Async operations
  - Promises

<!-- attr: { id:'', showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- Modules
  - imports, exports, compatibility
- Strings
  - templated strings
  - `repeat()`, `startsWith()`, `endsWith()`, `includes()`
- Numbers
  - Binary, Octal and hexadecimal literals
  - Math methods

<!-- attr: { id:'', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Table of Contents -->
- Data Types
  - Symbols
- Objects
  - `Object.assign()`
  - Iterators
  - Properties
- Functions
  - Arrow functions
    - Preserving `this`
  - Generators

<!-- attr: { id:'', showInPresentation:true, hasScriptWrapper:true, style: "font-size: 0.9em" } -->
<!-- # Table of Contents -->
- Arrays
  - `Array.of()`
  - `Array.from()`
  - spread operator
- Destructuring assignments
  - Arrays
  - Objects
  - rest operator
- Parameters
  - Default
  - destructuring

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# JavaScript History
- **JavaScript** is a front-end scripting language developed by Netscape for dynamic content
  - Lightweight, but with limited capabilities
  - Can be used as object-oriented language
  - Embedded in your HTML page
  - Interpreted by the Web browser
- **Client-side**, **mobile** and **desktop** technology
- Simple and flexible
- Powerful to manipulate the DOM

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Using ES 2015
- There are a few ways to use ES 2015 today:
  - Most browsers already support it
  - Node.js 6.X and newer support it
  - For support for older browsers (IE 8, 9):
    - Transpilers: **Babel**, **Traceur**
- A compatibility table for ES2015 support can be found at https://kangax.github.io/compat-table/es6/

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# ES2015 Variables
- ES2015 introduces new ways to declare variables:
  - `let` - creates a scoped variable
    - Accessible only in its own scope

```javascript
for(let number of [1, 2, 3, 4]){
  console.log(number);
}
//accessing number here throws exception
```

  - `const` - creates a constant binding

```javascript
const MAX_VALUE = 16;
MAX_VALUE = 15; // throws exception
```

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Loops

- ES 2015 has a new kind of `for` loop
  - `for-of` iterates though the members of an array:

    ```javascript
    let numbers = [1, 2, 3, 5];
    for(let number of numbers) {
      console.log(`The number is ${number}`);
    }
    ```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Loops -->

  - Or iteratable objects (objects that have `Symbol.iterator`):
    - Discussed in detail later

    ```javascript
    const fib = {
      [Symbol.iterator]() {
        // magic code to return next Fibonacci number
      }
    };

	for(const n of fib) { /* ... */ }
    ```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Data Structures
- ES2015 supports maps and sets natively
  - They do pretty much the same as associative arrays, but in cleaner way:

    ```javascript
    let names = new Set();
    names.add('Doncho');
    names.add('Cuki');
    names.add('Steve');
    names.add('Martoo');
    names.add('Doncho'); // won't be added
    ```

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Templated Strings in ES2015
- ES2015 supports templated strings
  - i.e. strings with placeholders:

```javascript
let people = [new Person('Doncho', 'Minkov'), … ];
for (let person of people) {
   log(`Fullname: ${person.fname} ${person.lname}`);
}
```

  - Templates escape the strings
    - They do not call eval

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Arrow Functions
- Arrow functions easify the creation of functions:

```javascript
numbers.sort((a, b) => b - a);
```

```javascript
let fullnames =
   people.filter(function (person) {
     return person.age >= 18;
   }).map(function (person) {
     return person.fullname;
   });
```

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size: 0.9em' } -->
# Object Literals
- ES2015 adds a new feature (rule) to the way of defining properties:
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
let name = 'Doncho Minkov',
    age = 25;
let person = { name, age };
```

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size: 0.9em' } -->
# Destructuring Assignments
- Destructuring assignments allow to set values to objects in an easier way:
  - Destructuring assignments with arrays:

    ```javascript
    let [a, b] = [1, 2]; //a = 1, b = 2
    let [x, , y] = [1, 2, 3] // x = 1, y = 3
    let [first, second, ...rest] = people;
    ```

  - Swap values:

    ```javascript
    [x, y] = [y, x]
    ```

  - Result of method:

    ```javascript
    function get() { return [1, 2, 3]; }
    let [x, y] = get();
    ```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Destructuring Assignments -->
- Destructuring assignments allow to set values to objects in an easier way:
  - Destructuring assignments with objects:

```javascript
let person = {
  name: 'Doncho Minkov',
  address: {
    city: 'Sofia',
    street: 'Aleksander Malinov'
  }
};

let {name, address: {city}} = person;
```

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# ES2015 Modules
- ES2015 supports modules
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

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Extended parameter handling
- Simple and intuitive default values for function parameters
- Aggregation of remaining arguments into single parameter of variadic functions
- Spreading of elements of an interable collection

  ```javascript
  function f (x, y = 7, z = 42) { return x + y + z }
  f(1) // 50

  function f (x, y, ...a) { return (x + y) * a.length }
  f(1, 2, "hello", true, 7) // 9
  ```

<!-- Questions -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, showInPresentation:true, class:"slide-questions", id:"questions" } -->
<!-- # ES2015 Features
## Questions? -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size: 0.9em' } -->
# Free Trainings @ Telerik Academy
- "Web Design with HTML 5, CSS 3 and JavaScript" course @ Telerik Academy
  - [javascript course](http://academy.telerik.com/student-courses/web-design-and-ui/javascript-fundamentals/about)
- Telerik Software Academy
  - [https://telerikacademy.com](https://telerikacademy.com)
- Telerik Academy @ Facebook
  - [facebook.com/TelerikAcademy](https://facebook.com/TelerikAcademy)
- Telerik Software Academy Forums
  - [https://telerikacademy.com/Forum/Home](https://telerikacademy.com/Forum/Home)

<!-- <img class="slide-image" showInPresentation="false" src="imgs/pic00.png" style="top:58.18%; left:90.52%; width:16.97%; z-index:-1" /> -->
