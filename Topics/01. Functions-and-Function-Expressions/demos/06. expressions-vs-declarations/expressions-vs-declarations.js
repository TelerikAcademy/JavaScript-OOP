if (true) {
	//remove the comment to fix the bug
	//var print = 
	function print(msg) {
		console.log('--from if');
		console.log(msg);
	}
} else {
	//remove the comment to fix the bug
	function print(msg) {
		console.log('--from else');
		console.log(msg);
	}
}
print('Test');