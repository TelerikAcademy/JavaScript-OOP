//if console is not available until browser dev tools open initialize object
//and log function
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };
if (!window.console.error) window.console.error = function () { };


(function () {
    "use strict";
    window.totalerrors = 0;


    //var baseLogFunction = console.log;
    var baseLogFunction = Function.prototype.bind.call(console.log, console);
    console.log = function(){
        baseLogFunction.apply(console, arguments);

        var args = Array.prototype.slice.call(arguments);
        for(var i=0;i<args.length;i++){
            var currentMessage = args[i];
            var node;
            var prefix = currentMessage && typeof currentMessage === 'string' && currentMessage.substring(0,2) === '##';
            if(prefix){
                currentMessage = currentMessage.substring(2,currentMessage.length);
                node  = createHeading(currentMessage);
            }else{
                node = createLogNode(currentMessage, 'info');
            }


            var log = document.querySelector("#mylog");
            log.appendChild(node);
        }
    }

    var baseErrorFunction = console.error;
    console.error = function(){
        baseErrorFunction.apply(console, arguments);

        var args = Array.prototype.slice.call(arguments);
        for(var i=0;i<args.length;i++){
            var node = createLogNode(args[i], 'danger');
            var log = document.querySelector("#mylog");
            log.appendChild(node);
            window.totalerrors++;
            var totalErrorsHeading = document.querySelector("#totalerrors");
            setTextContent(totalErrorsHeading, window.totalerrors);
            if (totalerrors > 0){
                document.querySelector('#total-errors-container').removeAttribute('style');
            }

        }
    }

    function createLogNode(message, type){
        var node = document.createElement("div");
        node.className = node.className + "notice notice-" + type;
        var textNode = document.createTextNode(message);
        node.appendChild(textNode);
        return node;
    }

    function createHeading(message){
        var node = document.createElement("h2");
        var textNode = document.createTextNode(message);
        node.appendChild(textNode);
        return node;
    }

    window.onerror = function(message, url, linenumber) {
        console.error("JavaScript error: " + message + " on line " +
            linenumber + " for " + url);
    };

    function setTextContent(element, text) {
        while (element.firstChild!==null)
            element.removeChild(element.firstChild); // remove all existing content
        element.appendChild(document.createTextNode(text));
    }

})();
