function solve() {
    if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
            if (this == null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }
    if (!Array.prototype.findIndex) {
        Array.prototype.findIndex = function (predicate) {
            if (this == null) {
                throw new TypeError('Array.prototype.findIndex called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return i;
                }
            }
            return -1;
        };
    }

    var playlist, player, playable, audio, video,
        CONSTS = {
            TEXT_MIN_LENGTH: 3,
            TEXT_MAX_LENGTH: 25,
            IMDB_MIN_RATING: 1,
            IMDB_MAX_RATING: 5
        },
        validator = {
            validateString: function (val, name) {
                name = name || 'Value';
                if (val === undefined) {
                    throw new Error(name + ' cannot be undefined');
                }

                if (typeof val !== 'string') {
                    throw new Error(name + ' must be string');
                }

                if (val.length < CONSTS.TEXT_MIN_LENGTH || CONSTS.TEXT_MAX_LENGTH < val.length) {
                    throw new Error(name + ' must be between ' + CONSTS.TEXT_MIN_LENGTH + ' and ' + CONSTS.TEXT_MAX_LENGTH);
                }
            },
            validateNumber: function (val, name) {
                name = name || 'Value';
                if (val === undefined) {
                    throw new Error(name + ' cannot be undefined');
                }

                if (typeof val !== 'number') {
                    throw new Error(name + ' must be number');
                }
            },
            validatePositiveNumber: function (val, name) {
                name = name || 'Value';
                this.validateNumber(val, name);

                if (val <= 0) {
                    throw new Error(name + ' must be positive number, greater than 0');
                }
            },
            validateImdbRating: function (val) {
                this.validateNumber(val, 'IMDB Rating');

                if (val < CONSTS.IMDB_MIN_RATING || CONSTS.IMDB_MAX_RATING < val) {
                    throw new Error('IMDB Rating must be between ' + CONSTS.IMDB_MIN_RATING + ' and ' + CONSTS.IMDB_MAX_RATING)
                }
            },
            validateId: function (id) {
                if (typeof id !== 'number') {
                    id = id.id;
                }

                if (id === undefined) {
                    throw new Error('Id must be a number');
                }

                return id;
            },
            validatePaging: function (page, size, maxElements) {
                this.validateNumber(page, 'Page');
                this.validateNumber(size, 'Size');
                if (size == 0) {
                    throw new Error('Size cannot be zero');
                }
                if (page * size > maxElements) {
                    throw new Error('Such page does not exist');
                }
            }
        };

    playlist = (function () {
        var currnetPlaylistId = 0,
            playlist = Object.create({});

        Object.defineProperty(playlist, 'init', {
            value: function (name) {
                this._id = (currnetPlaylistId += 1);
                this._name = name;
                this._playables = [];
                return this;
            }
        });
        Object.defineProperty(playlist, 'id', {
            enumerable: true,
            get: function () {
                return this._id;
            }
        });
        Object.defineProperty(playlist, 'name', {
            enumerable: true,
            get: function () {
                return this._name;
            }
        });
        Object.defineProperty(playlist, 'addPlayable', {
            value: function (playable) {
                this._playables.push(playable);
                return this;
            }
        });
        Object.defineProperty(playlist, 'getPlayableById', {
            value: function (id) {
                var result = this._playables.find(function (item) {
                    return item.id === id;
                });
                return result || null;
            }
        });
        Object.defineProperty(playlist, 'removePlayable', {
            value: function (param) {
                var index, toRemove = param;
                if (+toRemove) {
                    toRemove = this.getPlayableById(+toRemove);
                }

                index = this._playables.findIndex(function (item) {
                    return item === toRemove
                });

                if (index < 0) {
                    throw Error();
                }

                this._playables.splice(index, 1);
            }
        });
        Object.defineProperty(playlist, 'listPlayables', {
            value: function (page, size) {
                if (page < 0) {
                    throw Error();
                }
                if (size <= 0) {
                    throw Error();
                }
                if (page * size > this._playables.length) {
                    throw Error();
                }

                return this._playables
                    .slice(0)
                    .sort(function (a, b) {
                        if (a.name < b.name) {
                            return -1;
                        }
                        if (a.name > b.name) {
                            return 1;
                        }
                        return a.id - b.id;
                    })
                    .filter(function (item, index) {
                        return index >= (page * size) && index < ((page + 1) * size);
                    });
            }
        });
        return playlist;
    }());

    player = (function () {
        var currnetPlaylistId = 0,
            player = Object.create({});

        Object.defineProperty(player, 'init', {
            value: function (name) {
                this._id = (currnetPlaylistId += 1);
                this._name = name;
                this._playlists = [];
                return this;
            }
        });
        Object.defineProperty(player, 'id', {
            enumerable: true,
            value: this._id
        });
        Object.defineProperty(player, 'name', {
            enumerable: true,
            value: this._name
        });
        Object.defineProperty(player, 'addPlaylist', {
            value: function (playlistToAdd) {
                this._playlists.push(playlistToAdd);
                return this;
            }
        });
        Object.defineProperty(player, 'getPlayableById', {
            value: function (id) {
                return playables.find(function (item) {
                    return item.id === id;
                });
            }
        });
        Object.defineProperty(player, 'removePlayable', {
            value: function (param) {
                var index, toRemove = param;
                if (+toRemove) {
                    toRemove = this.getPlayableById(+toRemove);
                }

                index = playables.findIndex(function (item) {
                    return item === toRemove
                });

                if (index < 0) {
                    throw Error();
                }

                playables.splice(index, 1);
            }
        });
        Object.defineProperty(player, 'listPlayables', {
            value: function (page, size) {
                if (page < 0) {
                    throw Error();
                }
                if (size <= 0) {
                    throw Error();
                }
                if (page * size > playables.length) {
                    throw Error();
                }

                return playables
                    .slice(0)
                    .sort(function (a, b) {
                        if (a.name < b.name) {
                            return -1;
                        }
                        if (a.name > b.name) {
                            return 1;
                        }
                        return a.id - b.id;
                    })
                    .filter(function (item, index) {
                        return index >= (page * size) && index < ((page + 1) * size);
                    });
            }
        });
        return playlist;
    }());

    playable = (function () {
        var currentId = 0,
            playable = Object.create({});

        Object.defineProperty(playable, 'init', {
            value: function (title, author) {
                this._id = (currentId += 1);
                this._title = title;
                this._author = author;
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
                validator.validateString(val, 'Playable title');
                this._title = title;
            }
        });
        Object.defineProperty(playable, 'author', {
            get: function () {
                return this._author;
            },
            set: function (val) {
                validator.validateString(val, 'Playable author');
                this._title = title;
            }
        });
        Object.defineProperty(playable, 'play', {
            value: function() {
                return this._id + '. ' + this._title + ' - ' + this._author;
            }
        });

        return playable;
    }());

    audio = (function (parent) {
        var audio = Object.create(parent);

        Object.defineProperty(audio, 'init', {
            value: function(title, author, length) {
                parent.init.call(this, title, author);
                this._length = length;
                return this;
            }
        });
        Object.defineProperty(audio, 'length', {
            enumerable: true,
            get: function() {
                return this._length;
            },
            set: function(val) {
                validator.validatePositiveNumber(val, 'Audio length');
                this._length = val;
            }
        });
        Object.defineProperty(audio, 'play', {
            value: function() {
                return parent.play.call(this) + ' - ' + this._length;
            }
        });
        return audio;
    }(playable));

    video = (function (parent) {
        var video = Object.create(parent);

        Object.defineProperty(video, 'init', {
            value: function(title, author, imdbRating) {
                parent.init.call(this, title, author);
                this._imdbRating = imdbRating;
                return this;
            }
        });
        Object.defineProperty(video, 'imdbRating', {
            enumerable: true,
            get: function() {
                return this._imdbRating;
            },
            set: function(val) {
                validator.validatePositiveNumber(val, 'Video imdb Rating');
                this._imdbRating = val;
            }
        });
        Object.defineProperty(video, 'play', {
            value: function() {
                return parent.play.call(this) + ' - ' + this._imdbRating;
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
}

var result = solve();
var audio = result.getAudio('asd', 'sdf', 4);
audio = result.getAudio('asd', 'sdf', 4);
console.log(audio.play());

/*var pl = result.getPlaylist('asd');

var playable = {id: 1, name: 'Rock', author: 'Stephen'};
pl.addPlayable(playable);
console.log(pl.getPlayableById(1));

console.log(pl.listPlayables(0, 10));
pl.removePlayable(1);
console.log(pl.getPlayableById(1));

var list = result.getPlaylist('Rock');
for (var i = 0; i < 35; i += 1) {
    list.addPlayable({id: (i + 1), name: 'Rock' + (9 - (i % 10))});
}

//console.log(list.listPlayables(0, 10));

/*returnedPlayables = list.listPlaylables(2,10);
 returnedPlayables = list.listPlaylables(3,10);
 console.log(returnedPlayables);*/

module.exports = solve;