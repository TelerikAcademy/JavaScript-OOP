<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# Mixins in JavaScript
## "Multiple" inheritance in JavaScript
<!-- <img class="slide-image" showInPresentation="false" src="imgs/pic00.png" style="top:48.48%; left:65.53%; width:38.79%; z-index:-1" /> -->
<article class="signature">
	<p class="signature-course">JavaScript OOP</p>
	<p class="signature-initiative">Telerik Software Academy</p>
	<a href="http://academy.telerik.com" class="signature-link">http://academy.telerik.com</a>
</article>


<!-- section start -->
<!-- attr: { id:'', showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents

- What is a Mixin?
- Creating Mixins
- Examples with Mixins

<!-- <img class="slide-image" showInPresentation="false" src="imgs/pic02.png" style="top:15.22%; left:67.55%; width:38.79%; z-index:-1" /> -->

<!-- section start -->
<!-- attr: { class:'slide-section' } -->

# What is a Mixin?
##  Multiple inheritance in JavaScript

# What is a Mixin?

- Mixins are the way to implement multiple inheritance in JavaScript
  - Allow reusability of classes
- Mixins are also called tool classes
  - They provide additional functionality to ready-to-use classes

# Creating Mixins

- The "old-way" to create a mixin is as follows:

  -  Create a plain object with the needed functionality:

    ```javascript
    var hasPrintNameMixin = {
        printName() {
          console.log(`My name is ${this.name}`);
        }
    };
    ```

  -  Create your class:

      ```javascript
      class Person {
        constructor(name){
          this.name = name;
        }
      }
      ```

<!-- attr: {hasScriptWrapper: true} --> 
# Creating Mixins (cont.)

  -  Copy all properties of the **mixin** to the prototype of the class:

    ```javascript
    Object.keys(hasPrintNameMixin)
      .forEach(key => Person.prototype[key] = hasPrintNameMixin[key]);
    ```
  -  All instances of the Person class have `printName()` method

    ```javascript
    let p = new Person("John");
    p.printName();
    ```

<!-- attr: {class:'slide-section demo'} -->
#   Simple Mixins
##  [Demo](/demos/1.\ simple-mixins.js)


# Mixins with ES2015

- ES2015 has the `class` operator that can be used to dynamically create classes
  - Having that, mixins in ES2015 can be created more expressional


# Creating mixins with ES2015

- Create a function that takes a base class as first parameter and returns a derived class as a result

```javascript
var ValidatorMixin = Base => class extends Base {
  _validateString(str) {
    return str && (typeof str === "string") && str.length > 0;
  }
  _validateNumber(n) {
    return n && (typeof n === "number");
  }
};
```

<!-- attr: {showInPresentation:true, style:'font-size:0.9em'} -->

# Creating mixins with ES2015 (cont.)

- Create your class using the Mixin
  - This is the weird part

```javascript
class Person extends ValidationMixin(Object) {
    set name(name) {
        if (!this._validateString(name)) {
            throw new Error("Invalid name");
        }
        this._name = name;
    }
    set age(age) {
        if (!this._validateNumber(age)) {
            throw new Error("Invalid age");
        }
        this._age = age;
    }
}
```

<!-- attr: {showInPresentation:true, style:'font-size:0.9em'} -->

# Creating mixins with ES2015 (cont.)

-  Now, each person instance will have `_validateString()` and `_validateNumber()`
  - The following will throw error:

```javascript
let p = new Person("", 1);
```

<!-- attr: {class:'slide-section demo'} -->

#   Mixins with ES2015
##  [Demo](/demos/2. ES2015-mixins.js)


<!-- attr: {showInPresentation:true, style:'font-size:0.9em'} -->

# Using `super`

- Since Mixins actually add a new parent in the inheritance, all `super` calls work as well:

```javascript
let HasNameInToStringMixin = Base => class inherits Base {
  toString: (){
    return `Name: ${this.name}`;
  }
};

class Person extends HasNameInToStringMixin(Mammal)  {
  constructor(name, age){
    super(age);
    this.name = name;
  }

  toString(){
    return super.toString() + `, Age: ${this.age}`
  }
}
```

<!-- attr: {class:'slide-section demo'} -->

# Using `super`
##  Demo

<!-- Questions -->
<!-- section start -->
<!-- attr: { hasScriptWrapper:true, class:"slide-questions", id:"questions" } -->
# Mixins in JavaScript
## Questions?


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

<!-- <img class="slide-image" showInPresentation="false"  src="imgs/pic00.png" style="top:58.18%; left:90.52%; width:16.97%; z-index:-1" /> -->
