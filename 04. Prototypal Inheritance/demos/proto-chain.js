(function () {
  console.log('**************************');
  console.log('Example 1: setting properties');
  console.log('---------');
  var parent = {
    x: 'parent x',
  };
  //set child.__proto__ to parent
  var child = Object.create(parent);

  child.y = 'child y';
  //print keys 'x' and 'y' from child
  //y is on the child, x is found on the parent
  console.log(child.x + ', ' + child.y);

  //create a key x on the child
  child.x = 'child x';
  console.log(child.x + ', ' + child.y);

  //child.x creates a NEW key, and does not override the parent key
  console.log(child.__proto__.x);
  console.log(parent.x);
  console.log('**************************');
} ());

(function () {
  console.log('**************************');
  console.log('Example 2: setting properties with functions from parent');
  console.log('---------');
  var parent = {
    y: 3,
    x: 'parent x',
    init: function (x) {
      this.x = x;
      return this;
    }
  };
  
  //set child.__proto__ to parent
  var child = Object.create(parent)
    .init('child x');
  //child creates its own property x
  console.log(child.x + ', ' + parent.x);
  console.log(child);
  console.log('**************************');
} ());

