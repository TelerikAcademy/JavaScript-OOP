(function () {
	'use strict';
	require(['shapes/rect'], function (Rect) {
		var rects, i, len, rect;
		rects = [
			new Rect(5, 10, 50, 50),
			new Rect(55, 60, 100, 75)
		];

		for (i = 0, len = rects.length; i < len; i += 1) {
			rect = rects[i];
			console.log(rect.calcArea());
		}
	});
}());