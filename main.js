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

(function() {
    // URLからクエリパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const musicId = urlParams.get('id');

    // musicIdがmusicDataに存在するか確認
    if (musicId && musicData[musicId]) {
        const data = musicData[musicId];
        // ページの要素を更新
        document.title = `${data.title} - 詳細情報`;
        document.getElementById('music-title').textContent = data.title;
        document.getElementById('music-image').src = data.image;
        document.getElementById('music-image').alt = data.title;
        document.getElementById('music-genre').textContent = data.genre;
        document.getElementById('audio-player').src = data.audio;
        document.getElementById('download-link').href = data.audio;

        // 再生ボタンと停止ボタンにイベントリスナーを追加
        document.getElementById('play-button').addEventListener('click', function() {
            document.getElementById('audio-player').play();
        });

        document.getElementById('pause-button').addEventListener('click', function() {
            document.getElementById('audio-player').pause();
        });
    } else {
        // 無効なmusicIdの場合の処理
        alert('音楽が見つかりませんでした。');
        window.location.href = 'index.html';
    }
})();