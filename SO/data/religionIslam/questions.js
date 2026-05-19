// Questions för instudering Kristendom och Islam
// import { PRESETS } from './presets.js';

export const questions = [
    {
        id:"q1",
        type:"multiText",
        topic:"Kristendomen",
        text:"Vad heter de kristnas heliga skrift och vilka två delar består den av?",
        prompts:["Helig skrift","Del 1","Del 2"],
        allow:[
            ["bibeln","bibel"],
            ["gamla testamentet","gt"],
            ["nya testamentet","nt"]
        ],
        pointsEach:1,
        unique:true
    },

    {
        id:"q2",
        type:"mcq",
        topic:"Kristendomen",
        text:"Varför föddes Jesus i Betlehem?",
        options:[
            "Josef och Maria reste dit eftersom kejsaren hade bestämt att folket skulle skattskrivas",
            "Maria och Josef bodde där hela tiden och behövde därför faktiskt inte resa någonstans",
            "Jesus föddes där eftersom lärjungarna redan hade samlats i Betlehem, då åkte Josef och Maria dit",
            "Familjen flyttade dit tillsammans efter att Jesus hade blivit vuxen och börjat predika"
        ],
        correct:"Josef och Maria reste dit eftersom kejsaren hade bestämt att folket skulle skattskrivas"
    },

    {
        id:"q3",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vilka böcker i Bibeln handlar om Jesus liv?",
        options:[
            "Evangelierna i Nya testamentet",
            "Moseböckerna i Gamla testamentet",
            "Psaltaren i Gamla testamentet",
            "Uppenbarelseboken i Nya testamentet"
        ],
        correct:"Evangelierna i Nya testamentet"
    },

    {
        id:"q4",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad var Jesus tanke med nattvarden?",
        options:[
            "En påminnelse om Jesu kropp och blod, ett förbund mellan människor och Jesus. Brödet symboliserar hans kropp och vinet symboliserar hans blod",
            "En högtid där lärjungarna firade att romarna till slut hade lämnat Jerusalem och att alla kristna blivit fria till slut",
            "En måltid där Jesus bestämde att alla kristna alltid måste fasta innan de går till kyrkan för att sedan kunna ta nattvarden",
            "En ceremoni där prästerna valde vilka personer som fick läsa ur Bibeln och undervisa andra och vara förebilder för yngre församlingsmedlemmar"
        ],
        correct:"En påminnelse om Jesu kropp och blod, ett förbund mellan människor och Jesus. Brödet symboliserar hans kropp och vinet symboliserar hans blod"
    },

    {
        id:"q5",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad hette romaren som dödade Jesus?",
        options:[
            "Pontius Pilatus",
            "Julius Caesar",
            "Kejsar Augustus",
            "Herodes Antipas"
        ],
        correct:"Pontius Pilatus"
    },

    {
        id:"q6",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad betyder ordet evangelium?",
        options:[
            "Ett glatt budskap eller berättelserna om Jesus",
            "En person som leder gudstjänster i kyrkan",
            "En religiös regel som alla kristna måste följa",
            "En särskild högtid som firas till minne av Jesus"
        ],
        correct:"Ett glatt budskap eller berättelserna om Jesus"
    },

    {
        id:"q7",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad betyder ordet lärjunge?",
        options:[
            "En person som följer och lär av Jesus",
            "En ledare som bestämmer över kyrkan",
            "En person som skriver texter i Bibeln",
            "En soldat som skyddade Jerusalem"
        ],
        correct:"En person som följer och lär av Jesus"
    },

    {
        id:"q8",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad betyder ordet frälsare?",
        options:[
            "Någon som räddar eller befriar människor",
            "En person som bygger kyrkor och tempel",
            "En kung som styr över ett religiöst land",
            "En människa som aldrig gör några misstag"
        ],
        correct:"Någon som räddar eller befriar människor"
    },

    {
        id:"q9",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad betyder ordet liknelse?",
        options:[
            "En berättelse med ett budskap eller en jämförelse",
            "En sång som sjungs under gudstjänster",
            "En lista med regler som alla måste följa",
            "En karta över viktiga platser i Bibeln"
        ],
        correct:"En berättelse med ett budskap eller en jämförelse"
    },

    {
        id:"q10",
        type:"mcq",
        topic:"Kristendomen",
        text:"Varför var lärjungarna så rädda efter att Jesus dött?",
        options:[
            "De var osäkra på om Jesus verkligen levde igen men blev övertygade efter att han visat sig för dem flera gånger. Det var också förbjudet och farligt att vara kristen",
            "De var rädda för att de skulle tvingas lämna Jerusalem nu när Jesus var död och därmed aldrig få återvända till sina familjer igen",
            "De trodde att romarna skulle förbjuda alla människor att läsa Bibeln och stänga alla kyrkor",
            "De var oroliga för att de inte längre skulle få träffa varandra eller samlas till gudstjänster, men även för att Jesus inte längre kunde ledsaga dem"
        ],
        correct:"De var osäkra på om Jesus verkligen levde igen men blev övertygade efter att han visat sig för dem flera gånger. Det var också förbjudet och farligt att vara kristen"
    },

    {
        id:"q11",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad hände med lärjungarna femtio dagar efter påsk?",
        options:[
            "De blev uppfyllda av glädje och kraft när de fick den heliga anden och började berätta om Jesus och sprida hans lära",
            "De reste tillbaka till Betlehem för att skriva ner alla berättelser om Jesu liv i en ny bok, det som sedan blev bibeln",
            "De gömde sig undan romarna och slutade träffas eftersom de fortfarande var mycket räddaför att bli förföljda och dödade",
            "De byggde den första stora kyrkan i Jerusalem där alla människor kunde samlas till bön"
        ],
        correct:"De blev uppfyllda av glädje och kraft när de fick den heliga anden och började berätta om Jesus och sprida hans lära"
    },

    {
        id:"q12",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vilka var orsakerna till att kristendomen snabbt fick så stor spridning i romarriket?",
        options:[
            "Kristendomen gav människovärde till slavarna, kvinnor var lika välkomna som män och religionen gav hopp om ett liv efter döden",
            "Alla romerska kejsare blev kristna och bestämde då tidigt att hela romarriket skulle bli kristet och följa Bibeln",
            "Kristendomen spreds mest genom att stora arméer reste runt och byggde kyrkor i alla städer, folket tyckte att det var ett bra sätt att träffas på",
            "De kristna använde samma tempel som romarna och därför började alla automatiskt tro på Jesus"
        ],
        correct:"Kristendomen gav människovärde till slavarna, kvinnor var lika välkomna som män och religionen gav hopp om ett liv efter döden"
    },

    {
        id:"q13",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vem var Paulus och varför var han viktig för kristendomen?",
        options:[
            "Han var farisé och tyckte illa om kristna men efter en upplevelse av Jesus började han sprida kristendomen",
            "Han var en av Jesu första lärjungar och skrev hela Gamla testamentet medan Jesus fortfarande levde",
            "Han var en romersk kejsare som bestämde att alla människor i Europa skulle bli kristna, annars blev de bannlysta",
            "Han var överstepräst i Jerusalem och ansvarade för att bygga de första stora kyrkorna. De blev väldigt välbesökta"
        ],
        correct:"Han var farisé och tyckte illa om kristna men efter en upplevelse av Jesus började han sprida kristendomen"
    },

    {
        id:"q14",
        type:"mcq",
        topic:"Kristendomen",
        text:"Var i Europa var den ortodoxa kyrkan starkast och var var den katolska kyrkan starkast?",
        options:[
            "Den ortodoxa kyrkan var starkast i östra Europa, till exempel Grekland, Rumänien och Ryssland. Den katolska kyrkan var starkast i Västeuropa",
            "Den ortodoxa kyrkan var starkast i Norden medan den katolska kyrkan mest fanns i Mellanöstern och Afrika",
            "Den ortodoxa och katolska kyrkan var ungefär lika starka i alla delar av Europa under samma tid",
            "Den ortodoxa kyrkan fanns bara i Ryssland medan den katolska kyrkan bara fanns i Italien och Spanien"
        ],
        correct:"Den ortodoxa kyrkan var starkast i östra Europa, till exempel Grekland, Rumänien och Ryssland. Den katolska kyrkan var starkast i Västeuropa"
    },

    {
        id:"q15",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad är ett helgon?",
        options:[
            "En person som anses ha levt särskilt nära Gud och gjort mycket gott",
            "En person som alltid måste vara ledare för en kyrka eller församling",
            "En kung som bestämmer vilka högtider kristna människor ska fira",
            "Man kan faktiskt säga att mamma är något av ett helgon eftersom hon alltid är så snäll"
        ],
        correct:"En person som anses ha levt särskilt nära Gud och gjort mycket gott"
    },

    {
        id:"q16",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad var det Martin Luther kritiserade den katolska kyrkan för?",
        options:[
            "Han kritiserade bland annat avlatsbrev och att Bibeln inte översattes",
            "Han kritiserade att kyrkan hade för stränga regler för sin medlemmar",
            "Han kritiserade att kyrkan inte hade några präster eller gudstjänster",
            "Han kritiserade att kristna firade jul och påsk varje år"
        ],
        correct:"Han kritiserade bland annat avlatsbrev och att Bibeln inte översattes"
    },

    {
        id:"q17",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad innebar den protestantiska kyrkan, och vad protesterade de mot?",
        options:[
            "Den protestantiska kyrkan växte fram genom protester mot sådant man tyckte var fel i katolska kyrkan",
            "Den protestantiska kyrkan var en del av islam och protesterade mot alla kristna högtider",
            "Den protestantiska kyrkan ville att påven skulle få ännu mer makt över alla kungar",
            "Den protestantiska kyrkan betydde att man slutade använda Bibeln i gudstjänster"
        ],
        correct:"Den protestantiska kyrkan växte fram genom protester mot sådant man tyckte var fel i katolska kyrkan"
    },

    {
        id:"q18",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad var ett avlatsbrev?",
        options:[
            "Ett brev man kunde köpa för att få förlåtelse eller kortare straff för synder",
            "Ett brev som visade att man fick äga en egen Bibel hemma",
            "Ett brev från kejsaren som gav tillstånd att bygga kyrkor",
            "Ett brev som lärjungarna skickade till Jesus efter påsken"
        ],
        correct:"Ett brev man kunde köpa för att få förlåtelse eller kortare straff för synder"
    },

    {
        id:"q19",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad är treenigheten?",
        options:[
            "Att Gud är Fadern, Sonen och den heliga anden",
            "Att Bibeln består av tre stora delar som kallas evangelier",
            "Att kristna måste be tre gånger om dagen i kyrkan",
            "Att det finns tre olika kyrkor som alltid tror exakt likadant"
        ],
        correct:"Att Gud är Fadern, Sonen och den heliga anden"
    },

    {
        id:"q20",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad innebär den gyllene regeln?",
        options:[
            "Att man ska behandla andra som man själv vill bli behandlad",
            "Att man ska ge guld till kyrkan vid varje gudstjänst",
            "Att man bara behöver vara snäll mot personer med samma religion",
            "Att man alltid ska lyssna på sin lilla mamma och pappa, för de är väldigt kloka"
        ],
        correct:"Att man ska behandla andra som man själv vill bli behandlad"
    },

    {
        id:"q21",
        type:"mcq",
        topic:"Islam",
        text:"Vad var Mekka känt för under Muhammeds tid?",
        options:[
            "Mekka var en handelsstad och en viktig religiös plats med templet Kaba",
            "Mekka var romarrikets huvudstad och centrum för flera olika kristna kyrkor",
            "Mekka var en liten fiskeby där de flesta människor levde av havet och naturen",
            "Mekka var platsen där Bibeln först skrevs ner på arabiska"
        ],
        correct:"Mekka var en handelsstad och en viktig religiös plats med templet Kaba"
    },
    {
        id:"q22",
        type:"mcq",
        topic:"Islam",
        text:"Vem var Khadija och varför var hon så viktig?",
        options:[
            "Hon var Muhammeds fru, trodde honom och skrev ner det han sa till Koranen",
            "Hon var den första personen som byggde en moské i Medina",
            "Hon var en drottning som bestämde att alla i Mekka skulle bli muslimer",
            "Hon var en lärjunge som skrev ner hela Koranen tillsammans med Paulus"
        ],
        correct:"Hon var Muhammeds fru, trodde honom och skrev ner det han sa till Koranen"
    },
    {
        id:"q23",
        type:"mcq",
        topic:"Islam",
        text:"Varför fick Muhammed så många nya anhängare i Medina?",
        options:[
            "Islam hjälpte många att komma överens och skapade fred i Medina, det gjorde att många där blev muslimer",
            "Människorna i Medina hade redan byggt Kaba och väntade på att han skulle flytta dit",
            "Romarriket tvingade alla i Medina att följa Muhammeds budskap, annars blev de bannlysta och fick flytta",
            "Muhammed gav alla i Medina avlatsbrev som gjorde att de slapp betala skatt för 100 år framåt"
        ],
        correct:"Islam hjälpte många att komma överens och skapade fred i Medina, det gjorde att många där blev muslimer"
    },
    {
        id:"q24",
        type:"multiText",
        topic:"Islam",
        text:"Vad heter de två stora inriktningarna inom islam?",
        prompts:["Inriktning 1","Inriktning 2"],
        allow:[
            ["sunni","sunnimuslimer","sunniter"],
            ["shia","shiamuslimer","shiiter"]
        ],
        pointsEach:1,
        unique:true
    },
    {
        id:"q25",
        type:"mcq",
        topic:"Islam",
        text:"Vad heter muslimernas heliga byggnad?",
        options:[
            "Moské",
            "Kyrka",
            "Synagoga",
            "Tempel"
        ],
        correct:"Moské"
    },
    {
        id:"q26",
        type:"mcq",
        topic:"Islam",
        text:"Varför ska Koranen helst läsas på arabiska?",
        options:[
            "Eftersom det är Allahs ord och de får man inte ändra på, det kan också blir fel i översättning",
            "Eftersom arabiska är det enda språk som får användas inom islam",
            "Eftersom Koranen från början skrevs på latin men senare översattes till arabiska",
            "Eftersom det bara är personer från arabsika länder som får läsa Koranen"
        ],
        correct:"Eftersom det är Allahs ord och de får man inte ändra på, det kan också blir fel i översättning"
    },
    {
        id:"q27",
        type:"multiText",
        topic:"Islam",
        text:"Vilka är islams fem pelare?",
        allow:[
            ["trosbekännelsen","shahada","shahadah", "tro", "tron"],
            ["bönen","salah","salat", "bön", "be", "ber"],
            ["zakat","allmosa","skatten", "skatt"],
            ["fastan","ramadan","sawm", "fasta"],
            ["vallfärden","hajj","pilgrimsfärden till mecka", "vallfärd"]
        ],
        pointsEach:1,
        unique:true
    },
    {
        id:"q27b",
        type:"mcq",
        topic:"Islam",
        text:"Vad är de fem pelarna till för?",
        options:[
            "De visar viktiga handlingar och regler som hjälper muslimer att leva i sin tro",
            "De är fem byggnader i Mekka som alla muslimer måste besöka varje år",
            "De är fem böcker som tillsammans bildar hela Koranen",
            "De är fem olika gudar som muslimer ber till under veckan"
        ],
        correct:"De visar viktiga handlingar och regler som hjälper muslimer att leva i sin tro"
    },
    {
        id:"q28",
        type:"mcq",
        topic:"Islam",
        text:"Vad är det viktigaste i den muslimska trosbekännelsen?",
        options:[
            "Att det bara finns en Gud och att Muhammed är Guds profet",
            "Att alla muslimer måste fasta varje fredag hela året",
            "Att Koranen består av Gamla och Nya testamentet",
            "Att Medina är den enda heliga staden inom islam"
        ],
        correct:"Att det bara finns en Gud och att Muhammed är Guds profet"
    },
    {
        id:"q29",
        type:"mcq",
        topic:"Islam",
        text:"Vad kallas det torn som står bredvid moskéer och vad används det till?",
        options:[
            "Minaret, och den används traditionellt för att kalla till bön",
            "Altare, och det används för att läsa evangelierna högt",
            "Synagoga, och den används för att förvara Koranen",
            "Kaba, och den används som plats för nattvarden"
        ],
        correct:"Minaret, och den används traditionellt för att kalla till bön"
    },
    {
        id:"q30",
        type:"mcq",
        topic:"Islam",
        text:"Vilken stad vänder sig muslimer mot när de ber?",
        options:[
            "Mecka",
            "Medina",
            "Jerusalem",
            "Betlehem"
        ],
        correct:"Mecka"
    },
    {
        id:"q31",
        type:"mcq",
        topic:"Islam",
        text:"Vad är zakat?",
        options:[
            "En skatt som ges till de fattiga",
            "Att fasta under hela månaden ramadan",
            "Att resa till Mecka minst en gång i livet",
            "Att läsa Koranen på arabiska varje dag"
        ],
        correct:"En skatt som ges till de fattiga"
    },
    {
        id:"q32",
        type:"mcq",
        topic:"Islam",
        text:"Varför fastar man under ramadan?",
        options:[
            "För att komma närmare Gud, öva tålamod och tänka på dem som har det svårt",
            "För att visa att man inte behöver följa någon av de fem pelarna",
            "För att minnas när Jesus föddes i Betlehem enligt Koranen",
            "För att alla muslimer måste vara vakna hela natten i en månad"
        ],
        correct:"För att komma närmare Gud, öva tålamod och tänka på dem som har det svårt"
    },
    {
        id:"q33",
        type:"mcq",
        topic:"Islam",
        text:"Vilken är den viktigaste tanken inom islam?",
        options:[
            "Att det bara finns en Gud, Allah",
            "Att det finns många gudar som styr olika delar av världen",
            "Att Muhammed är Gud och därför ska tillbes",
            "Att alla heliga byggnader måste ligga i Mecka"
        ],
        correct:"Att det bara finns en Gud, Allah"
    },
    {
        id:"q34",
        type:"multiText",
        topic:"Islam",
        text:"Mecka, Medina och Jerusalem betraktas som heliga städer inom islam. Förklara kort varför.",
        prompts:["Mecka","Medina","Jerusalem"],
        allow:[
            ["kaba","vallfärd","muhammed föddes", "född", "föddes", "muhammed", "heligaste staden"],
            ["muhammed flyttade dit","första muslimska samhället","profetens stad", "muhammed", "begravdes", "begravs", "död", "dog"],
            ["muhammeds himmelsfärd","al aqsa","klippdomen", "klipptemplet", "helig stad"]
        ],
        pointsEach:1,
        unique:false
    },
    {
        id:"q35",
        type:"mcq",
        topic:"Islam",
        text:"Vad minns man under offerhögtiden?",
        options:[
            "Att Abraham var beredd att offra sin son men Gud stoppade honom",
            "Att Muhammed föddes i Medina och byggde den första kyrkan",
            "Att Moses tog emot de tio budorden på berget Sinai",
            "Att Jesus åt den sista måltiden med sina lärjungar"
        ],
        correct:"Att Abraham var beredd att offra sin son men Gud stoppade honom"
    },
    {
        id:"q36",
        type:"multiText",
        topic:"Islam",
        text:"Förklara orden halal och haram.",
        prompts:["Halal","Haram"],
        allow:[
            ["tillåtet","tillåten","sådant som är tillåtet", "rätt", "får", "göra", "nötkött"],
            ["förbjudet","förbjuden","sådant som är förbjudet", "får inte", "inte får", "griskött", "fel", "otillåtet", "inte tillåtet"]
        ],
        pointsEach:1,
        unique:false
    }
];