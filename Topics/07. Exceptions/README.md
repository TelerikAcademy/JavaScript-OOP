<!-- section start -->
<!-- attr: { id:'', class:'slide-title', showInPresentation:true, hasScriptWrapper:true } -->
# JavaScript Exceptions
## Throwing and handling exceptions
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic00.png" style="top:11.71%; left:5.61%; width:12.28%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic01.png" style="top:49.76%; left:67.22%; width:32.19%; z-index:-1" /> -->
<!-- <img class="slide-image" showInPresentation="true" src="imgs\pic02.png" style="top:2.15%; left:20.40%; width:83.75%; z-index:-1" /> -->
<article class="signature">
	<p class="signature-course"></p>
	<p class="signature-initiative"></p>
	<a href="" class="signature-link"></a>
</div>




<!-- section start -->
<!-- attr: { id:'', showInPresentation:true, hasScriptWrapper:true } -->
# Table of Contents
- Exceptions
- Exception handling
  - Try-catch block
- Throwing exceptions
- Custom exceptions




<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# JavaScript Exceptions
- Exceptions are special objects that hold information about errors
- Exceptions are the correct way to handle errors in a programming language
  - Almost every object or function can throw an exception
- Most common exceptions in JavaScript are:
  - **ReferenceError**
  - **TypeError**
  - **SyntaxError**




<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Exception Handling
- Handling exceptions means:
  - Catch an exception
  - Resolve the error
  - Continue the execution of the application
- Exception handling provides a way to catch the exception without breaking the workflow of an application
  - Catch the error, solve it and then continue the execution of the application


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->

- Exception handling is done using a try-catch block
- try {
-   // code that can throw an exception
- } catch (ex) {
-   // if the above code throws an exception this code is  
-   // executed and ex holds the info about the exception
- }
- **Try** runs an error-prone code that can throw an exception
  - If an exception is thrown the execution of the code inside the try stops and the code in the catch block is executed


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->

- Every try-catch block can contain only one try and one catch block
  - If you are looking to catch a specific exception, check the exception type inside the catch block
- The exception object holds information about the exception	
  - Its type
  - An exception message


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Exception Handling: _Example_
- Create a function that throws an exception based on an argument

```javascript
try {
  throwException("TypeError");
} catch (ex) {			
  console.log("---------------");
  console.log("Exception object: " + ex);
  console.log("Type: " + ex.name);
  console.log("Message: " + ex.message);
  console.log("---------------");
}
```







<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Handling Multiple Exception
- **try-catch blocks** contain a single catch
  - How can our code handle different exceptions?
  - Make an if-else on the exception type
- If looking for a **TypeError**, **SyntaxError** or **ReferenceError**
  - Check the type of the exception object

```javascript
try {
  throwException("reference");
} catch (ex) {
 if (ex instanceof TypeError) { … }
 else if (ex instanceof ReferenceError) { … }
 else if (ex instanceof SyntaxError) { … }
}
```







<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Creating Exception
- Exceptions can be created using an exception constructor
  - Different constructor for each exception type
  - The constructor takes an optional message
    - If skipped, the message is an empty string
- To throw an exception use the reserved word **throw** with an exception object

```javascript
var typeException = new TypeError([message]);
var rangeException = new RangeError([message]);
```


```javascript
var typeEx = new TypeError("Not correct use of an object");
throw typeEx;
```







<!-- section start -->


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# Custom Exception
- Custom exceptions are made by just inheriting the **Error** type

```javascript
function AgeError(message, minAge, maxAge) {
  this.message = message;
  this.minAge = minAge;
  this.maxAge = maxAge;
}
AgeError.inherit(Error);
```

  - Our custom exception is ready
- A drawback to this approach is that there is no benefit from inheriting Error




<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# More about Custom Exceptions
- Inheriting **Error** is the OOP way
  - Yet what we gain from this inheritance?
    - Performance is **slower**
    - Constructors are **hardly to reuse**
- Remember duck typing?
  - The only thing a catch wants is an object
    - It does not care what kind of object


<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->

- To use an object as an exception, it only needs a message property
  - It is not obligatory, but this is a good practice
  - The following are correct exception usages

```javascript
throw { message: "sample exception“ };
throw { message: "Age is out of range",
       minAge: 0, maxAge: 135
};
throw document.createElement("div"); // don't do this!
```

- JS does not care whether the thrown object is of type Error
  - It only cares if the thrown thing is an object
    - Does not work with primitives




<!-- attr: { showInPresentation:true, hasScriptWrapper:true } -->
# JavaScript Exceptions
- http://academy.telerik.com




