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
- Functions in JavaScript
- Function object
- Defining Functions
  - Function declarations
  - Function expressions
  - Function constructor
  - Expression vs. declaration
- Function properties
- Function methods

<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic01.png" style="top:32.88%; left:65.96%; width:38.79%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->

- Recursion
  - Factorial example
  - Traversing the DOM
  - Recursion with expressions
- Nested functions
- Immediately-invoked function expressions

<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic02.png" style="top:15.22%; left:67.55%; width:38.79%; z-index:-1" /> -->



<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Functions in JavaScript

<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic03.png" style="top:42.60%; left:60.72%; width:35.21%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic04.png" style="top:42.60%; left:9.51%; width:37.91%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Functions in JavaScript -->
- Functions are small named snippets of code 
  - Can be invoked using their identifier (name)
- Functions can take parameters
  - Parameters can be of **any type**
- Each function gets two special objects
  - **arguments** contains all passed arguments
  - **this** contains information about the context
    - Different depending of the way the function is used
- Function can return a result of **any type**
  - **undefined** is returned if no return statement


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Functions in JavaScript -->
- Different function usages:

```js
function max (arr) {
  var maxValue = arr[0];
  for 	(var i = 1; i < arr.length; i++) {
    maxValue = Math.max(maxValue, arr[i]);
  }  
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
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic05.png" style="top:32.44%; left:31.50%; width:46.43%; z-index:-1" /> -->



<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Function Object
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic06.png" style="top:42.75%; left:30.12%; width:38.44%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em;' } -->
<!-- # Function Object -->
- Functions are one of the **most powerful features** in JavaScript
  - And one of the **most important**
- **First-class functions**in JavaScript
  - They can be assigned to variables or properties, passed as arguments and returned by other  functions
  - They have properties of their own
    - **length**, **caller**, **name**, **apply**, **call**

```javascript
function max(arr){ … }
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
```

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function Object
## [Demo]() -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic07.png" style="top:56.88%; left:15.42%; width:70.04%; z-index:-1" /> -->



<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
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


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Function Declaration
- **Function declarations** use the `function` operator to create a function object
- Functions created with declaration are available anywhere in their scope
  - No matter where they are declared
  - This allows using a function before it is defined

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


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Function Expression
- **Function expressions** are created using the function literal 
  - They are available where they are **defined**
    - And cannot be used beforehand
  - Can be invoked immediately
- The name of function expressions is optional
  - If the name is missing the function is **anonymous**

```js
var printMsg = function (msg){
    console.log("Message: " + msg);
}

printMsg("Hello");
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
<!-- # Function Expression -->
- Function expressions do not need an identifier
  - It is optional
  - Still it is better to define it for easier debugging
    - Otherwise the debuggers show **anonymous**
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
(function(){…});
```


<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function Expressions
## [Demo]() -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.85em' } -->
# Function Constructor
- Functions created with the **Function constructor**are similar to expressions
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
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic11.png" style="top:51.22%; left:75.55%; width:27.55%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic12.png" style="top:51.22%; left:12.12%; width:27.44%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic13.png" style="top:7.91%; left:61.47%; width:31.74%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic14.png" style="top:7.91%; left:21.24%; width:29.09%; z-index:-1" /> -->




<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function Properties
## Object, Values, Methods -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Function Properties
- Each function is an object
  - Created either with **declaration**, **expression** or **constructor**
- Functions have properties:
  - **function.length**
    - The **count of parameters** the function expects
    - The arguments object is not counted
  - **function.name**
    - **Identifier** of the function
    - Returns an empty string if anonymous 


<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Function Methods
- Functions have methods as well
  - function**.toString()**
    - Returns the code of the functions as a string
  - function**.call(obj, args)**
    - Invokes the function with **this set to obj** and the given **args**
  - function**.apply(obj, [arg1, arg2, …])**
    - Invokes the function with **this set to obj** and the **arguments** are given as an array **[arg1, arg2, …]**
- Basically call and apply do the same
  - One gets **args**, the other gets **array of args**


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Call and Apply
- **Math.max()**, **Math.min()**

```js
//regular use:
max = Math.max(n1, n2, n3);
//with array:
var numbers = […];
max = Math.max.apply (Math, numbers);
min = Math.min.apply (Math, numbers);
```
  - **Array#slice**

```js
function sum(){
  var args = [].slice.call(arguments, 0);
  //here args is an array
  return args.reduce(function(s, n) {
    return s + n;
  }, 0);
}
```

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function Methods
## [Demo]() -->


<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Recursion
## Calling functions from themselves -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic15.png" style="top:53.66%; left:32.63%; width:35.83%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Recursion
- Functions can refer to themselves as call to themselves
  - This is called **recursion**
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
# Recursion: Factorial

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
  - Using the formula **F(N) = F(N-1) * N**


<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Factorial
## [Demo]() -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic16.png" style="top:45%; left:60%; width:40%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Traversing the DOM
- Passing a root element
  - Each element print its **tag name** and invokes the same function for **each of its children**

```js
function traverse(element) {
  function traverseElement(elem, spacing) {
    spacing = spacing || ' ';
    console.log(spacing + elem.nodeName);
    for (var i=0, len=elem.childNodes.length; i < len; i+=1) {
      var child = elem.childNodes[i];
      if (child.nodeType === 1) {
        traverseElement(child, spacing + '--');
      }
    }
    console.log(spacing + '/' + elem.nodeName);
  }
  traverseElement(element, '');
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
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Nested Functions
- Functions can be declared everywhere in the JavaScript code
  - Even inside another function:
```js
  function x() {
      function y() { /* solves international problems  */ }
  }
```
  - Inner functions are available only inside their parent scope
    - i.e. **y()** can be called only from inside **x()**
  - _Remark_: every time **x()** is invoked, a new **y()** is created!




<!-- section start -->
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
- Valid **IIFE**s

```javascript
var iife = function(){ console.log("invoked!"); }();
(function(){ console.log("invoked!"); }());
(function(){ console.log("invoked!"); })();
!function(){ console.log("invoked!"); }();
true && function(){console.log("invoked!"); }();
1 + function(){console.log("invoked!"); }();
```

  - In all cases the browser must be explicitly told that the thing before **()** is an expression
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