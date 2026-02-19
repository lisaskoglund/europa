// --- Data (exakt enligt din lista) ---
const COUNTRIES = [
    { land:"Ryssland", stad:"Moskva" },
    { land:"Finland", stad:"Helsingfors" },
    { land:"Estland", stad:"Tallinn" },
    { land:"Lettland", stad:"Riga" },
    { land:"Litauen", stad:"Vilnius" },
    { land:"Belarus", stad:"Minsk" },
    { land:"Ukraina", stad:"Kiev" },
    { land:"Moldavien", stad:"Chisinàu" },
    { land:"Rumänien", stad:"Bukarest" },
    { land:"Bulgarien", stad:"Sofia" },
    { land:"Turkiet", stad:"Ankara" },
    { land:"Cypern", stad:"Nikosia" },
    { land:"Grekland", stad:"Aten" },
    { land:"Nordmakedonien", stad:"Skopje" },
    { land:"Albanien", stad:"Tirana" },
    { land:"Kosovo", stad:"Pristina" },
    { land:"Montenegro", stad:"Podgorica" },
    { land:"Serbien", stad:"Belgrad" },
    { land:"Bosnien och Hercegovina", stad:"Sarajevo" },
    { land:"Kroatien", stad:"Zagreb" },
    { land:"Ungern", stad:"Budapest" },
    { land:"Slovakien", stad:"Bratislava" },
    { land:"Tjeckien", stad:"Prag" },
    { land:"Polen", stad:"Warszawa" },
    { land:"Tyskland", stad:"Berlin" },
    { land:"Österrike", stad:"Wien" },
    { land:"Italien", stad:"Rom" },
    { land:"Malta", stad:"Valleta" },
    { land:"Schweiz", stad:"Bern" },
    { land:"Portugal", stad:"Lissabon" },
    { land:"Spanien", stad:"Madrid" },
    { land:"Frankrike", stad:"Paris" },
    { land:"Belgien", stad:"Bryssel" },
    { land:"Nederländerna", stad:"Amsterdam" },
    { land:"Storbritannien", stad:"London" },
    { land:"Irland", stad:"Dublin" },
    { land:"Danmark", stad:"Köpenhamn" },
    { land:"Sverige", stad:"Stockholm" },
    { land:"Norge", stad:"Oslo" },
    { land:"Island", stad:"Reykjavik" },
    { land:"Slovenien", stad:"Ljubljana" },
    { land:"Luxemburg", stad:"Luxemburg" },
];

// --- Users + highscore ---
const USERS = ["Elsa","Ingrid","Elektra"];
const CURRENT_USER_KEY = USER_KEY;
const HIGHSCORE_PREFIX = STORAGE_KEY;

// --- State ---
let currentUser = null;
let lastRoundMistakes = []; // { land, typed, correct, points }

// --- DOM ---
const listEl = document.getElementById("list");
const totalEl = document.getElementById("total");
const userNameEl = document.getElementById("userName");
const userName2El = document.getElementById("userName2");
const hsMiniEl = document.getElementById("hsMini");

const quizView = document.getElementById("quizView");
const quizFooter = document.getElementById("quizFooter");

const mistakesView = document.getElementById("mistakesView");
const mistakesFooter = document.getElementById("mistakesFooter");
const mistakesListEl = document.getElementById("mistakesList");
const mistakeCountEl = document.getElementById("mistakeCount");

const userBackdrop = document.getElementById("userBackdrop");
const resultBackdrop = document.getElementById("resultBackdrop");

// --- Helpers ---
function damerauLevenshtein(a, b){
    a = norm(a); b = norm(b);
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

function scoreAnswer(userAnswer, correct){
    const ua = norm(userAnswer);
    const ca = norm(correct);
    if (!ua) return { points: 0, dist: null };
    if (ua === ca) return { points: 1, dist: 0 };
    const dist = damerauLevenshtein(ua, ca);
    if (dist === 1 || dist === 2) return { points: 0.5, dist };
    return { points: 0, dist };
}

function formatScore(x){ return Number.isInteger(x) ? String(x) : String(x).replace(".", ","); }
function toPercent(score){ return Math.round((score / COUNTRIES.length) * 100); }
function formatPercent(score){ return `${toPercent(score)}%`; }

function loadCurrentUser(){
    const u = localStorage.getItem(CURRENT_USER_KEY);
    return (u && USERS.includes(u)) ? u : null;
}
function saveCurrentUser(u){ localStorage.setItem(CURRENT_USER_KEY, u); }
function hsKey(u){ return HIGHSCORE_PREFIX + u; }

function getHighscores(u){
    try{
        const raw = localStorage.getItem(hsKey(u));
        const arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? arr : [];
    } catch { return []; }
}
function setHighscores(u, arr){ localStorage.setItem(hsKey(u), JSON.stringify(arr)); }
function addScore(u, score){
    const hs = getHighscores(u);
    hs.push({ score, ts: Date.now() });
    // sort by score desc, then timestamp asc
    hs.sort((a,b) => (b.score - a.score) || (a.ts - b.ts));
    const top3 = hs.slice(0,3);
    setHighscores(u, top3);
    return top3;
}

function refreshMiniHighscore(){
    // Guard DOM ref
    if (!hsMiniEl) return;

    // If there's no selected user, show empty placeholder
    if (!currentUser){ hsMiniEl.textContent = ""; return; }

    // Try to get highscores, ensure we have an array
    let hs = [];
    try{
        const raw = getHighscores(currentUser);
        hs = Array.isArray(raw) ? raw : [];
    }catch(e){
        hs = [];
        console.error("refreshMiniHighscore: failed to load highscores", e);
    }

    // Pick top entry and validate score
    const top = hs[0];
    const hasValidScore = top && Number.isFinite(top.score);
    hsMiniEl.textContent = hasValidScore
        ? `🏅 Highscore: ${formatPercent(top.score)}`
        : "🏅 Highscore: —";
}

// --- Views ---
function showQuiz(){
    mistakesView.classList.add("hidden");
    mistakesFooter.classList.add("hidden");
    quizView.classList.remove("hidden");
    quizFooter.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showMistakes(){
    quizView.classList.add("hidden");
    quizFooter.classList.add("hidden");
    mistakesView.classList.remove("hidden");
    mistakesFooter.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetRound(){
    document.querySelectorAll("#list .row").forEach(row => {
        row.classList.remove("full","half","zero");
        row.querySelector("input").value = "";
        row.querySelector(".status").textContent = " ";
    });
    totalEl.textContent = `Total: 0 / ${COUNTRIES.length}`;
    lastRoundMistakes = [];
    correctBtn.textContent = "Rätta";
}

function scrollToInput(el){
    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
}

// --- Modals ---
function openUserModal(){ userBackdrop.style.display = "flex"; }
function closeUserModal(){ userBackdrop.style.display = "none"; }

function openResultModal(){ resultBackdrop.style.display = "flex"; }
function closeResultModalToMistakes(){
    resultBackdrop.style.display = "none";
    renderMistakesPage();
    showMistakes();
    correctBtn.textContent = "Kör igen!";
}

function setUser(u){
    currentUser = u;
    saveCurrentUser(u);

    userNameEl.textContent = u;
    userName2El.textContent = u;

    refreshMiniHighscore();
    resetRound();
    showQuiz();
}

// --- User selection click (EN gång, korrekt) ---
document.getElementById("userBadge").addEventListener("click", openUserModal);
document.getElementById("userBadge2").addEventListener("click", openUserModal);

// Close result modal ("Okej!")
const closeResultBtn = document.getElementById("closeResult");
if (closeResultBtn) closeResultBtn.addEventListener("click", closeResultModalToMistakes);

userBackdrop.addEventListener("click", (e) => {
    const btn = e.target.closest(".choiceBtn");
    if (!btn) return;
    const u = btn.dataset.user;
    if (!u) return;
    setUser(u);
    closeUserModal();
});

// --- Build quiz rows once ---
COUNTRIES.forEach((c, i) => {
    const row = document.createElement("div");
    row.className = "row";
    row.dataset.idx = i;

    const p = document.createElement("p");
    p.textContent = c.land;

    const input = document.createElement("input");
    input.type = "text";
    input.addEventListener("focus", () => scrollToInput(input));

    const status = document.createElement("div");
    status.className = "status";
    status.textContent = " ";

    row.appendChild(p);
    row.appendChild(input);
    row.appendChild(status);
    listEl.appendChild(row);
});

// --- Grade ---
const correctBtn = document.getElementById("rätta");

// --- Grade (updated click handler) ---
correctBtn.addEventListener("click", () => {
    if (correctBtn.textContent === "Rätta") {
        if (!currentUser){ openUserModal(); return; }

        let total = 0;
        lastRoundMistakes = [];

        document.querySelectorAll("#list .row").forEach(row => {
            const idx = Number(row.dataset.idx);
            const item = COUNTRIES[idx];
            const input = row.querySelector("input");
            const status = row.querySelector(".status");

            const typedRaw = input.value ?? "";
            const res = scoreAnswer(typedRaw, item.stad);
            total += res.points;

            row.classList.remove("full","half","zero");

            if (res.points === 1) {
                row.classList.add("full");
                status.textContent = "1 p ✅ (rätt)";
            } else if (res.points === 0.5) {
                row.classList.add("half");
                status.textContent = `0,5 p ⭐ (rätt: ${item.stad})`;
                lastRoundMistakes.push({ land: item.land, typed: typedRaw.trim(), correct: item.stad, points: 0.5 });
            } else {
                row.classList.add("zero");
                status.textContent = `0 p ❌ (rätt: ${item.stad})`;
                lastRoundMistakes.push({ land: item.land, typed: typedRaw.trim(), correct: item.stad, points: 0 });
            }
        });

        const max = COUNTRIES.length;
        const percent = Math.round((total / max) * 100);
        totalEl.textContent = `Total: ${formatScore(total)} / ${max}`;

        const top3 = addScore(currentUser, total);
        refreshMiniHighscore();

        let emoji;
        let extra;
        if (percent >= 90) { emoji = "🏆"; extra = "WOW! Du är en mästare! 🤩"; }
        else if (percent >= 75) { emoji = "🚀"; extra = "Superbra! Du är på topp! 😄"; }
        else if (percent >= 50) { emoji = "👏"; extra = "Bra kämpat! Du är på väg! 🙂"; }
        else { emoji = "🌟"; extra = "Bra jobbat! Öva lite till så sitter det! 😊"; }

        document.getElementById("resultEmoji").textContent = emoji;
        document.getElementById("resultUserLine").textContent = `Användare: ${currentUser}`;
        document.getElementById("resultScore").textContent = `Du fick ${formatScore(total)} / ${max} poäng.`;
        document.getElementById("resultPercent").textContent = `Det blir ${percent}% rätt.`;
        document.getElementById("resultExtra").textContent = extra;

        const hsList = document.getElementById("hsList");
        hsList.innerHTML = "";
        for (let i=0;i<3;i++){
            const li = document.createElement("li");
            li.textContent = top3[i] ? `${formatPercent(top3[i].score)}` : "—";
            hsList.appendChild(li);
        }

        correctBtn.textContent = "Kör igen!";

        openResultModal();
    } else {
        resetRound();
        showQuiz();
        const firstInput = document.querySelector("#list .row input");
        if (firstInput){
            firstInput.focus();
            scrollToInput(firstInput);
        }
    }
});

// Also add a delegated listener as a fallback in case the button element is replaced dynamically
document.addEventListener("click", (e) => {
    const btn = e.target.closest ? e.target.closest("#closeResult") : null;
    if (btn) {
        try { closeResultModalToMistakes(); } catch (err) { console.error('closeResult delegation failed', err); }
    }
});

// --- Init ---
currentUser = loadCurrentUser();
if (currentUser){
    setUser(currentUser);
} else {
    userNameEl.textContent = "Ingen vald";
    userName2El.textContent = "Ingen vald";
    showQuiz();
    resetRound();
    openUserModal();
}

