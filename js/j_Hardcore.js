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
        albums = ['Critter', 'Diabolic Dice','Geto Tremble', 'Hoax', 'Pennywise','Solid Stigma','Street Fighter','Gangsterizm','Creed Of Chaos','F.I.F.O.','Hands Up','Take the Pills','Trip to Ireland', 'Trip to Valhalla','Trip to Antarctica','AVA','No Mercy','Out Of The Frame','YES!','The Heartless'],
        trackNames = ['Angerfist - Critter', 'Angerfist - Diabolic Dice', 'Angerfist - Geto Tremble', 'Angerfist - Hoax', 'Angerfist - Pennywise','Angerfist - Solid Stigma','Angerfist - Street Fighter','Angerfist &  IGor - Gangsterizm','Angerfist ft Nolz - Creed Of Chaos','Brennan Heart - F.I.F.O.','Dj Anime - Hands Up','Dr. Peacock - Take the Pills','Dr. Peacock - Trip to Ireland', 'Dr. Peacock - Trip to Valhalla','Dr. Peacock & Billx - Trip to Antarctica','Garmiani - AVA','Gunz For Hire - No Mercy','Miss K8 - Out Of The Frame','Rooler - YES!','Tha Playah & Angerfist - The Heartless'],
        albumArtworks = ['_1', '_2', '_3', '_4', '_5', '_6', '_7', '_8', '_9', '_10', '_11', '_12', '_13', '_14', '_15', '_16', '_17', '_18', '_19', '_20'],
        trackUrl = ['musica/HARDCORE/Angerfist - Critter.mp3', 'musica/HARDCORE/Angerfist - Diabolic Dice.mp3', 'musica/HARDCORE/Angerfist - Geto Tremble.mp3', 'musica/HARDCORE/Angerfist - Hoax.mp3', 'musica/HARDCORE/Angerfist - Pennywise.mp3','musica/HARDCORE/Angerfist - Solid Stigma.mp3','musica/HARDCORE/Angerfist - Street Fighter.mp3','musica/HARDCORE/Angerfist &  IGor - Gangsterizm.mp3','musica/HARDCORE/Angerfist ft Nolz - Creed Of Chaos.mp3','musica/HARDCORE/Brennan Heart - F.I.F.O..mp3','musica/HARDCORE/Dj Anime - Hands Up.mp3','musica/HARDCORE/Dj Anime - Hands Up.mp3','musica/HARDCORE/Dr. Peacock - Trip to Ireland Duo.mp3','musica/HARDCORE/Dr. Peacock - Trip to Valhalla.mp3','musica/HARDCORE/Dr. Peacock & Billx - Trip to Antarctica.mp3','musica/HARDCORE/Garmiani - AVA.mp3','musica/HARDCORE/Gunz For Hire - No Mercy.mp3','musica/HARDCORE/Miss K8 - Out Of The Frame.mp3','musica/HARDCORE/Rooler - YES!.mp3','musica/HARDCORE/Tha Playah & Angerfist - The Heartless.mp3'],
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