var controls = (function () {
  function formatResult(name, value) {
    return name + ' says the result is ' + value;
  }

  class Calculator {
    constructor(name) {
      this.name = name;
      this.result = 0;
    };

    add(x) {
      x = +x;
      this.result += x;
      return this;
    };

    subtract(x) {
      x = +x;
      this.result -= x;
      return this;
    };

    showResult() {
      console.log(formatResult(this.name, this.result));
      return this;
    };
  };

  return { getCalculator: (name) => new Calculator(name };
} ());

var calc = controls.getCalculator('First');
calc.add(7);
calc.showResult();
calc.subtract(2);
calc.showResult();
