var slides = [
    { tag: 'Nu aan het spelen', title: 'Marvel Rivals & Call of Duty: Warzone', text: 'Ik speel nu Marvel Rivals en Warzone. goed voor aim, teamplay en pacing.', media: { type: 'video', src: './src/assets/videos/Current-games.mp4' } },
    { tag: 'Gespeeld', title: 'Favoriete werelden waar ik ben geweest', text: 'De spelwerelden die mij het meeste nostalgie geven zijn: skyrim, gta en red dead redemption.', media: { type: 'video', src: './src/assets/videos/Played-games.mp4' } },
    { tag: 'Toekomstdroom', title: 'Games die ik in de toekomst wil maken', text: 'In de toekomst wil ik spellen zoals Fable en God of War maken.', media: { type: 'video', src: './src/assets/videos/future-games.mp4' } }
];

var playlist = [
    { title: 'Through the Wire', artist: 'Kanye West', src: './src/assets/audio/Kanye West - Through The Wire Sunday Service Choir - No Content (youtube).mp3', mv: './src/assets/images/L.mp4' },
    { title: 'Indecision', artist: 'Sampha', src: './src/assets/audio/Sampha - Indecision.mp3', mv: './src/assets/images/spiderman.mp4' },
    { title: 'Boucan', artist: 'Franglish ft keblack', src: './src/assets/audio/Franglish ft keblack - BOUCAN (audio) - Musique TV (youtube).mp3', mv: './src/assets/images/goku.mp4' },
    { title: 'Blue Bird', artist: 'Naruto Shippuden', src: './src/assets/audio/Naruto Shippuden Opening 3  Blue Bird (HD) - Crunchyroll Deutschland (youtube).mp3', mv: './src/assets/images/Naruto-vs-Sasuke.mp4' }
];

var bgVideo = document.getElementById('bgVideo');
var bgImage = document.getElementById('bgImage');
var chip = document.getElementById('chip');
var titleEl = document.getElementById('title');
var copyEl = document.getElementById('copy');
var left = document.getElementById('leftArrow');
var right = document.getElementById('rightArrow');

var audio = document.getElementById('audio');
var mv = document.getElementById('mv');
var trackTitle = document.getElementById('trackTitle');
var trackArtist = document.getElementById('trackArtist');
var playBtn = document.getElementById('playBtn');
var prevBtn = document.getElementById('prevBtn');
var nextBtn = document.getElementById('nextBtn');
var muteBtn = document.getElementById('muteBtn');

var slideIndex = 0;
var trackIndex = 0;

function showSlide() {
    var s = slides[slideIndex];
    chip.textContent = s.tag;
    titleEl.textContent = s.title;
    copyEl.textContent = s.text;

    bgVideo.style.display = 'none';
    bgImage.style.display = 'none';

    if (s.media && s.media.type === 'video') {
        bgVideo.src = s.media.src;
        bgVideo.style.display = 'block';
        bgVideo.play().catch(function () { });
    } else if (s.media && s.media.type === 'image') {
        bgImage.src = s.media.src;
        bgImage.style.display = 'block';
    }
}

left.onclick = function () {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide();
};

right.onclick = function () {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide();
}

window.onkeydown = function (e) {
    if (e.key === 'ArrowLeft') { left.onclick(); };
    if (e.key === 'ArrowRight') { right.onclick(); };
};

function loadTrack() {
    var t = playlist[trackIndex];
    trackTitle.textContent = t.title || '-';
    trackArtist.textContent = t.artist || '-';
    audio.src = t.src || '';
    mv.src = t.mv || '';
    if (mv.src) mv.play().catch(function () { });
}

function updatePlayIcon() {
    playBtn.textContent = audio.paused ? '▶' : '⏸';
}

function playPause() {
    if (audio.paused) {
        audio.play().catch(function () { });
    } else {
        audio.pause();
    }
}

function nextTrack() {
    trackIndex = (trackIndex + 1) % playlist.length;
    loadTrack();
    audio.play().catch(function () { });
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + playlist.length) % playlist.length;
    loadTrack();
    audio.play().catch(function () { });
}

playBtn.onclick = playPause;
nextBtn.onclick = nextTrack;
prevBtn.onclick = prevTrack;

muteBtn.onclick = function () {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? '🔇' : '🔊';
};

audio.onended = nextTrack;
audio.onplay = updatePlayIcon;
audio.onpause = updatePlayIcon;
audio.onerror = updatePlayIcon;

showSlide();
loadTrack();
updatePlayIcon();