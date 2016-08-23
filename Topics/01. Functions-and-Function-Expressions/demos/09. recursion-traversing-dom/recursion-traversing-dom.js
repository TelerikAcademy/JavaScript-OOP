/* globals console, document */

function traverse(element) {
    function traverseElement(node, spacing) {
        if (node.nodeType !== 1) {
            return;
        }

        spacing = spacing || " ";

        console.log(spacing + node.nodeName);
        [...node.childNodes].forEach(child => traverseElement(child, spacing + "--"));

        console.log(spacing + "/" + node.nodeName);
    }

    traverseElement(element, "");
}

traverse(document.documentElement);