<!-- section start -->
<!-- attr: { class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Class Inheritance

<article class="signature">
	<p class="signature-course">JavaScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</article>

<!-- section start -->
<!-- attr: {} -->
# Table of Contents
- What is inheritance
- Inheritance in ES6

<!-- section start -->
<!-- attr: { class:'slide-section' } -->
# Inheritance

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Inheritance -->
- Inheritance allows child classes to inherit the characteristics of an existing parent (base) class
  - Attributes (fields and properties)
  - Operations (methods)
- Child class can extend the parent class
  - Add new fields and methods
  - Redefine methods (modify existing behavior)

<!-- attr: { hasScriptWrapper:true, showInPresentation:true } -->
<!-- # Inheritance -->
- Inheritance has a lot of benefits
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
- Inheritance implicitly gains all members from another class
  - All fields, methods, properties, events, …
  - Some members could be inaccessible (hidden)
- The class whose methods are inherited is called base (parent) class
- The class that gains new functionality is called derived (child) class

<!-- section start -->
<!-- attr: { class:'slide-section' } -->
# Classes and Inheritance in ES6

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
<!-- # Classes and Inheritance in ES6 -->
- ES6 introduces classes and a way to create classical OOP

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

<div class="fragment balloon" style="top:56.84%; left:55.30%; width:41.45%">Getters and setters</div>
<div class="fragment balloon" style="top:35.42%; left:55.30%; width:41.45%">Constructor of the class</div>

<!-- attr: {} -->
<!-- # Classes and Inheritance in ES6 -->
- Subclassing is done using the `extend` keyword
- `super` calls the base constructor
  - Needed in order for `this` to refer to the correct object

<!-- Questions -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-questions", id:"questions" } -->
<!-- # Class Inheritance
## Questions? -->

<!-- attr: { showInPresentation: true, hasScriptWrapper: true, style:'font-size: 0.9em' } -->
# Free Trainings<br/>@ Telerik Academy
- "Web Design with HTML 5, CSS 3 and JavaScript" course @ Telerik Academy
    - [javascript course](http://academy.telerik.com/student-courses/web-design-and-ui/javascript-fundamentals/about)
  - Telerik Software Academy
    - [academy.telerik.com](http://academy.telerik.com)
  - Telerik Academy @ Facebook
    - [facebook.com/TelerikAcademy](https://facebook.com/TelerikAcademy)
  - Telerik Software Academy Forums
    - [forums.academy.telerik.com](https://telerikacademy.com/Forum/Home)

<!-- <img class="slide-image" showInPresentation="true" src="imgs/pic00.png" style="top:58.18%; left:90.52%; width:16.97%; z-index:-1" /> -->
