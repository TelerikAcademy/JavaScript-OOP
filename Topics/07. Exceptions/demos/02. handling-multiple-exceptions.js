
function throwException(type) {
  switch (type) {
    case "type":
      5();
      break;
    case "reference":
      nonExistingFunction();
      break;
    case "syntax":
      eval("var q=5 5;");
      break;
  }
}

try {
  //throwException("type");
  throwException("reference");
  //throwException("syntax");
} catch (ex) {
  if (ex instanceof TypeError) {
    console.log("Not correct use of an object");
  } else if (ex instanceof ReferenceError) {
    console.log("Trying to use non-existing object");
  } else if (ex instanceof SyntaxError) {
    console.log("Invalid JavaScript code detected");
  }
}
