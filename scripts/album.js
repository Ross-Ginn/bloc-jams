var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', length: '4:26' },
         { title: 'Green', length: '3:14' },
         { title: 'Red', length: '5:01' },
         { title: 'Pink', length: '3:21'},
         { title: 'Magenta', length: '2:15'}
     ]
 };

 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', length: '1:01' },
         { title: 'Ring, ring, ring', length: '5:01' },
         { title: 'Fits in your pocket', length: '3:21'},
         { title: 'Can you hear me now?', length: '3:14' },
         { title: 'Wrong phone number', length: '2:15'}
     ]
 };

 // Another Example Album
 var albumSmashingPumpkins = {
     title: 'Siamese Dream',
     artist: 'The Smashing Pumpkins',
     label: 'Triclops',
     year: '1993',
     albumArtUrl: 'assets/images/album_covers/SmashingPumpkins-SiameseDream.jpg',
     songs: [
         { title: 'Rocket Boy', length: '1:01' },
         { title: 'Today', length: '5:01' },
         { title: 'Cherb Rock', length: '3:21'},
         { title: 'Space Boy?', length: '3:14' },
         { title: 'Soma', length: '2:15'}
     ]
 };

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

     return template;
 };

 var albumTitle = document.getElementsByClassName('album-view-title')[0];
 var albumArtist = document.getElementsByClassName('album-view-artist')[0];
 var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
 var albumImage = document.getElementsByClassName('album-cover-art')[0];
 var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

 var setCurrentAlbum = function(album) {

     albumTitle.firstChild.nodeValue = album.name;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);

     albumSongList.innerHTML = '';

     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].length);
     }
 };

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';


 window.onload = function() {
     setCurrentAlbum(albumPicasso);

     songListContainer.addEventListener('mouseover', function(event) {
       if (event.target.parentElement.className === 'album-view-song-item') {
           event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
       }
     });


     var songRows = document.getElementsByClassName('album-view-song-item');

     var albums = [albumPicasso, albumMarconi, albumSmashingPumpkins];
     var index = 1;

     for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
         });
     }

     albumImage.addEventListener("click", function(event) {
       setCurrentAlbum(albums[index]);
       index++;
       if (index == albums.length) {
         index = 0;

       }
    });
 };
