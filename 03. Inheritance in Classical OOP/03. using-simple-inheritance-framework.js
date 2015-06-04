(function () {
	require('./libs/simple-inheritance');

	var Shape = Class.extend({
		init: function (x, y) {
			this._x = x;
			this._y = y;
		},
		serialize: function () {
			return {
				x: this._x,
				y: this._y
			};
		}
	});


	var Rect = Shape.extend({
		init: function (x, y, w, h) {
			this._super(x, y);
			this._width = w;
			this._height = h;
		},
		serialize: function () {
			var res = this._super();
			res.width = this._width;
			res.height = this._height;
			return res;
		}
	});


	var rect = new Rect(76, 13, 50, 100);
	console.log(rect.serialize());
}());