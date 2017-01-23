var controls = (function () {
  
  //hidden function  
  function formatResult() {
    return this.name + ' says the result is ' + this.result;
  }

  class Calculator {
    constructor(name) {
      this.name = name;
      this.result = 0;
    };
         
    add(x) {
      this.result += +x;
      return this;
    };

    subtract(x) {
      this.result -= +x;
      return this;
    };
    
    showResult() {
      console.log(formatResult.call(this));
      return this;
    };
  };
  
  var getCalculator = (name) => new Calculator(name);

  //return only a reference to the function
  return { getCalculator };
} ());

var calc = controls.getCalculator('First')
  .add(7).showResult().subtract(2).showResult();