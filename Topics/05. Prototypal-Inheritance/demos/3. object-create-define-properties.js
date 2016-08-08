var animal = {

  makeNoise: function () {
    console.log('The ' + this.type + ' makes noise "' + this.noise + '"');
  }
};


var dog = (function (parent) {
  var dog = Object.defineProperties(parent, {
    type: {
      value: 'dog'
    },
    noise: {
      value: 'djaf'
    },
    bark: {
      value: function (){
        console.log('Bark, Bark');
      }
    }
  });
  return dog;
}(animal));

dog.makeNoise();
