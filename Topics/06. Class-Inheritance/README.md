<!-- section start -->
<!-- attr: { class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Class Inheritance

<article class="signature">
	<p class="signature-course">JavaScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="https://telerikacademy.com" class="signature-link">https://telerikacademy.com</a>
</article>

<!-- section start -->
<!-- attr: { id:'table-of-contents' } -->
# Table of Contents
- [What is inheritance](#inheritance)
- [Inheritance in ES6](#es6)
  - Super class calls

<!-- section start -->
<!-- attr: { class:'slide-section', id:'inheritance' } -->
# <a id="inheritance"></a>Inheritance

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Inheritance -->
- **Inheritance** allows child classes to inherit the characteristics of an existing parent (base) class
  - Attributes (fields and properties)
  - Operations (methods)
- Child class can extend the parent class
  - Add new fields and methods
  - Redefine methods (modify existing behavior)

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Inheritance -->
- **Inheritance** has a lot of benefits
  - Extensibility
  - Reusability (`code reuse`)
  - Provides abstraction
  - Eliminates redundant code
- Use inheritance for building `is-a` relationships
  - E.g. dog `is-a` animal (dogs are kind of animals)
- Don't use it to build `has-a` relationship
  - E.g. dog `has-a` name (dog is not kind of name)

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Inheritance -->
- **Inheritance** implicitly gains all members from another class
  - All fields, methods, properties, events, …
  - Some members could be inaccessible (hidden)
- The class whose methods are inherited is called base (parent) class
- The class that gains new functionality is called derived (child) class

<!-- section start -->
<!-- attr: { class:'slide-section', id:'es6' } -->
# <a id="es6"></a>Classes and Inheritance in ES6

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
<!-- # Classes and Inheritance in ES6 -->
- ES6 introduces classes and a way to create classical OOP
  - Using the `class` keyword

```javascript
class Mammal {
	constructor(age) {
		this._age = age;
	}
}
```

<!-- attr: { hasScriptWrapper:true, showInPresentation:true, style:'font-size:0.9em' } -->
<!-- # Classes and Inheritance in ES6 -->
- Sub classing is done using the `extends` keyword

```javascript
class Mammal {
	speak(str) {
		// mammals usually don't speak
	}
}

class Person extends Mammal {
	speak(str) {
		console.log(str);
	}
}
```

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Classes and Inheritance in ES6 -->
- `super` is used to refer to the parent class
  - `super()` calls the parent constructor
    - needed in order for `this` to refer to the correct object
  - `super.method()` calls `.method()` from the parent class

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Classes and Inheritance in ES6 -->
```javascript
class Person extends Mammal {
  constructor(fname, lname, age) {
    super(age);
    this._fname = fname;
    this._lname = lname;
  }
  get fullname() {
    // getter property of fullname
  }
  set fullname(newfullname) {
    // setter property of fullname
  }
  // more class members…
}
```

<div class="fragment balloon" style="top:30.42%;left:55.30%;width:41.45%">Constructor of the class</div>
<div class="fragment balloon" style="top:65.84%;left:55.30%;width:41.45%">Getters and setters</div>

<!-- Questions -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-questions", id:"questions", showInPresentation:true } -->
<!-- # Class Inheritance
## Questions? -->

<!-- attr: { showInPresentation: true, hasScriptWrapper: true, style:'font-size: 0.9em' } -->
# Free Trainings<br/>@ Telerik Academy
- "Web Design with HTML 5, CSS 3 and JavaScript" course @ Telerik Academy
  - [javascript course](http://academy.telerik.com/student-courses/web-design-and-ui/javascript-fundamentals/about)
- Telerik Software Academy
  - [https://telerikacademy.com](https://telerikacademy.com)
- Telerik Academy @ Facebook
  - [facebook.com/TelerikAcademy](https://facebook.com/TelerikAcademy)
- Telerik Software Academy Forums
  - [https://telerikacademy.com/Forum/Home](https://telerikacademy.com/Forum/Home)
