var controls = (function () {
  
  //hidden function  
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
      this.result += x;
    },
    subtract: function (x) {
      this.result -= x;
    },
    showResult: function () {
      console.log(formatResult(this.name, this.result));
    }
  };
  
  function getCalculator(name){
      return Object.create(calculator)
        .init(name);
  }

  //return only a reference to the function
  return {
    getCalculator: getCalculator
  };
} ());

var calc = controls.getCalculator('First');

calc.add(7);
calc.showResult();
calc.subtract(2);
calc.showResult();