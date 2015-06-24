var Course = require('../tasks/task-1')();
var expect = require('chai').expect;

describe('Test for Modules and Patterns in JavaScript', function() {
	describe('Existence checks', function() {
		it('expect Course to be an object', function() {
			expect(Course).to.be.a('object');
		});
		it('expect Course.init to be a function', function() {
			expect(Course.init).to.be.a('function');
		});
		it('expect Course.addStudent to be a function', function() {
			expect(Course.addStudent).to.be.a('function');
		});
		it('expect Course.submitHomework to be a function', function() {
			expect(Course.submitHomework).to.be.a('function');
		});
		it('expect Course.pushExamResults to be a function', function() {
			expect(Course.pushExamResults).to.be.a('function');
		});
		it('expect Course.getTopStudents to be a function', function() {
			expect(Course.getTopStudents).to.be.a('function');
		});
	});

	describe('Title validation checks', function() {
		it('expect to throw when there are no presentations in the course', function() {
			function test() {
				var jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), []);
			}
			expect(test).to.throw();
		});
		it('expect to throw when a title is an empty string', function() {
			function test() {
				var jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [
					getValidTitle(),
				'']);
			}
			expect(test).to.throw();
		});
		it('expect to throw when there are consecutive spaces in a title', function() {
			function test() {
				var jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [
					getValidTitle() + getValidTitle(),
					getValidTitle() + ' ' + getValidTitle(),
					getValidTitle() + '  ' + getValidTitle(),
				]);
			}
			expect(test).to.throw();
		});
		it('expect to throw if a title begins with a space', function() {
			function test() {
				var jsoop = Object.create(Course);
				jsoop.init(' ' + getValidTitle(), [
					getValidTitle(),
					getValidTitle(),
					getValidTitle(),
				]);
			}
			expect(test).to.throw();
		});
		it('expect to throw if a title ends with a space', function() {
			function test() {
				var jsoop = Object.create(Course);
				jsoop.init(getValidTitle() + ' ', [
					getValidTitle(),
					getValidTitle(),
					getValidTitle(),
				]);
			}
			expect(test).to.throw();
		});
		it('expect not to throw if titles are legit', function() {
			function test() {
				var jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [
					getValidTitle(),
					getValidTitle(),
					getValidTitle(),
				]);
			}
			expect(test).not.to.throw();
		});
		it('expect not to throw if titles are legit and contain all kinds of symbols', function() {
			function test() {
				var jsoop = Object.create(Course);
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
		it('expect to throw when a student name is not a string', function() {
			function test() {
				var jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				jsoop.addStudent(42);
			}
			expect(test).to.throw();
		});
		it('expect to throw when a student has only one name', function() {
			function test() {
				var jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				jsoop.addStudent(getValidName());
			}
			expect(test).to.throw();
		});
		it('expect to throw when a student has more than two names', function() {
			function test() {
				var jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				jsoop.addStudent(getValidName() + ' ' + getValidName() + ' ' + getValidName());
			}
			expect(test).to.throw();
		});
		it('expect to throw when a student name is invalid', function() {
			function test() {
				var jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				jsoop.addStudent('marulq ' + getValidName());
			}
			expect(test).to.throw();
		});
		it('expect to throw when a student name is invalid', function() {
			function test() {
				var jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				jsoop.addStudent(getValidName() + ' marulkova');
			}
			expect(test).to.throw();
		});
		it('expect not to throw when a student name is valid', function() {
			function test() {
				var jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				jsoop.addStudent(getValidName() + ' ' + getValidName());
			}
			expect(test).to.not.throw();
		});
		it('expect not to throw when a student name is valid (a name consists of a single letter)', function() {
			function test() {
				var jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				jsoop.addStudent(getValidName() + ' K');
			}
			expect(test).to.not.throw();
		});
	});

	describe('ID checks', function() {
		it('expect Course.addStudent to return unique student IDs - positive integers', function() {
			var jsoop, ids, i;
			jsoop = Object.create(Course);
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
		it('expect Course.submitHomework to throw if given invalid StudentID', function() {
			function test() {
				var id, jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				id = jsoop.addStudent(getValidName() + ' ' + getValidName());
				jsoop.submitHomework(0, 1);
			}
			expect(test).to.throw();
		});
		it('expect Course.submitHomework to throw if given invalid StudentID', function() {
			function test() {
				var id, jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				id = jsoop.addStudent(getValidName() + ' ' + getValidName());
				jsoop.submitHomework(4.2, 1);
			}
			expect(test).to.throw();
		});
		it('expect Course.submitHomework to throw if given invalid StudentID', function() {
			function test() {
				var id, jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				id = jsoop.addStudent(getValidName() + ' ' + getValidName());
				jsoop.submitHomework(id + 5, 1);
			}
			expect(test).to.throw();
		});
		it('expect Course.submitHomework to throw if given invalid HomeworkID', function() {
			function test() {
				var id, jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				id = jsoop.addStudent(getValidName() + ' ' + getValidName());
				jsoop.submitHomework(id, 0);
			}
			expect(test).to.throw();
		});
		it('expect Course.submitHomework to throw if given invalid HomeworkID', function() {
			function test() {
				var id, jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				id = jsoop.addStudent(getValidName() + ' ' + getValidName());
				jsoop.submitHomework(id, 1.23456);
			}
			expect(test).to.throw();
		});
		it('expect Course.submitHomework to throw if given invalid HomeworkID', function() {
			function test() {
				var id, jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				id = jsoop.addStudent(getValidName() + ' ' + getValidName());
				jsoop.submitHomework(id, 2);
			}
			expect(test).to.throw();
		});
		it('expect Course.submitHomework not to throw if given valid IDs', function() {
			function test() {
				var id, jsoop = Object.create(Course);
				jsoop.init(getValidTitle(), [getValidTitle()]);
				id = jsoop.addStudent(getValidName() + ' ' + getValidName());
				jsoop.submitHomework(id, 1);
			}
			expect(test).to.throw();
		});
	});
});

var validTitles = [
	'Modules and Patterns',
	'Ofcourse, this is a valid title!',
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
};
