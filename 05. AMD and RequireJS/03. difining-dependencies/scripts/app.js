(function () {
	'use strict';
	require(['shapes/rect', 'shapes/circle'], function (Rect, Circle) {
		var shapes, i, len, shape;

		shapes = [
			new Rect(50, 50, 100, 75),
			new Circle(50, 50, 65)
		];

		for (i = 0, len = shapes.length; i < len; i += 1) {
			shape = shapes[i];
			console.log(shape.getData());
		}

	});
}());