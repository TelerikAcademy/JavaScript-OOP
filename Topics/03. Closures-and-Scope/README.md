<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Scopes and Closures
## Things start to get serious

<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic01.png" style="top:48.48%; left:65.53%; width:38.79%; z-index:-1" /> -->

<article class="signature">
	<p class="signature-course">JavaScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com " class="signature-link">http://academy.telerik.com </a>
</article>

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [Scopes](#scope)
  - Block and function scope
  - References availability
  - Resolving references through the scope chain
  - Alternatives in ES6
- [Closures](#closures)
  - What is a Closure?
  - How to deal with closures?
  - Simple modules


<!-- section start -->
<!-- attr: { id:'scope', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Scope

<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic03.png" style="top:45%; left:30.1%; width:40%; border-radius: 15px" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.85em' } -->
<!-- # Scope -->
- Scope is a place where variables are defined and can be accessed
- JavaScript has only two types of scopes
  - **Global scope** and **function scope**
    - **Global scope** is the same for the whole web page
    - **Function scope** is different per function
  - Everything outside of a function scope is inside of the global scope

```js
if(true) {
    var sum = 1 + 2;
}
console.log(sum);
```

<div class="fragment balloon" style="top:64.83%; left:46.52%; width:48.28%">The scope of the if is the global scope.<br/>`sum` is accessible from everywhere</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.8em' } -->
# Global Scope
- The global scope is the scope of the web page
  - Or the Node.js app
- Objects belong to the global scope if:
  - They are defined **outside of a function scope**
  - They are defined **without var**
    - Fixable with `'use strict'`

```js
function arrJoin(arr, separator) {
  separator = separator || "";
  arr = arr || [];
  arrString = "";
  for (var i = 0; i < arr.length; i += 1) {
    arrString += arr[i];
    if (i < arr.length - 1) arrString += separator;
  }
  return arrString;
}
```

<div class="fragment balloon" style="top:51.36%; left:59.00%; width:30.13%">**arr**, **separator** and **i** belong to the scope of **arrJoin**</div>

<div class="fragment balloon" style="top:85.57%; left:45.70%; width:29.13%">**arrString** and **arrJoin** belong to the global scope</div>



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->

- The global scope is one of the **very worst parts**of JavaScript
  - Every object pollutes the global scope, making itself more visible
  - If two objects with the same identifier appear, the first one will be overridden


<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Global Scope
## [Demo]() -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.8em' } -->
# Function Scope
- JavaScript **does not have a block scope** like other programming languages (C#, Java, C++)
  - **{** and **}** does not create a scope!
- Yet, JavaScript has a function scope
  - **Function expressions and declarations** create scope

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.8em' } -->
<!-- # Function Scope - _Example_ -->

```js
if(true) { 
  var result = 5;
}
console.log(result); // logs 5
```

```js
if(true) {
  (function(){ 
    var result = 5;
  })();
}
console.log(result); // ReferenceError
```

```js
function logResult (){ 
  var result = 5;
}
if(true) { 
  logResult();
}
console.log(result);  // ReferenceError
```



<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Function Scope
## [Demo]() -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.85em' } -->
# Resolving References<br/>through the Scope Chain
- JavaScript resolves the object references due to the simple rule "**Closer is better**":
  - if a function `outer()` declares object **x**, and its nested function `inner()` declares object **x**:
    - `outer()` holds a reference to the **outer x**
    - `inner()` holds a reference to the **inner x**

```js
function outer() { 
  var x = 'OUTER';
  function inner() {
    var x = 'INNER';
    return x;
  }
  inner();
  return { x: x, f: inner };
}
```


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.8em' } -->
# ECMAScript 6<br/>Way of Working with Scopes
- ECMAScript 6 introduces a new way to handle scopes:
  - The key word '`let`'
- `let` is much like `var` - creates a variable
- But, **`let` creates a block scope**

```js
if(false) {
  var x = 5;
  let y = 6;
  const z = 7;
}

console.log(x); // prints undefined
console.log(y); // throws error - y is block scoped because of let
console.log(z); // throws error - z is block scoped because of const
```


<!-- section start -->
<!-- attr: { id:'closures', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Closures
<!-- <img class="slide-image" showInPresentation="true" src="imgs\closures.png" style="top:45%; left:32.5%; width:35%; border-radius: 15px" /> -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
<!-- # Closures -->
- Closures are a special kind of structure  
  - They combine a function and the context of this function

```js
function outer(x) {
  function inner(y) {
    return x + " " + y;
  }

  return inner;
}
```

<div class="fragment balloon" style="top:35.85%; left:42.49%; width:25%">**inner()** forms a closure. It holds a reference to **x**</div>

```js
var f1 = outer(5);
console.log(f1(7)); // outputs 5 7
```

<div class="fragment balloon" style="top:57.01%; left:54.22%; width:21%">In the context of f1, **x has value 5**</div>


```js
var f2 = outer("Peter");
console.log(f2("Petrov"));  // outputs Peter Petrov
```
<div class="fragment balloon" style="top:72%; left:63.83%; width:21%">In the context of f2, **x has value "Peter"**</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.8em' } -->
# Closures Usage
- Closures can be used for **data hiding** (**encapsulation**)
  - Make objects invisible to the outside world
    - Make them private

```js
var school = (function() {
    var students = [];
    var teachers = [];
    function addStudent(name, grade) {...}
    function addTeacher(name, speciality) {...}
    function getTeachers(speciality) {...}
    function getStudents(grade) {...}
    return {
        addStudent: addStudent,
        addTeacher: addTeacher,
        getTeachers: getTeachers,
        getStudents: getStudents
    };
})();
// students and teachers are not accessible here
```

<div class="fragment balloon" style="top:60.01%; left:60.01%; width:27.37%">This is actually called a **Module**</div>


<!-- section start -->
<!-- attr: { class:'slide-section', showInPresentation:true, id:'questions' } -->
<!-- # Scopes and Closures
## Questions? -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size: 0.9em' } -->
# Free Trainings<br/>@ Telerik Academy
- "Web Design with HTML 5, CSS 3 and JavaScript" course @ Telerik Academy
    - [javascript course](http://academy.telerik.com/student-courses/web-design-and-ui/javascript-fundamentals/about)
  - Telerik Software Academy
    - [academy.telerik.com](academy.telerik.com)
  - Telerik Academy @ Facebook
    - [facebook.com/TelerikAcademy](facebook.com/TelerikAcademy)
  - Telerik Software Academy Forums
    - [forums.academy.telerik.com](http://telerikacademy.com/Forum/Home
