define(function () {
	var Shape = (function () {
		function Shape(x, y) {
			this.x = x;
			this.y = y;
			this.type = 'Shape';
		}

		Shape.prototype.getData = function () {
			return {
				type: this.type,
				x: this.x,
				y: this.y
			};
		};

		return Shape;
	}());

	return Shape;
});