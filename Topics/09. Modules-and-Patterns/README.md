<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# JavaScript Patterns
## Modules and stuff
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic00.png" style="top:52.89%; left:66.12%; width:36.44%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic01.png" style="top:45.54%; left:48.46%; width:26.89%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic02.png" style="top:22.07%; left:3.90%; width:27.79%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic03.png" style="top:6.25%; left:72.94%; width:23.58%; z-index:-1" /> -->
<article class="signature">
	<p class="signature-course">JavaScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com " class="signature-link">http://academy.telerik.com </a>
</article>

<!-- attr: { id:'', showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- Public/Private fields in JavaScript
- Module pattern
- Revealing module pattern
- Singleton pattern
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic04.png" style="top:41.43%; left:51.46%; width:52.89%; z-index:-1" /> -->



<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# The Module Pattern
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic05.png" style="top:45.26%; left:32.91%; width:32.55%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Pros and Cons
- Pros:
  - “Modularize” code into re-useable objects
  - Variables/functions not in global namespace
  - Expose only public members
- Cons: 
  - Not easy to extend 
  - Some complain about debugging


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Module Pattern: Structure
- Structure:

```js
var module = (function() {
	//private variables
	//private functions

	return {
		//public members
		someFunc: function() {…},
		anotherFunc: function() {…}
	};
}());
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.85em' } -->
# Module Pattern: _Example_

```js
var controls = (function () {
  function formatResult(name, value) {
    return name + ' says the result is ' + value;
  }
  var calculator = {
    init: function (name) { /* init code */ },
    add: function (x) { /* code to add */ },
    subtract: function (x) { /* code to subtract */ },
    showResult: function () { /* code to show result */ }
  };
  return {
    getCalculator: function (name) {
      return Object.create(calculator)
        .init(name);
    }
  };
} ());
```
```js
controls.getCalculator('First')
  .add(7).showResult().subtract(2).showResult();
```

<div class="fragment balloon" style="top:12%; left:58%; width:30%">The visible members create closures with them</div>
<div class="fragment balloon" style="top:62%; left:45%; width:20%">Visiable method</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Module Pattern: Summary
- Module pattern provides **encapsulation** of variables and functions 
- Provides a way to add **visibility** (public versus private) to members 
- Each object instance creates new copies of functions in memory


<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Module Pattern
## [Demo]() -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic06.png" style="top:45%; left:10.30%; width:26%; z-index:-1" /> -->



<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# The Revealing Module Pattern
## Reveal the most interesting members
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic07.png" style="top:8.04%; left:76.39%; width:22.92%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Revealing Module Pattern:<br/>Pros and Cons
- Pros: 
  - “Modularize” code into re-useable objects 
  - Variables/functions taken out of global namespace 
  - Expose only visible members 
  - "Cleaner" way to expose members 
  - Easy to change members privacy
- Cons: 
  - Not easy to extend 
  - Some complain about debugging
  - Hard to mock hidden objects for testing


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Revealing Module Pattern: Structure
- Structure:

```javascript
var module = (function() {
	//hidden variables 
	//hidden functions 

	return {
             //visible members
		someFunc: referenceToFunction
		anotherFunc: referenceToOtherFunction	
	};
}());
```



<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Revealing Module Pattern: _Example_

```javascript
var controls = (function () {
  function formatResult(name, value) {
    return name + ' says the result is ' + value;
  }
  var calculator = {
    init: function (name) { /* init code */ },
    add: function (x) { /* code to add */ },
    subtract: function (x) { /* code to subtract */ },
    showResult: function () { /* code to show result */ }
  };
  function getCalculator(name){
    return Object.create(calculator).init(name);
  }
  return { getCalculator: getCalculator };
} ());
controls.getCalculator('First')
  .add(7) .showResult() .subtract(2) .showResult();
```

<div class="fragment balloon" style="top:52.69%; left:40.94%; width:28.70%">Create the function hidden</div>

<div class="fragment balloon" style="top:36.78%; left:54.29%; width:32.89%">Expose (reveal) only references to hidden member</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Revealing Module Pattern: Summary
- Module pattern provides encapsulation of variables and functions 
- Provides a way to add visibility (public versus private) to members 
- Extending objects can be difficult since no prototyping is used


<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Revealing Module Pattern
## [Demo]() -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic08.png" style="top:45.63%; left:2%; width:35%; z-index:-1" /> -->



<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Singleton Pattern
## One object to rule them all! -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic09.png" style="top:56%; left:25%; width:50%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Singleton Pattern:<br/> Structure
- Singleton pattern introduces a single instance each time an instance is requested
  - Harder in other languages, in JavaScript every IIFEs forms a singleton
- Structure:

```js
var module = function() {
  var instance = { /* code for instance */};
  instance = Object.preventExtensions(instance);
  return {
    get: function(){
      return instance;
    }
  };
}();
```


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Singleton Pattern:<br/>_Example_

```javascript
var calculator = (function () {
  var calculator = {
    result: 0,
    add: function (x) { /* code for add */ },
    subtract: function (x) { /* code for subtract */ },   
    showResult: function () { /* show result */ }
  };
  calculator = Object.preventExtensions(calculator);   
  return { get: function () { return calculator; } };
} ());

calculator.get() .add(7) .subtract(17) .showResult();
//result is -10
calculator.get() .add(111) .showResult();
//result is 101 (continues from the previous)
```


<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Singleton Pattern
## [Demo]() -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic10.png" style="top:43%; left:70%; width:30%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Augmenting Modules
- Augmenting modules means "Split modules in many files/IIFEs:
  - Can be used like a module/revealing module pattern, but with a small fix:
    - module-1.js
```javascript
var module = module || {}; // if module exists
(function(scope){
  scope.obj1 = { /* core for obj1 */ };
}(module));
```
    - module-2.js
```javascript
var module = module || {}; // if module exists
(function(scope){
  scope.obj2 = { /* core for obj2 */ };
}(module));
```



<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Augmenting Modules
## [Demo]() -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic11.png" style="top:45%; left:0%; width:40%; z-index:-1" /> -->



<!-- Questions -->
<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true, class:"slide-questions", id:"questions" } -->
<!-- # Modules and Patterns
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
    - [forums.academy.telerik.com](http://telerikacademy.com/Forum/Home)

<!-- <img class="slide-image" showInPresentation="true"  src="imgs/pic16.png" style="top:58.18%; left:90.52%; width:16.97%; z-index:-1" /> -->

