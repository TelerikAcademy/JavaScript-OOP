define(function () {
	var Rect = (function () {
		function Rect(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		}

		Rect.prototype.calcArea = function () {
			return this.width * this.height;
		};

		Rect.prototype.calcParameter = function () {
			return 2 * this.width + 2 * this.height;
		};

		return Rect;
	}());

	return Rect;
});