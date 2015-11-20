// Videó kezelése.
var video = document.querySelector( "video" );

document.querySelector( "#play-btn" )
    .addEventListener( "click", function() {
        video.play();
    });

document.querySelector( "#pause-btn" )
    .addEventListener( "click", function() {
        video.pause();
    });

document.querySelector( "#mute-btn" )
    .addEventListener( "click", function() {
        video.muted = true;
    });

document.querySelector( "#current-pos" )
    .addEventListener( "change", function() {
        video.currentTime = this.value;
    });