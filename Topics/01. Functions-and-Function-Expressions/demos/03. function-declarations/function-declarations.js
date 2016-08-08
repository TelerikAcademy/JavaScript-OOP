log('Text for message');


function log(message) {
	console.log(new Array(message.length + 1).join('-'));
	//used before defined
	console.log('[' + getFormattedTime() + ']: ' + message);
	console.log(new Array(message.length + 1).join('-'));
}

function getFormattedTime(date) {
	var hours,
		hoursString,
		minutes,
		minutesString,
		seconds,
		secondsString;
	date = date || new Date();

	seconds = date.getSeconds();
	minutes = date.getMinutes();
	hours = date.getHours();

	hoursString = (hours > 9 ? '' : '0') + hours.toString();
	minutesString = (minutes > 9 ? '' : '0') + minutes.toString();
	secondsString = (seconds > 9 ? '' : '0') + seconds.toString();
	return hoursString + ':' + minutesString + ':' + secondsString;
}