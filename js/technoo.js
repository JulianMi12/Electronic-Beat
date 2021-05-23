var btn_1 = document.getElementById('div1');
var btn_2 = document.getElementById('div2');

function mostrarLista1() {
    btn_1.style.display = 'inline';
    btn_2.style.display = 'none';
    btn_3.style.display = 'none';
    btn_4.style.display = 'none';
    btn_5.style.display = 'none';
}

function mostrarLista2() {
    btn_1.style.display = 'none';
    btn_2.style.display = 'inline';
    btn_3.style.display = 'none';
    btn_4.style.display = 'none';
    btn_5.style.display = 'none';
}

function mostrarLista3() {
    btn_1.style.display = 'none';
    btn_2.style.display = 'none';
    btn_3.style.display = 'inline';
    btn_4.style.display = 'none';
    btn_5.style.display = 'none';
}

function mostrarLista4() {
    btn_1.style.display = 'none';
    btn_2.style.display = 'none';
    btn_3.style.display = 'none';
    btn_4.style.display = 'inline';
    btn_5.style.display = 'none';
}

function mostrarLista5() {
    btn_1.style.display = 'none';
    btn_2.style.display = 'none';
    btn_3.style.display = 'none';
    btn_4.style.display = 'none';
    btn_5.style.display = 'inline';
}


$(function curr() {

    $("#inputCurr").on('change', function() {

        var selectValue = $(this).val();
        switch (selectValue) {

            case "1":
                $(".m1").show();
                $(".m2").hide();
                break;

            case "2":
                $(".m1").hide();
                $(".m2").show();
                break;
        }

    }).change();

});

$(function() {
    var playerTrack = $("#player-track"),
        bgArtwork = $('#bg-artwork'),
        bgArtworkUrl, albumName = $('#album-name'),
        trackName = $('#track-name'),
        albumArt = $('#album-art'),
        sArea = $('#s-area'),
        seekBar = $('#seek-bar'),
        trackTime = $('#track-time'),
        insTime = $('#ins-time'),
        sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find('i'),
        tProgress = $('#current-time'),
        tTime = $('#track-length'),
        seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
        buffInterval = null,
        tFlag = false,
        albums = ['X0003000X [NTNLTD001X]', 'Your Mind', 'Space Date', 'Hypnotized', 'The Acid', 'Purple Noise', 'Calypso', 'Sgadi Li Mi', 'Hey Hey Hey', 'meet her at the Loveparade', 'Opus', 'Losing It', 'What Is Love', 'Hanging Tree', 'Blue Monday', 'Look What Your Love Has Done To Me (Amelie Lens Remix)', 'The Yard Man', 'Hey Boy Hey Girl', 'Later Bitches', 'Transition (David Temessi Remix)'],
        trackNames = ['999999999 - X0003000X [NTNLTD001X]', 'Adam Beyer & Bart Skils - Your Mind', 'Adam Beyer, Layton Giordani & Green Velvet - Space Date', 'Amelie Lens - Hypnotized', 'ASYS - The Acid', 'Boris Brejcha - Purple Noise', 'Carl Cox - Calypso', 'Charlotte de Witte - Sgadi Li Mi', 'Chemical Surf - Hey Hey Hey', 'Da Hool - meet her at the Loveparade', 'Eric Prydz - Opus', 'FISHER - Losing It', 'Haddaway - What Is Love', 'Michael Bibi - Hanging Tree', 'New Order - Blue Monday', 'Perc - Look What Your Love Has Done To Me (Amelie Lens Remix)', 'SRVD - The Yard Man', 'The Chemical Brothers - Hey Boy Hey Girl', 'The Prince Karma - Later Bitches', 'Uncertain - Transition (David Temessi Remix)'],
        albumArtworks = ['_1', '_2', '_3', '_4', '_5', '_6', '_7', '_8', '_9', '_10', '_11', '_12', '_13', '_14', '_15', '_16', '_17', '_18', '_19', '_20'],
        trackUrl = ['musica/TECHNO/999999999 - X0003000X [NTNLTD001X].mp3', 'musica/TECHNO/Adam Beyer & Bart Skils - Your Mind.mp3', 'musica/TECHNO/Adam Beyer, Layton Giordani & Green Velvet - Space Date.mp3', 'musica/TECHNO/Amelie Lens - Hypnotized.mp3', 'musica/TECHNO/ASYS - The Acid.mp3', 'musica/TECHNO/Boris Brejcha - Purple Noise.mp3', 'musica/TECHNO/Carl Cox - Calypso.mp3', 'musica/TECHNO/Charlotte de Witte - Sgadi Li Mi.mp3', 'musica/TECHNO/Chemical Surf - Hey Hey Hey.mp3', 'musica/TECHNO/Da Hool - meet her at the Loveparade', 'musica/TECHNO/Eric Prydz - Opus.mp3', 'musica/TECHNO/FISHER - Losing It.mp3', 'musica/TECHNO/Haddaway - What Is Love.mp3', 'musica/TECHNO/Michael Bibi - Hanging Tree.mp3', 'musica/TECHNO/New Order - Blue Monday.mp3', 'musica/TECHNO/Perc - Look What Your Love Has Done To Me (Amelie Lens Remix).mp3', 'musica/TECHNO/SRVD - The Yard Man.mp3', 'musica/TECHNO/The Chemical Brothers - Hey Boy Hey Girl.mp3', 'musica/TECHNO/The Prince Karma - Later Bitches.mp3', 'musica/TECHNO/Uncertain - Transition (David Temessi Remix).mp3'],
        playPreviousTrackButton = $('#play-previous'),
        playNextTrackButton = $('#play-next'),
        currIndex = -1;

    function playPause() {
        setTimeout(function() {
            if (audio.paused) {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class', 'fas fa-pause');
                audio.play();
            } else {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class', 'fas fa-play');
                audio.pause();
            }
        }, 300);
    }


    function showHover(event) {
        seekBarPos = sArea.offset();
        seekT = event.clientX - seekBarPos.left;
        seekLoc = audio.duration * (seekT / sArea.outerWidth());

        sHover.width(seekT);

        cM = seekLoc / 60;

        ctMinutes = Math.floor(cM);
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if (ctMinutes < 10)
            ctMinutes = '0' + ctMinutes;
        if (ctSeconds < 10)
            ctSeconds = '0' + ctSeconds;

        if (isNaN(ctMinutes) || isNaN(ctSeconds))
            insTime.text('--:--');
        else
            insTime.text(ctMinutes + ':' + ctSeconds);

        insTime.css({ 'left': seekT, 'margin-left': '-21px' }).fadeIn(0);

    }

    function hideHover() {
        sHover.width(0);
        insTime.text('00:00').css({ 'left': '0px', 'margin-left': '0px' }).fadeOut(0);
    }

    function playFromClickedPos() {
        audio.currentTime = seekLoc;
        seekBar.width(seekT);
        hideHover();
    }

    function updateCurrTime() {
        nTime = new Date();
        nTime = nTime.getTime();

        if (!tFlag) {
            tFlag = true;
            trackTime.addClass('active');
        }

        curMinutes = Math.floor(audio.currentTime / 60);
        curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

        durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);

        playProgress = (audio.currentTime / audio.duration) * 100;

        if (curMinutes < 10)
            curMinutes = '0' + curMinutes;
        if (curSeconds < 10)
            curSeconds = '0' + curSeconds;

        if (durMinutes < 10)
            durMinutes = '0' + durMinutes;
        if (durSeconds < 10)
            durSeconds = '0' + durSeconds;

        if (isNaN(curMinutes) || isNaN(curSeconds))
            tProgress.text('00:00');
        else
            tProgress.text(curMinutes + ':' + curSeconds);

        if (isNaN(durMinutes) || isNaN(durSeconds))
            tTime.text('00:00');
        else
            tTime.text(durMinutes + ':' + durSeconds);

        if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds))
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');


        seekBar.width(playProgress + '%');

        if (playProgress == 100) {
            i.attr('class', 'fa fa-play');
            seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
        }
    }

    function checkBuffering() {
        clearInterval(buffInterval);
        buffInterval = setInterval(function() {
            if ((nTime == 0) || (bTime - nTime) > 1000)
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        }, 100);
    }

    function selectTrack(flag) {
        if (flag == 0 || flag == 1)
            ++currIndex;
        else
            --currIndex;

        if ((currIndex > -1) && (currIndex < albumArtworks.length)) {
            if (flag == 0)
                i.attr('class', 'fa fa-play');
            else {
                albumArt.removeClass('buffering');
                i.attr('class', 'fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

            currAlbum = albums[currIndex];
            currTrackName = trackNames[currIndex];
            currArtwork = albumArtworks[currIndex];

            audio.src = trackUrl[currIndex];

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if (flag != 0) {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');

                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            albumArt.find('img.active').removeClass('active');
            $('#' + currArtwork).addClass('active');

            bgArtworkUrl = $('#' + currArtwork).attr('src');

            bgArtwork.css({ 'background-image': 'url(' + bgArtworkUrl + ')' });
        } else {
            if (flag == 0 || flag == 1)
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer() {
        audio = new Audio();

        selectTrack(0);

        audio.loop = false;

        playPauseButton.on('click', playPause);

        sArea.mousemove(function(event) { showHover(event); });

        sArea.mouseout(hideHover);

        sArea.on('click', playFromClickedPos);

        $(audio).on('timeupdate', updateCurrTime);

        playPreviousTrackButton.on('click', function() { selectTrack(-1); });
        playNextTrackButton.on('click', function() { selectTrack(1); });
    }

    initPlayer();
});