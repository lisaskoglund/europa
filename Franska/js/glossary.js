/* Franska Glosor */

// Load vocabulary from the selected week
let vocabulary = [];
let currentVocabVersion = 'arkiv/dansMaClasse';
let mode = 'fr-sv';
let currentIndex = 0;
let answers = {};
let results = [];

const app = document.getElementById('app');
const modeSelect = document.getElementById('mode');

// Läs in användarens sparade läge
modeSelect.value = mode;

// Load vocabulary data
async function loadVocabulary() {
    try {
        store = loadStore();
        renderHeader({
            title: "Glosor",
            breadcrumb: "Franska",
            back: { show: true, label: "Till Franska", href: "../index.html" },
            user: store.lastUser,
        });

        currentVocabVersion = localStorage.getItem('franskaIndexVersion') || 'arkiv/dansMaClasse';
        const module = await import(`../data/${currentVocabVersion}/vocabulary.js`);
        vocabulary = module.vocabulary;

        // Reset state
        currentIndex = 0;
        answers = {};
        results = [];

        render();
    } catch (error) {
        console.error('Failed to load vocabulary:', error);
        app.innerHTML = '<p style="color: red;">Fel vid laddning av glosor</p>';
    }
}

// Scoring function - Damerau-Levenshtein
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
    if (vocabulary.length === 0) {
        app.innerHTML = '<p>Laddar glosor...</p>';
        return;
    }

    const item = vocabulary[currentIndex];
    const progress = Math.round(((currentIndex + 1) / vocabulary.length) * 100);

    let content = '';

    if (mode === 'sv-fr') {
        // Svenska → Franska
        const swedishWord = item.swedish && item.swedish.length > 0 ? item.swedish.join(', ') : item.swedish;
        content = `
            <h2 class="mode-title">Svenska → Franska</h2>
            <p style="font-size: 18px; color: #666; margin: 20px 0;"><strong>${swedishWord}</strong></p>
            <div class="input-group">
                <div>
                    <label>Franska:</label>
                    <input type="text" id="fr" autocomplete="off" spellcheck="false" />
                </div>
            </div>
        `;
    } else if (mode === 'fr-sv') {
        // Franska → Svenska
        const frenchWord = item.french && item.french.length > 0 ? item.french.join(', ') : item.french;
        content = `
            <h2 class="mode-title">Franska → Svenska</h2>
            <p style="font-size: 18px; color: #666; margin: 20px 0;"><strong>${frenchWord}</strong></p>
            <div class="input-group">
                <div>
                    <label>Svenska:</label>
                    <input type="text" id="sv" autocomplete="off" spellcheck="false" />
                </div>
            </div>
        `;
    }

    content += `
        <div style="margin-top: 30px; display: flex; gap: 10px; justify-content: space-between;">
            <div style="display: flex; gap: 10px;">
                <button id="backBtn" class="btn ghost" ${currentIndex === 0 ? 'disabled' : ''}>⬅ Tillbaka</button>
                <button id="doneBtn" class="btn ghost">✓ Färdig</button>
            </div>
            <div style="display: flex; gap: 10px;">
                <button id="nextBtn" class="btn ${currentIndex === vocabulary.length - 1 ? '' : 'ghost'}">
                    ${currentIndex === vocabulary.length - 1 ? 'Rätta' : 'Nästa ➜'}
                </button>
            </div>
        </div>
        <p style="text-align: center; color: #999; margin-top: 20px; font-size: 14px;">
            Glosa ${currentIndex + 1} av ${vocabulary.length} (${progress}%)
        </p>
    `;

    app.innerHTML = content;

    const input = app.querySelector('input[type="text"]');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                document.getElementById('nextBtn').click();
            }
        });
        setTimeout(() => input.focus(), 50);
    }

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
        if (currentIndex === vocabulary.length - 1) {
            gradeAll();
        } else {
            currentIndex++;
            render();
        }
    });
}

function persistAnswer() {
    if (mode === 'sv-fr') {
        answers[currentIndex] = {
            fr: document.getElementById('fr').value
        };
    } else if (mode === 'fr-sv') {
        answers[currentIndex] = {
            sv: document.getElementById('sv').value
        };
    }
}

function showConfirmation() {
    persistAnswer();

    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        border-radius: 16px;
        padding: 30px;
        box-shadow: 0 10px 40px rgba(0,0,0,.2);
        max-width: 400px;
        text-align: center;
        animation: slideUp 0.3s ease;
    `;

    modal.innerHTML = `
        <h2 style="margin: 0 0 15px 0; font-size: 22px; color: #333;">Är du säker?</h2>
        <p style="margin: 0 0 25px 0; color: #666; font-size: 16px;">
            Är du säker att du vill rätta provet innan du är klar?
        </p>
        <div style="display: flex; gap: 12px; justify-content: center;">
            <button id="cancelBtn" style="
                padding: 12px 24px;
                border-radius: 10px;
                border: 2px solid #ccc;
                background: white;
                color: #333;
                font-weight: 700;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.2s ease;
            ">Avbryt</button>
            <button id="confirmBtn" style="
                padding: 12px 24px;
                border-radius: 10px;
                border: none;
                background: #2196F3;
                color: white;
                font-weight: 700;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.2s ease;
            ">Ja, rätta!</button>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    document.getElementById('cancelBtn').addEventListener('click', () => {
        overlay.remove();
    });

    document.getElementById('confirmBtn').addEventListener('click', () => {
        overlay.remove();
        gradeAll();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

function gradeAll() {
    results = [];
    let totalPoints = 0;
    let maxPoints = 0;

    vocabulary.forEach((item, idx) => {
        const ans = answers[idx] || {};
        let points = 0;
        let breakdown = [];

        if (mode === 'sv-fr') {
            const correctRaw = item.french[0]; // Assuming 1 word
            const score = scoreAnswer(ans.fr || '', correctRaw);
            points = score.points;
            maxPoints += 1;
            breakdown = [{ label: correctRaw, pts: points }];
        } else if (mode === 'fr-sv') {
            const correctRaw = item.swedish[0]; // Assuming 1 word
            const score = scoreAnswer(ans.sv || '', correctRaw);
            points = score.points;
            maxPoints += 1;
            breakdown = [{ label: correctRaw, pts: points }];
        }

        totalPoints += points;
        results.push({
            item,
            ans,
            points,
            breakdown,
            mode
        });
    });

    const pct = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

    // Save highscore
    const user = store.lastUser;
    if (user && user !== "—") {
        const key = `fr_glossary_hs_${user}_${mode}`;
        let hs = JSON.parse(localStorage.getItem(key) || "[]");
        hs.push({ pct: pct, points: totalPoints, max: maxPoints, ts: Date.now() });
        hs = hs
            .filter(s => s && typeof s.pct === 'number' && !isNaN(s.pct))
            .sort((a,b) => (b.pct - a.pct) || (b.points - a.points) || (a.ts - b.ts))
            .slice(0, 20);
        localStorage.setItem(key, JSON.stringify(hs));
    }

    showResults(totalPoints, maxPoints, pct);
    showHighscoreModal(totalPoints, maxPoints, pct);
}

function showHighscoreModal(total, max, pct) {
    const user = store.lastUser || "—";
    const key = `fr_glossary_hs_${user}_${mode}`;
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

function formatAnswer(ans, mode) {
    if (mode === 'sv-fr') {
        return ans.fr || '(tomt)';
    } else if (mode === 'fr-sv') {
        return ans.sv || '(tomt)';
    }
    return '(tomt)';
}

function showResults(total, max, pct) {
    let html = `
        <h1>Resultat</h1>
        <div style="display: flex; gap: 15px; margin-bottom: 30px;">
            <div style="padding: 15px; background: rgba(0,0,0,.05); border-radius: 10px;">
                <strong>Poäng:</strong> ${total} / ${max}
            </div>
            <div style="padding: 15px; background: rgba(0,0,0,.05); border-radius: 10px;">
                <strong>Rätt:</strong> ${pct}%
            </div>
        </div>

        <h2>Detaljerade resultat</h2>
    `;

    results.forEach((r, idx) => {
        const correctDisplay = mode === 'sv-fr'
             ? r.item.french.join(', ')
             : r.item.swedish.join(', ');

        const fromWord = mode === 'sv-fr'
             ? r.item.swedish.join(', ')
             : r.item.french.join(', ');

        const toWord = mode === 'sv-fr'
             ? r.item.french.join(', ')
             : r.item.swedish.join(', ');

        html += `
            <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px;">
                <h3>${fromWord} → ${toWord}</h3>
                <p><strong>Ditt svar:</strong> ${formatAnswer(r.ans, r.mode)}</p>
                <p><strong>Rätt svar:</strong> ${correctDisplay}</p>
                <p><strong>Poäng:</strong> ${r.points}</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-top: 10px;">
                    ${r.breakdown.map(b => `
                        <div style="padding: 8px; background: ${b.pts === 1 ? '#d4edda' : b.pts === 0.5 ? '#fff3cd' : '#f8d7da'}; border-radius: 5px;">
                            <strong>${b.label}:</strong> ${b.pts}p
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    html += `
        <div style="margin-top: 30px; display: flex; gap: 10px;">
            <button id="restartBtn" style="padding: 12px 24px; border-radius: 8px; background: #2196F3; color: white; border: none; cursor: pointer; font-weight: 700;">Kör igen</button>
            <button id="backToMenuBtn" style="padding: 12px 24px; border-radius: 8px; background: #666; color: white; border: none; cursor: pointer; font-weight: 700;">Tillbaka till meny</button>
        </div>
    `;

    app.innerHTML = html;

    document.getElementById('restartBtn').addEventListener('click', () => {
        currentIndex = 0;
        answers = {};
        results = [];
        render();
    });

    document.getElementById('backToMenuBtn').addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}

modeSelect.addEventListener('change', (e) => {
    mode = e.target.value;
    currentIndex = 0;
    answers = {};
    results = [];
    render();
});

document.addEventListener('DOMContentLoaded', () => {
    loadVocabulary();
});

