var animal = {
  makeNoise: function(){
    console.log('The ' + this.type + ' makes noise "'  + this.noise + '"');
  }
};

var dog = {
  type: 'dog',
  noise: 'Djaf',
  makeNoise: function(){
  }
};

dog.__proto__ = animal;
dog.makeNoise();