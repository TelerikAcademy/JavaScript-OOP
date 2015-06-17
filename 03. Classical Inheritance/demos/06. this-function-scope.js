function Rect(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Rect.prototype = {
	calcArea: function () {
		return this.width * this.height;
	},
	calcPerimeter: function () {
		return 2 * this.width + 2 * this.height;
	}
};

var rectCac = new Rect(50, 55, 15, 10);
var rectCalcArea = rect.calcArea;

console.log(rectCalcArea());