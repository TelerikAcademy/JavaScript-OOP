function tryCatchException(msg) {
  try {
    var typeEx;
    if (msg) {
      typeEx = new TypeError(msg);
    } else {
      typeEx = new TypeError();
    }

    throw typeEx;
  } catch (ex) {
    console.log(ex.message);
  }
}

tryCatchException();
tryCatchException("Not correct use of an object!");