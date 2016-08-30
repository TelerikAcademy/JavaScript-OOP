'use strict';

var Course = require('../tasks/task-1')();
var expect = require('chai').expect;

describe('Test for Modules and Patterns in JavaScript', function () {
    describe('Existence checks', function () {
        it('expect Course to be an object', function () {
            expect(Course).to.be.a('object');
        });
        it('expect Course.init to be a function', function () {
            expect(Course.init).to.be.a('function');
        });
        it('expect Course.addStudent to be a function', function () {
            expect(Course.addStudent).to.be.a('function');
        });
        it('expect Course.submitHomework to be a function', function () {
            expect(Course.submitHomework).to.be.a('function');
        });
        it('expect Course.pushExamResults to be a function', function () {
            expect(Course.pushExamResults).to.be.a('function');
        });
        it('expect Course.getTopStudents to be a function', function () {
            expect(Course.getTopStudents).to.be.a('function');
        });
    });

    describe('Title validation checks', function () {
        it('expect to throw when there are no presentations in the course', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), []);
            }

            expect(test).to['throw']();
        });
        it('expect to throw when a title is an empty string', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle(), '']);
            }

            expect(test).to['throw']();
        });
        it('expect to throw when there are consecutive spaces in a title', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle() + getValidTitle(), getValidTitle() + ' ' + getValidTitle(), getValidTitle() + '  ' + getValidTitle()]);
            }

            expect(test).to['throw']();
        });
        it('expect to throw if a title begins with a space', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init(' ' + getValidTitle(), [getValidTitle(), getValidTitle(), getValidTitle()]);
            }

            expect(test).to['throw']();
        });
        it('expect to throw if a title ends with a space', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init(getValidTitle() + ' ', [getValidTitle(), getValidTitle(), getValidTitle()]);
            }

            expect(test).to['throw']();
        });
        it('expect not to throw if titles are legit', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle(), getValidTitle(), getValidTitle()]);
            }

            expect(test).not.to['throw']();
        });
        it('expect not to throw if titles are legit and contain all kinds of symbols', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init('!@a#$ %^&*(', [getValidTitle() + ')(*&^%$#%^&', getValidTitle() + 'lfeopwkfie hfy3r7 38r 4j', getValidTitle() + 'lfeop,,wkfie hfy3r7 38r 4j', getValidTitle() + '-----====-----']);
            }

            expect(test).not.to['throw']();
        });
    });

    describe('Student validation checks', function () {
        it('expect to throw when a student name is not a string', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                jsoop.addStudent(42);
            }

            expect(test).to['throw']();
        });
        it('expect to throw when a student has only one name', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                jsoop.addStudent(getValidName());
            }

            expect(test).to['throw']();
        });
        it('expect to throw when a student has more than two names', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                jsoop.addStudent(getValidName() + ' ' + getValidName() + ' ' + getValidName());
            }

            expect(test).to['throw']();
        });
        it('expect to throw when a student name is invalid', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                jsoop.addStudent('marulq ' + getValidName());
            }

            expect(test).to['throw']();
        });
        it('expect to throw when a student name is invalid', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                jsoop.addStudent(getValidName() + ' marulkova');
            }

            expect(test).to['throw']();
        });
        it('expect not to throw when a student name is valid', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                jsoop.addStudent(getValidName() + ' ' + getValidName());
            }

            expect(test).to.not['throw']();
        });
        it('expect not to throw when a student name is valid (a name consists of a single letter)', function () {
            function test() {
                var jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                jsoop.addStudent(getValidName() + ' K');
            }

            expect(test).to.not['throw']();
        });
    });

    describe('ID checks', function () {
        it('expect Course.addStudent to return unique student IDs - positive integers', function () {
            var jsoop, ids, i;
            jsoop = Object.create(Course);
            jsoop.init(getValidTitle(), [getValidTitle()]);
            ids = [];
            for (i = 0; i < 100; i += 1) ids.push(jsoop.addStudent(getValidName() + ' ' + getValidName()));
            ids.sort();
            var correctIDs = (function () {
                for (i in ids) {
                    if (ids[i] > 0 && ids[i] === (ids[i] | 0)) {} else return false;
                }
                return true;
            })();
            var uniqueIDs = (function () {
                for (i in ids) {
                    if (i === 0) continue;
                    if (ids[i - 1] === ids[i]) return false;
                }
                return true;
            })();
            expect(correctIDs && uniqueIDs).to.be['true'];
        });
        it('expect Course.submitHomework to throw if given invalid StudentID', function () {
            function test() {
                var id,
                    jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                id = jsoop.addStudent(getValidName() + ' ' + getValidName());
                jsoop.submitHomework(0, 1);
            }

            expect(test).to['throw']();
        });
        it('expect Course.submitHomework to throw if given invalid StudentID', function () {
            function test() {
                var id,
                    jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                id = jsoop.addStudent(getValidName() + ' ' + getValidName());
                jsoop.submitHomework(4.2, 1);
            }

            expect(test).to['throw']();
        });
        it('expect Course.submitHomework to throw if given invalid StudentID', function () {
            function test() {
                var id,
                    jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                id = jsoop.addStudent(getValidName() + ' ' + getValidName());
                jsoop.submitHomework(id + 5, 1);
            }

            expect(test).to['throw']();
        });
        it('expect Course.submitHomework to throw if given invalid HomeworkID', function () {
            function test() {
                var id,
                    jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                id = jsoop.addStudent(getValidName() + ' ' + getValidName());
                jsoop.submitHomework(id, 0);
            }

            expect(test).to['throw']();
        });
        it('expect Course.submitHomework to throw if given invalid HomeworkID', function () {
            function test() {
                var id,
                    jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                id = jsoop.addStudent(getValidName() + ' ' + getValidName());
                jsoop.submitHomework(id, 1.23456);
            }

            expect(test).to['throw']();
        });
        it('expect Course.submitHomework to throw if given invalid HomeworkID', function () {
            function test() {
                var id,
                    jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                id = jsoop.addStudent(getValidName() + ' ' + getValidName());
                jsoop.submitHomework(id, 2);
            }

            expect(test).to['throw']();
        });
        it('expect Course.submitHomework not to throw if given valid IDs', function () {
            function test() {
                var id,
                    jsoop = Object.create(Course);
                jsoop.init(getValidTitle(), [getValidTitle()]);
                id = jsoop.addStudent(getValidName() + ' ' + getValidName());
                jsoop.submitHomework(id, 1);
            }

            expect(test).to.not['throw']();
        });
    });

    describe('Getting students', function () {
        it('expect getAllStudents to return an array of the listed students (no students)', function () {
            var jsoop = Object.create(Course).init(getValidTitle(), [getValidTitle()]);
            expect(jsoop.getAllStudents()).to.be.eql([]);
        });
        it('expect getAllStudents to return an array of the listed students (one student)', function () {
            var jsoop = Object.create(Course).init(getValidTitle(), [getValidTitle()]);

            var student = {
                firstname: getValidName(),
                lastname: getValidName()
            };
            student.id = jsoop.addStudent(student.firstname + ' ' + student.lastname);

            expect(checkStudentList([student], jsoop.getAllStudents())).to.be['true'];
        });
        it('expect getAllStudents to return an array of the listed students (many students)', function () {
            var jsoop = Object.create(Course).init(getValidTitle(), [getValidTitle()]);

            var firstname,
                lastname,
                listed = [];
            for (var i = 0; i < 100; ++i) {
                firstname = getValidName();
                lastname = getValidName();
                listed.push({
                    firstname: firstname,
                    lastname: lastname,
                    id: jsoop.addStudent(firstname + ' ' + lastname)
                });
            }

            expect(checkStudentList(listed, jsoop.getAllStudents())).to.be['true'];
        });
    });

    describe('Pushing Exam Results', function () {
        it('expect pushExamResults to throw if given invalid scores (no arguments given)', function () {
            var jsoop = Object.create(Course).init(getValidTitle(), [getValidTitle()]);

            function test() {
                jsoop.pushExamResults();
            }

            expect(test).to['throw']();
        });
        it('expect pushExamResults to throw if given invalid scores (given string, not array)', function () {
            var jsoop = Object.create(Course).init(getValidTitle(), [getValidTitle()]);

            function test() {
                jsoop.pushExamResults('StudentID:1 score:4');
            }

            expect(test).to['throw']();
        });
        it('expect pushExamResults to throw if given invalid scores (given object, not array)', function () {
            var jsoop = Object.create(Course).init(getValidTitle(), [getValidTitle()]);

            function test() {
                jsoop.pushExamResults({ StudentID: 1, score: 4 });
            }

            expect(test).to['throw']();
        });
        it('expect pushExamResults to throw if given invalid scores (no score given for a student)', function () {
            var jsoop = Object.create(Course).init(getValidTitle(), [getValidTitle()]);
            jsoop.addStudent(getValidName() + ' ' + getValidName());
            jsoop.addStudent(getValidName() + ' ' + getValidName());

            function test() {
                jsoop.pushExamResults([{ StudentID: 1, score: 4 }, { StudentID: 2 }]);
            }

            expect(test).to['throw']();
        });
        it('expect pushExamResults to throw if given invalid scores (same student twice)', function () {
            var jsoop = Object.create(Course).init(getValidTitle(), [getValidTitle()]);
            jsoop.addStudent(getValidName() + ' ' + getValidName());
            jsoop.addStudent(getValidName() + ' ' + getValidName());

            function test() {
                jsoop.pushExamResults([{ StudentID: 1, score: 4 }, { StudentID: 1, score: 5 }]);
            }

            expect(test).to['throw']();
        });
        it('expect pushExamResults to throw if given invalid scores (score is not a Number)', function () {
            var jsoop = Object.create(Course).init(getValidTitle(), [getValidTitle()]);

            function test() {
                jsoop.pushExamResults([{ StudentID: 1, score: 'A+' }, { StudentID: 2, score: 5 }]);
            }

            expect(test).to['throw']();
        });
        it('expect pushExamResults to throw if given invalid scores (id < first student\'s number)', function () {
            var jsoop = Object.create(Course).init(getValidTitle(), [getValidTitle()]);

            function test() {
                jsoop.pushExamResults([{ StudentID: 0, score: 3 }, { StudentID: 1, score: 5 }]);
            }

            expect(test).to['throw']();
        });
        it('expect pushExamResults to throw if given invalid scores (id > students number)', function () {
            var jsoop = Object.create(Course).init(getValidTitle(), [getValidTitle()]);
            var id = jsoop.addStudent(getValidName() + ' ' + getValidName());

            function test() {
                jsoop.pushExamResults([{ StudentID: id + 5, score: 3 }, { StudentID: 1, score: 5 }]);
            }

            expect(test).to['throw']();
        });
        it('expect pushExamResults to throw if given invalid scores(id is not a number)', function () {
            var jsoop = Object.create(Course).init(getValidTitle(), [getValidTitle()]);
            var id = jsoop.addStudent(getValidName() + ' ' + getValidName());

            function test() {
                jsoop.pushExamResults([{ StudentID: 'pesho', score: 3 }, { StudentID: 1, score: 5 }]);
            }

            expect(test).to['throw']();
        });
        it('expect pushExamResults to not throw if given valid students and scores', function () {
            var jsoop = Object.create(Course).init(getValidTitle(), [getValidTitle()]);
            jsoop.addStudent(getValidName() + ' ' + getValidName());
            jsoop.addStudent(getValidName() + ' ' + getValidName());
            function test() {
                jsoop.pushExamResults([{ StudentID: 1, score: 4 }, { StudentID: 2, score: 5 }]);
            }

            expect(test).to.not['throw']();
        });
    });
});

var validTitles = ['Modules and Patterns', 'Ofcourse, this is a valid title!', 'No errors hIr.', 'Moar taitles', 'Businessmen arrested for harassment of rockers', 'Miners handed cabbages to the delight of children', 'Dealer stole Moskvitch', 'Shepherds huddle', 'Retired Officers rally', 'Moulds detonate tunnel', 'sailors furious'],
    validNames = ['Pesho', 'Notaname', 'Johny', 'Marulq', 'Keremidena', 'Samomidena', 'Medlar', 'Yglomer', 'Elegant', 'Analogical', 'Bolsheviks', 'Reddish', 'Arbitrage', 'Toyed', 'Willfully', 'Transcribing'];

function getValidTitle() {
    return validTitles[Math.random() * validTitles.length | 0];
}
function getValidName() {
    return validNames[Math.random() * validNames.length | 0];
}

function checkStudentList(list1, list2) {
    if (list1.length !== list2.length) return false;

    function compare(a, b) {
        return a.id - b.id;
    }

    list1.sort(compare);
    list2.sort(compare);

    for (var i in list1) {
        if (list1[i].id !== list2[i].id) return false;
        if (list1[i].firstname !== list2[i].firstname) return false;
        if (list1[i].lastname !== list2[i].lastname) return false;
    }
    return true;
}

/* It's OK */

//# sourceMappingURL=tests-task-1-compiled.js.map