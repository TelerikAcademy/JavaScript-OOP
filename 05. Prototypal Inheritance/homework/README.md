# Prototypal Inheritance

### Task 1.
#### Create an object `domElement`, that has the following properties and methods:
  1. Use prototypal inheritance, without function constructors
  2. Method `init()` that gets the __domElement__ type
    * i.e. `Object.create(domElement).init('div');`
  3. Property type that is the type of the __domElement__
    * a valid type is any non-empty string that contains only Latin letters and digits
  4. Property `innerHTML` of type string
    * gets the __domElement__, parsed as valid HTML:
    ```
      <type attr1="value1" attr2="value2" ... > ... content / children's.innerHTML</type>
    ```
    * attributes must be sorted in ascending alphabetical order by their name, not in the order they were added
  5. Property `content` of type string
    * sets the content of the element
    * works only if there are no children
  6. Property `attributes`
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes `-`
  7. Property `children`
    * each child is a __domElement__ or a string
  8. Property `parent`
    * parent is a __domElement__
  9. Method `appendChild(domElement / string)`
    * appends to the end of children list
  10. Method `addAttribute(name, value)`
    * `throw Error` if type is not valid
  11. Method `removeAttribute(attribute)`

_Example:_

```javascript
  var meta = Object.create(domElement)
    .init('meta')
    .addAttribute('charset', 'utf-8');

  var head = Object.create(domElement)
    .init('head')
    .appendChild(meta)

  var div = Object.create(domElement)
    .init('div')
    .addAttribute('style', 'font-size: 42px');

  div.content = 'Hello, world!';

  var body = Object.create(domElement)
    .init('body')
    .appendChild(div)
    .addAttribute('id', 'cuki')
    .addAttribute('bgcolor', '#012345');

  var root = Object.create(domElement)
    .init('html')
    .appendChild(head)
    .appendChild(body);

  console.log(root.innerHTML);
```

  _Outputs:_

```
<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
```
