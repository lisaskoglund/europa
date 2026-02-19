/* =========================
   Instudering specific logic
========================= */

// ===== DYNAMIC DATA LOADING =====
// Get exam version from localStorage or default to latest
const EXAM_VERSION = localStorage.getItem('examVersion') || '2026-februari';

let PRESETS = {};
let questions = [];

async function loadExamData() {
  try {
    // Import data dynamically based on exam version
    const presetsModule = await import(`../data/${EXAM_VERSION}/presets.js`);
    const questionsModule = await import(`../data/${EXAM_VERSION}/questions.js`);

    PRESETS = presetsModule.PRESETS;
    questions = questionsModule.questions;

    // Initialize the quiz after data is loaded
    initializeApp();
  } catch (error) {
    console.error('Failed to load exam data:', error);
    document.getElementById('app').innerHTML = `
      <div style="padding: 20px; color: red;">
        <h2>Fel vid laddning</h2>
        <p>Kunde inte ladda provdata för version: ${EXAM_VERSION}</p>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// =====  ORIGINAL CODE BELOW =====
// (PRESETS and questions will be set by loadExamData() above)


function initQuiz(){
  const rng = Math.random;
  return questions.map(q=>{
    const qq = deepClone(q);
    if(qq.type==="mcq"){
      qq.shuffled = shuffle(qq.options, rng);
    }
    return qq;
  });
}

function questionMaxPoints(q){
  if(q.type==="mcq") return 1;
  if(q.type==="singleText") return q.points ?? 1;
  if(q.type==="listText") return (q.pointsEach ?? 1) * (q.count ?? 1);
  if(q.type==="multiText") return (q.pointsEach ?? 1) * (q.prompts?.length ?? (q.allow ? q.allow.length : 1));
  if(q.type==="freeKeywords") return q.maxPoints ?? q.keywords?.length ?? 0;
  return 1;
}

function grade(){
  const rows = [];
  let total = 0;
  let max = 0;

  for(const q of quiz){
    const maxP = questionMaxPoints(q);
    max += maxP;

    const user = answers[q.id];
    const res = gradeQuestion(q, user);
    total += res.points;
    rows.push({...res, q, user, maxPoints:maxP});
  }

  total = Math.round(total*2)/2; // keep .5
  const pct = max>0 ? Math.round((total/max)*100) : 0;

  return {rows, total, max, pct};
}

function gradeQuestion(q, user){
  if(q.type==="mcq"){
    const ok = (user ?? "") === q.correct;
    return {
      points: ok ? 1 : 0,
      breakdown: ok ? [{label:"Rätt", pts:1}] : [{label:"Fel", pts:0}],
      correctDisplay: q.correct,
      userDisplay: user || "—"
    };
  }

  if(q.type==="singleText"){
    const v = (user ?? "");
    if("exact" in q){
      const exact = q.exact.toString();

      let pts;
      if(norm(v) === norm(exact)) pts = q.points ?? 1;
      else{
        const p = keywordScore(v, exact);
        pts = (p===0.5 ? 0.5 : 0);
      }
      return {
        points: pts,
        breakdown: [{label:"Svar", pts}],
        correctDisplay: exact,
        userDisplay: v || "—"
      };
    }
  }

  if(q.type==="multiText"){
    const arr = Array.isArray(user) ? user : [];
    const prompts = q.prompts ?? (Array.isArray(q.allow) ? Array.from({length: q.allow.length}, (_,i)=>`Svar ${i+1}`) : []);
    const used = new Set();
    let pts = 0;
    const b = [];

    for(let i=0;i<prompts.length;i++){
      const v = arr[i] ?? "";
      let best = {points:0, matched:null, level:"none"};

      for(const item of (q.allow || [])){
        const key = JSON.stringify(item);
        if(q.unique && used.has(key)) continue;

        const r = scoreFromAllowList(v, [item]);
        if(r.points > best.points){
          best = r;
          best._key = key;
        }
        if(best.points===1) break;
      }

      if(best.points>0 && q.unique && best._key) used.add(best._key);

      pts += best.points * (q.pointsEach ?? 1);
      b.push({label:`${prompts[i]}`, pts: best.points, detail: best.matched});
    }

    pts = Math.round(pts*2)/2;
    return {
      points: pts,
      breakdown: b,
      correctDisplay: "Se lista",
      userDisplay: arr.map(x=>x||"—").join(" · ")
    };
  }

  if(q.type==="listText"){
    const arr = Array.isArray(user) ? user : [];
    const used = new Set();
    let pts = 0;
    const b = [];

    for(let i=0;i<q.count;i++){
      const v = arr[i] ?? "";
      let best = {points:0, matched:null, level:"none"};

      for(const item of q.allowList){
        const key = JSON.stringify(item);
        if(q.unique && used.has(key)) continue;

        const r = scoreFromAllowList(v, [item]);
        if(r.points > best.points){
          best = r;
          best._key = key;
        }
        if(best.points===1) break;
      }

      if(best.points>0 && q.unique && best._key) used.add(best._key);

      pts += best.points * (q.pointsEach ?? 1);
      b.push({label:`Svar ${i+1}`, pts: best.points, detail: best.matched});
    }

    pts = Math.round(pts*2)/2;
    return {
      points: pts,
      breakdown: b,
      correctDisplay: "Se lista",
      userDisplay: arr.map(x=>x||"—").join(" · ")
    };
  }

  if(q.type==="freeKeywords"){
    const txt = user ?? "";
    const maxP = q.maxPoints ?? 0;
    const kw = q.keywords ?? [];
    let sum = 0;
    const b = [];
    for(const k of kw){
      const p = keywordScore(txt, k);
      if(p>0){
        sum += p;
        b.push({label:k, pts:p});
      }
    }
    sum = clamp(sum, 0, maxP);
    sum = Math.round(sum*2)/2;
    return {
      points: sum,
      breakdown: b.length ? b : [{label:"Inga nyckelord hittades", pts:0}],
      correctDisplay: `Nyckelord (max ${maxP}p): ${kw.join(", ")}`,
      userDisplay: (txt.trim() ? txt.trim() : "—")
    };
  }

  return {points:0, breakdown:[{label:"—", pts:0}], correctDisplay:"", userDisplay:(user||"—")};
}

// App state
let store = loadStore();
let quiz = null;
let idx = 0;
let answers = {};
let phase = "start";

const app = document.getElementById("app");

function initializeApp() {
  // Initialize app after data is loaded
  render();
}

function render(){
  if(phase==="start") return renderStart();
  if(phase==="quiz") return renderQuestion();
  return renderResults();
}

function renderStart(){
  const userInfoEl = document.querySelector('.user-info');
  if (userInfoEl) {
    userInfoEl.innerHTML = `
      <div class="pill">Användare: <b>${escapeHtml(store.lastUser || "—")}</b></div>
    `;
  }

  app.innerHTML = `
    <h1>Europa – träningsprov (åk 5)</h1>
    <p>En fråga i taget. Du kan gå <b>fram</b> och <b>bak</b>. Rättning sker <b>bara i slutet</b>.</p>
    <p>Rättning: exakt = 1p, stavfel = 0,5p</p>
    <div class="hr"></div>

    <div class="start-grid">
        <div class="leaderboard">
            <div class="hsMini" id="hsMini"></div>
        </div>
    </div>

    <div class="footerBtns">
      <button class="btn" id="startBtn">Starta ▶</button>
    </div>
  `;

  refreshMiniHighscore();

  document.getElementById("startBtn").onclick = ()=>{
    if(!store.lastUser){
      alert("Välj en användare på startsidan först 🙂");
      return;
    }
    quiz = initQuiz();
    idx = 0;
    answers = {};
    phase = "quiz";
    render();
  };
}

function renderQuestion(){
  const q = quiz[idx];
  const max = quiz.length;
  const progressPct = Math.round(((idx+1) / max) * 100);

  const backDisabled = idx===0;
  const isLast = idx === max-1;

  const head = `
    <div class="row" style="justify-content:space-between;">
      <div class="pill">Användare: <b>${escapeHtml(store.lastUser||"—")}</b></div>
      <div class="pill">Fråga <b>${idx+1}</b> av <b>${max}</b></div>
    </div>
    <div class="spacer"></div>
    <div class="progress" aria-label="progress"><div style="width:${progressPct}%"></div></div>
    <div class="spacer"></div>
    <div class="row" style="justify-content:space-between;">
      <span class="tag">${escapeHtml(q.topic || "Fråga")}</span>
      <span class="tag">Poäng: <b>${questionMaxPoints(q)}</b></span>
    </div>
    <div class="spacer"></div>
    <div class="qtext">${escapeHtml(q.text)}</div>
    ${q.note ? `<p class="hint">💡 ${escapeHtml(q.note)}</p>` : ``}
  `;

  let body = "";
  if(q.type==="mcq"){
    const current = answers[q.id] ?? "";
    body = `
      <div class="grid" role="radiogroup" aria-label="svarsalternativ">
        ${q.shuffled.map((opt)=>`
          <label class="choice">
            <input type="radio" name="mcq" value="${escapeAttr(opt)}" ${current===opt?"checked":""}/>
            <div>${escapeHtml(opt)}</div>
          </label>
        `).join("")}
      </div>
    `;
  }else if(q.type==="listText"){
    const arr = answers[q.id] ?? Array.from({length:q.count}, ()=>"");
    body = `
      <div class="grid">
        ${arr.map((v,i)=>`
          <input type="text" data-i="${i}" placeholder="Svar ${i+1}…" value="${escapeAttr(v)}" />
        `).join("")}
      </div>
      <p class="hint">Tips: du får poäng per rätt svar. Stavfel ger ofta <b>0,5p</b>.</p>
    `;
  }else if(q.type==="multiText"){
    const prompts = q.prompts ?? (Array.isArray(q.allow) ? Array.from({length: q.allow.length}, (_,i)=>`Svar ${i+1}`) : []);
    const arr = answers[q.id] ?? Array.from({length: prompts.length}, ()=>"");
    body = `
      <div class="grid">
        ${prompts.map((p,i)=>`
          <div>
            ${p ? `<div class="hint" style="margin-bottom:6px;">${escapeHtml(p)}</div>` : ``}
            <input type="text" data-i="${i}" placeholder="Skriv här…" value="${escapeAttr(arr[i]||"")}" />
          </div>
        `).join("")}
      </div>
    `;
  }else if(q.type==="freeKeywords"){
    const v = answers[q.id] ?? "";
    body = `
      <textarea id="freeText" placeholder="Skriv ditt svar här…">${escapeHtml(v)}</textarea>
      <p class="hint">Poäng ges för nyckelord. Delord räknas. Små stavfel ger ofta <b>0,5p</b>.</p>
    `;
  }else if(q.type==="singleText"){
    const v = answers[q.id] ?? "";
    body = `
      <input id="singleText" type="text" placeholder="Skriv ditt svar…" value="${escapeAttr(v)}" />
      <p class="hint">Exakt rätt = 1p. Litet stavfel kan ge 0,5p.</p>
    `;
  }

  const foot = `
    <div class="hr"></div>
    <div class="footerBtns">
      <button class="btn ghost" id="backBtn" ${backDisabled?"disabled":""}>⬅ Tillbaka</button>

      <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end;">
        <button class="${isLast ? "btn" : "btn ghost"}" id="gradeBtn">Rätta</button>
        ${isLast ? `` : `<button class="btn" id="nextBtn">Nästa ➜</button>`}
      </div>
    </div>
  `;

  app.innerHTML = head + body + foot;

  // wire inputs
  if(q.type==="mcq"){
    app.querySelectorAll('input[type="radio"][name="mcq"]').forEach(r=>{
      r.addEventListener("change", ()=>{
        answers[q.id] = r.value;
      });
    });
  }else if(q.type==="listText" || q.type==="multiText"){
    const count = (q.type==="listText")
      ? (q.count ?? 0)
      : (q.prompts?.length ?? (Array.isArray(q.allow) ? q.allow.length : 0));
    const arr = answers[q.id] ?? Array.from({length:Math.max(0,count)}, ()=>"");
    app.querySelectorAll('input[type="text"][data-i]').forEach(inp=>{
      inp.addEventListener("input", ()=>{
        const i = Number(inp.getAttribute("data-i"));
        arr[i] = inp.value;
        answers[q.id] = arr;
      });
    });
  }else if(q.type==="freeKeywords"){
    const ta = document.getElementById("freeText");
    ta.addEventListener("input", ()=>{ answers[q.id] = ta.value; });
  }else if(q.type==="singleText"){
    const inp = document.getElementById("singleText");
    inp.addEventListener("input", ()=>{ answers[q.id] = inp.value; });
  }

  document.getElementById("backBtn").onclick = ()=>{
    persistCurrent(q);
    if(idx>0){ idx--; render(); }
  };

  const gradeBtn = document.getElementById("gradeBtn");
  const nextBtn = document.getElementById("nextBtn");

  gradeBtn.onclick = ()=>{
    persistCurrent(q);
    if(!isLast){
      const ok = confirm("Är du säker att du vill rätta redan?");
      if(!ok) return;
    }
    phase = "results";
    render();
  };

  if(nextBtn){
    nextBtn.onclick = ()=>{
      persistCurrent(q);
      idx++;
      render();
    };
  }
}

function persistCurrent(q){
  // inputs already update answers, but keep hook for future
}

function renderResults(){
  const g = grade();
  const user = store.lastUser || "—";

  // save highscore
  if(user && user !== "—"){
    store.highscores[user] = store.highscores[user] || [];
    store.highscores[user].push({pct:g.pct, points:g.total, max:g.max, ts: Date.now()});
    store.highscores[user] = store.highscores[user]
        .sort((a,b)=> b.pct - a.pct || b.points - a.points || b.ts - a.ts)
        .slice(0, 20);
    saveStore(store);
  }

  const top5 = (store.highscores[user] || []).slice(0,5);

  app.innerHTML = `
    <h1>Resultat</h1>
    <div class="scoreLine">
      <span class="pill">Användare: <b>${escapeHtml(user)}</b></span>
      <span class="pill">Poäng: <b>${g.total}</b> / <b>${g.max}</b></span>
      <span class="pill">Rätt: <b>${g.pct}%</b></span>
    </div>

    <div class="hr"></div>

    <h2>Alla svar</h2>
    <p>Här ser du vad du svarade, samt hur rättningen blev.</p>

    <div class="resultsList">
      ${g.rows.map((r, i)=> renderResultItem(r, i)).join("")}
    </div>

    <div class="hr"></div>

    <h2>Highscore (topp 5 för ${escapeHtml(user)})</h2>
    ${top5.length ? `
      <div class="leaderboard">
        <ol>
          ${top5.map(s=>`<li><b>${s.pct}%</b> (${s.points}/${s.max})</li>`).join("")}
        </ol>
      </div>
    ` : `<p class="muted">Inga highscores än.</p>`}

    <div class="footerBtns">
      <button class="btn ghost" id="toStartBtn">Byt användare</button>
      <button class="btn" id="restartBtn">Kör igen</button>
    </div>
  `;

  refreshMiniHighscore();

  document.getElementById("restartBtn").onclick = ()=>{
    quiz = initQuiz();
    idx = 0;
    answers = {};
    phase = "quiz";
    render();
  };
  document.getElementById("toStartBtn").onclick = ()=>{
    window.location.href = "../../index.html";
  };
}

function renderResultItem(r, i){
  const pts = r.points;
  const maxP = r.maxPoints;
  const tagClass = pts===maxP ? "good" : (pts===0 ? "bad" : "warn");
  const tagText = pts===maxP ? "Rätt" : (pts===0 ? "Fel" : "Delvis");
  const breakdown = (r.breakdown || [])
      .filter(x=>x && typeof x.pts !== "undefined")
      .slice(0, 8)
      .map(x=>`<span class="tag ${x.pts===1?"good":(x.pts===0?"bad":"warn")}">${escapeHtml(x.label)}: <b>${x.pts}</b></span>`)
      .join(" ");

  const showCorrect = pts < maxP;

  const correctExtra = (r.q.type==="mcq")
      ? (showCorrect ? `<div class="corr"><b>Rätt svar:</b> ${escapeHtml(r.correctDisplay)}</div>` : ``)
      : (r.q.type==="freeKeywords"
              ? `<div class="corr"><b>Nyckelord:</b> ${escapeHtml(r.q.keywords.join(", "))} (max ${questionMaxPoints(r.q)}p)</div>`
              : (r.q.type==="singleText" ? (showCorrect ? `<div class="corr"><b>Rätt svar:</b> ${escapeHtml(r.correctDisplay)}</div>` : ``) : ``)
      );

  return `
    <div class="resultItem">
      <div class="row" style="justify-content:space-between;">
        <h3>${i+1}. ${escapeHtml(r.q.text)}</h3>
        <span class="tag ${tagClass}">${tagText} • <b>${pts}</b> / <b>${maxP}</b></span>
      </div>
      <div class="ans"><b>Ditt svar:</b> ${escapeHtml(r.userDisplay || "—")}</div>
      ${correctExtra}
      ${breakdown ? `<div class="row" style="margin-top:10px; gap:8px;">${breakdown}</div>` : ``}
    </div>
  `;
}

function getHighscores(user){
  if(!user) return [];
  return (store.highscores && store.highscores[user]) || [];
}

function refreshMiniHighscore(){
    const hsMiniEl = document.getElementById("hsMini");
    if (!store.lastUser || !hsMiniEl){ return; }
    const userScores = getHighscores(store.lastUser);

    const top3 = userScores.slice(0, 3);
    while (top3.length < 3) {
        top3.push(null);
    }

    hsMiniEl.innerHTML = `
        <div class="hs-title">🏅 Highscore</div>
        <ol class="hs-list">
            ${top3.map(s => `<li>${s ? `<b>${s.pct}%</b> (${s.points}/${s.max})` : '—'}</li>`).join("")}
        </ol>
    `;
}

// Boot
loadExamData();

