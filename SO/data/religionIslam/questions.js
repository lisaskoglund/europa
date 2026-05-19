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
            "En påminnelse om Jesu kropp och blod, ett förbund mellan människor och Jesus. Brödet symboliserar hans kropp och vinet symboliserar hans blod.",
            "En högtid där lärjungarna firade att romarna till slut hade lämnat Jerusalem och att alla kristna blivit fria till slut.",
            "En måltid där Jesus bestämde att alla kristna alltid måste fasta innan de går till kyrkan för att sedan kunna ta nattvarden.",
            "En ceremoni där prästerna valde vilka personer som fick läsa ur Bibeln och undervisa andra och vara förebilder för yngre församlingsmedlemmar."
        ],
        correct:"En påminnelse om Jesu kropp och blod, ett förbund mellan människor och Jesus. Brödet symboliserar hans kropp och vinet symboliserar hans blod."
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
            "De var osäkra på om Jesus verkligen levde igen men blev övertygade efter att han visat sig för dem flera gånger. Det var också förbjudet och farligt att vara kristen.",
            "De var rädda för att de skulle tvingas lämna Jerusalem nu när Jesus var död och därmed aldrig få återvända till sina familjer igen.",
            "De trodde att romarna skulle förbjuda alla människor att läsa Bibeln och stänga alla kyrkor.",
            "De var oroliga för att de inte längre skulle få träffa varandra eller samlas till gudstjänster, men även för att Jesus inte längre kunde ledsaga dem."
        ],
        correct:"De var osäkra på om Jesus verkligen levde igen men blev övertygade efter att han visat sig för dem flera gånger. Det var också förbjudet och farligt att vara kristen."
    },

    {
        id:"q11",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad hände med lärjungarna femtio dagar efter påsk?",
        options:[
            "De blev uppfyllda av glädje och kraft när de fick den heliga anden och började berätta om Jesus och sprida hans lära.",
            "De reste tillbaka till Betlehem för att skriva ner alla berättelser om Jesu liv i en ny bok, det som sedan blev bibeln.",
            "De gömde sig undan romarna och slutade träffas eftersom de fortfarande var mycket räddaför att bli förföljda och dödade.",
            "De byggde den första stora kyrkan i Jerusalem där alla människor kunde samlas till bön."
        ],
        correct:"De blev uppfyllda av glädje och kraft när de fick den heliga anden och började berätta om Jesus och sprida hans lära."
    },

    {
        id:"q12",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vilka var orsakerna till att kristendomen snabbt fick så stor spridning i romarriket?",
        options:[
            "Kristendomen gav människovärde till slavarna, kvinnor var lika välkomna som män och religionen gav hopp om ett liv efter döden.",
            "Alla romerska kejsare blev kristna och bestämde då tidigt att hela romarriket skulle bli kristet och följa Bibeln.",
            "Kristendomen spreds mest genom att stora arméer reste runt och byggde kyrkor i alla städer, folket tyckte att det var ett bra sätt att träffas på.",
            "De kristna använde samma tempel som romarna och därför började alla automatiskt tro på Jesus."
        ],
        correct:"Kristendomen gav människovärde till slavarna, kvinnor var lika välkomna som män och religionen gav hopp om ett liv efter döden."
    },

    {
        id:"q13",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vem var Paulus och varför var han viktig för kristendomen?",
        options:[
            "Han var farisé och tyckte illa om kristna men efter en upplevelse av Jesus började han sprida kristendomen.",
            "Han var en av Jesu första lärjungar och skrev hela Gamla testamentet medan Jesus fortfarande levde.",
            "Han var en romersk kejsare som bestämde att alla människor i Europa skulle bli kristna, annars blev de bannlysta.",
            "Han var överstepräst i Jerusalem och ansvarade för att bygga de första stora kyrkorna. De blev väldigt välbesökta."
        ],
        correct:"Han var farisé och tyckte illa om kristna men efter en upplevelse av Jesus började han sprida kristendomen."
    },

    {
        id:"q14",
        type:"mcq",
        topic:"Kristendomen",
        text:"Var i Europa var den ortodoxa kyrkan starkast och var var den katolska kyrkan starkast?",
        options:[
            "Den ortodoxa kyrkan var starkast i östra Europa, till exempel Grekland, Rumänien och Ryssland. Den katolska kyrkan var starkast i Västeuropa.",
            "Den ortodoxa kyrkan var starkast i Norden medan den katolska kyrkan mest fanns i Mellanöstern och Afrika.",
            "Den ortodoxa och katolska kyrkan var ungefär lika starka i alla delar av Europa under samma tid.",
            "Den ortodoxa kyrkan fanns bara i Ryssland medan den katolska kyrkan bara fanns i Italien och Spanien."
        ],
        correct:"Den ortodoxa kyrkan var starkast i östra Europa, till exempel Grekland, Rumänien och Ryssland. Den katolska kyrkan var starkast i Västeuropa."
    },

    {
        id:"q15",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad är ett helgon?",
        options:[
            "Människor som levt ett särskilt gott och kärleksfullt liv och som anses stå nära Gud.",
            "Personer som alltid leder gudstjänster och bestämmer vilka regler som ska gälla i kyrkan.",
            "Kungar och drottningar som hjälpt kristendomen att spridas över hela Europa genom historien.",
            "Människor som skrivit delar av Bibeln och därför får bestämma över andra kristna."
        ],
        correct:"Människor som levt ett särskilt gott och kärleksfullt liv och som anses stå nära Gud."
    },

    {
        id:"q16",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad var det Martin Luther kritiserade den katolska kyrkan för?",
        options:[
            "Han kritiserade bland annat avlatsbreven och att människor inte kunde läsa Bibeln på sitt eget språk.",
            "Han kritiserade att kyrkan hade för få präster och att gudstjänsterna var för korta och enkla.",
            "Han kritiserade att kristna firade för många högtider och använde för många symboler i kyrkorna.",
            "Han kritiserade att kyrkan inte längre trodde på Jesus och därför ville han skapa en ny religion."
        ],
        correct:"Han kritiserade bland annat avlatsbreven och att människor inte kunde läsa Bibeln på sitt eget språk."
    },

    {
        id:"q17",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad innebar den protestantiska kyrkan, och vad protesterade de mot?",
        options:[
            "De protesterade mot den katolska kyrkan och menade att människans egen tro på Gud var viktig och att Bibeln skulle översättas.",
            "De protesterade mot att människor gick i kyrkan och tyckte att alla högtider skulle förbjudas.",
            "De protesterade mot att Jesus nämndes i Bibeln och ville istället fokusera på Gamla testamentet.",
            "De protesterade mot att människor bad för mycket och ville att alla skulle sluta gå till gudstjänster."
        ],
        correct:"De protesterade mot den katolska kyrkan och menade att människans egen tro på Gud var viktig och att Bibeln skulle översättas."
    },

    {
        id:"q18",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad var ett avlatsbrev?",
        options:[
            "Ett brev man kunde köpa för att få förlåtelse eller kortare straff för synder.",
            "Ett brev som visade att en person fått tillstånd att läsa och tolka Bibeln offentligt.",
            "Ett brev från prästerna som användes för att kalla människor till kyrkan under högtider.",
            "Ett dokument som visade att någon blivit medlem i den protestantiska kyrkan."
        ],
        correct:"Ett brev man kunde köpa för att få förlåtelse eller kortare straff för synder."
    },

    {
        id:"q19",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad är treenigheten?",
        options:[
            "Fadern, Sonen och den heliga anden. Att Gud visar sig på tre olika sätt.",
            "Tre viktiga delar av Bibeln som alla kristna måste läsa varje vecka i kyrkan.",
            "Tre särskilda regler som präster och munkar måste följa i den katolska kyrkan.",
            "Tre stora kyrkor i världen som tillsammans leder alla kristna människor."
        ],
        correct:"Fadern, Sonen och den heliga anden. Att Gud visar sig på tre olika sätt."
    },

    {
        id:"q20",
        type:"mcq",
        topic:"Kristendomen",
        text:"Vad innebär den gyllene regeln?",
        options:[
            "Allt ni vill att människor ska göra för er ska ni också göra för dem.",
            "Att människor alltid ska ge pengar till kyrkan för att hjälpa andra som är fattiga.",
            "Att alla kristna måste följa samma regler och leva på exakt samma sätt.",
            "Att man bara behöver vara snäll mot människor som tror på samma religion."
        ],
        correct:"Allt ni vill att människor ska göra för er ska ni också göra för dem."
    },

    {
        id:"q21",
        type:"mcq",
        topic:"Islam",
        text:"Vad var Mekka känt för under Muhammeds tid?",
        options:[
            "Det var en helig stad där det fanns många tempel och det mest berömda hette Kaba.",
            "Det var den största kristna staden i Mellanöstern där människor samlades för nattvard.",
            "Det var en liten stad där nästan alla människor arbetade som fiskare och bönder.",
            "Det var platsen där romarna byggde sina största tempel och palats i Arabien."
        ],
        correct:"Det var en helig stad där det fanns många tempel och det mest berömda hette Kaba."
    },
    {
        id:"q22",
        type:"mcq",
        topic:"Islam",
        text:"Vem var Khadidja och varför var hon så viktig?",
        options:[
            "Hon var Muhammeds fru och hjälpte till att skriva ner det Muhammed berättade till Koranen.",
            "Hon var den första kvinnliga ledaren för en moské i Mekka och byggde många tempel.",
            "Hon var en drottning som styrde Medina och bestämde att alla skulle bli muslimer.",
            "Hon var Muhammeds dotter som reste runt och spred islam till hela Europa."
        ],
        correct:"Hon var Muhammeds fru och hjälpte till att skriva ner det Muhammed berättade till Koranen."
    },
    {
        id:"q23",
        type:"mcq",
        topic:"Islam",
        text:"Varför fick Muhammed så många nya anhängare i Medina?",
        options:[
            "Islam bidrog till att hjälpa människor att komma överens och skapa fred och ordning i samhället.",
            "Människorna i Medina blev tvingade av romarna att följa Muhammed och läsa Koranen.",
            "Alla människor i Medina arbetade redan i moskéer och ville därför bli religiösa ledare.",
            "Muhammed lovade att alla som blev muslimer skulle få rikedomar och slippa arbeta."
        ],
        correct:"Islam bidrog till att hjälpa människor att komma överens och skapa fred och ordning i samhället."
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
            "Muslimer tror att Koranen är Guds ord och att översättningar kan förändra betydelsen.",
            "Arabiska är det enda språk som får användas i alla religioner och i alla heliga byggnader.",
            "Koranen skrevs först på latin men översattes senare till arabiska av Muhammeds lärjungar.",
            "Endast människor som bor i Arabien får egentligen läsa Koranen och förstå dess innehåll."
        ],
        correct:"Muslimer tror att Koranen är Guds ord och att översättningar kan förändra betydelsen."
    },
    {
        id:"q27",
        type:"mcq",
        topic:"Islam",
        text:"Vad är de fem pelarna till för?",
        options:[
            "De är viktiga levnadsregler inom islam som hjälper en muslim att hålla fast vid sin tro.",
            "De är fem stora byggnader i Mekka som alla muslimer måste besöka varje år tillsammans.",
            "De är fem berättelser i Koranen som handlar om Muhammeds liv och hans familj.",
            "De är fem särskilda präster som leder alla moskéer och bestämmer regler inom islam."
        ],
        correct:"De är viktiga levnadsregler inom islam som hjälper en muslim att hålla fast vid sin tro."
    },
    {
        id:"q28",
        type:"mcq",
        topic:"Islam",
        text:"Vad är det viktigaste i den muslimska trosbekännelsen?",
        options:[
            "Att det bara finns en Gud och att Muhammed är hans profet.",
            "Att alla muslimer måste fasta varje fredag under hela året för att visa sin tro.",
            "Att Koranen består av både Gamla och Nya testamentet precis som Bibeln gör.",
            "Att Medina är den viktigaste staden och att alla muslimer måste flytta dit."
        ],
        correct:"Att det bara finns en Gud och att Muhammed är hans profet."
    },
    {
        id:"q29",
        type:"mcq",
        topic:"Islam",
        text:"Vad kallas det torn som står bredvid moskéer och vad används det till?",
        options:[
            "Minaret, och den används till böneutrop för att kalla människor till bön.",
            "Altare, och det används för att läsa upp evangelierna under gudstjänster i kyrkan.",
            "Synagoga, och det används som plats där man förvarar Koranen och religiösa texter.",
            "Kaba, och det används som plats där människor samlas för att fira nattvard."
        ],
        correct:"Minaret, och den används till böneutrop för att kalla människor till bön."
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
            "Det är pengar eller hjälp som muslimer ska ge till fattiga och behövande människor.",
            "Det är den resa som alla muslimer måste göra till Mecka minst en gång i livet.",
            "Det är den fasta som muslimer genomför under ramadan för att visa sin tro.",
            "Det är en särskild bön som bara religiösa ledare får läsa i moskéerna."
        ],
        correct:"Det är pengar eller hjälp som muslimer ska ge till fattiga och behövande människor."
    },
    {
        id:"q32",
        type:"mcq",
        topic:"Islam",
        text:"Varför fastar man under ramadan?",
        options:[
            "För att förstå hur det känns att vara fattig och hungrig och för att komma närmare Gud.",
            "För att visa att man klarar sig utan mat och därför inte behöver hjälpa fattiga människor.",
            "För att alla muslimer måste vara vakna hela nätterna och läsa hela Koranen varje dag.",
            "För att minnas när Muhammed byggde den första moskén tillsammans med sina lärjungar."
        ],
        correct:"För att förstå hur det känns att vara fattig och hungrig och för att komma närmare Gud."
    },
    {
        id:"q33",
        type:"mcq",
        topic:"Islam",
        text:"Vilken är den viktigaste tanken inom islam?",
        options:[
            "Att Gud är en och att Allah har skapat världen och människorna.",
            "Att det finns flera olika gudar som styr olika delar av världen och naturen.",
            "Att Muhammed själv är Gud och därför ska tillbes av alla människor.",
            "Att alla heliga byggnader i världen måste ligga i samma stad för att vara viktiga."
        ],
        correct:"Att Gud är en och att Allah har skapat världen och människorna."
    },
    {
        id:"q34",
        type:"multiText",
        topic:"Islam",
        text:"Mecka, Medina och Jerusalem betraktas som heliga städer inom islam. Förklara kort varför.",
        prompts:["Mecka","Medina","Jerusalem"],
        allow:[
            ["kaba","vallfärd","muhammed föddes","heligaste staden"],
            ["muhammed flyttade dit","första muslimska samhället","profetens stad"],
            ["muhammeds himmelsfärd","al aqsa","klippdomen","helig stad"]
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
            "Man minns när Abraham skulle offra sin son till Gud och firar med en festmåltid.",
            "Man minns när Muhammed föddes och därför dekoreras alla moskéer med ljus och blommor.",
            "Man minns när Koranen skrevs färdigt och därför läser man hela boken under en vecka.",
            "Man minns när Jesus åt den sista måltiden med sina lärjungar före påsken."
        ],
        correct:"Man minns när Abraham skulle offra sin son till Gud och firar med en festmåltid."
    },
    {
        id:"q36",
        type:"multiText",
        topic:"Islam",
        text:"Förklara orden halal och haram.",
        prompts:["Halal","Haram"],
        allow:[
            ["tillåtet","tillåten","sådant som är tillåtet"],
            ["förbjudet","förbjuden","sådant som är förbjudet"]
        ],
        pointsEach:1,
        unique:false
    }
];