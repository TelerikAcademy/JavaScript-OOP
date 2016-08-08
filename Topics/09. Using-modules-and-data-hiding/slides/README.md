<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Classical Inheritance in JavaScript
## The way of Object-oriented Ninja
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic00.png" style="top:2.65%; left:70.59%; width:27.91%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic01.png" style="top:10.86%; left:93.39%; width:8.21%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic02.png" style="top:50.03%; left:51.08%; width:13.38%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic03.png" style="top:2.64%; left:32.98%; width:28.93%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic04.png" style="top:48.48%; left:65.53%; width:38.79%; z-index:-1" /> -->
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
- Objects in JavaScript
  - Object-oriented Design
  - OOP in JavaScript
- Classical OOP
- Prototype-chain
- Object Properties
- Function Constructors
- The values of the  this object
- Implementing Inheritance
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic05.png" style="top:33.59%; left:63.79%; width:38.79%; z-index:-1" /> -->




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Object-oriented Programming
- OOP means that the application/program is **constructed as a set of objects**
  - Each object has its purpose
  - Each object can hold other objects
- JavaScript is **prototype-oriented** language
  - Uses prototypes to define hierarchies
    - Does not have definition for class or constructor
    - ECMAScript 1.6 introduces classes




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# OOP in JavaScript
- JavaScript is **dynamic**language
  - No such things as variable **types** and **polymorphism**
- JavaScript is also highly expressive language
  - Most things can be achieved in many ways
- That is why JavaScript has many ways to support OOP
  - **Classical/Functional**, **Prototypal**
  - Each has its advantages and drawbacks
  - Usage depends on the case




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Classical OOP
- JavaScript uses functions to create objects
  - It has **no definition for class or constructor**
- Functions play the role of object constructors
  - Create/initiate object by calling the function with the "**new**" keyword

```javascript
function Person(){}
var gosho = new Person(); //instance of Person
var maria = new Person(); //another instance of Person
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Creating Objects
- When using a function as an object constructor it is executed when called with **new**
  - Each of the instances is independent
    - They have their **own state and behavior**
- Function constructors can take parameters to give instances different state

```javascript
function Person(){}
var personGosho = new Person(); //instance of Person
var personMaria = new Person(); //instance of Person
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Creating Objects
- Function constructor with parameters
  - Just a regular function with parameters, invoked with **new**

```javascript
function Person(name, age){
  this.name = name; 
  this.age = age;
}
var person1 = new Person("George", 23);
console.log(person1.name);
//logs: George
var person2 = new Person("Maria", 18);
console.log(person2.age);
//logs: 18
```







<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# The prototype Object
- JavaScript is **prototype-oriented** programming language
  - Every object has a **prototype**
  - Its kind of its parent object
- Prototypes have properties available to all instances
  - The **O****bject** type is the parent of all objects
    - Every object inherits object
    - Object provides common methods such as **toString** and **valueOf**


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- When adding properties to a prototype, **all instances**will **have these properties**

```javascript
//adding a repeat method to the String type
String.prototype.repeat = function (count) {
  var str,
      pattern,
      i;
  pattern = String(this);
  if (!count) {
    return pattern;
  }
  str = '';
  for (i = 0; i < count; i += 1) {
    str += pattern;
  }
  return str;
};
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->

- When adding properties to a prototype, **all instances**will **have these properties**

```javascript
//adding a repeat method to the String type
String.prototype.repeat = function (count) {
  var str,
      pattern,
      i;
  pattern = String(this);
  if (!count) {
    return pattern;
  }
  str = '';
  for (i = 0; i < count; i += 1) {
    str += pattern;
  }
  return str;
};
```

<div class="fragment balloon" style="top:34.19%; left:42.71%; width:24.21%">Add method to all strings</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->

- When adding properties to a prototype, **all instances**will **have these properties**

```javascript
//adding a repeat method to the String type
String.prototype.repeat = function (count) {
  var str,
      pattern,
      i;
  pattern = String(this);
  if (!count) {
    return pattern;
  }
  str = '';
  for (i = 0; i < count; i += 1) {
    str += pattern;
  }
  return str;
};
```

<div class="fragment balloon" style="top:50.57%; left:42.71%; width:24.21%">Here this means the string</div>
<div class="fragment balloon" style="top:34.19%; left:42.71%; width:24.21%">Add method to all strings</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->

- When adding properties to a prototype, **all instances**will **have these properties**

```javascript
//adding a repeat method to the String type
String.prototype.repeat = function (count) {
  var str,
      pattern,
      i;
  pattern = String(this);
  if (!count) {
    return pattern;
  }
  str = '';
  for (i = 0; i < count; i += 1) {
    str += pattern;
  }
  return str;
};
```

<div class="fragment balloon" style="top:50.57%; left:42.71%; width:24.21%">Here this means the string</div>
<div class="fragment balloon" style="top:34.19%; left:42.71%; width:24.21%">Add method to all strings</div>

```javascript
//use it with:
'-'.repeat(25);
```





<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Object Members
- Objects can also define custom state
  - Custom properties that only instances of this type have
- Use the keyword **this**
  - To attach properties to object

```javascript
function Person(name,age){
  this.name = name;
  this.age = age;
}
var personMaria = new Person("Maria",18);
console.log(personMaria.name);
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Property values can be either variables or functions
  - Functions are called **methods**

```javascript
function Person(name,age){
  this.name = name;
  this.age = age;
  this.sayHello = function(){
    console.log("My name is " + this.name +                 " and I am " + this.age + "-years old");
  }
}
var maria = new Person("Maria",18);
maria.sayHello();
```





<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Attaching Methods
- Attaching methods inside the object constructor is a tricky operation
  - Its is slow
  - Every object has a function with the same functionality, yet different instance
  - Having the function constructor

```javascript
function Constr(name, age){
  this.m = function(){ 
    // Very important code
  };
}
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Attaching Methods

```javascript
var x = new Constr();
var y = new Constr();
console.log (x.m === y.m);
```

- Attaching methods inside the object constructor is a tricky operation
  - Its is slow
  - Every object has a function with the same functionality, yet different instance
  - Having the function constructor

```javascript
function Constr(name, age){
  this.m = function(){ 
    // Very important code
  };
}
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Attaching Methods
<div class="fragment balloon" style="top:68.72%; left:59.05%; width:24.21%">Logs 'false'</div>
- Attaching methods inside the object constructor is a tricky operation
  - Its is slow
  - Every object has a function with the same functionality, yet different instance
  - Having the function constructor

```javascript
var x = new Constr();
var y = new Constr();
console.log (x.m === y.m);
```


```javascript
function Constr(name, age){
  this.m = function(){ 
    // Very important code
  };
}
```





<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Better Method Attachment
- Instead of attaching the methods to **this**in the constructor

```javascript
function Person(name,age){
  //…
  this.sayHello = function(){
    //…
  }
}
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Better Method Attachment
- Instead of attaching the methods to **this**in the constructor
- Attach them to the **prototype** of the constructor

```javascript
function Person(name,age){
  //…
  this.sayHello = function(){
    //…
  }
}
```


```javascript
function Person(name,age){
}
Person.prototype.sayHello = 
  function(){
    //…
  };
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Better Method Attachment
- Instead of attaching the methods to **this**in the constructor
- Attach them to the **prototype** of the constructor

```javascript
function Person(name,age){
  //…
  this.sayHello = function(){
    //…
  }
}
```


```javascript
function Person(name,age){
}
Person.prototype.sayHello = 
  function(){
    //…
  };
```





<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Pros and Cons When Attaching Methods
- Attaching to **this**
- Attaching to **prototype**


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Pros and Cons When Attaching Methods
- Attaching to **this**
- Attaching to **prototype**
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic06.png" style="top:20.01%; left:40.86%; width:6.47%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Pros and Cons When Attaching Methods
- Attaching to **this**
- Attaching to **prototype**
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic07.png" style="top:20.01%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic08.png" style="top:20.69%; left:95.77%; width:6.47%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Pros and Cons When Attaching Methods
- Attaching to **this**
- Attaching to **prototype**
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic09.png" style="top:20.01%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic10.png" style="top:20.69%; left:95.77%; width:6.47%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Pros and Cons When Attaching Methods
- Attaching to **this**
- Attaching to **prototype**
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic11.png" style="top:20.01%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic12.png" style="top:31.36%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic13.png" style="top:20.69%; left:95.77%; width:6.47%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Pros and Cons When Attaching Methods
- Attaching to **this**
- Attaching to **prototype**
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic14.png" style="top:20.01%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic15.png" style="top:31.36%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic16.png" style="top:20.69%; left:95.77%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic17.png" style="top:31.49%; left:95.78%; width:6.46%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Pros and Cons When Attaching Methods
- Attaching to **this**
- Attaching to **prototype**
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic18.png" style="top:20.01%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic19.png" style="top:31.36%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic20.png" style="top:20.69%; left:95.77%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic21.png" style="top:31.49%; left:95.78%; width:6.46%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Pros and Cons When Attaching Methods
- Attaching to **this**
- Attaching to **prototype**
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic22.png" style="top:20.01%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic23.png" style="top:31.36%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic24.png" style="top:39.68%; left:40.79%; width:6.46%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic25.png" style="top:20.69%; left:95.77%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic26.png" style="top:31.49%; left:95.78%; width:6.46%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Pros and Cons When Attaching Methods
- Attaching to **this**
- Attaching to **prototype**
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic27.png" style="top:20.01%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic28.png" style="top:31.36%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic29.png" style="top:39.68%; left:40.79%; width:6.46%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic30.png" style="top:20.69%; left:95.77%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic31.png" style="top:39.90%; left:95.70%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic32.png" style="top:31.49%; left:95.78%; width:6.46%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Pros and Cons When Attaching Methods
- Attaching to **this**
- Attaching to **prototype**
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic33.png" style="top:20.01%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic34.png" style="top:31.36%; left:40.86%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic35.png" style="top:39.68%; left:40.79%; width:6.46%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic36.png" style="top:20.69%; left:95.77%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic37.png" style="top:39.90%; left:95.70%; width:6.47%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic38.png" style="top:31.49%; left:95.78%; width:6.46%; z-index:-1" /> -->




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Properties in JavaScript
- JavaScript supports properties
  - i.e. a way to execute code when:
    - Getting a value
    - Setting a value
- They are two ways to create properties in JS:
  - At object declaration with 
    -                                       and 
  - Anytime with

```javascript
get propName(){ }
```


```javascript
set propName(propValue){ }
```


```javascript
Object.defineProperty(obj, propName, descriptor)
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- **Object.defineProperty****(****obj****,****p****,****dscrptr****)**defines property **p** on object **obj**
  - _Example_:

```javascript
Object.defineProperty(Person.prototype, 'name', {
  get: function () {
    return this._name;
  },
  set: function (name) {
    if (!validateName(name)) {
      throw new Error('Name is invalid');
    }
    this._name = name;
  }
});
```


```javascript
//calls the setter
p.name = 'Jane Doe';
//calls the getter
console.log(p.name);
```





<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# ES 6 Get and Set
- ES6 introduces a new way to create properties and directly attach them to the prototype of the object:
  - Yet they can be defined only at the declaration of the object/function constructor

```javascript
Person.prototype = {
    get name() {
      return this._name;
    },
    set name(name) {
      if (!validateName(name)) {
        throw new Error('Name is invalid');
      }
      this._name = name;
      return this;
    }
}
```


```javascript
//calls the setter
p.name = 'Jane Doe';
//calls the getter
console.log(p.name);
```







<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# The this Object
- **this** is a special kind of object
  - It is available everywhere in JavaScript
    - Yet it has a different meaning
- The **this** object can have two different values
  - **The parent scope**
    - The **value of this** of the containing scope
    - If none of the parents is object,**its value is window**
  - **A concrete object**
    - When using the new operator


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# this in Function Scope
- When executed over a function, without the **new** operator
  - **this** refers to the **parent scope**

```javascript
function Person(name) {
  this.name = name;
  this.getName = function getPersonName() {
    return this.name;
  }
} 
var p = new Person("Gosho");
var getName = p.getName;
console.log(p.getName()); //Gosho
console.log(getName()); //undefined
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# this in Function Scope
- When executed over a function, without the **new** operator
  - **this** refers to the **parent scope**

```javascript
function Person(name) {
  this.name = name;
  this.getName = function getPersonName() {
    return this.name;
  }
} 
var p = new Person("Gosho");
var getName = p.getName;
console.log(p.getName()); //Gosho
console.log(getName()); //undefined
```

<div class="fragment balloon" style="top:49.02%; left:51.53%; width:30.99%">Here **this** means the Person object</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# this in Function Scope
- When executed over a function, without the **new** operator
  - **this** refers to the **parent scope**

```javascript
function Person(name) {
  this.name = name;
  this.getName = function getPersonName() {
    return this.name;
  }
} 
var p = new Person("Gosho");
var getName = p.getName;
console.log(p.getName()); //Gosho
console.log(getName()); //undefined
```

<div class="fragment balloon" style="top:49.02%; left:51.53%; width:30.99%">Here **this** means the Person object</div>
<div class="fragment balloon" style="top:60.51%; left:63.77%; width:33.06%">Here **this** means its parent scope (window)</div>




<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Function Constructors
- JavaScript cannot limit function to be used only as constructors
  - JavaScript was meant for simple UI purposes

```javascript
function Person(name) {
  var self = this;
  self.name = name;
  self.getName = function getPersonName() {
    return self.name;
  }
} 
var p = Person("Peter");
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Function Constructors
- JavaScript cannot limit function to be used only as constructors
  - JavaScript was meant for simple UI purposes

```javascript
function Person(name) {
  var self = this;
  self.name = name;
  self.getName = function getPersonName() {
    return self.name;
  }
} 
var p = Person("Peter");
```

<div class="fragment balloon" style="top:60.90%; left:50.82%; width:30.99%">What will be the value of **this**?</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- The only way to mark something as contructor is to name it **PascalCase**
  - And hope that the user of you code will be so nice to call PascalCase-named functions with new






<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Constructors with Modules
- Function constructors can be put inside a module
  - Introduces a better abstraction of the code
  - Allows to hide constants and functions
- JavaScript has first-class functions, so they can be easily returned by a module

```javascript
var Person = (function () {
  function Person(name) {
    //…
  }
  Person.prototype.walk = function (distance){ /*...*/ };
  return Person;
}());
```







<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Hidden Funcitons
- When a function constructor is wrapped inside a module:
  - The module can contain hidden functions
  - The function constructor can use these hidden functions
- Yet, to use these functions as object methods, we should use **apply** or **call**


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Hidden Functions: _Example_
- Using hidden functions
- var Rect = (function () {
-   function validatePosition() {
-     //…
-   }
-   function Rect(x, y, width, height) {
-     var isPositionValid = validatePosition.call(this);
-     if (!isPositionValid) {
-       throw new Error('Invalid Rect position');
-     }
-   }
-   Rect.prototype = { /* … */};
-   return Rect;
- }());


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Hidden Functions: _Example_
- var Rect = (function () {
-   function validatePosition() {
-     //…
-   }
-   function Rect(x, y, width, height) {
-     var isPositionValid = validatePosition.call(this);
-     if (!isPositionValid) {
-       throw new Error('Invalid Rect position');
-     }
-   }
-   Rect.prototype = { /* … */};
-   return Rect;
- }());
- Using hidden functions
<div class="fragment balloon" style="top:23.71%; left:61.21%; width:30.99%">This is not exposed from the module</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Hidden Functions: _Example_
- Using hidden functions
- var Rect = (function () {
-   function validatePosition() {
-     //…
-   }
-   function Rect(x, y, width, height) {
-     var isPositionValid = validatePosition.call(this);
-     if (!isPositionValid) {
-       throw new Error('Invalid Rect position');
-     }
-   }
-   Rect.prototype = { /* … */};
-   return Rect;
- }());
<div class="fragment balloon" style="top:23.71%; left:61.21%; width:30.99%">This is not exposed from the module</div>
<div class="fragment balloon" style="top:52.17%; left:62.15%; width:30.99%">Use call() to invoke the function over this</div>






<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Inheritance in Classical OOP
- Inheritance is a way to extend the functionality of an object, into another object
  - Like Student inherits Person
  - Person inherits Mammal, etc…
- In JavaScript inheritance is achieved by setting the prototype of the derived type to the prototype of the parent

```javascript
function Person(fname, lname) {}
function Student(fname, lname, grade) {}
Student.prototype = Person.prototype;
```


```javascript
var student = new Student("Kiro", "Troikata", 7);
```







<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# The Prototype Chain
- Objects in JavaScript can have only a single prototype
  - Their prototype also has a prototype, etc…
  - This is called the prototype chain
- When a property is called on an object
  - This object is searched for the property
  - If the object does not contain such property, its prototype is checked for the property, etc…
  - If a null prototype is reached, the result is undefined




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Calling Parent Methods
- JavaScript has no direct way of calling its parent methods
  - Function constructors actually does not know who or what is their parent
- Calling parent methods is done using call and apply


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Calling Parent Methods: _Example_
- Having Shape:

```javascript
var Shape = (function () {
  function Shape(x, y) {
    //initialize the shape
  }
  Shape.prototype = {
    serialize: function () {
      //serialize the shape      //return the serialized
    }
  };
  return Shape;
}());
```


```javascript
var Rect = (function () {
 function Rect(x, y, 
               width, height) {
   Shape.call(this, x, y);
   //init the Rect
 }
 Rect.prototype = new Shape();
 Rect.prototype.serialize=function (){
   Shape.prototype
        .serialize
        .call(this);
   //add Rect specific serialization     
   //return the serialized;
 };
 return Rect;
}());
```

- Inheriting it with Rect


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Calling Parent Methods: _Example_
- Having Shape:

```javascript
var Shape = (function () {
  function Shape(x, y) {
    //initialize the shape
  }
  Shape.prototype = {
    serialize: function () {
      //serialize the shape      //return the serialized
    }
  };
  return Shape;
}());
```


```javascript
var Rect = (function () {
 function Rect(x, y, 
               width, height) {
   Shape.call(this, x, y);
   //init the Rect
 }
 Rect.prototype = new Shape();
 Rect.prototype.serialize=function (){
   Shape.prototype
        .serialize
        .call(this);
   //add Rect specific serialization     
   //return the serialized;
 };
 return Rect;
}());
```

- Inheriting it with Rect
<div class="fragment balloon" style="top:40.03%; left:64.38%; width:24.21%">Call parent constructor</div>


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Calling Parent Methods: _Example_
- Having Shape:

```javascript
var Shape = (function () {
  function Shape(x, y) {
    //initialize the shape
  }
  Shape.prototype = {
    serialize: function () {
      //serialize the shape      //return the serialized
    }
  };
  return Shape;
}());
```


```javascript
var Rect = (function () {
 function Rect(x, y, 
               width, height) {
   Shape.call(this, x, y);
   //init the Rect
 }
 Rect.prototype = new Shape();
 Rect.prototype.serialize=function (){
   Shape.prototype
        .serialize
        .call(this);
   //add Rect specific serialization     
   //return the serialized;
 };
 return Rect;
}());
```

- Inheriting it with Rect
<div class="fragment balloon" style="top:40.03%; left:64.38%; width:24.21%">Call parent constructor</div>
<div class="fragment balloon" style="top:64.65%; left:75.65%; width:24.21%">Call parent method</div>




<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Inheritance in Classical OOP
- http://academy.telerik.com




