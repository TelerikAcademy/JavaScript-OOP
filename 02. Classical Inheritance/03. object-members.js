function Rect(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.calcArea = function () {
		return this.width * this.height;
	};

	this.calcPerimeter = function () {
		return 2 * this.width + 2 * this.height;
	};
}


var rects = [
	new Rect(50, 55, 15, 10),
	new Rect(50, 55, 25, 20),
	new Rect(50, 55, 15, 20),
	new Rect(50, 55, 10, 25)
];
for (var i = 0; i < rects.length; i += 1) {
	var rect = rects[i];
	console.log('The area of rect #' + (i + 1) + ' is ' + rect.calcArea());
}