# Prototypal Inheritance
==================================

### Task 1.
* Create an object domElement, that has the following properties and methods:
  * use prototypal inheritance, without function constructors
  * method init() that gets the domElement type
    * i.e. `Object.create(domElement).init('div')`
  * property type that is the type of the domElement
    * a valid type is any non-empty string that contains only Latin letters and digits
  * property innerHTML of type string
    * gets the domElement, parsed as valid HTML
	  * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
  * property content of type string
    * sets the content of the element
    * works only if there are no children
  * property attributes
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
  * property children
    * each child is a domElement or a string
  * property parent
    * parent is a domElement
  * method appendChild(domElement / string)
    * appends to the end of children list
  * method addAttribute(name, value)
    * throw Error if type is not valid
  * // method removeAttribute(attribute)

_Example:_
  
  var meta = Object.create(domElement)<br/>
  	.init('meta')<br/>
  	.addAttribute('charset', 'utf-8');
  
  var head = Object.create(domElement)<br/>
  	.init('head')<br/>
  	.appendChild(meta)
  
  var div = Object.create(domElement)<br/>
  	.init('div')<br/>
  	.addAttribute('style', 'font-size: 42px');
  
  div.content = 'Hello, world!';
  
  var body = Object.create(domElement)<br/>
  	.init('body')<br/>
  	.appendChild(div)<br/>
  	.addAttribute('id', 'cuki')<br/>
  	.addAttribute('bgcolor', '#012345');
  
  var root = Object.create(domElement)<br/>
  	.init('html')<br/>
  	.appendChild(head)<br/>
  	.appendChild(body);
  
  console.log(root.innerHTML);
  
  _Outputs:_
  
  \<html\>\<head\>\<meta charset="utf-8"\>\</meta\>\</head\>\<body bgcolor="#012345" id="cuki"\>\<div style="font-size: 42px"\>Hello, world!\</div\>\</body\>\</html\>