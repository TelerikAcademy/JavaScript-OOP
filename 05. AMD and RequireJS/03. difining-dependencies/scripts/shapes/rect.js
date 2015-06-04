define(['shapes/shape'], function (Shape) {
	var Rect = (function (parent) {
		function Rect(x, y, width, height) {
			parent.call(this, x, y);
			this.width = width;
			this.height = height;
			this.type = 'Rect';
		}

		Rect.prototype.calcArea = function () {
			return this.width * this.height;
		};

		Rect.prototype.calcParameter = function () {
			return 2 * this.width + 2 * this.height;
		};

		Rect.prototype.getData = function () {
			var data = parent.prototype.getData.call(this);
			data.width = this.width;
			data.height = this.height;
			return data;
		};

		return Rect;
	}(Shape));

	return Rect;
});