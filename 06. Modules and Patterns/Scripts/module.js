var controls = (function () {


	//private function	
	function formatResult(name, value) {
		return name + ' says the result is ' + value;
	}

	return {
		Calculator: function (name) {
			var result;
			result = 0;
			this.add = function (x) {
				result += x;
			};
			this.subtract = function (x) {
				result -= x;
			};
			this.showResult = function () {
				console.log(formatResult(name, result));
			};
		}
	};
}());

var calc = new controls.Calculator('First');

calc.add(7);
calc.showResult();
calc.subtract(2);
calc.showResult();