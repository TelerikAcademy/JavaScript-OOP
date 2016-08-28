<!-- section start -->
<!-- attr: { class:'slide-title', hasScriptWrapper:true } -->
# Class methods and Properties

<article class="signature">
	<p class="signature-course">JavaScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</article>


<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- Class methods
- Properties
  - Getters and Setters
- JavaScript Prototypes

<!-- section start -->
<!-- attr: { showInPresentation: true, class: 'slide-section' } -->
# Class Methods
## Attach functionality to class instances

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Class Methods
- Methods are functions in the context of a class
- Classes can define methods with the same syntax as a constructor:

```js
class Cat {
    constructor(name) {
        this._name = name;
    }

    meow() {
        console.log(this.name + ': meow!');
    }
}

const mariya = new Cat('Mariya');
mariya.meow(); // mariya: meow!
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style: 'font-size: 0.9em' } -->
# Class Methods
- When a method is called, the following happens
  - The context of the function is set to the object which it's called from
  - `this` is a reference to the object the method is called from

```js
class SelfPrintingCat {
    constructor(name) {
        this._name = name;
    }

    printSelf() {
        console.log(this);
    }
}
const fluff = new SelfPrintingCat('Fluff');
fluff.printSelf(); // { _name: 'Fluff' }
```

<!-- section start -->
<!-- attr: { showInPresentation: true, class: 'slide-section' } -->
# Getters and setters
## Control access to fields

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Getters and setters
- Classes also provide **getter** and **setter** syntax
  - Getters and setters are used like data fields, but actually behave like methods
  - Can be used to encapsulate data and control access to it
  - Getters to get values of fields
  - Setter to change values of fields

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.8em' } -->
# Getters and setters

```js
class Person {
    constructor(firstname, lastname) {
        this._firstname = firstname;
        this._lastname = lastname;
    }

    get fullname() {
      return this._firstname + ' ' + this._lastname;
    }

    set firstname(value) {
        this._firstname = value;
    }

    set lastname(value) {
      this._lastname = value;
    }
}

const peter = new Person('peter', 'anderson');
console.log(peter.fullname);
peter.lastname = 'petrov';
console.log(peter.fullname);
```

<!-- section start -->
<!-- attr: { showInPresentation: true, class: 'slide-section' } -->
# JavaScript Prototypes
## The true nature of JavaScript

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Prototypes
- Class methods, getters and setters aren't directly attached to the objects
  - They're attached to their `prototypes`
  - In JavaScript, objects inherit from other objects
  - Consider the `SelfPrintingCat` example:

```js
new SelfPrintingCat('Fluff').printSelf(); // { _name: 'Fluff' }
```
- The `printSelf` method is not attached to `fluff`

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Prototypes
- To access the prototype of `fluff`, when can write the following:

```js
const catProto = SelfPrintingCat.prototype;
console.log(typeof catProto.printSelf); // function
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Prototypes
- JavaScript prototypes allow us to extend a class dynamically
  - We can make the `SelfPrintingCat` meow

```js
SelfPrintingCat.prototype.meow = function () {
  console.log(this._name + ': meow'!);
};
```


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
