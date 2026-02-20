/* =========================
   Shared utilities and data
========================= */

const STORAGE_KEY = "capquiz_highscores_v3_";
const USER_KEY = "capquiz_current_user_v3";

let store = {};

function deepClone(o){
  try{ return JSON.parse(JSON.stringify(o)); }catch(e){ return o; }
}

const defaultState = {
  highscores: {}, // user -> [{pct, points, max, ts}]
};

function loadStore(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    const loadedStore = raw ? JSON.parse(raw) : deepClone(defaultState);
    loadedStore.lastUser = localStorage.getItem(USER_KEY);
    return loadedStore;
  }catch(e){
    const newStore = deepClone(defaultState);
    newStore.lastUser = localStorage.getItem(USER_KEY);
    return newStore;
  }
}

function saveStore(s){
  localStorage.setItem(USER_KEY, s.lastUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

function shuffle(arr, rng=Math.random){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(rng()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

/* Simple Levenshtein for short strings */
function levenshtein(a,b){
  a = a ?? ""; b = b ?? "";
  const m=a.length, n=b.length;
  const dp = Array.from({length:m+1}, ()=> new Array(n+1).fill(0));
  for(let i=0;i<=m;i++) dp[i][0]=i;
  for(let j=0;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      const cost = a[i-1]===b[j-1] ? 0 : 1;
      dp[i][j] = Math.min(
          dp[i-1][j] + 1,
          dp[i][j-1] + 1,
          dp[i-1][j-1] + cost
      );
    }
  }
  return dp[m][n];
}

function norm(s){
  return (s ?? "")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
}

function tokenize(s){
  return norm(s).split(/[^a-zåäö0-9]+/i).filter(Boolean);
}

/**
 * Match rules:
 * - Case insensitive
 * - Trim spaces
 * - Allow substring matches (delord)
 * - If not found: fuzzy word match:
 *      - distance <= 1 for len<=6 => half point
 *      - distance <= 2 for len>=7 => half point
 */
function keywordScore(answer, keyword){
  const a = norm(answer);
  const k = norm(keyword);
  if(!a || !k) return 0;

  // exact / substring
  if(a.includes(k)) return 1;

  // fuzzy by words
  const words = tokenize(a);
  const kwWords = tokenize(k);
  // compare each keyword word to each answer word; if all keyword words have a close match -> 0.5
  let allClose = true;
  for(const kw of kwWords){
    let foundClose = false;
    for(const w of words){
      const dist = levenshtein(w, kw);
      const thresh = (kw.length >= 7 ? 2 : 1);
      if(dist <= thresh){
        foundClose = true; break;
      }
    }
    if(!foundClose){ allClose = false; break; }
  }
  return allClose ? 0.5 : 0;
}

function scoreFromAllowList(value, allowList){
  // allowList: array of synonyms arrays OR strings
  const v = norm(value);
  if(!v) return {points:0, matched:null, level:"empty"};

  // full match if any synonym is substring
  for(const item of allowList){
    const syns = Array.isArray(item) ? item : [item];
    for(const s of syns){
      const k = norm(s);
      if(!k) continue;
      if(v === k || v.includes(k) || k.includes(v)){
        return {points:1, matched:s, level:"full"};
      }
    }
  }

  // half match if fuzzy close to any synonym word/phrase
  let best = {points:0, matched:null, level:"none"};
  for(const item of allowList){
    const syns = Array.isArray(item) ? item : [item];
    for(const s of syns){
      const p = keywordScore(v, s);
      if(p > best.points){
        best = {points:p, matched:s, level:(p===0.5?"half":"full")};
      }
      if(best.points===1) return best;
    }
  }
  return best;
}

/* XSS-safe helpers */
function escapeHtml(str){
  return (str ?? "").toString()
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;")
      .replace(/'/g,"&#039;");
}

function escapeAttr(str){
  return escapeHtml(str).replaceAll("\n"," ");
}

function formatPercent(p) {
    if (p === null || p === undefined || isNaN(p)) return "—";
    return `${Math.round(p * 100)}%`;
}

function saveHighscore(score, type) {
    const currentUser = store.lastUser;
    if (!currentUser) return;

    const highscores = getHighscores(currentUser);
    highscores.push({ type, score, date: new Date().toISOString() });

    // Sortera efter poäng (högst först) och behåll topp 10
    highscores.sort((a, b) => b.score - a.score);
    const top10 = highscores.slice(0, 10);

    localStorage.setItem(`highscores_${currentUser}`, JSON.stringify(top10));
}

function getHighscores(user) {
    const data = localStorage.getItem(`highscores_${user}`);
    return data ? JSON.parse(data) : [];
}

let currentUser = null;

function setCurrentUser(user) {
    currentUser = user;
    localStorage.setItem(USER_KEY, user ? user.name : '');
}

function loadCurrentUser() {
    const savedUserName = localStorage.getItem(USER_KEY);
    if (savedUserName) {
        // In a real app, you might fetch user details from an API
        // For now, we'll just create a user object from the name
        currentUser = { name: savedUserName };
    }
    return currentUser;
}
