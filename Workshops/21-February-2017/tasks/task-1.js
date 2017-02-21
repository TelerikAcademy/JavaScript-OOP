function solve() {
	const module = {
		getPlayer: function (name){
			// returns a new player instance with the provided name
		},
		getPlaylist: function(name){
			//returns a new playlist instance with the provided name
		},
		getAudio: function(title, author, length){
			//returns a new audio instance with the provided title, author and length
		},
		getVideo: function(title, author, imdbRating){
			//returns a new video instance with the provided title, author and imdbRating
		}
	};

	return module;
}

module.exports = solve;
