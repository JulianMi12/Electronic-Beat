var song = document.getElementById("song");
var icon = document.getElementById("icon");

icon.onclick = function() {
    if (song.paused) {
        song.play();
        icon.src = "images/index/pause.png";
    } else {
        song.pause();
        icon.src = "images/index/play.png";
    }
}