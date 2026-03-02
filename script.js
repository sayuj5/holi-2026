let player;
const content = {
    english: {
        header: "Happy Holi 2026!",
        message: "May the colors of Holi 2026 fill your life with joy and happiness. Wishing you a season of love and laughter!",
        videoId: "0WtRNGubWGA", // Balam Pichkari
        startTime: 0,
        lyrics: [
            { text: "Itna maza kyun aa raha hai", time: 10.5 },
            { text: "Tu ne hawaa mein bhaang milaaya", time: 13.0 },
            { text: "Duguna nashaa kyun ho rahaa hai", time: 15.5 },
            { text: "Aankhon se meethaa tu ne khilaayaa", time: 18.0 }
        ]
    },
    bengali: {
        header: "শুভ দোলযাত্রা ২০২৬!",
        message: "হোলির রঙে রাঙিয়ে তুলুন আপনার ২০২৬-এর প্রতিটি অধ্যায়। আপনার জীবন হোক রঙে রঙিন এবং শান্তিময়।",
        videoId: "o04_v1XgQ1k", // Rangiye Diye Jao (Iman Chakraborty)
        startTime: 0,
        lyrics: [
            { text: "রাঙিয়ে দিয়ে যাও যাও যাও গো এবার যাবার আগে", time: 7.0 },
            { text: "তোমার আপন রাগে, তোমার গোপন রাগে", time: 12.0 },
            { text: "তোমার তরুণ হাসির অরুণ রাগে", time: 20.0 },
            { text: "অশ্রুজলের করুণ রাগে", time: 26.0 }
        ]
    }
};

let currentLang = null;
let lyricInterval;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: '',
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    console.log("Player ready");
}

document.getElementById('btn-english').addEventListener('click', () => startWish('english'));
document.getElementById('btn-bengali').addEventListener('click', () => startWish('bengali'));
document.getElementById('btn-back').addEventListener('click', resetSelection);

function startWish(lang) {
    currentLang = lang;
    const data = content[lang];

    // UI Transitions
    document.getElementById('selection-screen').classList.add('hidden');
    document.getElementById('wish-screen').classList.remove('hidden');
    document.getElementById('wish-screen').classList.add('active');
    document.querySelector('.background-overlay').classList.add('active');

    // Set text
    document.getElementById('wish-header').innerText = data.header;
    document.getElementById('wish-message').innerText = data.message;
    document.body.setAttribute('lang', lang === 'bengali' ? 'bn' : 'en');

    // Prepare Lyrics
    const lyricsContainer = document.getElementById('lyrics-lines');
    lyricsContainer.innerHTML = '';
    data.lyrics.forEach((line, index) => {
        const p = document.createElement('p');
        p.className = 'lyric-line';
        p.innerText = line.text;
        p.id = `lyric-${index}`;
        lyricsContainer.appendChild(p);
    });

    // Play Song
    if (player && player.loadVideoById) {
        console.log(`Starting video: ${data.videoId} at ${data.startTime}s`);

        player.loadVideoById({
            videoId: data.videoId,
            startSeconds: data.startTime
        });

        // Force volume and unmuting
        setTimeout(() => {
            player.unMute();
            player.setVolume(100);
            player.playVideo();
            console.log("Forced unmute and play sequence triggered");
        }, 800);

        // Start Lyrics Sync
        startLyricsSync(data.lyrics);
    } else {
        console.error("YouTube Player not ready yet!");
    }
}

function startLyricsSync(lyrics) {
    let startTime = Date.now();

    if (lyricInterval) clearInterval(lyricInterval);

    lyricInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;

        lyrics.forEach((line, index) => {
            if (elapsed >= line.time) {
                const el = document.getElementById(`lyric-${index}`);
                if (el && !el.classList.contains('visible')) {
                    el.classList.add('visible');
                }
            }
        });

        // Stop after 25 seconds or lyrics end
        if (elapsed > 20) clearInterval(lyricInterval);
    }, 100);
}

function resetSelection() {
    if (player && player.stopVideo) player.stopVideo();
    if (lyricInterval) clearInterval(lyricInterval);

    document.getElementById('wish-screen').classList.add('hidden');
    document.getElementById('selection-screen').classList.remove('hidden');
    document.querySelector('.background-overlay').classList.remove('active');
}
