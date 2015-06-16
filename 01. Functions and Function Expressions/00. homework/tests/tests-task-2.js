/* globals describe, it */


var solve = require('../tasks/task-2');

var expect = require('chai').expect;
describe('Tests for "Task 2"', function () {
	it('expect solve(1, 5) to be equal to [2, 3, 5]', function () {
		expect(solve(1, 5)).to.eql([2, 3, 5]);
	});

	it('expect solve("1", "5") to be equal to [2, 3, 5]', function () {
		expect(solve('1', '5')).to.eql([2, 3, 5]);
	});

	it('expect solve() to throw error', function () {
		function test() {
			solve();
		}
		expect(test).to.throw();
	});

	it('expect solve(1) to throw error', function () {
		function test() {
			solve(1);
		}
		expect(test).to.throw();
	});

	it('expect solve(258, 262) to be equal to [](empty array)', function () {
		expect(solve(258, 262)).to.be.empty;
	});
});