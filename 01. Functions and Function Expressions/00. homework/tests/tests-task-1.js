/* globals describe, it */
var solve = require('../tasks/task-1');
var expect = require('chai').expect;

describe('Tests for "Task 1"', function () {
	it('expect solve([1, 2, 3]) to be equal to 6', function () {
		expect(solve([1, 2, 3])).to.equal(6);
	});

	it('expect solve([]) to return null', function () {
		expect(solve([])).to.be.null;
	});

	it('expect solve() to throw Error', function () {
		function test() {
			solve();
		}
		expect(test).to.throw();
	});

	it('expect solve(["1", "2"]) to be equal to 3', function () {
		expect(solve(['1', '2'])).to.eql(3);
	});

	it('expect solve(["1", "John"]) to throw Error', function () {
		function test() {
			solve(['1', 'John']);
		}
		expect(test).to.throw();
	});
});