/* Engelska Substantiv Plural */

let nouns = [];
let currentIndex = 0;
let answers = {};
let results = [];

const app = document.getElementById('app');

// Init store
store = loadStore();

async function loadNouns() {
    try {
        store = loadStore();
        renderHeader({
            title: "Substantiv Plural",
            breadcrumb: "Engelska",
            back: { show: true, label: "Till Engelska", href: "../index.html" },
            user: store.lastUser,
        });

        const vocabVersion = localStorage.getItem('englishVocabVersion') || '2026-vecka-10';
        const module = await import(`../data/${vocabVersion}/nouns.js`);
        nouns = module.nouns;

        currentIndex = 0;
        answers = {};
        results = [];

        render();
    } catch (error) {
        console.error('Failed to load nouns:', error);
        app.innerHTML = '<p style="color: red;">Fel vid laddning av substantiv</p>';
    }
}

function norm(s) {
    return (s || '').toLowerCase().trim()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function damerauLevenshtein(a, b) {
    a = norm(a);
    b = norm(b);
    const alen = a.length, blen = b.length;
    if (!alen) return blen;
    if (!blen) return alen;

    const dp = Array.from({length: alen+1}, ()=> Array(blen+1).fill(0));
    for (let i=0;i<=alen;i++) dp[i][0]=i;
    for (let j=0;j<=blen;j++) dp[0][j]=j;

    for (let i=1;i<=alen;i++){
        for (let j=1;j<=blen;j++){
            const cost = a[i-1]===b[j-1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + cost);
            if (i>1 && j>1 && a[i-1]===b[j-2] && a[i-2]===b[j-1]){
                dp[i][j] = Math.min(dp[i][j], dp[i-2][j-2] + cost);
            }
        }
    }
    return dp[alen][blen];
}

function scoreAnswer(userAnswer, correct) {
    const ua = norm(userAnswer);
    const ca = norm(correct);
    if (!ua) return { points: 0, dist: null };
    if (ua === ca) return { points: 1, dist: 0 };
    const dist = damerauLevenshtein(ua, ca);
    if (dist === 1 || dist === 2) return { points: 0.5, dist };
    return { points: 0, dist };
}

function render() {
    if (nouns.length === 0) {
        app.innerHTML = '<p>Laddar substantiv...</p>';
        return;
    }

    const item = nouns[currentIndex];
    const progress = Math.round(((currentIndex + 1) / nouns.length) * 100);

    let content = `
        <h2 class="mode-title">Substantiv i plural</h2>
        <p style="font-size: 18px; color: #666; margin: 20px 0;">Singular: <strong>${item.singular}</strong></p>
        <div class="input-group" style="max-width: 300px;">
            <label>Plural:</label>
            <input type="text" id="plural" />
        </div>
    `;

    content += `
        <div style="margin-top: 30px; display: flex; gap: 10px; justify-content: space-between;">
            <div style="display: flex; gap: 10px;">
                <button id="backBtn" class="btn ghost" ${currentIndex === 0 ? 'disabled' : ''}>⬅ Tillbaka</button>
                <button id="doneBtn" class="btn ghost">✓ Färdig</button>
            </div>
            <div style="display: flex; gap: 10px;">
                <button id="nextBtn" class="btn ${currentIndex === nouns.length - 1 ? '' : 'ghost'}">
                    ${currentIndex === nouns.length - 1 ? 'Rätta' : 'Nästa ➜'}
                </button>
            </div>
        </div>
        <p style="text-align: center; color: #999; margin-top: 20px; font-size: 14px;">
            Substantiv ${currentIndex + 1} av ${nouns.length} (${progress}%)
        </p>
    `;

    app.innerHTML = content;

    const input = app.querySelector('input[type="text"]');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('nextBtn').click();
        }
    });
    input.focus();

    document.getElementById('backBtn').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            render();
        }
    });

    document.getElementById('doneBtn').addEventListener('click', () => {
        showConfirmation();
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        persistAnswer();
        if (currentIndex === nouns.length - 1) {
            gradeAll();
        } else {
            currentIndex++;
            render();
        }
    });
}

function persistAnswer() {
    answers[currentIndex] = {
        plural: document.getElementById('plural').value
    };
}

function showConfirmation() {
    persistAnswer();

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,.4); display: flex; align-items: center; justify-content: center; z-index: 1000;';

    const modal = document.createElement('div');
    modal.style.cssText = 'background: white; border-radius: 16px; padding: 30px; box-shadow: 0 10px 40px rgba(0,0,0,.2); max-width: 400px; text-align: center; animation: slideUp 0.3s ease;';

    modal.innerHTML = `
        <h2 style="margin: 0 0 15px 0; font-size: 22px; color: #333;">Är du säker?</h2>
        <p style="margin: 0 0 25px 0; color: #666; font-size: 16px;">
            Är du säker att du vill rätta provet innan du är klar?
        </p>
        <div style="display: flex; gap: 12px; justify-content: center;">
            <button id="cancelBtn" style="padding: 12px 24px; border-radius: 10px; border: 2px solid #ccc; background: white; color: #333; font-weight: 700; font-size: 16px; cursor: pointer; transition: all 0.2s ease;">Avbryt</button>
            <button id="confirmBtn" style="padding: 12px 24px; border-radius: 10px; border: none; background: #2196F3; color: white; font-weight: 700; font-size: 16px; cursor: pointer; transition: all 0.2s ease;">Ja, rätta!</button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById('cancelBtn').addEventListener('click', () => {
        overlay.remove();
    });

    document.getElementById('confirmBtn').addEventListener('click', () => {
        overlay.remove();
        gradeAll();
    });
}

function gradeAll() {
    results = [];
    let totalPoints = 0;
    let maxPoints = 0;

    for (let i = 0; i < nouns.length; i++) {
        const item = nouns[i];
        const userAnswer = answers[i] ? answers[i].plural : '';
        const { points, dist } = scoreAnswer(userAnswer, item.plural);

        results.push({
            item,
            userAnswer,
            points,
            dist
        });

        totalPoints += points;
        maxPoints++;
    }

    const finalScore = (totalPoints / maxPoints);

    // Save highscore
    const user = store.lastUser;
    const pct = Math.round(finalScore * 100);
    if (user && user !== "—") {
        const key = `nouns_plural_hs_${user}`;
        let hs = JSON.parse(localStorage.getItem(key) || "[]");
        hs.push({ pct: pct, points: totalPoints, max: maxPoints, ts: Date.now() });
        hs = hs
            .filter(s => s && typeof s.pct === 'number' && !isNaN(s.pct))
            .sort((a,b) => b.pct - a.pct || b.points - a.points || b.ts - a.ts)
            .slice(0, 20);
        localStorage.setItem(key, JSON.stringify(hs));
    }

    renderResults();
    showHighscoreModal(totalPoints, maxPoints, pct);
}

function showHighscoreModal(total, max, pct) {
    const user = store.lastUser || "—";
    const key = `nouns_plural_hs_${user}`;
    const raw = JSON.parse(localStorage.getItem(key) || "[]");
    const top3 = raw.filter(s => s && typeof s.pct === 'number' && !isNaN(s.pct)).slice(0, 3);

    let emoji;
    let extra;
    if (pct >= 90) { emoji = "🏆"; extra = "WOW! Du är en mästare! 🤩"; }
    else if (pct >= 75) { emoji = "🚀"; extra = "Superbra! Du är på topp! 😄"; }
    else if (pct >= 50) { emoji = "👏"; extra = "Bra kämpat! Du är på väg! 🙂"; }
    else { emoji = "🌟"; extra = "Bra jobbat! Öva lite till så sitter det! 😊"; }

    document.getElementById("resultEmoji").textContent = emoji;
    document.getElementById("resultUserLine").textContent = `Användare: ${escapeHtml(user)}`;
    document.getElementById("resultScore").textContent = `Du fick ${total} / ${max} poäng.`;
    document.getElementById("resultPercent").textContent = `Det blir ${pct}% rätt.`;

    const extraEl = document.getElementById("resultExtra");
    if (extraEl) extraEl.textContent = extra;

    const hsList = document.getElementById("hsList");
    hsList.innerHTML = "";
    for (let i = 0; i < 3; i++){
        const li = document.createElement("li");
        if (top3[i]) {
            li.innerHTML = `<b>${top3[i].pct}%</b> (${top3[i].points}/${top3[i].max})`;
        } else {
            li.textContent = "—";
        }
        hsList.appendChild(li);
    }

    const modal = document.getElementById("resultBackdrop");
    modal.style.display = "flex";

    document.getElementById("closeResult").onclick = () => {
        modal.style.display = "none";
    };
}

function renderResults() {
    let resultHtml = '<h2>Resultat</h2>';
    resultHtml += '<ul style="list-style: none; padding: 0;">';

    results.forEach(({ item, userAnswer, points, dist }) => {
        let feedback = '';
        if (points === 1) {
            feedback = '<span style="color: green;">✓ Rätt</span>';
        } else if (points === 0.5) {
            feedback = `<span style="color: orange;">~ Nästan rätt (stavfel, ${dist})</span>`;
        } else {
            feedback = '<span style="color: red;">✗ Fel</span>';
        }

        resultHtml += `
            <li style="margin-bottom: 15px; padding: 10px; border: 1px solid #eee; border-radius: 8px;">
                <div><strong>Singular:</strong> ${item.singular}</div>
                <div><strong>Rätt svar:</strong> ${item.plural}</div>
                <div><strong>Ditt svar:</strong> ${userAnswer || 'Inget svar'}</div>
                <div><strong>Poäng:</strong> ${feedback}</div>
            </li>
        `;
    });

    resultHtml += '</ul>';
    const finalScore = results.reduce((acc, r) => acc + r.points, 0) / results.length;
    resultHtml += `<p style="font-size: 20px; font-weight: bold;">Slutpoäng: ${formatPercent(finalScore)}</p>`;
    resultHtml += '<button id="restartBtn" class="btn">Kör igen</button>';

    app.innerHTML = resultHtml;

    document.getElementById('restartBtn').addEventListener('click', () => {
        currentIndex = 0;
        answers = {};
        results = [];
        render();
    });
}

function formatPercent(p) {
    return `${Math.round(p * 100)}%`;
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    loadNouns();
});
