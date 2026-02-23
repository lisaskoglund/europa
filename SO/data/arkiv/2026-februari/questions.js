// Questions för instudering 2026 februari
import { PRESETS } from './presets.js';

export const questions = [
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

