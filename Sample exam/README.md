# JavaScript OOP 2015 - Audio Player

*	Create an object (module) that enables creation of the foll:

##	`Player`
that has the following:

*	properties:
	*	`name`
	*	`playLists`
*	methods:
	*	`getPlayer('name')`
		*	returns the `Player` with the provided 'name' or 
	*	`addPlaylist(name)`
		*	Creates a playList with the 
	*	`getPlaylistById(id)`
	*	`removePlaylistById(id)`
	*	`listPlaylists(page, size)`
		
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
