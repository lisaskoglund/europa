/* Engelska Glosor - 4 Lägen */

// Load vocabulary from the selected week
let vocabulary = [];
let currentVocabVersion = '2026-vecka-10';
let mode = 'en-sv';
let currentIndex = 0;
let answers = {};
let results = [];

const app = document.getElementById('app');
const modeSelect = document.getElementById('mode');

// Läs in användarens sparade läge
// Force default to 'en-sv', ignoring localStorage history
modeSelect.value = mode;

// Load vocabulary data
async function loadVocabulary() {
    try {
        store = loadStore();
        renderHeader({
            title: "Glosor",
            breadcrumb: "Engelska",
            back: { show: true, label: "Till Engelska", href: "../index.html" },
            user: store.lastUser,
        });

        currentVocabVersion = localStorage.getItem('englishVocabVersion') || '2026-vecka-10';
        const module = await import(`../data/${currentVocabVersion}/vocabulary.js`);
        vocabulary = module.vocabulary;

        // Check for fill-in type
        if (module.type === 'fill-in') {
            mode = 'fill-in';
            if (modeSelect && modeSelect.parentElement) {
                modeSelect.parentElement.style.display = 'none';
            }
        } else {
            if (mode === 'fill-in') mode = 'en-sv';
            if (modeSelect && modeSelect.parentElement) {
                modeSelect.parentElement.style.display = 'block';
            }
        }

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

    if (mode === 'sv-en') {
        // Svenska → Engelska
        content = `
            <h2 class="mode-title">Svenska → Engelska</h2>
            <p style="font-size: 18px; color: #666; margin: 20px 0;"><strong>${item.swedish.join(', ')}</strong></p>
            <div class="input-group">
                <div>
                    <label>Engelska 1:</label>
                    <input type="text" id="en1" />
                </div>
                <div>
                    <label>Engelska 2:</label>
                    <input type="text" id="en2" />
                </div>
            </div>
        `;
    } else if (mode === 'en-sv') {
        // Engelska → Svenska
        content = `
            <h2 class="mode-title">Engelska → Svenska</h2>
            <p style="font-size: 18px; color: #666; margin: 20px 0;"><strong>${item.english.join(', ')}</strong></p>
            <div class="input-group">
                <div>
                    <label>Svenska 1:</label>
                    <input type="text" id="sv1" />
                </div>
                <div>
                    <label>Svenska 2:</label>
                    <input type="text" id="sv2" />
                </div>
            </div>
        `;
    } else if (mode === 'audio') {
        // Ljud
        content = `
            <h2 class="mode-title">Ljud</h2>
            <p style="margin: 20px 0;">
                <button id="playBtn" style="padding: 12px 24px; font-size: 16px; border-radius: 8px; background: #4CAF50; color: white; border: none; cursor: pointer;">🔊 Spela ljud</button>
            </p>
            <div class="input-group">
                <div>
                    <label>Engelska 1:</label>
                    <input type="text" id="audio-en1" />
                </div>
                <div>
                    <label>Engelska 2:</label>
                    <input type="text" id="audio-en2" />
                </div>
                <div>
                    <label>Svenska 1:</label>
                    <input type="text" id="audio-sv1" />
                </div>
                <div>
                    <label>Svenska 2:</label>
                    <input type="text" id="audio-sv2" />
                </div>
            </div>
        `;
    } else if (mode === 'conjugate') {
        // Böj verb
        content = `
            <h2 class="mode-title">Böj verb</h2>
            <p style="font-size: 18px; color: #666; margin: 20px 0;">Nutid: <strong>${item.english[0]}</strong></p>
            <div class="input-group" style="max-width: 300px;">
                <label>Dåtid:</label>
                <input type="text" id="conj" />
            </div>
        `;
    } else if (mode === 'fill-in') {
        // Fyll i luckor
        // Ersätt underscores med input-fält
        const sentence = item.english[0].replace(/_+/g, '<input type="text" id="fill-in-ans" autocomplete="off" style="display:inline-block; width:150px; margin:0 5px; padding:4px 8px; border:1px solid #ccc; border-radius:4px; font-size:18px;" />');

        content = `
            <h2 class="mode-title">Fyll i det som saknas</h2>
            <p style="font-size: 18px; color: #666; margin: 20px 0; line-height: 2;"><strong>${sentence}</strong></p>
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

    // Restore previous answer if exists
    if (answers[currentIndex]) {
        const ans = answers[currentIndex];
        if (mode === 'sv-en' && ans.en) {
            document.getElementById('en1').value = ans.en[0] || '';
            document.getElementById('en2').value = ans.en[1] || '';
        } else if (mode === 'en-sv' && ans.sv) {
            document.getElementById('sv1').value = ans.sv[0] || '';
            document.getElementById('sv2').value = ans.sv[1] || '';
        } else if (mode === 'audio') {
            if (ans.en) {
                document.getElementById('audio-en1').value = ans.en[0] || '';
                document.getElementById('audio-en2').value = ans.en[1] || '';
            }
            if (ans.sv) {
                document.getElementById('audio-sv1').value = ans.sv[0] || '';
                document.getElementById('audio-sv2').value = ans.sv[1] || '';
            }
        } else if (mode === 'conjugate') {
             document.getElementById('conj').value = ans.conj || '';
        } else if (mode === 'fill-in') {
             document.getElementById('fill-in-ans').value = ans.ans || '';
        }
    }

    // Add Enter key listener to all inputs
    const inputs = app.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                document.getElementById('nextBtn').click();
            }
        });
    });

    // Automatically focus the first input field
    if (inputs.length > 0) {
        inputs[0].focus();
    }

    // Event listeners
    if (mode === 'audio') {
        document.getElementById('playBtn').addEventListener('click', playAudio);
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
    const item = vocabulary[currentIndex];

    if (mode === 'sv-en') {
        answers[currentIndex] = {
            en: [document.getElementById('en1').value, document.getElementById('en2').value]
        };
    } else if (mode === 'en-sv') {
        answers[currentIndex] = {
            sv: [document.getElementById('sv1').value, document.getElementById('sv2').value]
        };
    } else if (mode === 'audio') {
        answers[currentIndex] = {
            en: [document.getElementById('audio-en1').value, document.getElementById('audio-en2').value],
            sv: [document.getElementById('audio-sv1').value, document.getElementById('audio-sv2').value]
        };
    } else if (mode === 'conjugate') {
        answers[currentIndex] = {
            conj: document.getElementById('conj').value
        };
    } else if (mode === 'fill-in') {
        answers[currentIndex] = {
            ans: document.getElementById('fill-in-ans').value
        };
    }
}

function playAudio() {
    const item = vocabulary[currentIndex];
    const audioPath = `../data/${currentVocabVersion}/audio/${item.audioId}.mp3`;
    const audio = new Audio(audioPath);
    audio.play().catch(err => alert('Kunde inte spela ljud: ' + err.message));
}

function showConfirmation() {
    persistAnswer();

    // Create modal overlay
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

    // Add animation style
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

    // Event listeners
    document.getElementById('cancelBtn').addEventListener('click', () => {
        overlay.remove();
    });

    document.getElementById('confirmBtn').addEventListener('click', () => {
        overlay.remove();
        gradeAll();
    });

    // Close on overlay click
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

        if (mode === 'sv-en') {
            const en1Score = scoreAnswer(ans.en?.[0] || '', item.english[0]);
            const en2Score = scoreAnswer(ans.en?.[1] || '', item.english[1]);
            points = en1Score.points + en2Score.points;
            maxPoints += 2;
            breakdown = [
                { label: item.english[0], pts: en1Score.points },
                { label: item.english[1], pts: en2Score.points }
            ];
        } else if (mode === 'en-sv') {
            const sv1Score = scoreAnswer(ans.sv?.[0] || '', item.swedish[0]);
            const sv2Score = scoreAnswer(ans.sv?.[1] || '', item.swedish[1]);
            points = sv1Score.points + sv2Score.points;
            maxPoints += 2;
            breakdown = [
                { label: item.swedish[0], pts: sv1Score.points },
                { label: item.swedish[1], pts: sv2Score.points }
            ];
        } else if (mode === 'audio') {
            const en1Score = scoreAnswer(ans.en?.[0] || '', item.english[0]);
            const en2Score = scoreAnswer(ans.en?.[1] || '', item.english[1]);
            const sv1Score = scoreAnswer(ans.sv?.[0] || '', item.swedish[0]);
            const sv2Score = scoreAnswer(ans.sv?.[1] || '', item.swedish[1]);
            points = en1Score.points + en2Score.points + sv1Score.points + sv2Score.points;
            maxPoints += 4;
            breakdown = [
                { label: item.english[0], pts: en1Score.points },
                { label: item.english[1], pts: en2Score.points },
                { label: item.swedish[0], pts: sv1Score.points },
                { label: item.swedish[1], pts: sv2Score.points }
            ];
        } else if (mode === 'conjugate') {
            const conjScore = scoreAnswer(ans.conj || '', item.english[1]); // english[1] is past tense
            points = conjScore.points;
            maxPoints += 1;
            breakdown = [{ label: 'Dåtid', pts: conjScore.points }];
        } else if (mode === 'fill-in') {
            const score = scoreAnswer(ans.ans || '', item.swedish[0]);
            points = score.points;
            maxPoints += 1;
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
        const key = `glossary_hs_${user}_${mode}`;
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
    const key = `glossary_hs_${user}_${mode}`;
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
    if (mode === 'en-sv' || mode === 'sv-en') {
        const pair = ans.sv || ans.en || [];
        return pair.join(', ') || '(tomt)';
    } else if (mode === 'audio') {
        const en = (ans.en || []).join(', ') || '(tomt)';
        const sv = (ans.sv || []).join(', ') || '(tomt)';
        return `${en} / ${sv}`;
    } else if (mode === 'conjugate') {
        return ans.conj || '(tomt)';
    } else if (mode === 'fill-in') {
        return ans.ans || '(tomt)';
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
        let correctDisplay = '';
        if (mode === 'en-sv' || mode === 'sv-en' || mode === 'audio') {
            correctDisplay = r.item.english.join(', ') + ' / ' + r.item.swedish.join(', ');
        } else if (mode === 'conjugate') {
            correctDisplay = r.item.english[1];
        } else if (mode === 'fill-in') {
            correctDisplay = r.item.swedish[0];
        }

        let questionTitle = r.mode === 'fill-in'
            ? r.item.english[0]
            : `${r.item.english[0]} ${r.item.english[1] ? '→ ' + r.item.english[1] : ''}`;

        html += `
            <div style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px;">
                <h3>${questionTitle}</h3>
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

// Mode change handler
modeSelect.addEventListener('change', (e) => {
    mode = e.target.value;
    // No longer saving to localStorage
    currentIndex = 0;
    answers = {};
    results = [];
    render();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadVocabulary();
});
