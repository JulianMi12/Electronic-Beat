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
        albums = ['Ten Feet Tall', 'Turn Up The Speakers', 'No Beef', 'Bad', 'Mammoth', 'Let Me Love You', 'Middle', 'You Know You Like It', 'TSUNAMI', 'Take Ü There', 'Animals', 'Tremor', 'Toulouse', 'Flashlight', 'Where Are Ü Now', 'Dont You Worry Child', 'BOOM', 'Split', 'PSY or DIE', 'Bounce Generation'],
        trackNames = ['Afrojack - Ten Feet Tall ft. Wrabel', 'Afrojack & Martin Garrix - Turn Up The Speakers', 'Afrojack & Steve Aoki ft Miss Palmer - No Beef', 'ADavid Guetta & Showtek - Bad ft.Vassy', 'Dimitri Vegas, MOGUAI & Like Mike - Mammoth', 'DJ Snake - Let Me Love You ft. Justin Bieber', 'DJ Snake ft. Bipolar Sunshine - Middle', 'DJ Snake, AlunaGeorge - You Know You Like It', 'DVBBS & Borgeous - TSUNAMI', 'Jack Ü - Take Ü There feat. Kiesza', 'Martin Garrix - Animals', 'Martin Garrix & Dimitri Vegas And Like Mike - Tremor', 'Nicky Romero - Toulouse', 'R3hab & Deorro - Flashlight', 'Skrillex & Diplo Ft. Justin Bieber - Where Are Ü Now', 'Swedish House Mafia ft. John Martin - Dont You Worry Child', 'Tiësto & Sevenn - BOOM', 'Tiësto & The Chainsmokers - Split', 'Timmy Trumpet & Carnage - PSY or DIE', 'TJR & VINAI - Bounce Generation'],
        albumArtworks = ['_1', '_2', '_3', '_4', '_5', '_6', '_7', '_8', '_9', '_10', '_11', '_12', '_13', '_14', '_15', '_16', '_17', '_18', '_19', '_20'],
        trackUrl = ['musica/EDM/Afrojack - Ten Feet Tall ft. Wrabel.mp3', 'musica/EDM/Afrojack & Martin Garrix - Turn Up The Speakers.mp3', 'musica/EDM/Afrojack & Steve Aoki ft Miss Palmer - No Beef.mp3', 'musica/EDM/ADavid Guetta & Showtek - Bad ft.Vassy.mp3', 'musica/EDM/Dimitri Vegas, MOGUAI & Like Mike - Mammoth.mp3', 'musica/EDM/DJ Snake - Let Me Love You ft. Justin Bieber.mp3', 'musica/EDM/DJ Snake ft. Bipolar Sunshine - Middle.mp3', 'musica/EDM/DJ Snake, AlunaGeorge - You Know You Like It.mp3', 'musica/EDM/DVBBS & Borgeous - TSUNAMI.mp3', 'musica/EDM/Jack Ü - Take Ü There feat. Kiesza', 'musica/EDM/Martin Garrix - Animals.mp3', 'musica/EDM/Martin Garrix & Dimitri Vegas And Like Mike - Tremor.mp3', 'musica/EDM/Nicky Romero - Toulouse.mp3', 'musica/EDM/R3hab & Deorro - Flashlight.mp3', 'musica/EDM/Skrillex & Diplo Ft. Justin Bieber - Where Are Ü Now.mp3', 'musica/EDM/Swedish House Mafia ft. John Martin - Dont You Worry Child.mp3', 'musica/EDM/Tiësto & Sevenn - BOOM.mp3', 'musica/EDM/Tiësto & The Chainsmokers - Split.mp3', 'musica/EDM/Timmy Trumpet & Carnage - PSY or DIE.mp3', 'musica/EDM/TJR & VINAI - Bounce Generation.mp3'],
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