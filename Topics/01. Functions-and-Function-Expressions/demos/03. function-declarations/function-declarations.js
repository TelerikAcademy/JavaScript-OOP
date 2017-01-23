/* globals console */

log("Text for message");

function log(message) {
    var line = "-".repeat(message.length);
    console.log(line);
    //used before defined
    console.log(`[${getFormattedTime()}]: ${message}`);
    console.log(line);
}

function getFormattedTime(date) {
    date = date || new Date();

    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();

    let hoursString = (hours > 9 ? "" : "0") + hours.toString();
    let minutesString = (minutes > 9 ? "" : "0") + minutes.toString();
    let secondsString = (seconds > 9 ? "" : "0") + seconds.toString();
    return `${hoursString}:${minutesString}:${secondsString}`;
}