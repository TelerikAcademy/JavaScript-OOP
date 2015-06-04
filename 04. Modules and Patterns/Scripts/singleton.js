var controls = function () {
    var Calculator,
        calculatorInstance;
    Calculator = (function () {
        function Calculator() {
            this._result = 0;
        }

        Calculator.prototype.add = function (value) {
            this._result += value;
            return this;
        };

        Calculator.prototype.subtract = function (value) {
            this._result -= value;
            return this;
        };

        Calculator.prototype.showResult = function () {
            console.log('The result is ' + this._result);
        };
        return Calculator;
    }());

    return {
        getCalculator: function () {
            if (!calculatorInstance) {
                calculatorInstance = new Calculator();
            }
            return calculatorInstance;
        }
    };
}();

var calculator = controls.getCalculator();

calculator.add(7);
calculator.subtract(17);
calculator.showResult();