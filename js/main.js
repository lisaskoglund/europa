/* =========================
   Data + helpers
========================= */

const STORAGE_KEY = "capquiz_highscores_v3_";
const USER_KEY = "capquiz_current_user_v3";
function deepClone(o){
  try{ return JSON.parse(JSON.stringify(o)); }catch(e){ return o; }
}

const defaultState = {
  highscores: {}, // user -> [{pct, points, max, ts}]
};

function loadStore(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    const store = raw ? JSON.parse(raw) : deepClone(defaultState);
    store.lastUser = localStorage.getItem(USER_KEY);
    return store;
  }catch(e){
    const store = deepClone(defaultState);
    store.lastUser = localStorage.getItem(USER_KEY);
    return store;
  }
}
function saveStore(store){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
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

/* =========================
   Question bank
========================= */

/**
 * Types:
 * - mcq: {options:[...], correct:"..."}  (1p)
 * - multiText: {prompts:[...], allow:[allowList], pointsEach:1} (sum)
 * - listText: {count:n, allowList:[...], pointsEach:1, unique:true} (sum)
 * - freeKeywords: {keywords:[...], maxPoints:n} (up to n; keyword match full=1, fuzzy=0.5)
 * - singleText: {allowList:[...], points:1} or {exact:"7", points:1}
 */
const PRESETS = {
  oceans3: [
    ["Atlanten","Atlantiska oceanen"],
    ["Stilla havet","Pacifiska oceanen"],
    ["Indiska oceanen","Indiska havet"]
  ],
  seasEurope: [
    ["Östersjön","Baltiska havet"],
    "Nordsjön",
    ["Medelhavet","Mediterranean Sea"],
    ["Svarta havet","Svarta havet"],
    ["Norska havet","Norska sjön"],
    ["Barents hav","Barentshavet"],
    ["Vita havet","Vitahavet"],
    ["Adriatiska havet","Adriatiska sjön"],
    ["Egeiska havet","Egeiska sjön"],
    ["Joniska havet","Joniska sjön"],
    ["Tyrrenska havet","Tyrrenska sjön"],
    ["Liguriska havet","Liguriska sjön"],
    ["Baleariska havet","Baleariska sjön"],
    ["Keltiska havet","Keltiska sjön"],
    ["Irlandsjön","Irländska sjön"],
    ["Biscayabukten","Biscaya"],
    ["Azovska sjön","Azovska havet","Azovhavet"],
    ["Marmarasjön","Marmarahavet"],
    ["Kaspiska havet","Kaspiska sjön"]
  ],
  nearbySeasEurope: [
    ["Atlanten","Atlantiska oceanen"],
    ["Nordsjön","North Sea"],
    ["Östersjön","Baltiska havet"],
    ["Medelhavet","Mediterranean Sea"],
    ["Svarta havet","Black Sea"],
    ["Norska havet","Norwegian Sea"],
  ],
  renewableEnergy: [
    ["solkraft","solenergi"],
    "vindkraft",
    ["vattenkraft","vattenkraftverk"],
  ],
  nonRenewableEnergy: [
    ["kärnkraft"],
    ["fossila bränslen", "fossila bränsle"]
  ],
  fossilFuels: [
    ["kol","stenkol"],
    "olja",
    ["naturgas","gas"]
  ],
  continents7: [
    ["Europa"],
    ["Asien"],
    ["Afrika"],
    ["Nordamerika","Norra Amerika"],
    ["Sydamerika","Södra Amerika"],
    ["Oceanien","Australien och Oceanien","Australien/Oceanien","Australien"],
    ["Antarktis","Antarctica"]
  ],
  bigLakesEU: [
    ["Ladoga","Ladogasjön"],
    ["Onega","Onegasjön"],
    ["Vänern"],
    ["Vättern"],
    ["Genevesjön","Lac Léman","Leman"],
    ["Balatonsjön","Balaton"],
    ["Peipussjön","Peipus"],
    ["Saima","Saimen","Saimasjön"]
  ],
  bigRiversEU: [
    ["Volga"],
    ["Donau","Donaus flod"],
    ["Dnepr","Dnipro"],
    ["Rhen","Rhein"],
    ["Elbe"],
    ["Oder"],
    ["Po"],
    ["Seine"],
    ["Themsen","Thames"],
    ["Ebro"],
    ["Tajo","Tejo"],
    ["Loire"],
    ["Vistula","Wisła","Wisla"],
    ["Daugava"],
    ["Rhone","Rhône"]
  ],
  bigIslandsEU: [
    ["Storbritannien","Great Britain"],
    ["Irland"],
    ["Island"],
    ["Sicilien","Sicily"],
    ["Sardinien","Sardinia"],
    ["Kreta","Crete"],
    ["Cypern","Cyprus"],
    ["Mallorca"],
    ["Korsika","Corsica"],
    ["Fyn"],
    ["Själland","Zealand"]
  ]
};

const questions = [
  // MCQ block
  { id:"q1", type:"mcq", topic:"Geografi", text:"Beskriv vad en fältstudie är?",
    options:[
      "När man undersöker något ute på plats och samlar egna observationer",
      "När man undersöker ett område med hjälp av kartor och satellitbilder hemma",
      "När man jämför information från flera böcker och faktasidor",
      "När man gör en enkät online utan att vara på plats"
    ],
    correct:"När man undersöker något ute på plats och samlar egna observationer"
  },
  { id:"q2", type:"mcq", topic:"Geografi", text:"Vad betyder ordet konsumtion?",
    options:[
      "Att använda, köpa och förbruka varor och tjänster",
      "Att producera varor i en fabrik eller på en gård",
      "Att frakta varor mellan olika platser",
      "Att spara pengar genom att minska sina utgifter"
    ],
    correct:"Att använda, köpa och förbruka varor och tjänster"
  },
  { id:"q3", type:"mcq", topic:"Geografi", text:"Vad betyder ordet transport?",
    options:[
      "Att flytta människor eller saker från en plats till en annan",
      "Att utbyta information mellan människor och grupper",
      "Att förbruka varor och tjänster i vardagen",
      "Att mäta avstånd och riktningar på en karta"
    ],
    correct:"Att flytta människor eller saker från en plats till en annan"
  },
  { id:"q4", type:"mcq", topic:"Geografi", text:"Vad betyder ordet kommunikation?",
    options:[
      "Att människor skickar och tar emot information, till exempel genom att prata, skriva eller använda internet",
      "Att skriva ner tankar och idéer inför framtiden så att efterföljande kan lära sig av det",
      "Att köpa och använda varor i samhället och sedan återvinna dem för hållbart bruk",
      "Att mäta och rita kartor över olika platser i världen så man kan hitta dit och förstå hur det ser ut där",
    ],
    correct:"Att människor skickar och tar emot information, till exempel genom att prata, skriva eller använda internet"
  },
  { id:"q5", type:"mcq", topic:"Geografi", text:"Vad menas med hållbar utveckling?",
    options:[
      "Att använda resurser så att både människor och natur mår bra nu och senare",
      "Att utveckla snabbt, även om det sliter på naturen",
      "Att satsa på enbart billigaste alternativet varje gång",
      "Att bygga mer och mer utan att planera långsiktigt"
    ],
    correct:"Att använda resurser så att både människor och natur mår bra nu och senare"
  },
  { id:"q6", type:"mcq", topic:"Kartan", text:"Hur gör man en karta?",
    options:[
      "Man samlar information om det kartan ska visa och förminskar verkligheten och visar viktiga saker med symboler och skala",
      "Man försöker rita alla länder och platser så gott man kan",
      "Man kan till exempel rita av en annan karta och ändra lite på den",
      "Man använder bara färger, men inga tecken eller förklaringar"
    ],
    correct:"Man samlar information om det kartan ska visa och förminskar verkligheten och visar viktiga saker med symboler och skala"
  },
  { id:"q7", type:"mcq", topic:"Kartan", text:"Varför delas jorden upp i gradnät?",
    options:[
      "För att kunna hitta och ange exakta platser med koordinater",
      "För att rita upp alla länder med helt samma storlek",
      "För att visa vilka väderstreck som finns i en stad",
      "För att kunna mäta höjdskillnader i berg och dalar"
    ],
    correct:"För att kunna hitta och ange exakta platser med koordinater"
  },
  { id:"q8", type:"mcq", topic:"Kartan", text:"Vad heter dessa gradnät som vi delar upp jorden i?",
    options:[
      "Breddgrader och längdgrader",
      "Karttecken och höjdkurvor",
      "Norrpil och skala",
      "Gradlängder och nätstreck"
    ],
    correct:"Breddgrader och längdgrader"
  },
  { id:"q9", type:"mcq", topic:"Kartan", text:"Vad betyder ordet väderstreck?",
    options:[
      "Riktningar som norr, söder, öster och väster",
      "Olika sorters väder, som regn och solsken",
      "Linjer som visar höjd över havet på en karta",
      "Tecken som visar sevärdheter på en karta"
    ],
    correct:"Riktningar som norr, söder, öster och väster"
  },
  { id:"q10", type:"mcq", topic:"Kartan", text:"Vad är en topografisk karta?",
    options:[
      "En karta som visar hur högt en plats ligger över havet med hjälp av höjdkurvor",
      "En karta som visar ett särskilt tema, till exempel befolkning eller klimat",
      "En karta som bara visar huvudstäder och landsgränser",
      "En karta som visar väderprognosen för en vecka"
    ],
    correct:"En karta som visar hur högt en plats ligger över havet med hjälp av höjdkurvor"
  },
  { id:"q11", type:"mcq", topic:"Kartan", text:"Vad är en tematisk karta?",
    options:[
      "En karta som visar ett särskilt tema, till exempel klimat eller befolkning",
      "En karta som visar terräng och höjder med höjdkurvor",
      "En karta som bara visar hav och kuster",
      "En karta som alltid måste vara i svartvitt"
    ],
    correct:"En karta som visar ett särskilt tema, till exempel klimat eller befolkning"
  },
  { id:"q12", type:"mcq", topic:"Kartan", text:"Vad är ekvatorn?",
    options:[
      "En tänkt linje runt jordens mitt som delar den i norra och södra halvklotet",
      "En tänkt linje som visar var polcirkeln går",
      "En linje som visar gränsen mellan två länder",
      "En linje som visar var en bergskedja slutar"
    ],
    correct:"En tänkt linje runt jordens mitt som delar den i norra och södra halvklotet"
  },
  { id:"q13", type:"mcq", topic:"Kartan", text:"Vad används en kompass till?",
    options:[
      "Eftersom kompassen pekar åt norr, vet du hur du ska hitta med kartan när du är ute i naturen",
      "För att mäta höjd över havet i ett område så du vet om luften är tunn eller tjock",
      "För att räkna ut temperatur och lufttryck så du kan förutspå vädret när du är ute",
      "För att rita kartans skala i rätt storlek så du vet hur långt det är mellan olika platser"
    ],
    correct:"Eftersom kompassen pekar åt norr, vet du hur du ska hitta med kartan när du är ute i naturen"
  },
  { id:"q14", type:"mcq", topic:"Jorden", text:"Hur ser jordens inre ut (enkel modell)?",
    options:[
      "Skorpa, mantel, yttre och inre kärna",
      "Skorpa, hav och atmosfär",
      "Sandlager, jordlager, berglager och grundvatten",
      "Kärna, moln, glaciär och is"
    ],
    correct:"Skorpa, mantel, yttre och inre kärna"
  },
  { id:"q15", type:"mcq", topic:"Jorden", text:"Vad gör att jordens plattor rör på sig?",
    options:[
      "Värme och rörelser i jordens inre, närmare bestämt i manteln",
      "Tidvatten från månen som flyttar marken",
      "Vindar i atmosfären som pressar jordskorpan",
      "Att vulkaner spränger och puttar plattorna varje dag"
    ],
    correct:"Värme och rörelser i jordens inre, närmare bestämt i manteln"
  },
  { id:"q16", type:"mcq", topic:"Jorden", text:"Vad betyder erosion?",
    options:[
      "Att mark och berg nöts bort av vatten, vind eller is",
      "Att berg byggs upp när magma stelnar",
      "Att marken blir bördig av näringsämnen",
      "Att jordskorpan spricker när en vulkan får utbrott"
    ],
    correct:"Att mark och berg nöts bort av vatten, vind eller is"
  },
  { id:"q17", type:"mcq", topic:"Jorden", text:"Vad betyder bergskedjeveckning?",
    options:[
      "När jordskorpan pressas ihop och veckas så att bergskedjor bildas",
      "När berg nöts ner och blir lägre under lång tid",
      "När en flod gräver en dal i landskapet",
      "När kontinenterna flyttar sig bort från varandra"
    ],
    correct:"När jordskorpan pressas ihop och veckas så att bergskedjor bildas"
  },
  { id:"q18", type:"mcq", topic:"Jorden", text:"Vad betyder kontinentaldrift?",
    options:[
      "Det är att jordskorpans plattor långsamt rör sig över jordens yta",
      "Att havsvatten stiger och till slut kommer att täcka kontinenterna",
      "Att kontinenterna får fler berg på kort tid och till slut bli för höga",
      "Att Mello kommer utöka till att ha 32 deltävlingar, från januari till augusti"
    ],
    correct:"Det är att jordskorpans plattor långsamt rör sig över jordens yta"
  },
  { id:"q19", type:"mcq", topic:"Väder & klimat", text:"Vad är skillnaden mellan väder och klimat?",
    options:[
      "Väder är hur det är just nu, klimat är hur det brukar vara under lång tid (30 år)",
      "Väder är mätningar i en stad, klimat är mätningar i ett hus (till exempel också luftfuktighet)",
      "Väder handlar om vind, klimat handlar bara om temperatur",
      "Klimat ändras varje dag, väder ändras varje år"
    ],
    correct:"Väder är hur det är just nu, klimat är hur det brukar vara under lång tid (30 år)"
  },
  { id:"q20", type:"mcq", topic:"Väder & klimat", text:"Varför blåser det?",
    options:[
      "Luft rör sig från högtryck till lågtryck när solen värmer jorden olika",
      "Moln trycker på luften så att den börjar röra sig",
      "Haven drar in luft och skapar vindar hela tiden",
      "Berg släpper ut luft som blir till vind"
    ],
    correct:"Luft rör sig från högtryck till lågtryck när solen värmer jorden olika"
  },
  { id:"q21", type:"mcq", topic:"Väder & klimat", text:"Vad är ett moln?",
    options:[
      "Samlingar av små vattendroppar eller iskristaller uppe i himmelen",
      "Vattenånga som man kan se som rök från marken",
      "Regndroppar som faller rakt ner från himlen",
      "Snö som smälter och blir dimma högt upp"
    ],
    correct:"Samlingar av små vattendroppar eller iskristaller uppe i himmelen"
  },
  { id:"q22", type:"mcq", topic:"Väder & klimat", text:"Vad menas med växthuseffekten?",
    options:[
      "Att vissa gaser håller kvar värme så att jorden blir lagom varm (men kan förstärkas av utsläpp)",
      "Att solen värmer jorden mindre när det är mycket moln eftersom de reflekterar bort solstrålarna",
      "Att växter alltid gör att temperaturen sjunker",
      "Att naturen blir fuktig på natten (dagg) eftersom nätter är kallare"
    ],
    correct:"Att vissa gaser håller kvar värme så att jorden blir lagom varm (men kan förstärkas av utsläpp)"
  },
  { id:"q23", type:"mcq", topic:"Jordens naturresurser", text:"Vad är risken med överfiske?",
    options:[
      "Att fiskarter kan minska eller försvinna så växter och djur påverkas negativt",
      "Att havet blir varmare när man fiskar mycket vilket leder till algblomning",
      "Att fiskar alltid blir mindre när de simmar långt, och till slut blir för små",
      "Att salthalten i havet försvinner när man tar upp fisk eftersom de reglerar salthalten"
    ],
    correct:"Att fiskarter kan minska eller försvinna så växter och djur påverkas negativt"
  },
  { id:"q24", type:"mcq", topic:"Jordens naturresurser", text:"Vad är grundvatten?",
    options:[
      "Vatten som finns i marken och i berggrunden under jordytan",
      "Vatten som samlas i sjöar och dammar på ytan",
      "Vatten som ligger kvar på marken efter ett regn",
      "Vatten som finns i moln och dimma"
    ],
    correct:"Vatten som finns i marken och i berggrunden under jordytan"
  },
  { id:"q25", type:"mcq", topic:"Jordens naturresurser", text:"Vad görs för att stoppa nedsmutsningen av haven?",
    options:[
      "Det finns internationella lagar som ska följas, och länder kommer också tillsammans överens om regler",
      "Man bygger fler båtar så att skräpet körs bort av vågor",
      "Man försöker tillverka konstgjorda hav som är fria från smuts och föroreningar",
      "Man häller i kemikalier i haven som ska bryta ner plast och gifter"
    ],
    correct:"Det finns internationella lagar som ska följas, och länder kommer också tillsammans överens om regler"
  },
  { id:"q26", type:"mcq", topic:"Jordens naturresurser", text:"Vad är Taigan?",
    options:[
      "Ett stort barrskogsområde i kalla delar av norra halvklotet",
      "Ett varmt ökenområde med nästan ingen växtlighet",
      "Ett tropiskt område nära ekvatorn med mycket regn",
      "Ett havsområde med mycket korallrev"
    ],
    correct:"Ett stort barrskogsområde i kalla delar av norra halvklotet"
  },
  { id:"q27", type:"freeKeywords", topic:"Jordens naturresurser", text:"Vad är tempererade skogar?",
    keywords:["barrskog","lövskog","temperatur","ändras","varm","kall","årstider","varierar","olika","Sverige"],
    maxPoints:2,
  },
  { id:"q28", type:"freeKeywords", topic:"Jordens naturresurser", text:"Vad är tropiska och subtropiska skogar?",
    keywords:["områden","året om","samma","hela tiden","temperatur","alltid","varmt","varm","inga årstider","jämt","jämnt"],
    maxPoints:2,
  },
  { id:"q29", type:"mcq", topic:"Jordens naturresurser", text:"Varför är regnskogen så viktig?",
    options:[
      "Den har stor biologisk mångfald, över hälften av jordens växt- och djurarter lever där",
      "Den gör att alla floder i världen får samma temperatur",
      "Den är viktig för att den producerar mycket olja som vi kan använda som bränsle",
      "Det är det enda stället där man kan hitta sällsynta metaller som används i mobiltelefoner och datorer"
    ],
    correct:"Den har stor biologisk mångfald, över hälften av jordens växt- och djurarter lever där"
  },

  // Free text / list block
  { id:"q30", type:"multiText", topic:"Hav", text:"Vilka är världens tre stora hav (vad heter dom)?",
    allow: PRESETS.oceans3, pointsEach: 1, unique:true,
  },
  { id:"q31", type:"listText", topic:"Hav", text:"Nämn 5 mindre hav (i/kring Europa).",
    count:5, allowList: PRESETS.seasEurope, pointsEach: 1, unique:true,
  },
  { id:"q32", type:"freeKeywords", topic:"Hav", text:"Berätta om Golfströmmen.",
    keywords:["varm ström","Atlanten", "varmt", "kallt", "Sverige", "för med sig värme","Europa","klimat","västra Europa","havet","ström"],
    maxPoints:3,
    note:"Poäng ges för nyckelord"
  },
  { id:"q33", type:"freeKeywords", topic:"Energi", text:"Vad betyder förnybara energikällor?",
    keywords:["vind","sol","vattenkraft","biobränsle", "råvaror", "resurser", "förnybara", "inte ta slut", "inte tar slut", "nya", "nytt"],
    maxPoints:2
  },
  { id:"q34", type:"multiText", topic:"Energi", text:"Ge exempel på tre förnybara energikällor.",
    allow: PRESETS.renewableEnergy, pointsEach: 1, unique:true,
  },
  { id:"q35", type:"freeKeywords", topic:"Energi", text:"Vad betyder icke förnybara energikällor",
    keywords:["olja","kol","naturgas","uran", "icke förnybara", "råvaror", "resurser", "kärnkraft", "ta slut", "finns inte"],
    maxPoints:2
  },
  { id:"q36", type:"multiText", topic:"Hav", text:"Ge exempel på två icke förnybara energikällor.",
    allow: PRESETS.nonRenewableEnergy, pointsEach: 1, unique:true,
  },
  { id:"q37", type:"listText", topic:"Energi", text:"Skriv tre fossila bränslen.",
    count:3, allowList: PRESETS.fossilFuels, pointsEach:1, unique:true
  },
  { id:"q38", type:"singleText", topic:"Världsdelar", text:"Europa är en världsdel – hur många världsdelar finns det?",
    allowList: ["7", "sju"], points:1
  },
  { id:"q39", type:"multiText", topic:"Världsdelar", text:"Vad heter de olika världsdelarna?",
    prompts:["1","2","3","4","5","6","7"],
    allow: PRESETS.continents7, pointsEach:1, unique:true
  },
  { id:"q40", type:"listText", topic:"Europa", text:"Skriv namnen på minst tre stora sjöar i Europa.",
    count:3, allowList: PRESETS.bigLakesEU, pointsEach:1, unique:true,
  },
  { id:"q41", type:"listText", topic:"Europa", text:"Skriv namnen på minst tre stora floder i Europa.",
    count:3, allowList: PRESETS.bigRiversEU, pointsEach:1, unique:true,
  },
  { id:"q42", type:"listText", topic:"Europa", text:"Skriv namnen på minst tre stora öar i Europa.",
    count:3, allowList: PRESETS.bigIslandsEU, pointsEach:1, unique:true,
  },
  { id:"q43", type:"multiText", topic:"Europa", text:"Skriv namnen på de hav som ligger intill Europas länder (ett fält per hav).",
    prompts: PRESETS.nearbySeasEurope.map((_,i)=>`Hav ${i+1}`),
    allow: PRESETS.nearbySeasEurope, pointsEach:1, unique:true,
  },
];

/* Pre-shuffle MCQ options once, so back/forward keeps the same order */
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

/* =========================
   App state
========================= */

const app = document.getElementById("app");
let store = loadStore();

let quiz = null;
let idx = 0;
let answers = {}; // q.id -> user answer(s)
let phase = "start"; // start | quiz | results

/* =========================
   Rendering
========================= */

function render(){
  if(phase==="start") return renderStart();
  if(phase==="quiz") return renderQuestion();
  return renderResults();
}

function renderStart(){
  document.querySelector('.user-info').innerHTML = `
        <div class="pill">Användare: <b>${escapeHtml(store.lastUser || "—")}</b></div>
    `;

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
    // multiText may omit explicit prompts; fall back to one prompt per allowed item
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
        <button class="${isLast ? "btn" : "btn ghost"}" id="gradeBtn">Rätta </button>
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
  const nextBtn = document.getElementById("nextBtn"); // kan vara null på sista frågan

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

function questionMaxPoints(q){
  if(q.type==="mcq") return 1;
  if(q.type==="singleText") return q.points ?? 1;
  if(q.type==="listText") return (q.pointsEach ?? 1) * (q.count ?? 1);
  if(q.type==="multiText") return (q.pointsEach ?? 1) * (q.prompts?.length ?? (q.allow ? q.allow.length : 1));
  if(q.type==="freeKeywords") return q.maxPoints ?? q.keywords?.length ?? 0;
  return 1;
}

/* =========================
   Scoring
========================= */

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

      // if exact numeric: do stricter
      let pts;
      if(norm(v) === norm(exact)) pts = q.points ?? 1;
      else{
        // fuzzy -> half
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

      // choose best match among remaining allow items
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
    // sum keyword scores, cap
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

/* =========================
   Results + highscore
========================= */

function renderResults(){
  const g = grade();
  const user = store.lastUser || "—";

  // save highscore
  if(user && user !== "—"){
    store.highscores[user] = store.highscores[user] || [];
    store.highscores[user].push({pct:g.pct, points:g.total, max:g.max, ts: Date.now()});
    // keep best 20 per user
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
    window.location.href = "index.html";
  };
}

function renderResultItem(r, i){
  const pts = r.points;
  const maxP = r.maxPoints;
  const tagClass = pts===maxP ? "good" : (pts===0 ? "bad" : "warn");
  const tagText = pts===maxP ? "Rätt" : (pts===0 ? "Fel" : "Delvis");
  const breakdown = (r.breakdown || [])
      .filter(x=>x && typeof x.pts !== "undefined")
      .slice(0, 8) // keep it tidy
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

/* =========================
   XSS-safe helpers
========================= */
function escapeHtml(str){
  return (str ?? "").toString()
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;")
      .replace(/'/g,"&#039;");
}
function escapeAttr(str){ return escapeHtml(str).replaceAll("\n"," "); }

/* Boot */
render();

function refreshMiniHighscore(){
    const hsMiniEl = document.getElementById("hsMini");
    if (!store.lastUser || !hsMiniEl){ return; }
    const userScores = (store.highscores && store.highscores[store.lastUser]) || [];

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
