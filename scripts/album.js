var setSong = function(songNumber) {
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number) {
  return $('.song-item-number[data-song-number="' + number + '"]');
}
 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

     var $row = $(template);
     var clickHandler = function() {
       var songNumber = parseInt($(this).attr('data-song-number'));

          if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
          }
          if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            UpdatePlayerBarSong();
          } else if (currentlyPlayingSongNumber === songNumber) {
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
}
var setSong = function(songNumber) {
   currentlyPlayingSongNumber = parseInt(songNumber);
   currentSongFromAlbum = currentAlbum.songs[songNumber - 1] ;
 };

 var getSongNumberCell = function(number) {
     return $('.song-item-number[data-song-number="' + number + '"]');
 };
     };

     var onHover = function(event) {
       var songNumberCell = $(this).find('.song-item-number');
       var songNumber = parseInt(songNumberCell.attr('data-song-number'));

          if (songNumber !== currentlyPlayingSongNumber) {
              songNumberCell.html(playButtonTemplate);
      }
     };
     var offHover = function(event) {
       var songNumberCell = $(this).find('.song-item-number');
       var songNumber = songNumberCell.attr('data-song-number');

       if (songNumber !== currentlyPlayingSongNumber) {
          songNumberCell.html(songNumber);
      }
     };

     $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
 };

 var setCurrentAlbum = function(album) {
    currentAlbum = album;
      var $albumTitle = $('.album-view-title');
      var $albumArtist = $('.album-view-artist');
      var $albumReleaseInfo = $('.album-view-release-info');
      var $albumImage = $('.album-cover-art');
      var $albumSongList = $('.album-view-song-list');

      $albumTitle.text(album.title);
      $albumArtist.text(album.artist);
      $albumReleaseInfo.text(album.year + ' ' + album.label);
      $albumImage.attr('src', album.albumArtUrl);
      $albumSongList.empty();

     for (var i = 0; i < album.songs.length; i++) {
       var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
       $albumSongList.append($newRow);
     }
 };

 var trackIndex = function(album, song) {
      return album.songs.indexOf(song);  //  !! review indexOf() method & syntax
  }

  var nextSong = function() {
      //  - Know what the next song is, including when wrapping from the last to first
      var nextTrack;

      if (currentlyPlayingSongNumber !== currentAlbum.songs.length) {
          nextTrack = currentlyPlayingSongNumber + 1;
      }
      else {
          nextTrack = 1;
      }

      var songIndex = trackIndex(currentAlbum, currentSongFromAlbum.title);
      songIndex++;

      var previousSongFromAlbum = currentSongFromAlbum;
      currentSongFromAlbum = currentAlbum.songs[songIndex - 1];

      UpdatePlayerBarSong();



  };


  var nextSong = function() {

      var getLastSongNumber = function(index) {
          return index == 0 ? currentAlbum.songs.length : index;
      };

      var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
      currentSongIndex++;

      if (currentSongIndex >= currentAlbum.songs.length) {
          currentSongIndex = 0;
      }

      setSong(currentSongIndex + 1);

      $('.currently-playing .song-name').text(currentSongFromAlbum.title);
      $('.currently-playing .artist-name').text(currentAlbum.artist);
      $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
      $('.main-controls .play-pause').html(playerBarPauseButton);

      var lastSongNumber = getLastSongNumber(currentSongIndex);
      var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
      var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

      $nextSongNumberCell.html(pauseButtonTemplate);
      $lastSongNumberCell.html(lastSongNumber);

  };


  var previousSong = function() {

      var getLastSongNumber = function(index) {
          return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
      };

      var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
      currentSongIndex--;

      if (currentSongIndex < 0) {
          currentSongIndex = currentAlbum.songs.length - 1;
      }

      currentlyPlayingSongNumber = currentSongIndex + 1;
      currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

      $('.currently-playing .song-name').text(currentSongFromAlbum.title);
      $('.currently-playing .artist-name').text(currentAlbum.artist);
      $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
      $('.main-controls .play-pause').html(playerBarPauseButton);

      var lastSongNumber = getLastSongNumber(currentSongIndex);
      var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
      var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

      $previousSongNumberCell.html(pauseButtonTemplate);
      $lastSongNumberCell.html(lastSongNumber);

  };

  var updatePlayerBarSong = function() {
      $('.song-name').text = currentSongFromAlbum;
      $('.artist-name').text = currentAlbum.artist
      $('.artist-song-mobile').text = currentAlbum.artist + " - " + currentSongFromAlbum;
  }

  var UpdatePlayerBarSong = function() {
      $('.currently-playing .song-name').text(currentSongFromAlbum.title);
      $('.currently-playing .artist-name').text(currentAlbum.artist);
      $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " + " + currentAlbum.artist);
      $('.main-controls .play-pause').html(playerBarPauseButton);
  };


var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var currentSongIndex = null;

 $(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);

});
