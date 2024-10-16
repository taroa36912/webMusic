const musicData = {
    'angrysilently': {
        title: '静かなる怒り',
        genre: 'sleep',
        image: 'images/sleep1.jpg',
        audio: 'musics/music1.mp3',
        composer: 'Z'
    },
    'cat': {
        title: '猫',
        genre: 'daily',
        image: 'images/work2.jpg',
        audio: 'musics/cat.mp3',
        composer: 'Z'
    },
    'silence': {
        title: '嵐の前の静けさ',
        genre: 'daily',
        image: 'images/work2.jpg',
        audio: 'musics/silence_before_storm.mp3',
        composer: 'Z'
    },
    'carnival': {
        title: 'カーニバル',
        genre: 'festival',
        image: 'images/work2.jpg',
        audio: 'musics/carnival.mp3',
        composer: 'Z'
    },
    'hiphop1': {
        title: 'ヒップホップ１',
        genre: 'hiphop',
        image: 'images/work2.jpg',
        audio: 'musics/hiphop.mp3',
        composer: 'Z'
    },
    'positive_spinning': {
        title: 'ポジティブ空回り',
        genre: 'daily',
        image: 'images/work2.jpg',
        audio: 'musics/positive_spinning.mp3',
        composer: 'Z'
    },

};

const genreJpChanger = {
    'sleep' : '睡眠系音楽',
    'work' : '作業系音楽',
    'daily' : '日常系音楽',
    'festival' : '祭り系音楽',
    'hiphop' : 'ヒップホップ'
};

function createGenreSections() {
    const genreContainer = document.getElementById('genre-container');
    const genres = new Set(Object.values(musicData).map(music => music.genre));

    genres.forEach(genre => {
        const section = document.createElement('section');
        section.innerHTML = `
            <h2>${genreJpChanger[genre]}</h2>
            <div id="${genre}" class="music-genre"></div>
        `;
        genreContainer.appendChild(section);
    });
}

function populateMusicItems() {
    for (const [id, music] of Object.entries(musicData)) {
        const musicContainer = document.getElementById(music.genre);
        const musicItem = document.createElement('div');
        musicItem.className = 'music-item';
        musicItem.innerHTML = `
            <a href="musicInfo.html?id=${id}">
                <img src="${music.image}" alt="${music.title}" class="music-icon">
                <p>${music.title}</p>
            </a>
        `;

        musicContainer.appendChild(musicItem);
    }
}

// 音楽情報ページの処理
function setupMusicInfoPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const musicId = urlParams.get('id');

    if (musicId && musicData[musicId]) {
        const data = musicData[musicId];
        document.title = `${data.title} - 詳細情報`;
        document.getElementById('music-title').textContent = data.title;
        document.getElementById('music-image').src = data.image;
        document.getElementById('music-image').alt = data.title;
        document.getElementById('music-genre').textContent = genreJpChanger[data.genre];
        document.getElementById('music-composer').textContent = data.composer;
        
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = data.audio;
        audioPlayer.loop = true;

        const playButton = document.getElementById('play-button');
        const pauseButton = document.getElementById('pause-button');

        playButton.addEventListener('click', function() {
            audioPlayer.play();
            playButton.style.display = 'none';
            pauseButton.style.display = 'inline-block';
        });

        pauseButton.addEventListener('click', function() {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            playButton.style.display = 'inline-block';
            pauseButton.style.display = 'none';
        });

        // Initially hide the pause button
        pauseButton.style.display = 'none';

        document.getElementById('download-link').href = data.audio;
    } else {
        alert('音楽が見つかりませんでした。');
        window.location.href = 'index.html';
    }
}

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('genre-container')) {
        createGenreSections();
        populateMusicItems();
    } else if (document.getElementById('music-title')) {
        setupMusicInfoPage();
    }
});

// 広告の処理
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const downloadButton = document.querySelector('#download-link button');
const adOverlay = document.getElementById('ad-overlay');
const skipButton = document.getElementById('skip-button');
const timer = document.getElementById('timer');
const audioPlayer = document.getElementById('audio-player');

let isAdDisplayed = false;

function showAd() {
    if (Math.random() < 0.3) { // 30% chance to show ad
        isAdDisplayed = true;
        adOverlay.style.display = 'flex';
        let timeLeft = 5;
        const timerInterval = setInterval(() => {
            timeLeft--;
            timer.textContent = timeLeft;
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                skipButton.style.display = 'block';
            }
        }, 1000);
        return true;
    }
    return false;
}

function hideAd() {
    adOverlay.style.display = 'none';
    skipButton.style.display = 'none';
    timer.textContent = '5';
    isAdDisplayed = false;
}

playButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (!isAdDisplayed) {
        if (!showAd()) {
            audioPlayer.play();
        }
    }
});

pauseButton.addEventListener('click', () => {
    audioPlayer.pause();
});

downloadButton.addEventListener('click', (e) => {
    if (showAd()) {
        e.preventDefault();
    }
});

skipButton.addEventListener('click', () => {
    hideAd();
    audioPlayer.play();
});

audioPlayer.addEventListener('play', () => {
    playButton.disabled = true;
    pauseButton.disabled = false;
});

audioPlayer.addEventListener('pause', () => {
    playButton.disabled = false;
    pauseButton.disabled = true;
});