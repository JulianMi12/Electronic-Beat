var h1 = document.getElementById("h1");
var h2 = document.getElementById("h2");
var h3 = document.getElementById("h3");
var h4 = document.getElementById("h4");
var h5 = document.getElementById("h5");
var h6 = document.getElementById("h6");
var iconh1 = document.getElementById("iconh1");
var iconh2 = document.getElementById("iconh2");
var iconh3 = document.getElementById("iconh3");
var iconh4 = document.getElementById("iconh4");
var iconh5 = document.getElementById("iconh5");
var iconh6 = document.getElementById("iconh6");

iconh1.onclick = function() {
    if (h1.paused) {
        h1.play();
        iconh1.src = "images/pause.png";
        h2.pause();
        iconh2.src = "images/play.png";
        h3.pause();
        iconh3.src = "images/play.png";
        h4.pause();
        iconh4.src = "images/play.png";
        h5.pause();
        iconh5.src = "images/play.png";
        h6.pause();
        iconh6.src = "images/play.png";
    } else {
        h1.pause();
        iconh1.src = "images/play.png";
    }
}

iconh2.onclick = function() {
    if (h2.paused) {
        h1.pause();
        iconh1.src = "images/play.png";
        h2.play();
        iconh2.src = "images/pause.png";
        h3.pause();
        iconh3.src = "images/play.png";
        h4.pause();
        iconh4.src = "images/play.png";
        h5.pause();
        iconh5.src = "images/play.png";
        h6.pause();
        iconh6.src = "images/play.png";
    } else {
        h2.pause();
        iconh2.src = "images/play.png";
    }
}

iconh3.onclick = function() {
    if (h3.paused) {
        h1.pause();
        iconh1.src = "images/play.png";
        h2.pause();
        iconh2.src = "images/play.png";
        h3.play();
        iconh3.src = "images/pause.png";
        h4.pause();
        iconh4.src = "images/play.png";
        h5.pause();
        iconh5.src = "images/play.png";
        h6.pause();
        iconh6.src = "images/play.png";
    } else {
        h3.pause();
        iconh3.src = "images/play.png";
    }
}

iconh4.onclick = function() {
    if (h4.paused) {
        h1.pause();
        iconh1.src = "images/play.png";
        h2.pause();
        iconh2.src = "images/play.png";
        h3.pause();
        iconh3.src = "images/play.png";
        h4.play();
        iconh4.src = "images/pause.png";
        h5.pause();
        iconh5.src = "images/play.png";
        h6.pause();
        iconh6.src = "images/play.png";
    } else {
        h4.pause();
        iconh4.src = "images/play.png";
    }
}

iconh5.onclick = function() {
    if (h5.paused) {
        h1.pause();
        iconh1.src = "images/play.png";
        h2.pause();
        iconh2.src = "images/play.png";
        h3.pause();
        iconh3.src = "images/play.png";
        h4.pause();
        iconh4.src = "images/play.png";
        h5.play();
        iconh5.src = "images/pause.png";
        h6.pause();
        iconh6.src = "images/play.png";
    } else {
        h5.pause();
        iconh5.src = "images/play.png";
    }
}

iconh6.onclick = function() {
    if (h6.paused) {
        h1.pause();
        iconh1.src = "images/play.png";
        h2.pause();
        iconh2.src = "images/play.png";
        h3.pause();
        iconh3.src = "images/play.png";
        h4.pause();
        iconh4.src = "images/play.png";
        h5.pause();
        iconh5.src = "images/play.png";
        h6.play();
        iconh6.src = "images/pause.png";
    } else {
        h6.pause();
        iconh6.src = "images/play.png";
    }
}