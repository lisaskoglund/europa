// Questions för instudering 2026 februari
//import { PRESETS } from './presets.js';

export const questions = [
    {
        id:"q1",
        type:"mcq",
        topic:"Religion",
        text:"Vad är skillnaden mellan religion och livsåskådning?",
        options:[
            "Religion handlar om tro på gud eller gudar, medan livsåskådning handlar om hur man ser på livet",
            "Religion handlar om samhällets regler, medan livsåskådning snarare gäller allmänna högtider som alla firar",
            "Religion och livsåskådning betyder i stort sett samma sak, skillnaderna är mycket små",
            "Religion hör mest ihop med historia, medan livsåskådning snarare gäller framtiden"
        ],
        correct:"Religion handlar om tro på gud eller gudar, medan livsåskådning handlar om hur man ser på livet"
    },
    {
        id:"q2",
        type:"mcq",
        topic:"Religion",
        text:"Varför läser man religion i skolan?",
        options:[
            "För att förstå hur människor tänker, lever och firar traditioner",
            "För att lära sig vilken religion man ska försöka undvika att tro på",
            "För att alla människor tror ungefär likadant och det är bra att vet varför",
            "För att religion handlar om gamla berättelser som är viktiga att kunna"
        ],
        correct:"För att förstå hur människor tänker, lever och firar traditioner"
    },
    {
        id:"q3",
        type:"multiText",
        topic:"Religion",
        text:"Skriv tre exempel på heliga byggnader.",
        prompts:["1","2","3"],
        allow:[
            ["kyrka","kyrkan"],
            ["synagoga","synagogan"],
            ["moské","mosken","moskén","moske"],
            ["tempel","templet"]
        ],
        pointsEach:1,
        unique:true
    },
    {
        id:"q4",
        type:"mcq",
        topic:"Religion",
        text:"Vad betyder vallfärd?",
        options:[
            "En resa till en helig plats",
            "En religiös regel som måste följas",
            "En fest som firas varje vecka",
            "En bön som bara ledare får läsa"
        ],
        correct:"En resa till en helig plats"
    },
    {
        id:"q5",
        type:"mcq",
        topic:"Religion",
        text:"Vad menas med riter?",
        options:[
            "Religiösa handlingar, som att be eller offra",
            "Platser där man samlas till gudstjänst",
            "Böcker som berättar om religionens viktigaste delar",
            "Personer som leder religiösa vallfärder"
        ],
        correct:"Religiösa handlingar, som att be eller offra"
    },
    {
        id:"q6",
        type:"mcq",
        topic:"Religion",
        text:"Vilken symbol hör ihop med kristendomen?",
        options:[
            "Korset",
            "Davidsstjärnan",
            "Menoran",
            "Månskäran"
        ],
        correct:"Korset"
    },
    {
        id:"q7",
        type:"mcq",
        topic:"Religion",
        text:"Vilken symbol hör ihop med judendomen?",
        options:[
            "Davidsstjärnan eller menoran",
            "Korset eller fisken",
            "Månskäran och stjärnan",
            "Lotusblomman eller hjulet"
        ],
        correct:"Davidsstjärnan eller menoran"
    },
    {
        id:"q8",
        type:"mcq",
        topic:"Religion",
        text:"Vilken symbol hör ihop med islam?",
        options:[
            "Månskäran",
            "Korset",
            "Menoran",
            "Davidsstjärnan"
        ],
        correct:"Månskäran"
    },
    {
        id:"q9",
        type:"mcq",
        topic:"Religion",
        text:"Varför kallas kristendomen, judendomen och islam för syskonreligioner?",
        options:[
            "De har mycket gemensamt och Abraham är viktig i alla tre",
            "De började i samma stad och använder samma heliga bok",
            "De firar samma högtider på i princip samma sätt",
            "De har ungefär samma regler och samma religiösa ledare"
        ],
        correct:"De har mycket gemensamt och Abraham är viktig i alla tre"
    },
    {
        id:"q10",
        type:"mcq",
        topic:"Judendomen",
        text:"Hur gammal är judendomen ungefär?",
        options:[
            "Cirka 4000 år",
            "Cirka 1000 år",
            "Cirka 2000 år",
            "Cirka 3000 år"
        ],
        correct:"Cirka 4000 år"
    },
    {
        id:"q11",
        type:"mcq",
        topic:"Judendomen",
        text:"Vad heter judendomens heliga skrift?",
        options:[
            "Tanakh",
            "Bibeln",
            "Koranen",
            "Talmud"
        ],
        correct:"Tanakh"
    },
    {
        id:"q12",
        type:"multiText",
        topic:"Judendomen",
        text:"Vilka tre delar är Tanakh indelad i?",
        prompts:["Del 1","Del 2","Del 3"],
        allow:[
            ["tora","toran"],
            ["neviim","nevim", "nevi'im"],
            ["khetuvim","ketuvim"]
        ],
        pointsEach:1,
        unique:true
    },
    {
        id:"q13",
        type:"mcq",
        topic:"Judendomen",
        text:"Vilken del av Tanakh kallas också läran?",
        options:[
            "Tora",
            "Neviim",
            "Khetuvim",
            "Talmud"
        ],
        correct:"Tora"
    },
    {
        id:"q14",
        type:"mcq",
        topic:"Judendomen",
        text:"Vilken viktig tanke finns i skapelseberättelsen inom judendomen?",
        options:[
            "Gud skapade världen och människan ska ta hand om den",
            "Människorna skapade världen tillsammans med Gud",
            "Världen har alltid funnits och ändras inte",
            "Det viktigaste är att människan inte styr över naturen"
        ],
        correct:"Gud skapade världen och människan ska ta hand om den"
    },
    {
        id:"q15",
        type:"mcq",
        topic:"Judendomen",
        text:"Varför är Abraham viktig även inom islam?",
        options:[
            "Han räknas som stamfader också för muslimer",
            "Han skrev Koranen tillsammans med Muhammed",
            "Han byggde den första moskén i Mecka",
            "Han var den första imamen i islam"
        ],
        correct:"Han räknas som stamfader också för muslimer"
    },
    {
        id:"q16",
        type:"mcq",
        topic:"Judendomen",
        text:"Vad menas med Israels förbund med Gud?",
        options:[
            "En överenskommelse mellan Gud och det judiska folket",
            "Att Israel skulle bestämma över alla andra folk",
            "Att judarna inte längre behövde följa några regler",
            "Att bara präster fick tala direkt till Gud"
        ],
        correct:"En överenskommelse mellan Gud och det judiska folket"
    },
    {
        id:"q17",
        type:"mcq",
        topic:"Judendomen",
        text:"Hur bröt Israels folk ibland förbundet med Gud?",
        options:[
            "De började tillbe andra gudar",
            "De flyttade bort från Israel",
            "De slutade bygga synagogor",
            "De glömde att skriva ner lagar"
        ],
        correct:"De började tillbe andra gudar"
    },
    {
        id:"q18",
        type:"mcq",
        topic:"Judendomen",
        text:"Vem var Mose?",
        options:[
            "En ledare som förde israeliterna ut ur Egypten",
            "En kung som byggde det första templet",
            "En präst som skrev hela Tanakh",
            "En profet som levde i Romarriket"
        ],
        correct:"En ledare som förde israeliterna ut ur Egypten"
    },
    {
        id:"q19",
        type:"mcq",
        topic:"Judendomen",
        text:"Vilken viktig gåva fick Mose av Gud enligt berättelsen?",
        options:[
            "De tio budorden",
            "En helig krona",
            "En ny synagoga",
            "En bok med psalmer"
        ],
        correct:"De tio budorden"
    },
    {
        id:"q20",
        type:"multiSelect",
        topic:"Judendomen",
        text:"Markera de tio påståenden som är de tio budorden.",
        minSelect:10,
        maxSelect:10,
        options:[
            "Du ska inte ha andra gudar",
            "Du ska inte missbruka Guds namn",
            "Håll sabbaten helig",
            "Visa aktning för din mor och far",
            "Du ska inte döda",
            "Du ska inte begå äktenskapsbrott",
            "Du ska inte stjäla",
            "Du ska inte vittna falskt",
            "Du ska alltid ge mamma kaffe på sängen på helgen, för hon är faktiskt väldigt snäll",
            "Du ska inte ha begär till din nästas hus",
            "Du ska inte ha begär till din nästas hustru",
            "Du ska alltid ge pengar till templet",
            "Du ska fasta varje fredag",
            "Du ska be tre gånger varje dag",
            "Du ska alltid bära svarta kläder i synagogan",
            "Du ska aldrig äta kött",
            "Du ska resa till Jerusalem varje år",
            "Du ska ge bort hälften av det du äger",
            "Du ska aldrig arbeta efter solnedgång",
            "Du ska tvätta händerna före varje bön",
            "Du ska alltid tända sju ljus varje kväll"
        ],
        correct:[
            "Du ska inte ha andra gudar",
            "Du ska inte missbruka Guds namn",
            "Håll sabbaten helig",
            "Visa aktning för din mor och far",
            "Du ska inte döda",
            "Du ska inte begå äktenskapsbrott",
            "Du ska inte stjäla",
            "Du ska inte vittna falskt",
            "Du ska inte ha begär till din nästas hus",
            "Du ska inte ha begär till din nästas hustru"
        ]
    },
    {
        id:"q21",
        type:"multiSelect",
        topic:"Judendomen",
        text:"Vilka av de tio budorden finns också som lagar i samhället idag?",
        options:[
            "Du ska inte ha andra gudar",
            "Du ska inte missbruka Guds namn",
            "Håll sabbaten helig",
            "Visa aktning för din mor och far",
            "Du ska inte döda",
            "Du ska inte begå äktenskapsbrott",
            "Du ska inte stjäla",
            "Du ska inte vittna falskt",
            "Du ska inte ha begär till din nästas hus",
            "Du ska inte ha begär till din nästas hustru"
        ],
        correct:[
            "Du ska inte döda",
            "Du ska inte stjäla",
            "Du ska inte vittna falskt"
        ]
    },
    {
        id:"q22",
        type:"mcq",
        topic:"Judendomen",
        text:"Vad var profeternas uppgift?",
        options:[
            "Att berätta om Gud och ge hopp om framtiden",
            "Att styra landet och skriva nya lagar för folk att följa",
            "Att bygga tempel och leda arméer för att skydda religionen",
            "Att se till att folket följer religionens regler"
        ],
        correct:"Att berätta om Gud och ge hopp om framtiden"
    },
    {
        id:"q23",
        type:"mcq",
        topic:"Judendomen",
        text:"Vem eller vad är Messias för en troende jude?",
        options:[
            "En person eller en tid som ska ge fred",
            "En kung som levde för väldigt länge sedan",
            "En särskild plats i Jerusalem där judar samlas",
            "En judisk högtid på våren där man firar fruktbarhet"
        ],
        correct:"En person eller en tid som ska ge fred"
    },
    {
        id:"q24",
        type:"mcq",
        topic:"Judendomen",
        text:"Vilken organisation beslutade att staten Israel skulle bildas?",
        options:[
            "FN",
            "EU",
            "Nato",
            "UNESCO"
        ],
        correct:"FN"
    },
    {
        id:"q25",
        type:"mcq",
        topic:"Judendomen",
        text:"I vilka två länder bor många judar idag?",
        options:[
            "Israel och USA",
            "Israel och Egypten",
            "USA och Indien",
            "Italien och Sverige"
        ],
        correct:"Israel och USA"
    },
    {
        id:"q26",
        type:"mcq",
        topic:"Judendomen",
        text:"Hur hör Abraham och landet Israel ihop?",
        options:[
            "Gud lovade Abraham landet Kanaan, alltså Israel",
            "Abraham grundade staten Israel på 2000-talet före kristus",
            "Abraham skrev Israels första lagbok som alla måste följa",
            "Abraham byggde den första synagogan i Jerusalem"
        ],
        correct:"Gud lovade Abraham landet Kanaan, alltså Israel"
    },
    {
        id:"q27",
        type:"mcq",
        topic:"Judendomen",
        text:"Varför firar judar sabbat?",
        options:[
            "Gud vilade på den sjunde dagen och då ska också människan vila",
            "Det var den dag då Mose föddes enligt Tanakh",
            "Templet i Jerusalem invigdes på en lördag vilket man respekterar",
            "Det är början på veckan i den judiska kalendern"
        ],
        correct:"Gud vilade på den sjunde dagen och då ska också människan vila"
    },
    {
        id:"q28",
        type:"mcq",
        topic:"Judendomen",
        text:"När firas sabbaten inom judendomen?",
        options:[
            "Från fredag kväll till lördag kväll",
            "Från lördag morgon till söndag morgon",
            "Från torsdag kväll till fredag kväll",
            "Bara mitt på dagen på lördagen"
        ],
        correct:"Från fredag kväll till lördag kväll"
    },
    {
        id:"q29",
        type:"mcq",
        topic:"Judendomen",
        text:"Vad betyder ordet förbundet i judendomen?",
        options:[
            "En överenskommelse mellan Gud och det judiska folket",
            "En byggnad där man samlas för gudstjänst och läser ur heliga texter tillsammans",
            "En samling sånger, böner och texter som används vid religiösa högtider",
            "En viktig högtid på våren då man minns händelser ur judarnas historia"
        ],
        correct:"En överenskommelse mellan Gud och det judiska folket"
    },
    {
        id:"q30",
        type:"mcq",
        topic:"Judendomen",
        text:"Vad firar man under den judiska påsken, Pesach?",
        options:[
            "Uttåget ur Egypten",
            "Att världen skapades",
            "Invigningen av första synagogan",
            "Att det judiska nyåret börjar"
        ],
        correct:"Uttåget ur Egypten"
    },
    {
        id:"q31",
        type:"mcq",
        topic:"Judendomen",
        text:"Hur firas Pesach bland annat?",
        options:[
            "Man äter särskild mat som påminner om händelsen",
            "Man fastar i en hel månad",
            "Man tänder sju ljus varje kväll",
            "Man blåser i shofar varje morgon"
        ],
        correct:"Man äter särskild mat som påminner om händelsen"
    },
    {
        id:"q32",
        type:"listText",
        topic:"Judendomen",
        text:"Vad heter judarnas heliga byggnad?",
        count:1,
        allowList:[["synagoga","synagogan"]],
        pointsEach:1,
        unique:true
    },
    {
        id:"q33",
        type:"multiText",
        topic:"Judendomen",
        text:"Skriv tre judiska högtider.",
        prompts:["1","2","3"],
        allow:[
            ["rosh hashana","rosh","nyåret","judiska nyåret"],
            ["jom kippur","yom kippur","försoningsdagen"],
            ["chanukka","hanukka","chanuka"],
            ["pesach","påsken","judiska påsken"]
        ],
        pointsEach:1,
        unique:true
    },
    {
        id:"q34",
        type:"mcq",
        topic:"Judendomen",
        text:"Vad händer vid Rosh Hashana, det judiska nyåret?",
        options:[
            "Man firar nyåret och blåser i ett shofarhorn",
            "Man minns uttåget ur Egypten med särskild mat",
            "Man tänder ljus i en sjuarmad ljusstake",
            "Man fastar för att minnas Mose"
        ],
        correct:"Man firar nyåret och blåser i ett shofarhorn"
    },
    {
        id:"q35",
        type:"mcq",
        topic:"Judendomen",
        text:"Vad handlar Jom Kippur främst om?",
        options:[
            "Förlåtelse och försoning",
            "Skörd och tacksamhet",
            "Världens skapelse",
            "Att välja ny kung"
        ],
        correct:"Förlåtelse och försoning"
    },
    {
        id:"q36",
        type:"mcq",
        topic:"Judendomen",
        text:"Vad gör man under Chanukka?",
        options:[
            "Man tänder ljus i en sjuarmad ljusstake",
            "Man läser ur Tora under hela natten i synagogan som en särskild tradition",
            "Man bygger en hydda utomhus och äter sina måltider där under flera dagar",
            "Man firar sabbat extra länge och vilar i sju dagar i rad"
        ],
        correct:"Man tänder ljus i en sjuarmad ljusstake"
    },
    {
        id:"q37",
        type:"mcq",
        topic:"Judendomen",
        text:"Vilka tre inriktningar brukar man tala om inom judendomen?",
        options:[
            "Ortodox, konservativ och liberal",
            "Katolsk, protestantisk och ortodox",
            "Sunni, shia och sufism",
            "Hinduism, buddhism och sikhism"
        ],
        correct:"Ortodox, konservativ och liberal"
    },
    {
        id:"q38",
        type:"mcq",
        topic:"Judendomen",
        text:"Vad kännetecknar ortodox judendom?",
        options:[
            "Man vill hålla hårt på reglerna och inte ändra dem",
            "Man vill ta bort många gamla regler eftersom de inte passar i dagens samhälle",
            "Man följer regler mest vid högtider men inte så mycket i vardagen",
            "Man tycker att varje person själv kan bestämma vilka regler som är viktiga"
        ],
        correct:"Man vill hålla hårt på reglerna och inte ändra dem"
    },
    {
        id:"q39",
        type:"mcq",
        topic:"Judendomen",
        text:"Vad kännetecknar konservativ judendom?",
        options:[
            "Man vill följa reglerna men kan anpassa dem efter tiden",
            "Man vill ta bort de flesta gamla regler och göra religionen helt modern",
            "Man följer bara vissa religiösa texter och bortser från andra delar",
            "Man tycker att regler och traditioner aldrig får förändras över tid"
        ],
        correct:"Man vill följa reglerna men kan anpassa dem efter tiden"
    },
    {
        id:"q40",
        type:"mcq",
        topic:"Judendomen",
        text:"Vad kännetecknar liberal judendom?",
        options:[
            "Det är mer upp till var och en hur man vill leva som jude",
            "Man följer alla gamla regler exakt som de alltid har varit utan att förändra något",
            "Man firar inga religiösa högtider eftersom de anses vara för gamla",
            "Man använder inte de heliga texterna eftersom de inte anses viktiga längre"
        ],
        correct:"Det är mer upp till var och en hur man vill leva som jude"
    },
];