<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Functions Declarations, Function Expressions and IIFEs
## Ways of creating functions, nested functions, IIFEs
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic00.png" style="top:48.48%; left:65.53%; width:38.79%; z-index:-1" /> -->
<article class="signature">
	<p class="signature-course">JavaScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com " class="signature-link">http://academy.telerik.com </a>
</div>


<!-- attr: { id:'', showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Functions in JavaScript](#js-functions)
- [Function object](#function-object)
- [Defining Functions](#defining-functions)
  - Function declarations
  - Function expressions
  - Function constructor
  - Expression vs. declaration
- [Function properties](#function-properties)
- [Function methods](#function-methods)

<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic01.png" style="top:32.88%; left:65.96%; width:38.79%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Table of Contents -->
- [Recursion](#recursion)
  - Factorial example
  - Traversing the DOM
  - Recursion with expressions
- [Nested functions](#nested-functions)
- [Immediately-invoked function expressions](#iifes)

<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic02.png" style="top:15.22%; left:67.55%; width:38.79%; z-index:-1" /> -->

<!-- section start -->

<!-- attr: { id:'js-functions', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Functions in JavaScript

<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic03.png" style="top:42.60%; left:60.72%; width:35.21%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic04.png" style="top:42.60%; left:9.51%; width:37.91%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style :"font-size:0.9em" } -->
<!-- # Functions in JavaScript -->
- Functions are small named snippets of code
  - Can be invoked using their identifier (name)
- Functions can take parameters
  - Parameters can be of **any type**
- Each function has two **implicit parameters**
  - `arguments`
    - Array-like object, has `[index]` and `length`
    - Contains all passed arguments
    - Contains information about the function: name, caller, etc...
  - `this` contains information about the context
    - Different depending on the way the function is used
- Function can return a result of **any type**
  - `undefined` is returned if `return` statement is missing

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Functions in JavaScript -->
- Different function usages:

  - _Example:_ Find max value in an array

    ```js
    function max (arr) {
      var maxValue = arr[0];
      arr.forEach((val) => maxValue = Math.max(maxValue, val));
      return maxValue;
    }
    ```

    ```js
    function printMsg(msg){
      console.log(msg);
    }
    ```

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Functions in JavaScript
## [Demo]() -->




<!-- section start -->

<!-- attr: { id:'function-object', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Function Object
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic06.png" style="top:42.75%; left:30.12%; width:38.44%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em;' } -->
<!-- # Function Object -->

- Functions in JavaScript are **First-class objects**
  - They can be assigned to variables and properties, passed as arguments and returned by other functions
  - They have properties of their own
    - `length`, `name`, `apply`, `call`, `bind` and more

- Functions are one of the **most powerful features** in JavaScript

```javascript
function max(arr){ /* ... */ }
console.log(max.length); //returns 1
console.log(max.name); //returns "max"
console.log((function(){}).name));
```


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function Object -->
- **Functions are objects** and they can be used as objects
  - Can be passed as arguments to functions
  - Can be stored in an array
  - Can be assigned to variable
  - Can be returned by another function

```javascript
var arr = [3, 2, 1, 3, 4, 5, 1, 2, 3, 4, 5, 7, 9];
function orderBy(x, y) { return x - y; }
arr.sort(orderBy);
//better to be done using anonymous function
//arr.sort(function(x, y){return x - y;});
//arr.sort((x, y) => x - y);
```

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function Object
## [Demo]() -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic07.png" style="top:56.88%; left:15.42%; width:70.04%; z-index:-1" /> -->


<!-- section start -->

<!-- attr: { id:'defining-functions', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Defining Functions -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic08.png" style="top:43.76%; left:28.73%; width:45.30%; z-index:-1" /> -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Creating Functions
- Many ways to create functions:
  - **Function declaration**:
```javascript
function printMsg (msg) { console.log(msg); }
```
  - **Function expression**
```javascript
var printMsg = function () { console.log(msg); }
```
  - With **function constructor**
```javascript
var printMsg = new Function("msg", 'console.log("msg");');
```
- Since functions are quite special in JavaScript, they are loaded **as soon as possible**

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style: "font-size:0.9em" } -->
# Function Declaration
- **Function declarations** use the `function` operator to create a function object
  - Functions created with a declaration are available anywhere in their scope
    - No matter where they are declared
    - This allows using a function above the declaration itself

  - _Example:_

    ```js
    printMsg("Hello");

    function printMsg(msg){
        console.log("Message: " + msg);
    }
    ```

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function Declarations
## [Demo]() -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic09.png" style="top:55.54%; left:35.30%; width:30.34%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style: "font-size:0.9em" } -->
# Function Expression
- **Function expressions** are created using the **function literal**
  - They are available in the code below they are **defined**
  - Can be invoked immediately
  - The name of function expressions is optional
    - If the name is missing the function is called **anonymous**

  - _Example:_

    ```js
    var printMsg = function (msg){
        console.log("Message: " + msg);
    }

    printMsg("Hello");
    ```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
<!-- # Function Expression -->

- Types of function expressions

```js
var printMsg = function (msg){
    console.log("Message: " + msg);
}
```

```js
var printMsg = function printMsg(msg) {
 console.log("Message: " + msg);
}
```

```js
(function(){/* ... */});
```

```js
var printMsg = (msg) => console.log(`Message: ${msg}`);
```


<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function Expressions
## [Demo]() -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.85em' } -->
# Function Constructors
- Functions created with the **Function constructor** are similar to expressions
  - A constructor initializes a function object
  - Available when reached
- The function constructor form is:
```js
new Function([optional arguments], body);
```
  - _Example_
```js
    var printMsg = new Function("msg", "console.log(msg);");
    printMsg("Hello!");
```
- Not commonly used
  - Suitable for dynamically generated code

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function Constructor
## [Demo]() -->


<!-- section start -->

<!-- attr: { id:'function-properties', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function Properties
## Object, Values, Methods -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Function Properties
- Each function is an object
  - Created either with **declaration**, **expression** or **constructor**
- Functions have properties:
  - `length`
    - The **count of parameters** the function expects
    - The arguments object is not counted
  - `name`
    - **Identifier** of the function
    - Returns an empty string if anonymous

<!-- section start -->

<!-- attr: { id:'function-methods', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function Methods -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style: "font-size: 0.9em" } -->
# Function Methods
- Functions have methods as well
  - `toString()`
    - Returns the code of the functions as a string
  - `call(context, arg0, arg1, ...)`
    - Invokes the function with `this` set to `context` and the given args: `arg0`, `arg1`, etc...
  - `apply(context, [arg0, arg1, …])`
    - Invokes the function with `this` set to `context` and the arguments are given as an array `[arg0, …]`
- Basically `call` and `apply` do the same
  - `call` gets the arguments separated by comma
  - `apply` gets the arguments as an array of objects

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Call and Apply
- `Math.max()`, `Math.min()`

  ```js
  //regular use:
  max = Math.max(n1, n2, n3);

  //with array:
  var numbers = [2, 1, 3, 45, 1, 2, 3, 111];
  max = Math.max.apply(null, numbers);
  min = Math.min.apply(null, numbers);
  ```

- `Array#slice`
  - Commonly used to convert array-like objects to arrays

  ```js
  function sum () {
    var args = [].slice.call(arguments);
    //here args is an array
    return args.reduce((s, n) => s + n, 0);
  }
  ```

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function Methods
## [Demo]() -->

<!-- section start -->
<!-- attr: { id:'recursion', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Recursion
## Calling functions from themselves -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic15.png" style="top:53.66%; left:32.63%; width:35.83%; z-index:-1" /> -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Recursion
- When a function calls themselves, this is called **recursion**

- _Example_:

```js
function factorial(n) {
  if(n === 0) {
    return 1;
  }

  return factorial(n-1) * n;
}
```

<div class="fragment balloon" style="top:44.98%; left:47.74%; width:28%">A recursion must always have an exit condition!</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Recursion -->
- Recursion works quite well when:
  - **Traversing** data structures
    - Trees, matrices, graphs, DOM nodes
  - **Generating** combinations
  - **Generating** sequences
    - Fibonacci, factorial
- Every recursion can be replaced by enough loops, and form the so called iterative solution
  - Yet, in some cases using recursion is much simpler than using loops

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Recursion: Factorial -->

- Calculating `n!`

```js
function factorial(n) {
  if(n === 0) {
    return 1;
  }

  return factorial(n-1) * n;
}

console.log(factorial(5));  //120
console.log(factorial(12)); //479001600
```

- Using recursion to calculate factorial numbers
  - Using the formula `F(N) = F(N-1) * N`


<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Factorial
## [Demo]() -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
<!-- # Traversing the DOM -->

- Traverse the DOM
  - Passing a root element
  - Each element print its **tag name** and invokes the same function for **each of its children**

```js
function traverse(element) {
  function traverseElement(node, spacing) {
    if (node.nodeType !== 1) {
      return;
    }

    spacing = spacing || " ";

    console.log(spacing + node.nodeName);
    [...node.childNodes].forEach(child => traverseElement(child, spacing + "--"));

    console.log(spacing + "/" + node.nodeName);
  }
  traverseElement(element, "");
}
```

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # DOM Traversal
## [Demo]() -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic17.png" style="top:35%; left:0%; width:52.13%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Recursion with Function Expression
- Recursion is simple enough with function declarations
  - But not so easy with function expressions

```javascript
var fact = function (n) {
  if (n === 0) {
    return 1;
  }
  return n * fact (n - 1);
};
```

<div class="fragment balloon" style="top:55%; left:47.74%; width:28%; font-size:0.9em">
```js
fact(5);
```
Logs 120
</div>
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic18.png" style="top:38.21%; left:95.79%; width:6.47%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Recursion with Function Expression
- Recursion is simple enough with function declarations
  - But not so easy with function expressions

```js
var fact = function (n) {
  if (n === 0) {
    return 1;
  }
  return n * fact (n - 1);
};
```

<div class="fragment balloon" style="top:50%; left:55%; width:35%; font-size:0.9em">
```javascript
var f = fact;
f(5);
```
Still logs 120
</div>
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic19.png" style="top:38.21%; left:95.79%; width:6.47%; z-index:-1" /> -->

- Assign the function to a variable



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Recursion with Function Expression
- Recursion is simple enough with function declarations
  - But not so easy with function expressions

```javascript
var fact = function (n) {
  if (n === 0) {
    return 1;
  }
  return n * fact (n - 1);
};
```

  - Assign a number value to the original function

<div class="fragment balloon" style="top:30%; left:50%; width:50%; font-size:0.9em">

```javascript
fact(5);
```


```javascript
var f = fact;
f(5);
```


```javascript
fact = 5;
f(5);
```
Throws TypeError (Number is not a function)
</div>
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic23.png" style="top:56.31%; left:95.80%; width:6.46%; z-index:-1" /> -->


<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Buggy Recursion with Function Expressions
## [Demo]() -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Recursion with Function Expression -->
- The previous example can be solved by **giving an identifier** to the function expression
  - Only the function itself can use this identifier

```js
var factorial = function factorial(n) {
  if (n == 1) {
    return 1;
  }
  return n * factorial (n - 1);
  //or use arguments.callee
};
var factorial2 = factorial;
factorial = 5;
console.log(factorial2(5)); //logs 120 - correct
```


<!-- section start -->

<!-- attr: { id:'nested-functions', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Nested Functions -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style: "font-size: 0.9em" } -->
# Nested Functions
- Functions can be declared everywhere in the JavaScript code
  - Even inside another function:

    ```js
      function x() {
          function y() { /* Solves World Problems  */ }
      }
    ```

  - Inner functions are available only inside their parent scope
    - i.e. `y()` can be called only from inside of `x()`
  - _Note_: every time `x()` is invoked, a new `y()` is created!


<!-- section start -->

<!-- attr: { id:'iifes', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Immediately Invoked<br/>Function Expressions -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Immediately Invoked<br/>Function Expressions
- In JavaScript, functions expressions can be **invoked immediately** after they are defined
  - Can be anonymous
  - Create a function scope
  - Don't pollute the global scope
  - Handle objects with the same identifier
- **IIFE** must be **always an expression**
  - Otherwise the browsers don't know what to do with the declaration


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Valid IIFE
- Valid **IIFEs**

    ```js
    var iife = function(){ console.log("invoked!"); }();
    (function(){ console.log("invoked!"); }());
    (function(){ console.log("invoked!"); })();
    !function(){ console.log("invoked!"); }();
    true && function(){console.log("invoked!"); }();
    1 + function(){console.log("invoked!"); }();
    ```

  - In all cases the browser must be explicitly told that the object before the `()` is an expression
- IIFEs are primary used to create function scope
  - And prevent naming collisions

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Immediately Invoked Function Expressions
## [Demo]() -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.95em' } -->
# Modules
- A module is the result that is returned from an IIFE
  - Allows hidden data
  - Evades the polluting of the global scope

```javascript
var getNextId = (function () {
  //lastId is available only inside the IIFE
  var lastId = 0;
  return function () {
    return lastId += 1;
  }
}());

console.log(getNextId());     //prints 1
console.log(getNextId());     //prints 2
console.log(lastId); //throws ReferenceError
```


<!-- Questions -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-questions", id:"questions" } -->
# Functions Declarations, Function Expressions and IIFEs
## Questions?


<!-- attr: { showInPresentation: true, hasScriptWrapper: true, style:'font-size: 0.9em' } -->
# Free Trainings<br/>@ Telerik Academy
- "Web Design with HTML 5, CSS 3 and JavaScript" course @ Telerik Academy
    - [javascript course](http://academy.telerik.com/student-courses/web-design-and-ui/javascript-fundamentals/about)
  - Telerik Software Academy
    - [academy.telerik.com](academy.telerik.com)
  - Telerik Academy @ Facebook
    - [facebook.com/TelerikAcademy](facebook.com/TelerikAcademy)
  - Telerik Software Academy Forums
    - [forums.academy.telerik.com](http://telerikacademy.com/Forum/Home)

<!-- <img class="slide-image" showInPresentation="true"  src="imgs/pic00.png" style="top:58.18%; left:90.52%; width:16.97%; z-index:-1" /> -->
