// Questions för instudering 2025 Höst - ARKIV
import { PRESETS } from './presets.js';

export const questions = [
  { id:"q1", type:"mcq", topic:"Geografi", text:"Vad betyder ordet konsumtion?",
    options:[
      "Att använda, köpa och förbruka varor och tjänster",
      "Att producera varor i en fabrik",
      "Att frakta varor mellan platser",
      "Att spara pengar"
    ],
    correct:"Att använda, köpa och förbruka varor och tjänster"
  },
  { id:"q2", type:"multiText", topic:"Hav", text:"Vilka är världens tre stora hav?",
    allow: PRESETS.oceans3, pointsEach: 1, unique:true,
  },
  { id:"q3", type:"listText", topic:"Hav", text:"Nämn 3 mindre hav i Europa.",
    count:3, allowList: PRESETS.seasEurope, pointsEach: 1, unique:true,
  },
  { id:"q4", type:"multiText", topic:"Energi", text:"Ge exempel på förnybara energikällor.",
    allow: PRESETS.renewableEnergy, pointsEach: 1, unique:true,
  },
  { id:"q5", type:"multiText", topic:"Världsdelar", text:"Nämn de olika världsdelarna.",
    prompts:["1","2","3","4","5","6","7"],
    allow: PRESETS.continents7, pointsEach:1, unique:true
  }
];

