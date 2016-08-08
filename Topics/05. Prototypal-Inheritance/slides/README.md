<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Prototypal Inheritance and Duck Typing
## The way to create objects in JavaScript
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
- Object prototypes
  - "Inheriting" prototypes
  - Setting values on prototypes
- Creating instances with Object.create()
  - Wrapping it into IIFEs
- Duck typing
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic05.png" style="top:45.70%; left:60.13%; width:38.79%; z-index:-1" /> -->




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Object Prototypes
- The prototype is an object, that provides properties to its inheritors
  - i.e. the objects that have this object as their prototype
- Every object has its own prototype
  - By default, set to Object.prototype
  - This forms the so called "Prototype chain"
  - Object has for prototype null, ending the prototype chain


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Object Prototypes: _Example_
- Given the code:
- var animal = {
-   /* properties and methods */
- };
  - The prototype chain is:

```javascript
animal
```


```javascript
Object.prototype
```


```javascript
null
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Setting the Prototype of an Object
- Every JavaScript object has a property __proto__ 
  - It can be used to access/change the prototype
  - Dangerous to use
- When setting a prototype to an object, the object has access to all the properties of the prototype
  - Through the prototype chain
  - This is actually called Prototypal Inheritance

```javascript
var animal = {
  makeNoise: function(){
    console.log('The ' + this.type +                 ' makes noise "'  + this.noise + '"');
  }
};
var dog = { type: 'dog', noise: 'Djaf' };
dog.__proto__ = animal;
dog.makeNoise(); // makeNoise() is from the prototype(animal)
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Setting the Prototype of an Object

```javascript
var animal = {
  makeNoise: function(){
    console.log('The ' + this.type +                 ' makes noise "'  + this.noise + '"');
  }
};
var dog = { type: 'dog', noise: 'Djaf' };
dog.__proto__ = animal;
dog.makeNoise(); // makeNoise() is from the prototype(animal)
```


```javascript
animal
```


```javascript
Object.prototype
```


```javascript
null
```


```javascript
dog
```







<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- ES5 introduces a method for setting the prototype of an object
  - Object.create(object)

```javascript
var animal = { 
  /* properties and methods */ 
};
var dog = Object.create(animal);
dog.type = 'dog';
dog.noise = 'djaf';
```


```javascript
var animal = { 
  /* properties and methods */ 
};
var dog = {
  type: 'dog',
  noise: 'djaf'
};
Dog.__proto__ = animal
```





<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Working with Object Prototypes
- Object.create() is great, but it is kind of sloppy to set properties with dot (.)
  - This all can be solved with Object.defineProperties():

```javascript
var dog = Object.defineProperties(animal, {
    type: {
      value: 'dog'
    },
    noise: {
      value: 'djaf'
    },
    bark: {
      value: function (){
        console.log('Bark, Bark');
      }
    }
  });
  return dog;
});
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- And… there are IIFEs:

```javascript
var dog = (function (parent) {
  var dog;
  /* hidden methods */
  dog = Object.defineProperties(parent, {
    type: {
      value: 'dog'
    },
    noise: {
      value: 'djaf'
    },
    bark: {
      value: function (){
        console.log('Bark, Bark');
      }
    }
  });
  return dog;
});
```







<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Reusing Parent Methods
- Reusing parent methods is crucial to any object-oriented design
  - Thankfully there are Function.prototype.call() and Function.prototype.apply()

```javascript
var animal = /* declare and return animal */
var dog = (function(parent){
  var dog = Object.create(parent);
  Object.defineProperty(dog, 'init', {
    value: function(name, age, breed){
      parent.init.call(this, name, age);
      this.breed = breed;
    }
  });
  return dog;
}(animal));
```







<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Duck Typing
- Duck typing is a layer of programming language and design rules on top of typing
  - Typing is concerned with assigning a type to any object
    - i.e. methods work with object of some type
  - Duck typing is concerned with establishing the suitability of an object for some purpose
    - i.e. methods with object that have certain properties


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Duck Typing _Example_s

```javascript
var person = {
  name: 'John Doe', age: 0,
  introduce: function () {
    console.log('Hello! I am ' + this.name +                 ' and I am ' + this.age + '-years-old');
  }
};
person.introduce; 
person.introduce.call({ name: 'Snoopy',  age: 2 });
```

  - Using Array#slice
- var arrObj = {
-   length: 3,
-   '0': 'One',
-   '1':'Two',
-   '2': 'Three'  
- };
- var arr = [].slice.call(arrObj);
- //returns ['One', 'Two', 'Three']
  - With our objects
  - Methods does not care of the type of the passed objects




<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Prototypal Inheritance and Duck Typing
- http://academy.telerik.com




