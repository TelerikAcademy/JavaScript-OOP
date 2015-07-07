# JavaScript OOP 2015 - Audio Player

*	Create an object (module) that enables creation of the following:

##	`Player`
that has the following:

*	properties:
	*	`name`
*	methods:
	*	`getPlayer('name')`
		*	returns a new `Player` with the provided 'name'
	*	`addPlaylist(playlistToAdd)`
		*	Adds a playlist to the player
		*	`playlistToAdd` must be a player instance
			*	Otherwise, throw an error
		*	Enables chaining
	*	`getPlaylistById(id)`
		*	Finds and returns a playlist from the playlists in this player instance
		*	Returns null, if a playlist with the provided id is not contained in the player 
	*	`removePlaylistById(id)`
		*	Removes a playlists from this player instance, and the playlist must have the provided id
		*	Enables chaining
		*	Throws an error, if a playlist with the provided id is not contained in the player 
	*	`listPlaylists(page, size)`
		*	Returns an array with at most size `size` and containing the playlists with indices page*size, page*size+1, page*size+2, ... page*(size+1)-1
		*	If there are less that `size` playlists, return all of them
		*	Throw an error if:
			*	page*size > COUNT_OF_PLAYLISTS
			*	page < 0
			*	size <= 0
		*	__Example__:
			`//having 35 playlists:
			 //listPlaylists(2, 10) should return playlists with indices from 20 to 29, including
			 //listPlaylists(3, 10) should return playlists with indices from 30 to 35, including
			`
##	`PlayList`
that has the following:

*	properties:
	*	`id`
	*	`name`
	*	`audios` - an array
	*	`videos` - an array
*	methods:
	*	`addAudio(audio)`
		*	Adds a audio to the `PlayList`
		*	The same audio can be added multiple times
		*	If the audio is firstly added to any `PlayList`, an `id` is generated for it
		*	If the audio is previously added to any `PlayList`, its `id` is reused
		*	Enables chaining
	*	`getAudioById(id)`
		*	Returns the audio that has the provided `id`
		*	Returns null, if no audio is found with the provided `id`
	*	`removeAudioById(id)`
		*	Removes the leftmost occurrence of the audio with the provided `id`
		*	Enables chaining
			
##	`Playable`
that has the following :

*	properties:
	*	`id`
	*	`title`
	*	`author`
*	methods:
	*	`play()`
		*	returns a string in the format: `[id]. [title] - [author]`
	
##	`Audio`
that inherits `Playable` and adds the following:

*	properties:
	*	`length`
*	methods:
	*	`play()`
		*	reuses the `play()` form `Playable` and adds: ` - [length]` at the end

##	`Video`
that inherits `Playable` and adds the following:

*	properties:
	*	`imdbRating`
*	methods:
	*	`play()`
		*	reuses the `play()` form `Playable` and adds: ` - [imdbRating]` at the end
