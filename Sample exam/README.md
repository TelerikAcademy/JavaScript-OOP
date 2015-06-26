# JavaScript OOP 2015 - Audio Player
* Create an object that enables creation of playlists and audio players
* Each playlist has the following properties and methods:
  * A property name
  * A property audios
  * A method addAudio(audio)
    * Adds a audio to the player
    * The same audio can be added multiple times
    * Each audio has a name and an id
      * If the audio is firstly added to any playlist, an ID is generated for it
      * If the audio is previosly added to any playlist, its ID is reused
    * Enables chaining
  * A method getAudioById(id)
    * Returns the audio that has the provided ID
    * Returns null, if no audio is found with the provided ID
  * A method removeAudioById(id)
    * Removes the leftmost occurence of the audio with the provided ID
    * Enables chaining
  