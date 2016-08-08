// (function ($) {
// 	var $root = $('#root');

// 	console.log($root.html());
// 	//Error! $ is not jQuery here (Prototype.js is loaded last)
// }(jQuery));

// (function ($) {
var $root = $('root');

console.log($root.innerHTML);
// }(Prototype));