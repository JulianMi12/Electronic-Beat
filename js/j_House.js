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
        albums = ['Dancin', 'Hush Money', 'Ghosts N Stuff', 'Define', 'American Dream', 'Firestone', 'Stole The Show feat. Parson James', 'MOVE YOUR BODY', 'Push The Feeling On', 'Bunnydance', 'Gecko', 'Melody', 'Koala', 'Shades Of Grey(Ft. Delaney Jane)', 'See You In The Other Side', 'Turn Me On ft.Vula', 'My Love', 'Midnight Madness', 'Sister Saviour', 'The Right Song'],
        trackNames = ['Aaron Smith - Dancin', 'Damien N-Drix - Hush Money', 'Deadmau5 feat. Rob Swire - Ghosts N Stuff', 'Dom Dolla & Go Freek - Define', 'Jakatta - American Dream', 'Kygo - Firestone ft.Conrad Sewell', 'Kygo - Stole The Show feat. Parson James', 'MARSHALL JEFFERSON - MOVE YOUR BODY', 'Nightcrawlers - Push The Feeling On', 'Oliver Heldens - Bunnydance', 'Oliver Heldens - Gecko', 'Oliver Heldens - Melody', 'Oliver Heldens - Koala', 'Oliver Heldens & Shaun Frank - Shades Of Grey(Ft. Delaney Jane)', 'Pyramid - See You In The Other Side', 'Riton x Oliver Heldens - Turn Me On ft.Vula', 'Route 94 - My Love ft. Jess Glynne', 'The Chemical Brothers - Midnight Madness', 'The Rapture - Sister Saviour', 'Tiësto, Oliver Heldens - The Right Song ft. Natalie La Rose'],
        albumArtworks = ['_1', '_2', '_3', '_4', '_5', '_6', '_7', '_8', '_9', '_10', '_11', '_12', '_13', '_14', '_15', '_16', '_17', '_18', '_19', '_20'],
        trackUrl = ['musica/HOUSE/Aaron Smith - Dancin.mp3', 'musica/HOUSE/Damien N-Drix - Hush Money.mp3', 'musica/HOUSE/Deadmau5 feat. Rob Swire - Ghosts N Stuff.mp3', 'musica/HOUSE/Dom Dolla & Go Freek - Define.mp3', 'musica/HOUSE/Kygo - Firestone ft Conrad Sewell.mp3', 'musica/HOUSE/Kygo - Firestone ft.Conrad Sewell.mp3', 'musica/HOUSE/Kygo - Stole The Show feat. Parson James.mp3', 'musica/HOUSE/MARSHALL JEFFERSON - MOVE YOUR BODY.mp3', 'musica/HOUSE/Nightcrawlers - Push The Feeling On.mp3', 'musica/HOUSE/Oliver Heldens - Bunnydance.mp3', 'musica/HOUSE/Oliver Heldens - Gecko.mp3', 'musica/HOUSE/Oliver Heldens - Melody.mp3', 'musica/HOUSE/Oliver Heldens - Koala.mp3', 'musica/HOUSE/Oliver Heldens & Shaun Frank - Shades Of Grey (Ft. Delaney Jane.mp3', 'musica/HOUSE/Pyramid - See You In The Other Side.mp3', 'musica/HOUSE/Riton x Oliver Heldens - Turn Me On ft.Vula.mp3', 'musica/HOUSE/Route 94 - My Love ft. Jess Glynne.mp3', 'The Chemical Brothers - Midnight Madness.mp3', 'The Rapture - Sister Saviour.mp3', 'Tiësto, Oliver Heldens - The Right Song ft. Natalie La Rose.mp3'],
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