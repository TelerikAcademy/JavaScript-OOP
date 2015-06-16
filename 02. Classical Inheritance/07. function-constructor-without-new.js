function Rect(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Rect.prototype.calcArea = function () {
	return this.width * this.height;
};
Rect.prototype.calcPerimeter = function () {
	return 2 * this.width + 2 * this.height;
};

var realRect = new Rect(45, 85, 55, 90);
var badRect = Rect(45, 85, 55, 90);

console.log('With new: ' + realRect.calcArea());
//throws exceptions because badRect is undefined
console.log('Without new: ' + badRect.calcArea());