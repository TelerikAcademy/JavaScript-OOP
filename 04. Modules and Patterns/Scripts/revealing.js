var controls = (function () {

  //hidden function  
  function formatResult(name, value) {
    return name + ' says the result is ' + value;
  }

  var Calculator = (function () {
    var Calculator = function (name) {
      this.name = name;
      this.result = 0;
    };

    Calculator.prototype.add = function (x) {
      this.result += x;
    };
    Calculator.prototype.subtract = function (x) {
      this.result -= x;
    };
    Calculator.prototype.showResult = function () {
      console.log(formatResult(this.name, this.result));
    };

    return Calculator;
  }());

  //return only a reference to the function
  return {
    Calculator: Calculator
  };
}());

var calc = new controls.Calculator('First');

calc.add(7);
calc.showResult();
calc.subtract(2);
calc.showResult();