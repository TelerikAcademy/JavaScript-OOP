var controls = (function () {
  function formatResult(name, value) {
    return name + ' says the result is ' + value;
  }
  var calculator = {
    init: function (name) {
      this.name = name;
      this.result = 0;
      return this;
    },
    add: function (x) {
      x = +x;
      this.result += x;
      return this;
    },
    subtract: function (x) {
      x = +x;
      this.result -= x;
      return this;
    },
    showResult: function () {
      console.log(formatResult(this.name, this.result));
      return this;
    }
  };
  return {
    getCalculator: function (name) {
      return Object.create(calculator)
        .init(name);
    }
  };
} ());

controls.getCalculator('First')
  .add(7)
  .showResult()
  .subtract(2)
  .showResult();
