<!-- section start -->




<!-- section start -->
<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Table of Contents
- Unit Testing
  - Overview
  - Test-driven & behavior-driven development
- Mocha & Chai
  - Overview and installation
  - Running simple tests
- Mocha HTML Reporter and Karma
- Creating a test suites and specs




<!-- section start -->
<!-- attr: { id:'', class:'slide-section', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# What is Unit Testing?
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic00.png" style="top:15.87%; left:26.35%; width:56.27%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Unit Test – Definition
- A **unit test**is a piece of code written by a developer that exercises a very small, specific area of functionality of the code being tested.
- **“Program testing can be used to show the presence of bugs, but never to show their absence****!”**
- Edsger Dijkstra, [1972] 


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Manual Testing
- You have already done unit testing
  - Manually, by hand
- **Manual tests**are less efficient
  - Not structured
  - Not repeatable
  - Not on all your code
  - Not easy to do as it should be
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic01.png" style="top:38.49%; left:75.79%; width:27.91%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Unit Test – _Example_

```javascript
function sum(numbers)
{
  var sum = 0;
  for (var i=0; i < numbers.length; i++)
    sum += array[i];
  return sum;
}
function testSum()
{
 if (sum([1,2]) != 3)
    throw new Error('1+2 != 3');
 if (sum([-2]) != -2)
    throw new Error('-2 != -2');
 if (sum([]) != 0)
    throw new Error('0 != 0');
}
```



<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Unit Testing – Some Facts
- Tests are specific **pieces of code**
- In most cases unit tests are **written by developers**, not by QA engineers
- Unit tests are released into the code repository (TFS / SVN / Git) along with the code they test
- Unit testing **framework** is needed
  - QUnit, Jasmine, Mocha


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Unit Testing – More Facts
- All objects should be tested
- All methods should be tested
  - Trivial code may be omitted 
    - E.g. property getters and setters
  - Private methods can be omitted
    - Some gurus recommend to never test private methods &rarr; this can be debatable
- Ideally **all unit tests should pass**before check-in into the source control repository
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic02.png" style="top:13.22%; left:83.27%; width:20.35%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:true, style:'' } -->
# Why Unit Tests?
- Unit tests dramatically **decrease the number of defects** in the code 
- Unit tests **improve design**
- Unit tests are good **documentation**
- Unit tests **reduce the cost**of change
- Unit tests **allow refactoring**
- Unit tests decrease the **defect-injection rate**due to refactoring / changes
<!-- <img class="slide-image" showInPresentation="true" src="\imgs\pic03.png" style="top:22.92%; left:87.95%; width:15.44%; z-index:-1" /> -->


<!-- attr: { id:'', class:'', showInPresentation:true, hasScriptWrapper:false, style:'' } -->
# Unit Testing in JavaScript
- http://academy.telerik.com 




