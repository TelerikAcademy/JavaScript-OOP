<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Object and Object.prototype methods
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic00.png" style="top:6.05%; left:39.13%; width:23.08%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic01.png" style="top:7.68%; left:59.67%; width:6.79%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic02.png" style="top:56.90%; left:49.04%; width:13.38%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic03.png" style="top:11.81%; left:10.79%; width:23.64%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic04.png" style="top:49.25%; left:66.88%; width:36.73%; z-index:-1" /> -->
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
- **Object** methods
  - .defineProperty() and .defineProperties()
  - .create()
  - .keys()
  - .preventExtensions() and .isExtensible()
  - .seal() and .isSealed()
  - .freeze() and .isFrozen()
  - .assign()
  - .is()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic05.png" style="top:49.65%; left:68.51%; width:34.80%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Table of Contents
- **Object.prototype** methods
  - .hasOwnProperty()
  - .isPrototypeOf()
  - .propertyIsEnumerable()
  - .valueOf()
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic06.png" style="top:49.65%; left:68.51%; width:34.80%; z-index:-1" /> -->




<!-- section start -->




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Defines a new property directly on an object, or modifies an existing property on an object, and returns the object
- Syntax: **Object.defineProperty****(****obj****, prop,****desc****)**
  - **o****bj** – the object on which to define the property
  - **prop** – the name of the property to be defined or modified 
  - **descriptor** – the descriptor for the property being defined or modified


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Descriptors:
  - **data descriptor**– property that has a value
  - **accessor****descriptor**– property described by a getter-setter pair of functions
- Both are objects and have required keys
  - **configurable**– true if property can be changed
  - **enumerable**– if property shows up during enumeration of the properties on the corresponding object
    - Both default to **false**


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- **Data descriptor** has optional keys: 
  - **value**– associated value with the prop
    - Defaults to **undefined**
  - **writable**– true if the value can be changed
    - Defaults to **false**
- **Accessor** **descriptor**has optional keys:
  - **g****et** – getter function
  - **s****et** – setter function
    - Both default to **undefined**




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Defines a new property directly on an object, or modifies an existing property on an object, and returns the object
- Syntax: **Object.defineProperties****(****obj****, props)**
  - **o****bj** – the object on which to define the property
  - **props** – an object whose own enumerable properties constitute descriptors for the properties to be defined or modified


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Properties have the following optional keys:
  - configurable, enumerable, value,writable,get and set

```javascript
var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true,
    enumerable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
});
```





<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Creates a new object with the specified prototype object and properties
- Syntax: **Object.create****(proto[,****propertiesObject****])**
  - **proto** – the object which should be the prototype of the newly created object
  - **propertiesObject** – specify property descriptions to be added to the newly-created object
- function Shape() { … }
- function Rectangle() { Shape.call(this); }
- Rectangle.prototype = Object.create(Shape.prototype);
- Rectangle.prototype.constructor = Rectangle;




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Returns an array of a given object's **own** enumerable properties
  - No properties form the prototype chain
- Syntax: **Object.keys****(****obj****)**
  - **o****bj** – the object whose enumerable own properties are to be returned

```javascript
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // ['0', '1', '2']

var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(an_obj)); // ['2', '7', '100']
```





<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Prevents new properties from ever being added to an object
  - the properties may still be deleted
- Syntax: **Object.preventExtensions****(****obj****)**
  - **obj** – the object that should be made non-extensible
- **Object.isExtensible****(****obj****)** – determines if an object is extensible
- var obj = { removable: true };
- Object.preventExtensions(obj); assert(Object.isExtensible(obj) === true);
- Object.defineProperty(obj, 'new', { value: 8675309 }); // throws a TypeError




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Preventing new properties from being added
- Marking all existing properties as **non-configurable**
- Values of present properties can still be changed as long as they are writable.
- Syntax: **Object.seal****(****obj****)**
  - **o****bj** – the object to be sealed
- **Object.isSealed****(****obj****)** – determines if an object is sealed
- var obj = { prop: function() {}, foo: 'bar' };
- var o = Object.seal(obj);
- assert(Object.isSealed(obj) === true);
- // Changing property values on a sealed object still works
- obj.foo = 'quux';




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Prevents:
  - new properties from being added
  - existing properties from being removed or changed
- The object is made effectively immutable
- Syntax: **Object.freeze****(****obj****)**
  - **obj** – the object to freeze
- **Object.isFrozen****(****obj****)** – determines if an object is frozen
- var obj = { prop: function() {}, foo: 'bar' };
- var o = Object.freeze(obj);
- assert(Object.isFrozen(obj) === true);
- obj.foo = 'quux'; // silently does nothing




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Copy the values of all enumerable own properties from one or more source objects to a target object
- Syntax: **Object.assign****(target, …sources)**
  - **target** – the target object
  - **sources**– the source object(s)
- var obj = { a: 1 };
- var copy = Object.assign({}, obj);
- console.log(copy); // { a: 1 }

```javascript
var o1 = { a: 1 }, o2 = { b: 2 }, o3 = { c: 3 };

var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }
```





<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Determines whether two values are the same value
- Syntax: **Object.is(value1, value2)**
  - **value1** and **value2** – values to compare
- Object.is('foo', 'foo');     // true
- Object.is(window, window);   // true
- Object.is('foo', 'bar');     // false
- Object.is([], []);           // false
- var test = { a: 1 };
- Object.is(test, test);       // true
- Object.is(0, -0);            // false
- Object.is(NaN, 0/0);         // true




<!-- section start -->




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Returns a boolean indicating whether the object has the specified property
- Syntax: **obj.hasOwnProperty****(prop)**
  - **prop** – the name of the property to test
- o = new Object();
- o.prop = 'exists';
- o.hasOwnProperty('prop');             // returns true
- o.hasOwnProperty('toString');         // returns false
- o.hasOwnProperty('hasOwnProperty');   // returns false




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Tests for an object in another object's prototype chain
- Syntax: **prototypeObj.isPrototypeOf****(****obj****)**
  - **prototypeObj** – an object to be tested against each link in the prototype chain of the object argument
  - **obj** – the object whose prototype chain will be searched
- _Note_: **isPrototypeOf** differs from the **instanceof** operator. 
  - In the expression "**object****instanceof** **AFunction**", the object prototype chain is checked against **AFunction.prototype**, not against **AFunction** itself




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Returns a boolean indicating whether the specified property is enumerable
- Syntax: **obj.propertyIsEnumerable****(prop)**
  - **prop** – the name of the property to test
- var o = {};
- var a = [];
- o.prop = 'is enumerable';
- a[0] = 'is enumerable';
- o.propertyIsEnumerable('prop');   // true
- a.propertyIsEnumerable(0);        // true
- Math.propertyIsEnumerable('random');   // false
- this.propertyIsEnumerable('Math');     // false




<!-- section start -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->

- Returns the primitive value of the specified object
- Syntax: **object.valueOf****()**
  - JavaScript automatically invokes it when encountering an object where a primitive value is expected
  - If an object has no primitive value, valueOf returns the object itself
- You can create a function to be called in place of the default **valueOf** method (override **valueOf**)
- var o = new Object();
- myVar = o.valueOf();      // [object Object]


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Object and Object.prototype methods
- http://academy.telerik.com




