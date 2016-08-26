<!-- section start -->
<!-- attr: { class:'slide-title', hasScriptWrapper:true } -->
# ES6 Classes and Class Constructors 

<article class="signature">
	<p class="signature-course">JavaScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</article>

<!-- <img src="imgs/es6.png" showInPresentation="true" class="slide-image" style="top: 55%; right: 10%; width: 15%" /> -->

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- What are ES6 classes?
- Creating and using ES6 classes
  - Constructors
  - Methods and properties

<!-- section start -->
<!-- attr: { showInPresentation:true, hasScriptWrapper:true, class:'slide-section' } -->
# Classes
## What is a class?

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style: 'font-size: 0.85em;' } -->
<!-- # Classes -->
- Classes in general are used as **blueprints or templates for creation of objects**. Classes gives us a way to:
  - Create objects that have similar properties and behaviour
  - Reuse code and functionality between different object via **inheritance**
  - Hide implementation details and expose only what is needed - **encapsulation** and **abstraction**
  - Treat objects that have similar behaviour, but different concrete types, the same - **polymorphism**

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# ES6 Classes
- ES6 introduces the `class` keyword
  - Classes in JavaScript are actually functions

```js
class Superhero {
  
}

console.log(typeof Superhero); // logs 'function'
```


<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style: 'font-size: 0.85em;' } -->
# ES6 Classes
- Lets create a class that has some data and use the class to create an object of that type:
  - an object of a class is created by calling the `class name` as a function with the `new` operator.

```js
class Horse {
    constructor(name, furColor, age) {
        this._name = name;
        this._furColor = furColor;
        this._age = age;
    }
}

const horse = new Horse('Trendafil', 'brown', 2);
console.log(horse); 
// { _name: 'Trendafil', _furColor: 'brown', age: 2 }
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# The `new` keyword
- What happens when a function is called with the `new` keyword?

```js
function F() {
    console.log(this);
    this.prop = 'hello';
};

const f = new F();
console.log(f); // { prop: 'hello' }
```

# The `new` keyword
- The `new` keyword sets the **context** of the function to a new object
- The result of the function execution will be the new object

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style: 'font-size: 0.85em;' } -->
# The `class constructor`
- The `class constructor` is a kind-of-function that is called with `new` and is executed when an object of a class is created
- In the following example the `class constructor` will be called with its context set to a new object `{}`

```js
class Horse {
    constructor(name, furColor, age) {
        this._name = name;
        this._furColor = furColor;
        this._age = age;
    }
}

const horse = new Horse('Trendafil', 'brown', 2);
```

# The `class constructor`
- `Class constructors` are obligatory and can be omitted. The following two snippets are equivalent:

```js
class Superhero { }

const gosho = new Superhero();
```

```js
class Superhero {
    constructor() { }
}

const gosho = new Superhero();
```


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Methods
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
mariya.meow();
```

<!-- attr: { showInPresentation:true, hasScriptWrapper:true, style:'font-size:0.9em' } -->
# Getters and setters
- Classes also provide **getter** and **setter** syntax
  - Getters and setters are used like data fields, but are actually methods
  - Can be used to encapsulate data and control access to it
  - Getters to get values of private properties
  - Setter to change values of private properties

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
