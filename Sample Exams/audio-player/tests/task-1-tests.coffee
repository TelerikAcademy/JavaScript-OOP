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
            it 'expect player.addPlaylist() to exists, to be a function, to take a single parameter and to enable chaining', () ->
                name = 'Rock and roll'
                player = result.getPlayer name
                playlist = result.getPlaylist name
                expect(player.addPlaylist).to.exist
                expect(player.addPlaylist).to.be.a 'function'
                expect(player.addPlaylist).to.have.length 1
                returnedPlayer = player.addPlaylist playlist
                expect(returnedPlayer).to.equal player
            it 'expect player.getPlaylistById() to return previously added playlist, when no other playlists', () ->
                name = 'Rock and Roll'
                player = result.getPlayer name
                playlist = result.getPlaylist name
                returnedPlaylist = player.addPlaylist(playlist)
                    .getPlaylistById(playlist.id)
                expect(returnedPlaylist).to.equal(playlist)
            it 'expect player.getPlaylistById() to return previously added playlist, when there are other playlists', () ->
                name = 'Rock and Roll'
                player = result.getPlayer name
                playlist = result.getPlaylist name
                count = 5
                for i in [0..count]
                    player.addPlaylist(result.getPlaylist(name + i))
                player.addPlaylist(playlist)
                for i in [0..count]
                    player.addPlaylist(result.getPlaylist(name + i))
                expect(player.getPlaylistById playlist.id).to.equal(playlist)
            it 'expect player.getPlaylistById() with id, not contianed in the player to return null, when there are other playlists and when there are no playlists at all', () ->
                name = 'Rock and Roll'
                player = result.getPlayer name

                expect(player.getPlaylist(2)).to.be.null
                count = 5
                ids = {}
                for i in [0..count]
                    playlist = result.getPlaylist(name + i)
                    player.addPlaylist(playlist)
                    ids[playlist.id] = true
                invalidID = (Math.random() * 100000000) | 0
                while ids[invalidID]
                    invalidID = (Math.random() * 100000000) | 0
                expect(player.getPlaylist(invalidID)).to.be.null
            it 'expect player.removePlaylist() to remove the playlist, when id is provided', ->
                name = 'Rock and Roll'
                player = result.getPlayer name
                playlist = result.getPlaylist name
                player.addPlaylist(playlist)
                    .removePlaylist(playlist.id)
                expect(player.getPlaylistById(playlist.id)).to.be.null

                for i in [0..5]
                    player.addPlaylist(name + i)
