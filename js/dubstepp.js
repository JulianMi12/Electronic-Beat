$(function() {
    var playerTrack = $("#player-track1"),
        bgArtwork = $('#bg-artwork1'),
        bgArtworkUrl, albumName = $('#album-name1'),
        trackName = $('#track-name1'),
        albumArt = $('#album-art1'),
        sArea = $('#s-area1'),
        seekBar = $('#seek-bar1'),
        trackTime = $('#track-time1'),
        insTime = $('#ins-time1'),
        sHover = $('#s-hover1'),
        playPauseButton = $("#play-pause-button1"),
        i = playPauseButton.find('i'),
        tProgress = $('#current-time1'),
        tTime = $('#track-length1'),
        seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
        buffInterval = null,
        tFlag = false,
        albums = ['Ahre', 'Goin In', '100s', 'Cinema', 'Riot', 'SURVIVAL', 'FALLING', 'The Wonky Song', 'Takin Over', 'Riddim Love Song', 'First Of The Year (Equinox)', 'Recess', 'Rock n Roll', 'Make It Bun Dem', 'TRY IT OUT', 'Bangarang', 'Pray For Riddim', 'Purple Dragons', ' Immunity', 'Resurrected'],
        trackNames = ['12th Planet & Bandlez - Rubber Band Boiz', 'Birdy Nam Nam - Goin In (Skrillex Goin Hard Mix)', 'Borgore - 100s', 'Cinema - Skrillex', 'Crankdat  Gammer  - Riot', 'MONXX  - SURVIVAL', 'MONXX - FALLING', 'Monxx & Walter Wilde - The Wonky Song', 'Nitti Gritti & Shaquille O Neal - Takin Over', 'Oddprophet - Riddim Love Song', 'Skrillex - First Of The Year (Equinox)', 'Skrillex  Kill The Noise  Recess Ft Fatman Scoop and Michael Angelakos Official Audio', 'Skrillex - Rock n Roll', 'Skrillex & Damian Jr. Gong Marley - Make It Bun Dem', 'SKRILLEX + ALVIN RISK - TRY IT OUT', 'Skrillex Ft. Sirah - Bangarang', 'Virtual Riot - Pray For Riddim', 'Virtual Riot - Purple Dragons', 'Zomboy - Immunity', 'Zomboy - Resurrected'],
        albumArtworks = ['_01', '_02', '_03', '_04', '_05', '_06', '_07', '_08', '_09', '_010', '_011', '_012', '_013', '_014', '_015', '_016', '_017', '_018', '_019', '_020'],
        trackUrl = ['musica/DUBSTEP/12th Planet & Bandlez - Rubber Band Boiz.mp3', 'musica/DUBSTEP/Birdy Nam Nam - Goin In (Skrillex Goin Hard Mix).mp3', 'musica/DUBSTEP/Borgore - 100s.mp3', 'musica/DUBSTEP/Cinema - Skrillex.mp3', 'musica/DUBSTEP/Crankdat  Gammer  - Riot.mp3', 'musica/DUBSTEP/MONXX  - SURVIVAL.mp3', 'musica/DUBSTEP/MONXX - FALLING.mp3', 'musica/DUBSTEP/Monxx & Walter Wilde - The Wonky Song.mp3', 'musica/DUBSTEP/Nitti Gritti & Shaquille O Neal - Takin Over.mp3', 'musica/DUBSTEP/Oddprophet - Riddim Love Song', 'musica/DUBSTEP/Skrillex - First Of The Year (Equinox).mp3', 'musica/DUBSTEP/Skrillex  Kill The Noise  Recess Ft Fatman Scoop and Michael Angelakos Official Audio.mp3', 'musica/DUBSTEP/Skrillex - Rock n Roll.mp3', 'musica/DUBSTEP/Skrillex & Damian Jr. Gong Marley - Make It Bun Dem.mp3', 'musica/DUBSTEP/SKRILLEX + ALVIN RISK - TRY IT OUT.mp3', 'musica/DUBSTEP/Skrillex Ft. Sirah - Bangarang.mp3', 'musica/DUBSTEP/Virtual Riot - Pray For Riddim.mp3', 'musica/DUBSTEP/Virtual Riot - Purple Dragons.mp3', 'musica/DUBSTEP/Zomboy - Immunity.mp3', 'musica/DUBSTEP/Zomboy - Resurrected.mp3'],
        playPreviousTrackButton = $('#play-previous1'),
        playNextTrackButton = $('#play-next1'),
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