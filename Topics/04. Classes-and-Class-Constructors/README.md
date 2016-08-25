<!-- section start -->
<!-- attr: { class:'slide-title', hasScriptWrapper:true } -->
# ES6 Classes and Class Constructors 

<div class="signature">
	<p class="signature-course">JavaScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</div>

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Classes and Inheritance in ES6
- ES6 introduces classes and a way to create classical OOP

```javascript
class Person extends Mammal {
  constructor(fname, lname, age) {
    super(age);
    this._fname = fname;
    this._lname = lname;
  }
  get fullname() {
    //getter property of fullname
  }
  set fullname(newfullname) {
    //setter property of fullname
  }
  // more class members…
}
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Classes and Inheritance in ES6
- ES6 introduces classes and a way to create classical OOP

```javascript
class Person extends Mammal {
  constructor(fname, lname, age) {
    super(age);
    this._fname = fname;
    this._lname = lname;
  }
  get fullname() {
    //getter property of fullname
  }
  set fullname(newfullname) {
    //setter property of fullname
  }
  // more class members…
}
```

<div class="fragment balloon" style="top:35.42%; left:54.30%; width:41.45%">Constructor of the class</div>

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Classes and Inheritance in ES6
- ES6 introduces classes and a way to create classical OOP

```javascript
class Person extends Mammal {
  constructor(fname, lname, age) {
    super(age);
    this._fname = fname;
    this._lname = lname;
  }
  get fullname() {
    //getter property of fullname
  }
  set fullname(newfullname) {
    //setter property of fullname
  }
  // more class members…
}
```

<div class="fragment balloon" style="top:56.84%; left:55.19%; width:41.45%">Getters and setters</div>
<div class="fragment balloon" style="top:35.42%; left:54.30%; width:41.45%">Constructor of the class</div>

<!-- Questions -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, showInPresentation:true, class:"slide-questions", id:"questions" } -->
<!-- # ES6 Classes and Class Constructors 
## Questions? -->

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size: 0.9em' } -->
# Free Trainings @ Telerik Academy
- "Web Design with HTML 5, CSS 3 and JavaScript" course @ Telerik Academy
    - [javascript course](http://academy.telerik.com/student-courses/web-design-and-ui/javascript-fundamentals/about)
  - Telerik Software Academy
    - [academy.telerik.com](http://academy.telerik.com)
  - Telerik Academy @ Facebook
    - [facebook.com/TelerikAcademy](https://facebook.com/TelerikAcademy)
  - Telerik Software Academy Forums
    - [forums.academy.telerik.com](https://telerikacademy.com/Forum/Home)

<!-- <img class="slide-image" showInPresentation="false" src="imgs/pic00.png" style="top:58.18%; left:90.52%; width:16.97%; z-index:-1" /> -->
