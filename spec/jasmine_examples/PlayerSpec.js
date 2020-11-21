// Syntax for beginning a test
describe("Player", function() {
  // imported Player and Song
  var Player = require('../../lib/jasmine_examples/Player');
  var Song = require('../../lib/jasmine_examples/Song');

  // Initialize a variable for each
  var player;
  var song;

  // beforeEach will make a new instance of player and song before each test
  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  it("should be able to play a Song", function() {
    // running player.play method and passing song into method
    player.play(song);
    // actual check to see if player.cu... === song
    expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
});
