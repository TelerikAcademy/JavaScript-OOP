var people = (function(){
    var people = ['Will', 'Steve'];

    _render();

    function _render() { // private function
        //console.clear();
        console.log(people);
    }

    function addPerson(name) {
        people.push(name);
        _render();
    }

    function deletePerson(i) {
        people.splice(i, 1);
        _render();
    }

    return {
        addPerson: addPerson,
        deletePerson: deletePerson
    };
})();

people.addPerson("Jake");
people.deletePerson(0);