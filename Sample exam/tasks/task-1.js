function solve() {
  var CONSTS = {
    PLAYER: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 30
    }
  },
    validNameCharacters = 'qwertyuiopasdfghjklzxcvbnm' + 'qwertyuiopasdfghjklzxcvbnm'.toUpperCase() + ' \'"-_.,1234567890!*',
    players,
    playlists;

  function isNameValid(name, min, max) {
    var result = typeof (name) === 'string' &&
      min <= name.length && name.length <= max &&
      name.split('').every(function (ch) {
        return validNameCharacters.indexOf(ch) >= 0;
      });

    return result;
  }

  playlists = (function () {
    var playlist = {
      init: function (name) {
        this.name = name;
        return this;
      }
    };

    return {
      get: function (name) {
        return Object.create(playlist)
          .init(name);
      }
    };
  } ());
  players = (function () {
    var player = {
      init: function (name) {
        if (!isNameValid(name, CONSTS.PLAYER.MIN_LENGTH, CONSTS.PLAYER.MAX_LENGTH)) {
          throw {
            name: 'InvalidPlayerName',
            message: 'Player name must be between ' + CONSTS.PLAYER.MIN_LENGTH + ' and ' + CONSTS.PLAYER.MAX_LENGTH + ' characters-long'
          };
        }
        this.name = name;
        return this;
      },
      addPlaylist: function (playlist) {
        this.playlists.push(playlist);
        return this;
      },
      get playlists() {
        if (typeof (this._playlists) === 'undefined') {
          this._playlists = [];
        }
        return this._playlists;
      }
    };

    return {
      get: function (name) {
        return Object.create(player)
          .init(name);
      }
    };
  } ());

  return {
    players: players,
    playlists: playlists
  };
}

module.exports = solve;