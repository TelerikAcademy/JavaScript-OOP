<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Scopes and Closures
## Things start to get serious
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic00.png" style="top:0.91%; left:44.91%; width:58.18%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic01.png" style="top:48.48%; left:65.53%; width:38.79%; z-index:-1" /> -->
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
- Scopes
  - Block and function scope
  - References availability
  - Resolving references through the scope chain
  - Alternatives in ES6
- Closures
  - What is a Closure?
  - How to deal with closures?
  - Simple modules
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic02.png" style="top:44.08%; left:65.96%; width:38.79%; z-index:-1" /> -->




<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Scope
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic03.png" style="top:24.55%; left:16.42%; width:63.47%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Scope
- Scope is a place where variables are defined and can be accessed
- JavaScript has only two types of scopes
  - **Global** scope and **function** scope
    - Global scope is the same for the whole web page
    - Function scope is different for every function
  - Everything outside of a function scope is inside of the global scope

```javascript
if(true){
    var sum = 1+2;
}
console.log(sum);
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Scope
- Scope is a place where variables are defined and can be accessed
- JavaScript has only two types of scopes
  - **Global** scope and **function** scope
    - Global scope is the same for the whole web page
    - Function scope is different for every function
  - Everything outside of a function scope is inside of the global scope

```javascript
if(true){
    var sum = 1+2;
}
console.log(sum);
```

<div class="fragment balloon" style="top:64.83%; left:46.52%; width:48.28%">The scope of the if is the global scope. sum is accessible from everywhere</div>
<div class="fragment balloon" style="top:64.72%; left:46.52%; width:48.28%">The scope of the if is the global scope. sum is accessible from everywhere</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Global Scope
- The global scope is the scope of the web page
  - Or the Node.js app
- Objects belong to the global scope if:
  - They are define **outside of a function scope**
  - They are defined**without****var**
    - Fixable with **'use strict'**

```javascript
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



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Global Scope

```javascript
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

<div class="fragment balloon" style="top:51.36%; left:59.00%; width:37.13%">**arr**, **separator** and **i** belong to the scope of printArr</div>
- The global scope is the scope of the web page
  - Or the Node.js app
- Objects belong to the global scope if:
  - They are define outside of a function scope
  - They are defined without var
    - Fixable with 'use strict'


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Global Scope

```javascript
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

<div class="fragment balloon" style="top:72.57%; left:45.70%; width:33.13%">**arrString** and **arrJoin** belong to the global scope</div>
- The global scope is the scope of the web page
  - Or the Node.js app
- Objects belong to the global scope if:
  - They are define outside of a function scope
  - They are defined without var
    - Fixable with 'use strict'
<div class="fragment balloon" style="top:51.36%; left:59.00%; width:37.13%">**arr**, **separator** and **i** belong to the scope of printArr</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- The global scope is one of the **very worst parts**of JavaScript
  - Every object pollutes the global scope, making itself more visible
  - If two objects with the same identifier appear, the first one will be overridden


<!-- attr: { id:'', class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Global Scope
## [Demo]()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic04.png" style="top:17.94%; left:15.25%; width:77.05%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Function Scope
- JavaScript does not have a block scope like other programming languages (C#, Java, C++)
  - **{** and **}** does not create a scope!
- Yet, JavaScript has a function scope
  - **Function expressions** create scope
  - **Function declarations** create scope

```javascript
if(true)var result = 5;
console.log(result);//logs 5
```


```javascript
if(true) (function(){ var result = 5;})();
console.log(result);//ReferenceError
```


```javascript
function logResult(){ var result = 5; }
if(true) logResult();
console.log(result); //ReferenceError
```



<!-- attr: { id:'', class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Function Scope
## [Demo]()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic05.png" style="top:34.22%; left:25.82%; width:57.12%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Resolving References through the Scope Chain
- JavaScript resolves the object references due to the simple rule "Closer is better":
  - if a function **outer()** declares object x, and its nested function **inner()** declares object x:
    - outer() holds a reference to the outer x
    - inner() holds a reference to the inner x

```javascript
function outer(){  var x = 'OUTER';
  function inner(){
    var x = 'INNER';
    return x;
  }
  inner();
  return { x: x, f: inner };
}
```





<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# ECMAScript 6 Way of Working with Scopes
- ECMAScript 6 introduces a new way to handle scopes:
  - The key word '**let**'
- **let** is much like var
  - Creates a variable
- **But,****let****creates a block scope**
- Yet, still not supported
  - Can be used with Babel.js or Traceur

```javascript
if(false){
  var x = 5;
  let y = 6;
}
console.log(x); //prints undefined
console.log(y); //throws error
```







<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Closures
- Closures are a special kind of structure  
  - They combine a function and the context of this function

```javascript
function outer(x){
  function inner(y){
    return x + " " + y;
  }
  return inner;
}
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Closures
- Closures are a special kind of structure  
  - They combine a function and the context of this function

```javascript
function outer(x){
  function inner(y){
    return x + " " + y;
  }
  return inner;
}
```

<div class="fragment balloon" style="top:35.85%; left:42.49%; width:37.13%">**inner****()** forms a closure. It holds a reference to **x**</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Closures
- Closures are a special kind of structure  
  - They combine a function and the context of this function

```javascript
function outer(x){
  function inner(y){
    return x + " " + y;
  }
  return inner;
}
```

<div class="fragment balloon" style="top:35.85%; left:42.49%; width:37.13%">**inner****()** forms a closure. It holds a reference to **x**</div>

```javascript
var f1 = outer(5);
console.log(f1(7)); //outputs 5 7
```

<div class="fragment balloon" style="top:47.01%; left:54.22%; width:25.39%">In the context of f1, **x has value 5**</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Closures

```javascript
function outer(x){
  function inner(y){
    return x + " " + y;
  }
  return inner;
}
```

- Closures are a special kind of structure  
  - They combine a function and the context of this function

```javascript
var f2 = outer("Peter");
console.log(f2("Petrov"));  //outputs Peter Petrov
```

<div class="fragment balloon" style="top:35.85%; left:42.49%; width:37.13%">**inner****()** forms a closure. It holds a reference to **x**</div>

```javascript
var f1 = outer(5);
console.log(f1(7)); //outputs 5 7
```

<div class="fragment balloon" style="top:47.01%; left:54.22%; width:25.39%">In the context of f1, x has value 5</div>
<div class="fragment balloon" style="top:60.18%; left:63.83%; width:27.19%">In the context of f2, **x has value "Peter"**</div>




<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Closures Usage
- Closures can be used for data hiding
  - Make objects invisible to the outside 
    - Make them private

```javascript
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
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Closures Usage
- Closures can be used for data hiding
  - Make objects invisible to the outside
    - Make them private

```javascript
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
```

<div class="fragment balloon" style="top:60.01%; left:60.01%; width:27.37%">This is actually called a **Module**</div>




<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Scopes and Closures
- http://academy.telerik.com




