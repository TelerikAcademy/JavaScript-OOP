<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# JavaScript Transpilers and Babel
## generate next generation JavaScript today
<article class="signature">
	<p class="signature-course">JavaScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com " class="signature-link">http://academy.telerik.com </a>
</div>

<!-- attr: { id:'', showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- [JavaScript Transpilers](#js-transpilers)
- [Babel](#babel)
  - Instalation and Setup
  - Using Babel


<!-- section start -->

<!-- attr: { id:'js-transpilers', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# JavaScript Transpilers

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # JavaScript Transpilers -->
- What is Transpiling
  - Compiling is **source code** to **byte code**
  - Transpiling is **source code** to **source code**
- [ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/)
  - Babel is officially a  transpiler
  - Traceur - created by Google
    - More experimental
    - Less readable output code
  - TypeScript is a JavaScript superset
    - Happens to have a transpilers




<!-- section start -->

<!-- attr: { id:'babel', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
# Babel
## Installation and Basic Transpiling

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Babel -->
- `babel-core`
- `babel-cli`
- Separate packages for each EcmaScript2015 feature in Bable6 
  - Turn on individual features **babel-plugin-* **
    - _Example_: `babel-plugin-transform-es2015-arrow-functions`
  - Or use **babel-presets-* **
    - _Example_: `babel-preset-es2015`

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Installation -->
- Open Command Prompt
- Babel CLI - Command Line Interface
  - Can be installed **globally**

```js
$ npm install -g babel-cli
$ babel --version
```
  - Or **locally** (best practice)
    - Easier to work on projects with others

```js
$ npm init // creates package.js
$ npm install babel-cli --save-dev
// saves in package.js
$ node_modules/.bin/babel --version
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Transpiling ES6 Code
- Transpiling
  - Use command `$ babel [source] --presets [preset name]`
  - _Example_:
```js
$ babel scripts --presets es2015
```
  - Can also add `-d` or `--out-dir` parameter for output directory / destination
```js
$ babel scripts --presets es2015 -d build
```

<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Transpiling ES6 Code
## [Demo]() -->



<!-- section start -->

<!-- attr: { id:'babel', class:'slide-section', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Babel -->
## Advanced Configurations

<!-- - Use `-o` or `--out-file` to bundle into one file -->



<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Configuration
- `-s` add source map
- `-w` watch for updates in the source file/s and transpile it if any
- Can create `.babelrc` file
  - Keep all configurations in one place
  - _Example_:
```js
{ 
      "plugins": ["transform-es2015-block-scoping",
                  "transform-es2015-template-literals"],
      "sourceMaps": true
}
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Babel Node
- Using CommonJS plugin for babel


<!-- attr: { class:'slide-section demo', showInPresentation:true, hasScriptWrapper:true } -->
<!-- # Module loading
## [Demo]() -->


<!-- Questions -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-questions", id:"questions" } -->
<!-- # JavaScript Transpilers and Babel
## Questions? -->


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
