var result = require('../tasks/task-1')();
var expect = require('chai').expect;

describe('Test for Modules and Patterns in JavaScript', function() {
	describe('Existence checks', function() {
		//1
		it('expect result to be an object', function() {
			expect(result).to.be.a('object');
		});
		//2
		it('expect result.init to be a function', function() {
			expect(result.init).to.be.a('function');
		});
		//3
		it('expect result.addStudent to be a function', function() {
			expect(result.addStudent).to.be.a('function');
		});
		//4
		it('expect result.submitHomework to be a function', function() {
			expect(result.submitHomework).to.be.a('function');
		});
		//5
		it('expect result.pushExamResults to be a function', function() {
			expect(result.pushExamResults).to.be.a('function');
		});
		//6
		it('expect result.getTopStudents to be a function', function() {
			expect(result.getTopStudents).to.be.a('function');
		});
	});

	describe('Title validation checks', function() {
		//7
		it('expect to throw when there are no presentations in the result', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init(getValidTitle(), []);
}
expect(test).to.throw();
		});
		//8
		it('expect to throw when a title is an empty string', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [
		getValidTitle(),
	'']);
}
expect(test).to.throw();
		});
		//9
		it('expect to throw when there are consecutive spaces in a title', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [
		getValidTitle() + getValidTitle(),
		getValidTitle() + ' ' + getValidTitle(),
		getValidTitle() + '  ' + getValidTitle(),
	]);
}
expect(test).to.throw();
		});
		//10
		it('expect to throw if a title begins with a space', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init(' ' + getValidTitle(), [
		getValidTitle(),
		getValidTitle(),
		getValidTitle(),
	]);
}
expect(test).to.throw();
		});
		//11
		it('expect to throw if a title ends with a space', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init(getValidTitle() + ' ', [
		getValidTitle(),
		getValidTitle(),
		getValidTitle(),
	]);
}
expect(test).to.throw();
		});
		//12
		it('expect not to throw if titles are legit', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [
		getValidTitle(),
		getValidTitle(),
		getValidTitle(),
	]);
}
expect(test).not.to.throw();
		});
		//13
		it('expect not to throw if titles are legit and contain all kinds of symbols', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init('!@#$ %^&*(', [
		getValidTitle() + ')(*&^%$#%^&',
		getValidTitle() + 'lfeopwkfie hfy3r7 38r 4j',
		getValidTitle() + 'lfeop,,wkfie hfy3r7 38r 4j',
		getValidTitle() + '-----====-----',
	]);
}
expect(test).not.to.throw();
		});
	});

	describe('Student validation checks', function() {
		//14
		it('expect to throw when a student name is not a string', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	jsoop.addStudent(42);
}
expect(test).to.throw();
		});
		//15
		it('expect to throw when a student has only one name', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	jsoop.addStudent(getValidName());
}
expect(test).to.throw();
		});
		//16
		it('expect to throw when a student has more than two names', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	jsoop.addStudent(getValidName() + ' ' + getValidName() + ' ' + getValidName());
}
expect(test).to.throw();
		});
		//17
		it('expect to throw when a student name is invalid', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	jsoop.addStudent('marulq ' + getValidName());
}
expect(test).to.throw();
		});
		//18
		it('expect to throw when a student name is invalid', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	jsoop.addStudent(getValidName() + ' marulkova');
}
expect(test).to.throw();
		});
		//19
		it('expect not to throw when a student name is valid', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	jsoop.addStudent(getValidName() + ' ' + getValidName());
}
expect(test).to.not.throw();
		});
		//20
		it('expect not to throw when a student name is valid (a name consists of a single letter)', function() {
function test() {
	var jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	jsoop.addStudent(getValidName() + ' K');
}
expect(test).to.not.throw();
		});
	});

	describe('ID checks', function() {
		//21
		it('expect result.addStudent to return unique student IDs - positive integers', function() {
var jsoop, ids, i;
jsoop = Object.create(result);
jsoop.init(getValidTitle(), [getValidTitle()]);
ids = [];
for(i = 0; i<100; i+=1)
	ids.push(jsoop.addStudent(getValidName() + ' ' + getValidName()));
ids.sort();
var correctIDs = function() {
	for(i in ids) {
		if(ids[i] > 0 && ids[i] === (ids[i] | 0)) {
			/* It's OK */
		}
		else return false;
	}
	return true;
}();
var uniqueIDs = function() {
	for(i in ids) {
		if(i === 0) continue;
		if(ids[i-1] === ids[i])
			return false;
	}
	return true;
}();
expect(correctIDs && uniqueIDs).to.be.true;
		});
		//22
		it('expect result.submitHomework to throw if given invalid StudentID', function() {
function test() {
	var id, jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	id = jsoop.addStudent(getValidName() + ' ' + getValidName());
	jsoop.submitHomework(0, 1);
}
expect(test).to.throw();
		});
		//23
		it('expect result.submitHomework to throw if given invalid StudentID', function() {
function test() {
	var id, jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	id = jsoop.addStudent(getValidName() + ' ' + getValidName());
	jsoop.submitHomework(4.2, 1);
}
expect(test).to.throw();
		});
		//24
		it('expect result.submitHomework to throw if given invalid StudentID', function() {
function test() {
	var id, jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	id = jsoop.addStudent(getValidName() + ' ' + getValidName());
	jsoop.submitHomework(id + 5, 1);
}
expect(test).to.throw();
		});
		//25
		it('expect result.submitHomework to throw if given invalid HomeworkID', function() {
function test() {
	var id, jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	id = jsoop.addStudent(getValidName() + ' ' + getValidName());
	jsoop.submitHomework(id, 0);
}
expect(test).to.throw();
		});
		//26
		it('expect result.submitHomework to throw if given invalid HomeworkID', function() {
function test() {
	var id, jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	id = jsoop.addStudent(getValidName() + ' ' + getValidName());
	jsoop.submitHomework(id, 1.23456);
}
expect(test).to.throw();
		});
		//27
		it('expect result.submitHomework to throw if given invalid HomeworkID', function() {
function test() {
	var id, jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	id = jsoop.addStudent(getValidName() + ' ' + getValidName());
	jsoop.submitHomework(id, 2);
}
expect(test).to.throw();
		});
		//28
		it('expect result.submitHomework not to throw if given valid IDs', function() {
function test() {
	var id, jsoop = Object.create(result);
	jsoop.init(getValidTitle(), [getValidTitle()]);
	id = jsoop.addStudent(getValidName() + ' ' + getValidName());
	jsoop.submitHomework(id, 1);
}
expect(test).to.not.throw();
		});
	});

	describe('Getting students', function() {
		//29
		it('expect getAllStudents to return an array of the listed students (no students)', function() {
var jsoop = Object.create(result)
	.init(getValidTitle(), [getValidTitle()]);
expect(jsoop.getAllStudents()).to.be.eql([]);
		});
		//30
		it('expect getAllStudents to return an array of the listed students (one student)', function() {
var jsoop = Object.create(result)
	.init(getValidTitle(), [getValidTitle()]);

var student = {
	firstname: getValidName(),
	lastname: getValidName(),
};
student.id = jsoop.addStudent(student.firstname + ' ' + student.lastname);

expect(checkStudentList([student], jsoop.getAllStudents())).to.be.true;
		});
		//31
		it('expect getAllStudents to return an array of the listed students (many students)', function() {
var jsoop = Object.create(result)
	.init(getValidTitle(), [getValidTitle()]);

var firstname, lastname, listed = [];
for(var i=0; i<100; ++i) {
	firstname = getValidName();
	lastname = getValidName();
	listed.push({
		firstname: firstname,
		lastname: lastname,
		id: jsoop.addStudent(firstname + ' ' + lastname)
	});
}

expect(checkStudentList(listed, jsoop.getAllStudents())).to.be.true;
		});
	});
});

var validTitles = [
	'Modules and Patterns',
	'Ofresult, this is a valid title!',
	'No errors hIr.',
	'Moar taitles',
	'Businessmen arrested for harassment of rockers',
	'Miners handed cabbages to the delight of children',
	'Dealer stole Moskvitch',
	'Shepherds huddle',
	'Retired Officers rally',
	'Moulds detonate tunnel',
	'sailors furious',
], validNames = [
	'Pesho',
	'Notaname',
	'Johny',
	'Marulq',
	'Keremidena',
	'Samomidena',
	'Medlar',
	'Yglomer',
	'Elegant',
	'Analogical',
	'Bolsheviks',
	'Reddish',
	'Arbitrage',
	'Toyed',
	'Willfully',
	'Transcribing',
];

function getValidTitle() {
	return validTitles[(Math.random() * validTitles.length) | 0];
}
function getValidName() {
	return validNames[(Math.random() * validNames.length) | 0];
}

function checkStudentList(list1, list2) {
	if(list1.length !== list2.length)
		return false;

	function compare(a, b) {
		return a.id - b.id;
	}

	list1.sort(compare);
	list2.sort(compare);

	for(var i in list1) {
		if(list1[i].id !== list2[i].id)
			return false;
		if(list1[i].firstname !== list2[i].firstname)
			return false;
		if(list1[i].lastname !== list2[i].lastname)
			return false;
	}
	return true;
}
