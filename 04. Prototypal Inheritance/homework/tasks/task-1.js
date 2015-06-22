/* Task Description */
/*
 * Create an object domElement, that has the following properties and methods:
 * method init() that gets the domElement type
 * i.e. `Object.create(domElement).init('div')`
 * property type that is the type of domElement
 * a valid type is any non-empty string that contains only Latin letters and digits
 * property innerHTML of type string
 * gets the domElement, parsed as valid HTML
 *  property content of type string
 * sets the content of the element
 * works only if children is empty
 * property attributes
 * each attribute has name and value
 * property children
 * each child is also a domElement
 * method appendChild(domElement)    
 * appends to the end of children list
 * method removeChild(domElement)
 * method addAttribute(attribute)
 * method removeAttribute(attribute)
 */
function solve() {
  var domElement = (function() {
    var domElement;

    return domElement;
  }());
  return domElement;
}
exports = solve;

var root = Object.create(domElement)
  .init('html');

root.addAttribute('class', 'root-element');

var body = Object.create(domElement)
  .init('body')
  .content('Useless')
  .appendChild(
    Object.create(domElement)
    .init('div')
    .addAttribute('id', 'root')
    .content('Hello, there!')
  );
root.appendChild(body);


root.innerHTML
  //=>
  //<html class="root-element">
  //  <body>
  //    <div id="root">
  //      Hello, there
  //    </div>
  //  </body>
  //</html>
