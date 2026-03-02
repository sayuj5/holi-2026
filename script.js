const content = {
    english: {
        header: "Happy Holi 2026!",
        message: "May the colors of Holi 2026 fill your life with joy and happiness. Wishing you a season of love and laughter!",
        songMessages: [
            "Itna maza kyun aa raha hai",
            "Tu ne hawaa mein bhaang milaaya",
            "Duguna nashaa kyun ho rahaa hai",
            "Aankhon se meethaa tu ne khilaayaa"
        ]
    },
    bengali: {
        header: "শুভ দোলযাত্রা ২০২৬!",
        message: "হোলির রঙে রাঙিয়ে তুলুন আপনার ২০২৬-এর প্রতিটি অধ্যায়। আপনার জীবন হোক রঙে রঙিন এবং শান্তিময়।",
        songMessages: [
            "রাঙিয়ে দিয়ে যাও যাও যাও গো এবার যাবার আগে",
            "তোমার আপন রাগে, তোমার গোপন রাগে",
            "তোমার তরুণ হাসির অরুণ রাগে",
            "অশ্রুজলের করুণ রাগে"
        ]
    }
};

let currentLang = null;

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

    // Prepare Song Messages
    const lyricsContainer = document.getElementById('lyrics-lines');
    lyricsContainer.innerHTML = '';

    console.log(`Displaying ${data.songMessages.length} song messages for ${lang}`);

    data.songMessages.forEach((text, index) => {
        const p = document.createElement('p');
        p.className = 'lyric-line';
        p.innerText = text;
        p.style.transitionDelay = `${index * 0.3}s`; // Slightly slower stagger for better effect
        lyricsContainer.appendChild(p);

        // Trigger animation with a slightly longer delay to ensure DOM readiness
        setTimeout(() => {
            p.classList.add('visible');
        }, 100);
    });
}

function resetSelection() {
    document.getElementById('wish-screen').classList.add('hidden');
    document.getElementById('selection-screen').classList.remove('hidden');
    document.querySelector('.background-overlay').classList.remove('active');
}
