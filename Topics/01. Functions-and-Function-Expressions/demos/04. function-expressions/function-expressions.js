var print = function (message) {
	var doc = this.document;
	if (doc && doc.body) {
		doc.body.innerHTML +=
			'<div class="message">' + message + '</div>';
	} else {
		console.log(message);
	}
};

print(123);

var f3 = function () {
	console.log('f3');
};

var f2 = function () {
	f3();
	console.log('f2');
};

var f1 = function () {
	f2();
	console.log('f1');
};

f1();