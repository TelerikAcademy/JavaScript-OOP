/* globals it, describe, require*/
var expect = require('chai').expect;

var players = require('../tasks/task-1')().players;
var playlists = require('../tasks/task-1')().playlists;

var validPlayerName = 'Academy\'s Player';

describe('Players', function () {
  describe('The players object', function () {
    it('expect to exists and to be an object', function () {
      expect(players).to.exist;
      expect(players).to.be.an('object');
    });
  });
  describe('players.get()', function () {
    describe('valid', function () {
      it('expect to exists and to be a function', function () {
        expect(players.get).to.exist;
        expect(players.get).to.be.a('function');
      });

      it('expect to take a single parameter', function () {
        expect(players.get).has.length(1);
      });

      it('expect to return an object with the given valid name', function () {
        expect(players.get(validPlayerName)).to.exist;
        expect(players.get(validPlayerName)).to.be.an('object');
        expect(players.get(validPlayerName)).to.has.property('name');
        expect(players.get(validPlayerName).name).to.equal(validPlayerName);
      });
    });
    describe('invalid', function(){      
      it('expect to throw, when no name is passed', function () {
        function test() {
         players.get(); 
        };
        expect(test).to.throw();
      });
    });
    it('expect to throw, when short name - with less than 3 characters', function(){
      function testWithOneLetter(){
        players.get('T');
      }
      function testWithTwoLetters(){
        players.get('TA');
      }
      expect(testWithOneLetter).to.throw();
      expect(testWithTwoLetters).to.throw();
    });
    it('expect to throw, when long name - with more than 30 characters', function(){
      function test(){
        players.get('T' + new Array(31).join('t'));
      }
      expect(test).to.throw();
    });
    
    it('expect to throw, when long name is passed', function(){
      function test(){
        players.get('T' + new Array(31).join('t'));
      }
      expect(test).to.throw();
    });
  });

  describe('player instance', function () {
    it('expect addPlaylist() to exists and to be a function', function () {
      var player = players.get(validPlayerName);
      expect(player.addPlaylist).to.exist;
      expect(player.addPlaylist).to.be.a('function');
    });

    it('expect addPlaylist() to take a single parameter', function () {
      var player = players.get(validPlayerName);
      expect(player.addPlaylist).to.have.length(1);
    });

    describe('addPlaylist() with valid playlist', function () {
      it('expect to return the player itself', function () {
        var playlist = playlists.get('Rock`n`Roll');
        var player = players.get(validPlayerName);
        expect(player.addPlaylist(playlist)).to.equal(player);
      });
      it('expect the playlist to be contained in player.playlists', function () {
        var playlist = playlists.get('Rock`n`Roll');
        var player = players.get(validPlayerName);
        player.addPlaylist(playlist);
        expect(player.playlists).to.contain(playlist);
      });
    });
  });
});
