const musicData = {
    'music1': {
        title: '曲名1',
        genre: 'sleep-music',
        image: 'images/sleep1.jpg',
        audio: 'musics/music1.mp3'
    },
    'music2': {
        title: '曲名2',
        genre: 'sleep-music',
        image: 'images/sleep2.jpg',
        audio: 'musics/music2.mp3'
    },
    'music3': {
        title: '曲名3',
        genre: 'work-music',
        image: 'images/work1.jpg',
        audio: 'musics/music3.mp3'
    },
    'music4': {
        title: '曲名4',
        genre: 'work-music',
        image: 'images/work2.jpg',
        audio: 'musics/music4.mp3'
    },
    'music5': {
        title: '曲名4',
        genre: 'work-music',
        image: 'images/work2.jpg',
        audio: 'musics/music4.mp3'
    },
    'music6': {
        title: '曲名4',
        genre: 'work-music',
        image: 'images/work2.jpg',
        audio: 'musics/music4.mp3'
    },
    'music7': {
        title: '曲名4',
        genre: 'sleep-music',
        image: 'images/work2.jpg',
        audio: 'musics/music4.mp3'
    },
    'music8': {
        title: '曲名4',
        genre: 'sleep-music',
        image: 'images/work2.jpg',
        audio: 'musics/music4.mp3'
    },
};

const genreJpChanger = {
    'sleep-music' : '睡眠系音楽',
    'work-music' : '作業系音楽'
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