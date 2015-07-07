expect = require('chai').expect
result = require('../tasks/task-1')()

describe 'Sample exam tests', () ->
    describe 'Players', () ->
        describe 'With valid input', () ->
            it 'expect getPlayer to exist, to be a function and to take a single parameter', () ->
                expect(result.getPlayer).to.exist
                expect(result.getPlayer).to.be.a 'function'
                expect(result.getPlayer).to.have.length 1
            it 'expect getPlayer to return a new player instance, with provided name and generated id', () ->
                name = 'Rock and roll'
                player = result.getPlayer name
                expect(player).to.exist
                expect(player).to.be.an 'object'
                expect(player.name).to.equal name
                expect(player.id).to.exist
            it 'expect player.addPlaylist() to exists, to be a function and to take a single parameter', () ->
                name = 'Rock and roll'
                player = result.getPlayer name
                expect(player.addPlaylist).to.exist
                expect(player.addPlaylist).to.be.a 'function'
                expect(player.addPlaylist).to.have.length 1
            