'use strict';

const chai = require('chai'),
    expect = chai.expect,
    LinkedList = require('../task/task-1');

describe('Linked list: ', () => {
    it('should have append and toString correctly', () => {

        const list = new LinkedList(),
            values = [1, 2, false, 3, 4];
        
        list.append(...values);

        expect(list.first).to.equal(values[0]);
        expect(list.last).to.equal(values[values.length - 1]);
        expect(list.length).to.equal(values.length);
        expect(list.toString()).to.equal(values.join(' -> '));
    });

    it('append should implement chaining and toString should work correctly', () => {
        const values = [1, 2, 3, 4, 5, 6],
            list = new LinkedList()
                            .append(1, 2)
                            .append(3, 4)
                            .append(5)
                            .append(6);


        expect(list.first).to.equal(values[0]);
        expect(list.last).to.equal(values[values.length - 1]);
        expect(list.length).to.equal(values.length);
        expect(list.toString()).to.equal(values.join(' -> '));
    });

    it('should implement prepend correctly, enable chaining and toString should work correctly', () => {

        const values = [0, 1, 2, 3, 4, 5],
            list = new LinkedList()
                            .append(3, 4)
                            .prepend(1, 2)
                            .prepend(0)
                            .append(5);
        

        expect(list.first).to.equal(values[0]);
        expect(list.last).to.equal(values[values.length - 1]);
        expect(list.length).to.equal(values.length);
        expect(list.toString()).to.equal(values.join(' -> '));
    });

    it('should insert correctly', () => {
        const values = [1, 2, 6, 7, 8],
            list = new LinkedList().append(...values).insert(2, 3, 4).insert(4, 5);
        
        expect(list.first).to.equal(1);
        expect(list.length).to.equal(8);
        expect(list.toString()).to.equal([1, 2, 3, 4, 5, 6, 7, 8].join(' -> '));
    });

    it('should insert correctly', () => {
        const list = new LinkedList().append(1, 2).insert(0, 3, 4);

        list.insert(list.length - 1, 'kremikovci');
        
        expect(list.first).to.equal(3);
        expect(list.last).to.equal('kremikovci');
        expect(list.length).to.equal(5);
        expect(list.toString()).to.equal([3, 4, 1, 2, 'kremikovci'].join(' -> '));
    });

    it('should have correct for-of', () => {

        const values = [5, 6, 38],
            list = new LinkedList().append(...values);

        for(const val of list) {
            expect(values.indexOf(val)).to.not.equal(-1);
        }
    });

    it('should have correct for-of', () => {

        const values = [5, 6, 3, 'gosho', true, null, 'ivan', { message: 'Hello' }],
            list = new LinkedList()
                            .append(...values.slice(4))
                            .prepend(...values.slice(0, 4));

        for(const val of list) {
            expect(val).to.equal(values.shift());
        }
    });

    it('should have correct removeAt', () => {
        const values = ['test', true, null, 1, 2, 'testtest', { value: 'val', message: 'hello' }, 'gg'],
            list = new LinkedList().append(...values),
            removed1 = list.removeAt(1),
            removed2 = list.removeAt(1),
            removed3 = list.removeAt(0),
            removed4 = list.removeAt(list.length - 1);
        
        expect(list.first).to.equal(1);
        expect(list.last).to.equal('gg');
        expect(list.length).to.equal(values.length - 4);
        expect([removed1, removed2, removed3, removed4].join()).to.equal([true, null, 'test', 'gg'].join());
    });

    it('should have correct indexing with at(index)', () => {
        const values = 'babel src --presets es2015 --out-dir ./build -s -w'.split(' '),
            list = new LinkedList().append(...values),
            listLength = list.length;

        for(let i = 0, length = values.length; i < length; i += 1) {
            expect(list.at(i)).to.equal(values[i]);
        }

        expect(list.first).to.equal(values[0]);
        expect(list.last).to.equal(values[values.length - 1]);
        expect(list.length).to.equal(listLength);
    });

    it('at(0) should return the same as .first', () => {
        const list = new LinkedList().append(1, 2, 3, 5);

        expect(list.at(0)).to.equal(list.first);
    });

    it('at(list.length - 1) should return the same as .last', () => {
        const list = new LinkedList().append(1, 2, 3, 5);

        expect(list.at(list.length - 1)).to.equal(list.last);
    });

    it('should have correct indexing with at(index, value)', () => {
        const values = 'babel src --presets es2015 --out-dir ./build -s -w'.split(' '),
            list = new LinkedList().append(...values),
            listLength = list.length;

        for(let i = 0, length = values.length; i < length; i += 1) {
           list.at(i, i);
           expect(list.at(i)).to.equal(i);
        }

        expect(list.first).to.equal(0);
        expect(list.last).to.equal(values.length - 1);
        expect(list.length).to.equal(listLength);
    });

    it('should have correct toArray', () => {

        const values = ['test', true, null, 1, 2, 'testtest', { value: 'val', message: 'hello' }],
            array = new LinkedList().append(...values).toArray();

        expect(array instanceof Array).to.be.true;
        expect(array.length).to.equal(values.length);
        expect(JSON.stringify(array)).to.equal(JSON.stringify(values));
    });
});