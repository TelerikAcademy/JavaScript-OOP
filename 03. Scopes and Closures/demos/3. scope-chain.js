function outer() {
  var x = 'OUTER';

  function inner() {
    var x = 'INNER';
    return x;
  }
  inner();
  return {
    x: x,
    f: inner
  };
}

console.log(outer().x);
console.log(outer().f());
