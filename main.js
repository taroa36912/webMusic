const musicData = {
    'angrysilently': {
        title: '静かなる怒り',
        genre: 'sleep',
        image: 'images/sleep1.jpg',
        audio: 'musics/music1.mp3',
        composer: 'gaki'
    },
    'cat': {
        title: '猫',
        genre: 'daily',
        image: 'images/work2.jpg',
        audio: 'musics/cat.mp3',
        composer: 'gaki'
    },
    'silence': {
        title: '嵐の前の静けさ',
        genre: 'daily',
        image: 'images/work2.jpg',
        audio: 'musics/silence_before_storm.mp3',
        composer: 'gaki'
    },
    'carnival': {
        title: 'カーニバル',
        genre: 'festival',
        image: 'images/work2.jpg',
        audio: 'musics/carnival.mp3',
        composer: 'gaki'
    },
    'hiphop1': {
        title: 'ヒップホップ１',
        genre: 'hiphop',
        image: 'images/work2.jpg',
        audio: 'musics/hiphop.mp3',
        composer: 'gaki'
    },
    'positive_spinning': {
        title: 'ポジティブ空回り',
        genre: 'daily',
        image: 'images/work2.jpg',
        audio: 'musics/positive_spinning.mp3',
        composer: 'gaki'
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