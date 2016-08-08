function AgeError(message, minAge, maxAge) {
  this.message = message;
  this.minAge = minAge;
  this.maxAge = maxAge;
}

AgeError.prototype = Object.create(Error.prototype);

try {
  throw new AgeError("Age out of range!", 0, 135);
} catch (ex) {
  console.log(ex instanceof Error);
  console.log(ex instanceof AgeError);
  console.log(ex.message);
  console.log(ex.minAge);
  console.log(ex.maxAge);
}