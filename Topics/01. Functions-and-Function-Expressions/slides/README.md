<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Functions Declarations, Function Expressions and IIFEs
## Ways of creating functions, nested functions, IIFEs
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic00.png" style="top:48.48%; left:65.53%; width:38.79%; z-index:-1" /> -->
<div class="signature">
	<p class="signature-course">- JavaScript OOP</p>
	<p class="signature-initiative">
```javascript
Telerik Software Academy
```
</p>
	<a href="- http://academy.telerik.com " class="signature-link">- http://academy.telerik.com </a>
</div>




<!-- section start -->
<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
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
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic01.png" style="top:32.88%; left:65.96%; width:38.79%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->

- Recursion
  - Factorial example
  - Traversing the DOM
  - Recursion with expressions
- Nested functions
- Immediately-invoked function expressions
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic02.png" style="top:15.22%; left:67.55%; width:38.79%; z-index:-1" /> -->




<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Functions in JavaScript
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic03.png" style="top:35.60%; left:60.72%; width:35.21%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic04.png" style="top:35.60%; left:9.51%; width:37.91%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Functions in JavaScript
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Different function usages:
- function max (arr) {
-   var maxValue = arr[0];
-   for 	(var i = 1; i < arr.length; i++) {
-     maxValue = Math.max(maxValue, arr[i]);
-   }  
-   return maxValue;
- }
- function printMsg(msg){
-   console.log(msg);
- }


<!-- attr: { id:'', class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Functions in JavaScript
## [Demo]()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic05.png" style="top:32.44%; left:31.50%; width:46.43%; z-index:-1" /> -->




<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Function Object
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic06.png" style="top:35.75%; left:25.12%; width:58.44%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Function Object
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



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Function Object
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



<!-- attr: { id:'', class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Function Object
## [Demo]()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic07.png" style="top:18.88%; left:9.42%; width:88.04%; z-index:-1" /> -->




<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Defining Functions
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic08.png" style="top:33.76%; left:25.73%; width:57.30%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Creating Functions
- Many ways to create functions:
  - **Function declaration**:

```javascript
function printMsg (msg) {console.log(msg);}
```


```javascript
var printMsg = function () {console.log(msg);}
```


```javascript
var printMsg = new Function("msg",'console.log("msg");');
```

  - **Function expression**
  - With **function constructor**
- Since functions are quite special in JavaScript, they are loaded **as soon as possible**


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Function Declaration
- **Function declarations** use the function operator to create a function object
- Functions created with declaration are available anywhere in their scope
  - No matter where they are declared
  - This allows using a function before it is defined

```javascript
printMsg("Hello");
function printMsg(msg){
    console.log("Message: " + msg);
}
```



<!-- attr: { id:'', class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Function Declarations
## [Demo]()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic09.png" style="top:35.54%; left:27.30%; width:54.34%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Function Expression
- **Function expressions** are created using the function literal 
  - They are available where they are **defined**
    - And cannot be used beforehand
  - Can be invoked immediately
- The name of function expressions is optional
  - If the name is missing the function is **anonymous**

```javascript
var printMsg = function (msg){
    console.log("Message: " + msg);
} 
printMsg("Hello");
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Function expressions do not need an identifier
  - It is optional
  - Still it is better to define it for easier debugging
    - Otherwise the debuggers show **anonymous**
- Types of function expressions

```javascript
var printMsg = function (msg){
    console.log("Message: " + msg);
}
var printMsg = function printMsg(msg) {
 console.log("Message: " + msg);
}
(function(){…});
```



<!-- attr: { id:'', class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Function Expressions
## [Demo]()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic10.png" style="top:36.36%; left:20.49%; width:62.15%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Function Constructor
- Functions created with the **Function constructor**are similar to expressions
  - A constructor initializes a function object
  - Available when reached
- The function constructor form is:
  - _Example_
- Not commonly used
  - Suitable for dynamically generated code

```javascript
new Function([optional arguments],body);
```


```javascript
var printMsg = new Function("msg","console.log(msg);");
printMsg("Hello!");
```



<!-- attr: { id:'', class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Function Constructor
## [Demo]()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic11.png" style="top:51.22%; left:75.55%; width:27.55%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic12.png" style="top:51.22%; left:12.12%; width:27.44%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic13.png" style="top:7.91%; left:61.47%; width:31.74%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic14.png" style="top:7.91%; left:21.24%; width:29.09%; z-index:-1" /> -->




<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Function Properties
- Object
- Values
- Methods


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Function Properties
- Each function is an object
  - Created either with **declaration**, **expression** or **constructor**
- Functions have properties:
  - **function.length**
    - The **count of parameters** the function expects
    - The arguments object is not counted
  - **function.name**
    - **Identifier**of the function
    - Returns an empty string if anonymous 




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Function Methods
- Functions have methods as well
  - function**.toString****()**
    - Returns the code of the functions as a string
  - function**.call****(****obj****,** **args)**
    - Invokes the function with **this****set to****obj** and the given **args**
  - function**.apply****(****obj****,** **[arg1, arg2, …])**
    - Invokes the function with **this** **set to****obj** and the **arguments** are given as an array **[arg1, arg2, …]**
- Basically call and apply do the same
  - One gets **args**, the other gets **array of args**


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Call and Apply: _Example_s
- _Example_s:
  - **Math.max****(),****Math.min****()**

```javascript
//regular use:
max = Math.max(n1, n2, n3);
//with array:
var numbers = […];
max = Math.max.apply (Math, numbers);
min = Math.min.apply (Math, numbers);
```

  - **Array#slice**

```javascript
function sum(){
  var args = [].slice.call(arguments, 0);
  //here args is an array
  return args.reduce(function(s, n) {
    return s + n;
  }, 0);
}
```







<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Recursion
## Calling functions from themselves
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic15.png" style="top:31.66%; left:28.63%; width:51.83%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Recursion
- Functions can refer to themselves as call  to themselves
  - This is called recursion
- _Example_:

```javascript
function factorial(n){
  if(n === 0){
    return 1;
  }
  return factorial(n-1) * n;
}
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Recursion
- Functions can refer to themselves as call  to themselves
  - This is called recursion
- _Example_:

```javascript
function factorial(n){
  if(n === 0){
    return 1;
  }
  return factorial(n-1) * n;
}
```

<div class="fragment balloon" style="top:44.98%; left:47.74%; width:44.42%">A recursion must always have an exit condition!</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Recursion works quite well when:
  - **Traversing** data structures
    - Trees, matrices, graphs, DOM nodes
  - **Generating** combinations
  - **Generating** sequences
    - Fibonacci, factorial
- Every recursion can be replaced by enough loops, and form the so called iterative solution
  - Yet, in some cases using recursion is much simpler than using loops


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Recursion: Factorial

```javascript
function factorial(n){
  if(n === 0){
    return 1;
  }
  return factorial(n-1) * n;	
}
console.log(factorial(5));  //120
console.log(factorial(12)); //479001600
```

- Using recursion to calculate factorial numbers
  - Using the formula **F(N) = F(N-1) * N**


<!-- attr: { id:'', class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Factorial
## [Demo]()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic16.png" style="top:19.51%; left:4.98%; width:51.71%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Traversing the DOM
- Passing a root element
  - Each element print its **tag name** and invokes the same function for **each of its children**

```javascript
function traverse(element) {
  function traverseElement(element, spacing) {
    spacing = spacing || "  ";
    console.log(spacing + element.nodeName);
    var len = element.childNodes.length;
    for (var i = 0; i < len; i += 1) {
      var child = element.childNodes[i];
      if (child.nodeType === 1) {
        traverseElement(child, spacing + "--");
      }
    }
    console.log(spacing + "/" + element.nodeName);
  }
  traverseElement(element, "");
}
```



<!-- attr: { id:'', class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# DOM Traversal
## [Demo]()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic17.png" style="top:28.26%; left:10.82%; width:62.13%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
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


```javascript
fact(5);
```

  - Logs 120
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic18.png" style="top:38.21%; left:95.79%; width:6.47%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
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


```javascript
fact(5);
```


```javascript
var f = fact;
f(5);
```

  - Assign the function to a variable
  - Still logs 120
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic19.png" style="top:38.21%; left:95.79%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic20.png" style="top:47.37%; left:95.79%; width:6.47%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
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

  - Assign a number value to the original function
  - Throws TypeError (Number is not a function)
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic21.png" style="top:38.21%; left:95.79%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic22.png" style="top:47.37%; left:95.79%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic23.png" style="top:56.31%; left:95.80%; width:6.46%; z-index:-1" /> -->




<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- The previous example can be solved by **giving an identifier** to the function expression
  - Only the function itself can use this identifier

```javascript
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Nested Functions
- Functions can be declared everywhere in the JavaScript code
  - Even inside another function:

```javascript
funciton x(){
  function y() { /* solves international problems  */ }
}
```

  - Inner functions are available only inside their parent scope
    - i.e. y() can be called only from inside x()
  - Remark: every time x() is invoked, a new y() is created!




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Immediately Invoked Function Expressions
- In JavaScript, functions expressions can be **invoked immediately** after they are defined
  - Can be anonymous
  - Create a function scope
  - Don't pollute the global scope
  - Handle objects with the same identifier
- IIFE must be **always an expression**
  - Otherwise the browsers don't know what to do with the declaration


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Valid IIFE
- Valid IIFEs

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




<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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





<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Functions Declarations, Function Expressions and IIFEs
- http://academy.telerik.com




