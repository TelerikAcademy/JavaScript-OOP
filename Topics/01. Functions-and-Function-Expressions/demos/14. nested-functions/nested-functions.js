/* globals console document*/

function getPrint(type) {
    function printInDom(text) {
        document.body.innerHTML += "<div>" + text + "</div>";
    }

    function printInConsole(text) {
        console.log(text);
    }

    if (type === "dom") {
        return printInDom;
    } else if (type === "server") {
        return printInConsole;
    }
    return null;
}

let printType = (this.document) ? "dom" : "server";
let print = getPrint(printType);
print("Message");