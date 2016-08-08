var Shapes = (function () {
	var Shape = (function () {
		function Shape(x, y) {
			this._x = x;
			this._y = y;
		}

		Shape.prototype = {
			serialize: function () {
				var serializedShape = {
					x: this._x,
					y: this._y
				};
				return serializedShape;
			}
		};

		return Shape;
	}());


	var Rect = (function () {
		function Rect(x, y, width, height) {
			Shape.call(this, x, y);
			this._width = width;
			this._height = height;
		}

		Rect.prototype = new Shape();

		Rect.prototype.serialize = function () {
			var serializedRect = Shape.prototype.serialize.call(this);
			serializedRect.width = this._width;
			serializedRect.height = this._height;
			return serializedRect;
		};
		return Rect;
	}());

	return {
		Shape: Shape,
		Rect: Rect
	};

}());

var shape = new Shapes.Shape(5, 10);
var rect = new Shapes.Rect(15, 70, 100, 50);

console.log(shape.serialize());
console.log(rect.serialize());