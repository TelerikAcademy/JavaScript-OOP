<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# JavaScript Patterns
## Modules and stuff
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic00.png" style="top:52.89%; left:66.12%; width:36.44%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic01.png" style="top:45.54%; left:48.46%; width:26.89%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic02.png" style="top:9.07%; left:3.90%; width:27.79%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic03.png" style="top:6.25%; left:72.94%; width:23.58%; z-index:-1" /> -->
<div class="signature">
	<p class="signature-course"></p>
	<p class="signature-initiative"></p>
	<a href="" class="signature-link"></a>
</div>




<!-- section start -->
<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Table of Contents
- Public/Private fields in JavaScript
- Module pattern
- Revealing module pattern
- Singleton pattern
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic04.png" style="top:41.43%; left:51.46%; width:52.89%; z-index:-1" /> -->




<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# The Module Pattern
## Hide members
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic05.png" style="top:35.26%; left:32.91%; width:42.55%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Pros and Cons
- Pros:
  - “Modularize” code into re-useable objects
  - Variables/functions not in global namespace
  - Expose only public members
- Cons: 
  - Not easy to extend 
  - Some complain about debugging


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Module Pattern: Structure

```javascript
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

- Structure:


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Module Pattern: _Example_

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
  return {
    getCalculator: function (name) {
      return Object.create(calculator)
        .init(name);
    }
  };
} ());
controls.getCalculator('First')
  .add(7) .showResult() .subtract(2) .showResult();
```

- _Example_:


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Module Pattern: _Example_

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
  return {
    getCalculator: function (name) {
      return Object.create(calculator)
        .init(name);
    }
  };
} ());
controls.getCalculator('First')
  .add(7) .showResult() .subtract(2) .showResult();
```

- _Example_:
<div class="fragment balloon" style="top:29.81%; left:61.81%; width:36.30%">The visible members create closures with them</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Module Pattern: _Example_

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
  return {
    getCalculator: function (name) {
      return Object.create(calculator)
        .init(name);
    }
  };
} ());
controls.getCalculator('First')
  .add(7) .showResult() .subtract(2) .showResult();
```

- _Example_:
<div class="fragment balloon" style="top:66.98%; left:56.42%; width:37.70%">Visiable method</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Module Pattern: Summary
- Module pattern provides encapsulation of variables and functions 
- Provides a way to add visibility (public versus private) to members 
- Each object instance creates new copies of functions in memory


<!-- attr: { id:'', class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Module Pattern
## [Demo]()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic06.png" style="top:13.22%; left:39.30%; width:31.74%; z-index:-1" /> -->




<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# The Revealing Module Pattern
## Reveal the most interesting 
## members
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic07.png" style="top:22.04%; left:76.39%; width:22.92%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Revealing Module Pattern: Pros and Cons
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


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Revealing Module Pattern: Structure

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

- Structure:


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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

- _Example_:


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
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

- _Example_:
<div class="fragment balloon" style="top:62.69%; left:59.94%; width:37.70%">Create the function hidden</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
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

- _Example_:
<div class="fragment balloon" style="top:50.78%; left:54.29%; width:40.89%">Expose (reveal) only references to hidden member</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Revealing Module Pattern: Summary
- Module pattern provides encapsulation of variables and functions 
- Provides a way to add visibility (public versus private) to members 
- Extending objects can be difficult since no prototyping is used


<!-- attr: { id:'', class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Revealing Module Pattern
## [Demo]()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic08.png" style="top:17.63%; left:32.58%; width:45.45%; z-index:-1" /> -->




<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Singleton Pattern
## One object to rule them all!
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic09.png" style="top:36.14%; left:25.99%; width:60.61%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Singleton Pattern: Structure

```javascript
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

- Singleton pattern introduces a single instance each time an instance is requested
  - Harder in other languages, in JavaScript every IIFEs forms a singleton
- Structure:


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Singleton Pattern: _Example_

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

- _Example_:


<!-- attr: { id:'', class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Singleton Pattern
## [Demo]()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic10.png" style="top:23.80%; left:74.54%; width:33.06%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
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



<!-- attr: { id:'', class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Augmenting Modules
## [Demo]()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic11.png" style="top:14.99%; left:30.38%; width:49.44%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Modules and Patterns
- http://academy.telerik.com
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic12.png" style="top:53.25%; left:3.69%; width:10.26%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic13.png" style="top:54.70%; left:40.91%; width:13.17%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic14.png" style="top:52.16%; left:81.83%; width:10.64%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic15.png" style="top:23.51%; left:22.14%; width:10.69%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Free Trainings @ Telerik Academy
- “C# Programming @ Telerik Academy
    - csharpfundamentals.telerik.com
  - Telerik Software Academy
    - academy.telerik.com
  - Telerik Academy @ Facebook
    - facebook.com/TelerikAcademy
  - Telerik Software Academy Forums
    - forums.academy.telerik.com
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic16.png" style="top:60.37%; left:92.39%; width:13.45%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic17.png" style="top:30.85%; left:68.14%; width:36.30%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic18.png" style="top:46.32%; left:95.14%; width:10.85%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic19.png" style="top:13.00%; left:92.85%; width:13.01%; z-index:-1" /> -->




