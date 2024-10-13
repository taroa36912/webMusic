const musicData = {
    'music1': {
        title: '曲名1',
        genre: '睡眠系音楽',
        image: 'images/sleep1.jpg',
        audio: 'musics/music1.mp3'
    },
    'music2': {
        title: '曲名2',
        genre: '睡眠系音楽',
        image: 'images/sleep2.jpg',
        audio: 'musics/music2.mp3'
    },
    'music3': {
        title: '曲名3',
        genre: '作業系音楽',
        image: 'images/work1.jpg',
        audio: 'musics/music3.mp3'
    },
    'music4': {
        title: '曲名4',
        genre: '作業系音楽',
        image: 'images/work2.jpg',
        audio: 'musics/music4.mp3'
    }
};

function populateMusicItems() {
    const sleepMusicContainer = document.getElementById('sleep-music');
    const workMusicContainer = document.getElementById('work-music');

    for (const [id, music] of Object.entries(musicData)) {
        const musicItem = document.createElement('div');
        musicItem.className = 'music-item';
        musicItem.innerHTML = `
            <a href="musicInfo.html?id=${id}">
                <img src="${music.image}" alt="${music.title}" class="music-icon">
                <p>${music.title}</p>
            </a>
        `;

        if (music.genre === '睡眠系音楽') {
            sleepMusicContainer.appendChild(musicItem);
        } else if (music.genre === '作業系音楽') {
            workMusicContainer.appendChild(musicItem);
        }
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
        document.getElementById('music-genre').textContent = data.genre;
        
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
    if (document.getElementById('sleep-music')) {
        populateMusicItems();
    } else if (document.getElementById('music-title')) {
        setupMusicInfoPage();
    }
});