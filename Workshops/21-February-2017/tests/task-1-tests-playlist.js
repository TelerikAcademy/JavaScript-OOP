const {expect} = require('chai');
const result = require('../tasks/task-1')();

describe('Audio Player test', function () {
	describe('Audio tests', function() {
		it('expect getAudio() to exist', function() {
			expect(result.getAudio).to.be.a('function');
			expect(result.getAudio).to.have.length(3);
		});

		it('expect getAudio() to set Audio properties', function() {
			const title = 'Title';
			const author = 'Author';
			const length = 42;

			const item = result.getAudio(title, author, length);

			expect(item.title).to.equal(title);
			expect(item.author).to.equal(author);
			expect(item.length).to.equal(length);
		});

		it('expect getAudio() to throw when invalid length is specified', function() {
			expect(function() { result.getAudio('Title', 'Author', -3); }).to.throw();
		});

		it('expect Audios to have a number id', function() {
			const item = result.getAudio('Title', 'Author', 42);
			expect(item.id).to.be.a('number');
			expect(item.id > 0).to.be.true;
		});

		it('expect Audio ids to be unique', function() {
			const items = Array.from({ length: 100 })
				.map((_, i) => result.getAudio('Title', 'Author', i + 1));
			const ids = items.map(x => x.id)
				.sort()
				.forEach((x, i, arr) => {
					expect(x).not.to.equal(arr[i - 1]);
				});
		});

		it('expect Audio.play() to return the correct string', function() {
			const title = 'Title';
			const author = 'Author';
			const length = 42;

			const item = result.getAudio(title, author, length);
			expect(item.play()).to.equal(`[${item.id}]. [${title}] - [${author}] - [${length}]`);
		});
	});

	describe('Video tests', function() {
		it('expect getVideo() to exist', function() {
			expect(result.getVideo).to.be.a('function');
			expect(result.getVideo).to.have.length(3);
		});

		it('expect getVideo() to set Video properties', function() {
			const title = 'Title';
			const author = 'Author';
			const imdbRating = 4;

			const item = result.getVideo(title, author, imdbRating);

			expect(item.title).to.equal(title);
			expect(item.author).to.equal(author);
			expect(item.imdbRating).to.equal(imdbRating);
		});

		it('expect getVideo() to throw when invalid imdbRating is specified', function() {
			expect(function() { result.getVideo('Title', 'Author', -1); }).to.throw();
		});

		it('expect getVideo() to throw when invalid imdbRating is specified', function() {
			expect(function() { result.getVideo('Title', 'Author', 7); }).to.throw();
		});

		it('expect Videos to have a number id', function() {
			const item = result.getVideo('Title', 'Author', 2);
			expect(item.id).to.be.a('number');
			expect(item.id > 0).to.be.true;
		});

		it('expect Video ids to be unique', function() {
			const items = Array.from({ length: 100 })
				.map((_, i) => result.getVideo('Title', 'Author', i % 5 + 1));
			const ids = items.map(x => x.id)
				.sort()
				.forEach((x, i, arr) => {
					expect(x).not.to.equal(arr[i - 1]);
				});
		});

		it('expect Video.play() to return the correct string', function() {
			const title = 'Title';
			const author = 'Author';
			const imdbRating = 4;

			const item = result.getVideo(title, author, imdbRating);
			expect(item.play()).to.equal(`[${item.id}]. [${title}] - [${author}] - [${imdbRating}]`);
		});
	});

    describe('PlayList', function () {
        describe('With valid input', function () {
            it('expect getPlaylist to exist, to be a function and to take a single parameter and to enable chaining', function () {
                expect(result.getPlaylist).to.exist;
                expect(result.getPlaylist).to.be.a('function');
                expect(result.getPlaylist).to.have.length(1);
            });
            it('expect getPlaylist to return a new playlist instance, with provided name and generated id', function () {
                const name = 'Rock and roll';
                const playlist = result.getPlaylist(name);

                expect(playlist).to.exist;
                expect(playlist).to.be.an('object');
                expect(playlist.name).to.equal(name);
                expect(playlist.id).to.exist;
                expect(playlist.id > 0).to.equal(true);
            });
            it('expect getPlaylist to generate different ids', function () {
                const name = 'Rock and roll',
                    playlist1 = result.getPlaylist(name),
                    playlist2 = result.getPlaylist(name);

                expect(playlist1).to.exist;
                expect(playlist2).to.exist;
                expect(playlist1.id).not.to.equal(playlist2.id);
            });

            it('expect playlist.addPlayable() to exists, to be a function and to take a single parameter and to enable chaining', function () {
                const name = 'Rock and roll',
                    playlist = result.getPlaylist(name),
                    playable = {id: 1, title: 'Banana Rock', author: 'Wombles'};

                expect(playlist.addPlayable).to.exist;
                expect(playlist.addPlayable).to.be.a('function');
                expect(playlist.addPlayable).to.have.length(1);

                const returnedPlaylist = playlist.addPlayable(playable);
                expect(returnedPlaylist).to.equal(playlist);
            });
            it('expect playlist.getPlayableById() to exists, to be a function and to take a single parameter', function () {
                const name = 'Rock and roll';
                const playlist = result.getPlaylist(name);

                expect(playlist.getPlayableById).to.exist;
                expect(playlist.getPlayableById).to.be.a('function');
                expect(playlist.getPlayableById).to.have.length(1);
            });
            it('expect playlist.addPlayable() to add the playable and playlist.getPlayableById() to retrieve the same playable', function () {
                const name = 'Rock and roll',
                    playlist = result.getPlaylist(name),
                    playable = {id: 1, title: 'Banana Rock', author: 'Wombles'};

                const returnedPlayable = playlist.addPlayable(playable).getPlayableById(1);
                expect(returnedPlayable.id).to.equal(playable.id);
                expect(returnedPlayable.name).to.equal(playable.name);
                expect(returnedPlayable.author).to.equal(playable.author);
            });

            it('expect playlist.removePlayable() to exists, to be a function and to take a single parameter', function () {
                const name = 'Rock and roll',
                    playlist = result.getPlaylist(name);

                expect(playlist.removePlayable).to.exist;
                expect(playlist.removePlayable).to.be.a('function');
                expect(playlist.removePlayable).to.have.length(1);
            });
            it('expect playlist.removePlayable() remove the playable with that id', function () {
                const name = 'Rock and roll';
                const plName = 'Banana Rock';
                const plAuthor = 'Wombles';
                const playlist = result.getPlaylist(name);
                const playable = {id: 1, title: plName, author: plAuthor};

                playlist.addPlayable(playable);
                playlist.removePlayable(playable);
                let gotten = playlist.getPlayableById(1);
                expect(gotten).to.be.null;

                playlist.addPlayable(playable);
                playlist.removePlayable(1);
                gotten = playlist.getPlayableById(1);

                expect(gotten).to.be.null;
                expect(function() { playlist.removePlayable(10); }).to.throw();
            });

            it('expect playlist.listPlayables() to exists, to be a function and to take 2 parameters', function () {
                const name = 'Rock and roll';
                const playlist = result.getPlaylist(name);

                expect(playlist.listPlayables).to.exist;
                expect(playlist.listPlayables).to.be.a('function');
                expect(playlist.listPlayables).to.have.length(2);
            });
            it('expect playlist.listPlayables() to return correct number of playables and to throw errors when invalid data is passed', function () {
                const name = 'Hard Rock';
                const playlist = result.getPlaylist(name);

                for (let i = 0; i < 35; i += 1) {
                    playlist.addPlayable({id: (i + 1), title: 'Rock' + (9 - (i % 10))});
                }

                expect(playlist.listPlayables(2, 10).length).to.equal(10);
                expect(playlist.listPlayables(3, 10).length).to.equal(5);

                expect(function() { playlist.listPlayables(-1, 10) }).to.throw();
                expect(function() { playlist.listPlayables(5, 10) }).to.throw();
                expect(function() { playlist.listPlayables(1, -1) }).to.throw();
            });
        });
    });
});
