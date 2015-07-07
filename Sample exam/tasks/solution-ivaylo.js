function solve() {
    var module = (function () {
        var player,
            playlist,
            playable,
            audio,
            video,
            validator,
            CONSTANTS = {
                TEXT_MIN_LENGTH: 3,
                TEXT_MAX_LENGTH: 25,
                IMDB_MIN_RATING: 1,
                IMDB_MAX_RATING: 5,
                MAX_NUMBER: 9007199254740992
            };

        function indexOfElementWithIdInCollection(collection, id) {
            var i, len;
            for (i = 0, len = collection.length; i < len; i++) {
                if (collection[i].id == id) {
                    return i;
                }
            }

            return -1;
        }

        function getSortingFunction(firstParameter, secondParameter) {
            return function (first, second) {
                if (first[firstParameter] < second[firstParameter]) {
                    return -1;
                }
                else if (first[firstParameter] > second[firstParameter]) {
                    return 1;
                }

                if (first[secondParameter] < second[secondParameter]) {
                    return -1;
                }
                else if (first[secondParameter] > second[secondParameter]) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }

        validator = {
            validateIfUndefined: function (val, name) {
                name = name || 'Value';
                if (val === undefined) {
                    throw new Error(name + ' cannot be undefined');
                }
            },
            validateIfObject: function(val, name) {
                name = name || 'Value';
                if (typeof val !== 'object') {
                    throw new Error(name + ' must be an object');
                }
            },
            validateIfNumber: function (val, name) {
                name = name || 'Value';
                if (typeof val !== 'number') {
                    throw new Error(name + ' must be a number');
                }
            },
            validateString: function (val, name) {
                name = name || 'Value';
                this.validateIfUndefined(val, name);

                if (typeof val !== 'string') {
                    throw new Error(name + ' must be a string');
                }

                if (val.length < CONSTANTS.TEXT_MIN_LENGTH
                    || CONSTANTS.TEXT_MAX_LENGTH < val.length) {
                    throw new Error(name + ' must be between ' + CONSTANTS.TEXT_MIN_LENGTH +
                        ' and ' + CONSTANTS.TEXT_MAX_LENGTH + ' symbols');
                }
            },
            validatePositiveNumber: function (val, name) {
                name = name || 'Value';
                this.validateIfUndefined(val, name);
                this.validateIfNumber(val, name);

                if (val <= 0) {
                    throw new Error(name + ' must be positive number');
                }
            },
            validateImdbRating: function (val) {
                this.validateIfUndefined(val, 'IMDB Rating');
                this.validateIfNumber(val, 'IMDB Rating');

                if (val < CONSTANTS.IMDB_MIN_RATING || CONSTANTS.IMDB_MAX_RATING < val) {
                    throw new Error('IMDB Rating must be between '
                        + CONSTANTS.IMDB_MIN_RATING
                        + ' and ' + CONSTANTS.IMDB_MAX_RATING);
                }
            },
            validateId: function (id) {
                this.validateIfUndefined(id, 'Object id');
                if (typeof id !== 'number') {
                    id = id.id;
                }

                this.validateIfUndefined(id, 'Object must have id');
                return id;
            },
            validatePageAndSize: function (page, size, maxElements) {
                this.validateIfUndefined(page);
                this.validateIfUndefined(size);
                this.validateIfNumber(page);
                this.validateIfNumber(size);

                if (page < 0) {
                    throw new Error('Page must be greather than or equal to 0');
                }

                this.validatePositiveNumber(size, 'Size');

                if (page * size > maxElements) {
                    throw new Error('Page * size will not return any elements from collection');
                }
            }
        };

        player = (function () {
            var currentPlayerId = 0,
                player = Object.create({});

            Object.defineProperty(player, 'init', {
                value: function (name) {
                    this.name = name;
                    this._id = ++currentPlayerId;
                    this._playlists = [];
                    return this;
                }
            });

            Object.defineProperty(player, 'id', {
                get: function () {
                    return this._id;
                }
            });

            Object.defineProperty(player, 'name', {
                get: function () {
                    return this._name;
                },
                set: function (val) {
                    validator.validateString(val, 'Player name');
                    this._name = val;
                }
            });

            Object.defineProperty(player, 'addPlaylist', {
                value: function (playlist) {
                    validator.validateIfUndefined(playlist, 'Player add playlist parameter');
                    if (playlist.id === undefined) {
                        throw new Error('Player add playlist parameter must have id');
                    }

                    this._playlists.push(playlist);
                    return this;
                }
            });

            Object.defineProperty(player, 'getPlaylistById', {
                value: function (id) {
                    var i, len;
                    validator.validateIfUndefined(id, 'Player get playlist parameter id');
                    validator.validateIfNumber(id, 'Player get playlist paratemeter id');

                    var foundIndex = indexOfElementWithIdInCollection(this._playlists, id);
                    if (foundIndex < 0) {
                        return null;
                    }

                    return this._playlists[foundIndex];
                }
            });

            Object.defineProperty(player, 'removePlaylist', {
                value: function (id) {
                    id = validator.validateId(id);

                    var foundIndex = indexOfElementWithIdInCollection(this._playlists, id);
                    if (foundIndex < 0) {
                        throw new Error('Playlist with id ' + id + ' was not found in player');
                    }

                    this._playlists.splice(foundIndex, 1);

                    return this;
                }
            });

            Object.defineProperty(player, 'listPlaylists', {
                value: function (page, size) {
                    validator.validatePageAndSize(page, size, this._playlists.length);

                    return this._playlists
                        .slice()
                        .sort(getSortingFunction('name', 'id'))
                        .splice(page * size, size);
                }
            });

            Object.defineProperty(player, 'contains', {
                value: function (playable, playlist) {
                    validator.validateIfUndefined(playable);
                    validator.validateIfUndefined(playlist);
                    var playableId = validator.validateId(playable.id);
                    var playlistId = validator.validateId(playlist.id);

                    var playlist = this.getPlaylistById(playlistId);
                    if (playlist == null) {
                        return false;
                    }

                    var playable = playlist.getPlayableById(playableId);
                    if (playable == null) {
                        return false;
                    }

                    return true;
                }
            });

            Object.defineProperty(player, 'search', {
                value: function (pattern) {
                    validator.validateString(pattern, 'Search pattern');

                    return this._playlists
                        .filter(function (playlist) {
                            return playlist
                                .listPlayables()
                                .some(function (playable) {
                                    return playable.length !== undefined
                                        && playable
                                            .title
                                            .toLowerCase()
                                            .indexOf(pattern.toLowerCase()) >= 0;
                                });
                        })
                        .map(function (playlist) {
                            return {
                                id: playlist.id,
                                name: playlist.name,
                            }
                        });
                }
            })

            return player;
        }());

        playlist = (function () {
            var currentPlaylistId = 0,
                playlist = Object.create({});

            function indexOfPlayableInPlaylist(id) {
                var i, len;
                for (i = 0, len = this._playables.length; i < len; i++) {
                    if (this._playables[i].id == id) {
                        return i;
                    }
                }

                return -1;
            }

            Object.defineProperty(playlist, 'init', {
                value: function (name) {
                    this.name = name;
                    this._id = ++currentPlaylistId;
                    this._playables = [];
                    return this;
                }
            });

            Object.defineProperty(playlist, 'id', {
                get: function () {
                    return this._id;
                }
            });

            Object.defineProperty(playlist, 'name', {
                get: function () {
                    return this._name;
                },
                set: function (val) {
                    validator.validateString(val, 'Playlist name');
                    this._name = val;
                }
            })

            Object.defineProperty(playlist, 'addPlayable', {
                value: function (playable) {
                    validator.validateIfUndefined(playable, 'Playlist add playable parameter');
                    validator.validateIfObject(playable, 'Playlist add playable parameter');
                    validator.validateIfUndefined(playable.id, 'Playlist add playable parameter must have id');

                    this._playables.push(playable);
                    return this;
                }
            });

            Object.defineProperty(playlist, 'getPlayableById', {
                value: function (id) {
                    var i, len;
                    validator.validateIfUndefined(id, 'Playlist get playable parameter id');
                    validator.validateIfNumber(id, 'Playlist get playable paratemeter id');

                    var foundIndex = indexOfElementWithIdInCollection(this._playables, id);
                    if (foundIndex < 0) {
                        return null;
                    }

                    return this._playables[foundIndex];
                }
            });

            Object.defineProperty(playlist, 'removePlayable', {
                value: function (id) {
                    id = validator.validateId(id);

                    var foundIndex = indexOfElementWithIdInCollection(this._playables, id);
                    if (foundIndex < 0) {
                        throw new Error('Playable with id ' + id + ' was not found in playlist');
                    }

                    this._playables.splice(foundIndex, 1);

                    return this;
                }
            });

            Object.defineProperty(playlist, 'listPlayables', {
                value: function (page, size) {
                    page = page || 0;
                    size = size || CONSTANTS.MAX_NUMBER;
                    validator.validatePageAndSize(page, size, this._playables.length);

                    return this
                        ._playables
                        .slice()
                        .sort(getSortingFunction('title', 'id'))
                        .splice(page * size, size);
                }
            });

            return playlist;
        }());

        playable = (function () {
            var currentPlayableId = 0,
                playable = Object.create({});

            Object.defineProperty(playable, 'init', {
                value: function (title, author) {
                    this.title = title;
                    this.author = author;
                    this._id = ++currentPlayableId;
                    return this;
                }
            });

            Object.defineProperty(playable, 'id', {
                get: function () {
                    return this._id;
                }
            });

            Object.defineProperty(playable, 'title', {
                get: function () {
                    return this._title;
                },
                set: function (val) {
                    validator.validateString(val, 'Playable Title');
                    this._title = val;
                }
            });

            Object.defineProperty(playable, 'author', {
                get: function () {
                    return this._author;
                },
                set: function (val) {
                    validator.validateString(val, 'Playable Author');
                    this._author = val;
                }
            });

            Object.defineProperty(playable, 'play', {
                value: function () {
                    return this.id + '. ' + this.title + ' - ' + this.author;
                }
            });

            return playable;
        }());

        audio = (function (parent) {
            var audio = Object.create(parent);

            Object.defineProperty(audio, 'init', {
                value: function (title, author, length) {
                    parent.init.call(this, title, author);
                    this.length = length;
                    return this;
                }
            });

            Object.defineProperty(audio, 'length', {
                get: function () {
                    return this._length;
                },
                set: function (val) {
                    validator.validatePositiveNumber(val, 'Audio Length');
                    this._length = val;
                }
            });

            Object.defineProperty(audio, 'play', {
                value: function () {
                    return parent.play.call(this) + ' - ' + this.length;
                }
            });

            return audio;
        }(playable));

        video = (function (parent) {
            var video = Object.create(parent);

            Object.defineProperty(video, 'init', {
                value: function (title, author, imdbRating) {
                    parent.init.call(this, title, author);
                    this.imdbRating = imdbRating;
                    return this;
                }
            });

            Object.defineProperty(video, 'imdbRating', {
                get: function () {
                    return this._imdbRating;
                },
                set: function (val) {
                    validator.validateImdbRating(val);
                    this._imdbRating = val;
                }
            });

            Object.defineProperty(video, 'play', {
                value: function () {
                    return parent.play.call(this) + ' - ' + this.imdbRating;
                }
            });

            return video;
        }(playable));

        return {
            getPlayer: function (name) {
                return Object.create(player).init(name);
            },
            getPlaylist: function (name) {
                return Object.create(playlist).init(name);
            },
            getAudio: function (title, author, length) {
                return Object.create(audio).init(title, author, length);
            },
            getVideo: function (title, author, imdbRating) {
                return Object.create(video).init(title, author, imdbRating);
            }
        };
    }());

    return module;
}

var module = solve();

player = module.getPlayer('pesho');
playlist = module.getPlaylist('gosho');
player.addPlaylist(playlist);
var audio = module.getAudio('ivan', 'ivanov', 4);
playlist.addPlayable(audio);

console.log(player.search('van'));

