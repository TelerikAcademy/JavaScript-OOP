define(['shapes/shape'], function (Shape) {
	var Circle = (function (parent) {
		function Circle(x, y, radius) {
			parent.call(this, x, y);
			this.radius = radius;
			this.type = 'Circle';
		}

		Circle.prototype.calcArea = function () {
			return this.radius * this.radius * Math.PI;
		};

		Circle.prototype.calcParameter = function () {
			return 2 * this.radius * Math.PI;
		};

		Circle.prototype.getData = function () {
			var data = parent.prototype.getData.call(this);
			data.radius = this.radius;
			return data;
		};

		return Circle;
	}(Shape));

	return Circle;
});