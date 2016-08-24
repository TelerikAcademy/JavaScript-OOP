var calculator = function () {
  var calculator = Object.preventExtensions({
    result: 0,
    add: function (x) {
      calculator.result += x;
      return calculator;
    },
    subtract: function (x) {
      calculator.result -= x;
      return calculator;
    },
    showResult: function () {
      console.log('The result is: ' + calculator.result);
      return calculator;
    }
  });

  return {
    get: function () {
      return calculator;
    }
  };
} ();

calculator.get()
  .add(7)
  .subtract(17)
  .showResult();

calculator.get()
  .add(111)
  .showResult();