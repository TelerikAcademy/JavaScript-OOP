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
<!-- # The Module Pattern -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic05.png" style="top:45.26%; left:32.91%; width:32.55%; z-index:-1" /> -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# The Module Pattern:<br/>Pros and Cons
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
  class Calculator {
    constructor(name) {
        this.name = name;
        this.result = 0;
    };
    add(x) { this.result += +x; };
    subtract(x) { this.result -= +x; };
    showResult() {
      console.log(formatResult(this.name, this.result));
    };
  };
  return {
    getCalculator: (name) => new Calculator(name)
  };
} ());

controls.getCalculator('First')
  .add(7).showResult().subtract(2).showResult();
```

<div class="fragment balloon" style="top:12%; left:58%; width:30%">The visible members create closures with them</div>
<div class="fragment balloon" style="top:66%; left:17%; width:20%">Visiable method</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Module Pattern: Summary
- Module pattern provides **encapsulation** of variables and functions 
- Provides a way to **add visibility** (public versus private) to members 
- Each object instance creates new copies of functions in memory


<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Module Pattern
## [Demo]() -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic06.png" style="top:45%; left:10.30%; width:26%; z-index:-1" /> -->



<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # The Revealing Module Pattern
## Reveal the most interesting members -->
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
  class Calculator {
    constructor (name) { /* init code */ },
    add (x) { /* code to add */ },
    subtract (x) { /* code to subtract */ },
    showResult () { /* code to show result */ }
  };

  var getCalculator = (name) => new Calculator(name);
  
  return { getCalculator };
} ());

controls.getCalculator('First')
  .add(7).showResult().subtract(2).showResult();
```

<div class="fragment balloon" style="top:51%; left:18%; width:28.70%">Create the function hidden</div>

<div class="fragment balloon" style="top:65%; left:42%; width:32.89%">Expose (reveal) only references to hidden member</div>


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Revealing Module Pattern: Summary
- Module pattern provides **encapsulation** of variables and functions 
- Provides a way to **add visibility** (public versus private) to members 
- Extending objects can be difficult


<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Revealing Module Pattern
## [Demo]() -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic08.png" style="top:45.63%; left:2%; width:35%; z-index:-1" /> -->



<!-- section start -->
<!-- attr: { class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Augmenting Modules

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
<!-- # Augmenting Modules -->
- Augmenting modules means to Split modules in many files/IIFEs:
  - Can be used like a module/revealing module pattern, but with a small fix:
    - `module-1.js`
```javascript
var module = module || {}; // if module exists
(function(scope){
  scope.obj1 = { /* core for obj1 */ };
}(module));
```
    - `module-2.js`
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


<!-- section start -->
<!-- attr: { class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Importing and Exporting Modules
## The EcmaScript2015 way -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Importing Modules
- Import an entire module's contents

```js
import * as myModule from "my-module";
```
- Import a single member of a module. This inserts myMember into the current scope.

```js
import {myMember} from "my-module";
```
Import multiple members of a module. This inserts both foo and bar into the current scope.

```js
import {foo, bar} from "my-module";
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.8em' } -->
<!-- # Importing Modules -->
- Import a member with a more convenient alias. This inserts shortName into the current scope.

```js
import {reallyLongModuleMemberName as shortName} from "my-module";
```
- Import multiple members of a module with convenient aliases.

```js
import {reallyReallyLongModuleMemberName as shortName,
anotherLongModuleName as short} from "my-module";
```
- Import an entire module for side effects only, without importing any bindings.

```js
import "my-module";
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Exporting Modules
- Named exports

```js
export { myFunction }; // exports a function declared earlier
export const foo = Math.sqrt(2); // exports a constant
```
- Default exports (only one per script)

```js
export default function() {} // or 'export default class {}'
// there is no semi-colon here
```

- More info on [import](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import)
- More info on [export](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/export)


# Examples
- In the module, we could use the following code
```js
// module "my-module.js"
export function cube(x) {
    return x * x * x;
}
const foo = Math.PI + Math.SQRT2;
export { cube, foo };
```
- in another script, we could have
```js
import { cube as cb, foo } from 'my-module';
console.log(cb(3)); // 27
console.log(foo);    // 4.555806215962888
```

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

