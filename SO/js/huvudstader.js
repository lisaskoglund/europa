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

// --- State ---
let lastRoundMistakes = []; // { land, typed, correct, points }

// --- DOM ---
const listEl = document.getElementById("list");
const totalEl = document.getElementById("total");
const quizView = document.getElementById("quizView");
const quizFooter = document.getElementById("quizFooter");
const mistakesView = document.getElementById("mistakesView");
const mistakesFooter = document.getElementById("mistakesFooter");
const mistakesListEl = document.getElementById("mistakesList");
const mistakeCountEl = document.getElementById("mistakeCount");
const userBackdrop = document.getElementById("userBackdrop");
const resultBackdrop = document.getElementById("resultBackdrop");
const correctBtn = document.getElementById("rätta");

// --- Helpers ---
function scoreAnswer(userAnswer, correct){
    const ua = norm(userAnswer);
    const ca = norm(correct);
    if (!ua) return { points: 0, dist: null };
    if (ua === ca) return { points: 1, dist: 0 };
    const dist = levenshtein(ua, ca);
    if (dist === 1 || dist === 2) return { points: 0.5, dist };
    return { points: 0, dist };
}

function formatScore(x){ return Number.isInteger(x) ? String(x) : String(x).replace(".", ","); }
function toPercent(score){ return Math.round((score / COUNTRIES.length) * 100); }
function formatPercent(score){ return `${toPercent(score)}%`; }

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

function openResultModal(){
    resultBackdrop.style.display = "flex"}
function closeResultModalToMistakes(){
    resultBackdrop.style.display = "none";
    renderMistakesPage();
    showMistakes();
    correctBtn.textContent = "Kör igen!";
}

function setUser(u){
    store.lastUser = u;
    saveStore(store);
    renderHeader({
        title: "Huvudstäder",
        breadcrumb: "SO",
        //back: { show: true, label: "Till SO", href: "../index.html" },
        user: store.lastUser,
    });
    resetRound();
    showQuiz();
}

function renderQuestions() {
    listEl.innerHTML = "";
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
}

function renderMistakesPage() {
    mistakesListEl.innerHTML = "";
    mistakeCountEl.textContent = `Du hade ${lastRoundMistakes.length} fel.`;
    lastRoundMistakes.forEach(item => {
        const row = document.createElement("div");
        row.className = "row " + (item.points === 0.5 ? "half" : "zero");

        const p = document.createElement("p");
        p.textContent = item.land;

        const input = document.createElement("input");
        input.type = "text";
        input.value = item.typed || "";
        input.disabled = true;

        const status = document.createElement("div");
        status.className = "status";
        if (item.points === 0.5) {
            status.textContent = `0,5 p ⭐ (rätt: ${item.correct})`;
        } else {
            status.textContent = `0 p ❌ (rätt: ${item.correct})`;
        }

        row.appendChild(p);
        row.appendChild(input);
        row.appendChild(status);
        mistakesListEl.appendChild(row);
    });
}

function bindEvents() {
    const closeResultBtn = document.getElementById("closeResult");
    if (closeResultBtn) closeResultBtn.addEventListener("click", closeResultModalToMistakes);


    const mistakesRestartBtn = document.getElementById("mistakesRestartBtn");
    if (mistakesRestartBtn) mistakesRestartBtn.addEventListener("click", () => {
        resetRound();
        showQuiz();
        const firstInput = document.querySelector("#list .row input");
        if (firstInput){ firstInput.focus(); scrollToInput(firstInput); }
    });

    userBackdrop.addEventListener("click", (e) => {
        const btn = e.target.closest(".choiceBtn");
        if (!btn) return;
        const u = btn.dataset.user;
        if (!u) return;
        setUser(u);
        closeUserModal();
    });

    correctBtn.addEventListener("click", () => {
        if (correctBtn.textContent === "Rätta") {
            if (!store.lastUser){ openUserModal(); return; }

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

            // Highscore logic using huvudstäder-specific key
            const user = store.lastUser;
            const hsKey = `huvudstader_hs_${user}`;
            let hs = JSON.parse(localStorage.getItem(hsKey) || "[]");
            hs.push({ pct: percent, points: total, max: max, ts: Date.now() });
            hs = hs
                .filter(s => s && typeof s.pct === 'number' && !isNaN(s.pct))
                .sort((a,b) => (b.pct - a.pct) || (b.points - a.points) || (a.ts - b.ts))
                .slice(0, 20);
            localStorage.setItem(hsKey, JSON.stringify(hs));

            let emoji;
            let extra;
            if (percent >= 90) { emoji = "🏆"; extra = "WOW! Du är en mästare! 🤩"; }
            else if (percent >= 75) { emoji = "🚀"; extra = "Superbra! Du är på topp! 😄"; }
            else if (percent >= 50) { emoji = "👏"; extra = "Bra kämpat! Du är på väg! 🙂"; }
            else { emoji = "🌟"; extra = "Bra jobbat! Öva lite till så sitter det! 😊"; }

            document.getElementById("resultEmoji").textContent = emoji;
            document.getElementById("resultUserLine").textContent = `Användare: ${user}`;
            document.getElementById("resultScore").textContent = `Du fick ${formatScore(total)} / ${max} poäng.`;
            document.getElementById("resultPercent").textContent = `Det blir ${percent}% rätt.`;
            document.getElementById("resultExtra").textContent = extra;

            const hsList = document.getElementById("hsList");
            hsList.innerHTML = "";
            const raw = JSON.parse(localStorage.getItem(hsKey) || "[]");
            const top3 = raw.filter(s => s && typeof s.pct === 'number' && !isNaN(s.pct)).slice(0, 3);
            for (let i = 0; i < 3; i++){
                const li = document.createElement("li");
                if (top3[i]) {
                    li.textContent = `${top3[i].pct}% (${formatScore(top3[i].points)}/${top3[i].max})`;
                } else {
                    li.textContent = "—";
                }
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
}

function init() {
    store = loadStore();
    renderHeader({
        title: "Huvudstäder",
        breadcrumb: "SO",
        back: { show: true, label: "Till SO", href: "../index.html" },
        user: store.lastUser,
    });
    renderQuestions();
    bindEvents();
    if (!store.lastUser) {
        openUserModal();
    }
}

init();
