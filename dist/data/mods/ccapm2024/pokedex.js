"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var pokedex_exports = {};
__export(pokedex_exports, {
  Pokedex: () => Pokedex
});
module.exports = __toCommonJS(pokedex_exports);
const Pokedex = {
  spreetah: {
    num: 2001,
    name: "Spreetah",
    types: ["Electric", "Fire"],
    baseStats: { hp: 64, atk: 90, def: 54, spa: 90, spd: 54, spe: 150 },
    abilities: { 0: "Momentum" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  raintoad: {
    num: 2002,
    name: "Raintoad",
    types: ["Normal"],
    baseStats: { hp: 110, atk: 90, def: 70, spa: 70, spd: 80, spe: 90 },
    abilities: { 0: "Color Wheel" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  pomegrenade: {
    num: 2003,
    name: "Pomegrenade",
    types: ["Fire", "Fairy"],
    baseStats: { hp: 120, atk: 50, def: 85, spa: 105, spd: 70, spe: 85 },
    abilities: { 0: "Mind Bloom" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  surfsurge: {
    num: 2004,
    name: "Surfsurge",
    types: ["Water", "Electric"],
    baseStats: { hp: 86, atk: 74, def: 110, spa: 128, spd: 74, spe: 68 },
    abilities: { 0: "Strong Breeze" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  anxiousoil: {
    num: 2005,
    name: "Anxiousoil",
    types: ["Ground", "Ghost"],
    baseStats: { hp: 80, atk: 130, def: 65, spa: 130, spd: 65, spe: 115 },
    abilities: { 0: "Troubled" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  depresloth: {
    num: 2006,
    name: "Depresloth",
    types: ["Electric", "Ghost"],
    baseStats: { hp: 111, atk: 105, def: 65, spa: 115, spd: 75, spe: 74 },
    abilities: { 0: "Exhaust" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  obsallas: {
    num: 2007,
    name: "Obsallas",
    types: ["Rock", "Normal"],
    baseStats: { hp: 102, atk: 92, def: 69, spa: 52, spd: 70, spe: 112 },
    abilities: { 0: "Crumble" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  nharboard: {
    num: 2008,
    name: "Nharboard",
    types: ["Water", "Steel"],
    baseStats: { hp: 120, atk: 90, def: 70, spa: 100, spd: 50, spe: 60 },
    abilities: { 0: "First-Class Ticket" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  lampyre: {
    num: 2009,
    name: "Lampyre",
    types: ["Steel", "Fire"],
    baseStats: { hp: 50, atk: 45, def: 100, spa: 145, spd: 100, spe: 80 },
    abilities: { 0: "Night Light" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  noyew: {
    num: 2010,
    name: "Noyew",
    types: ["Grass", "Steel"],
    baseStats: { hp: 64, atk: 51, def: 116, spa: 51, spd: 116, spe: 42 },
    abilities: { 0: "Back at Ya!" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  underhazard: {
    num: 2011,
    name: "Underhazard",
    types: ["Dark", "Poison"],
    baseStats: { hp: 140, atk: 95, def: 75, spa: 100, spd: 80, spe: 40 },
    abilities: { 0: "Countermeasures" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  bleyabat: {
    num: 2012,
    name: "Bleyabat",
    types: ["Ghost", "Flying"],
    baseStats: { hp: 125, atk: 95, def: 110, spa: 55, spd: 100, spe: 55 },
    abilities: { 0: "Night Light" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  nectaregal: {
    num: 2013,
    name: "Nectaregal",
    types: ["Grass", "Electric"],
    baseStats: { hp: 80, atk: 45, def: 80, spa: 90, spd: 100, spe: 70 },
    abilities: { 0: "Electromagnetic Manipulation" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  nummanutts: {
    num: 2014,
    name: "Nummanutts",
    types: ["Poison", "Dark"],
    baseStats: { hp: 80, atk: 80, def: 100, spa: 100, spd: 120, spe: 40 },
    abilities: { 0: "Dice Roller" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  mosstrosity: {
    num: 2015,
    name: "Mosstrosity",
    types: ["Dark", "Grass"],
    baseStats: { hp: 70, atk: 110, def: 50, spa: 100, spd: 70, spe: 130 },
    abilities: { 0: "Clinch" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  faellen: {
    num: 2016,
    name: "Faellen",
    types: ["Fairy", "Dark"],
    baseStats: { hp: 80, atk: 60, def: 65, spa: 130, spd: 100, spe: 115 },
    abilities: { 0: "Broken Wand" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  nucleophage: {
    num: 2017,
    name: "Nucleophage",
    types: ["Poison", "Psychic"],
    baseStats: { hp: 60, atk: 100, def: 50, spa: 130, spd: 60, spe: 125 },
    abilities: { 0: "Diseased" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  tardeblade: {
    num: 2018,
    name: "Tardeblade",
    types: ["Steel", "Psychic"],
    baseStats: { hp: 130, atk: 90, def: 90, spa: 80, spd: 80, spe: 50 },
    abilities: { 0: "Hibernation" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  bugsome: {
    num: 2019,
    name: "Bugsome",
    types: ["Bug"],
    baseStats: { hp: 89, atk: 110, def: 90, spa: 60, spd: 70, spe: 136 },
    abilities: { 0: "Stat Leeching" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  pestifer: {
    num: 2020,
    name: "Pestifer",
    types: ["Poison", "Ground"],
    baseStats: { hp: 110, atk: 50, def: 100, spa: 130, spd: 55, spe: 96 },
    abilities: { 0: "Contagious" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  fungemory: {
    num: 2021,
    name: "Fungemory",
    types: ["Psychic", "Ghost"],
    baseStats: { hp: 66, atk: 106, def: 66, spa: 116, spd: 166, spe: 46 },
    abilities: { 0: "Sealed Off" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  guarden: {
    num: 2022,
    name: "Guarden",
    types: ["Steel", "Grass"],
    baseStats: { hp: 94, atk: 119, def: 120, spa: 42, spd: 52, spe: 73 },
    abilities: { 0: "Royal Guard" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  hawksectiff: {
    num: 2023,
    name: "Hawksectiff",
    types: ["Dark", "Flying"],
    baseStats: { hp: 110, atk: 125, def: 90, spa: 65, spd: 80, spe: 75 },
    abilities: { 0: "Pecking Order" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  boogeymancer: {
    num: 2024,
    name: "Boogeymancer",
    types: ["Ghost", "Fire"],
    baseStats: { hp: 65, atk: 118, def: 63, spa: 112, spd: 65, spe: 122 },
    abilities: { 0: "Broken Wand" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  cliffilisk: {
    num: 2025,
    name: "Cliffilisk",
    types: ["Rock", "Dragon"],
    baseStats: { hp: 140, atk: 148, def: 132, spa: 40, spd: 62, spe: 28 },
    abilities: { 0: "Crumble" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  aesap: {
    num: 2026,
    name: "Aesap",
    types: ["Dark", "Fairy"],
    baseStats: { hp: 75, atk: 115, def: 100, spa: 70, spd: 120, spe: 120 },
    abilities: { 0: "Exhaust" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  delirirak: {
    num: 2027,
    name: "Delirirak",
    types: ["Ice", "Ghost"],
    baseStats: { hp: 75, atk: 115, def: 55, spa: 130, spd: 100, spe: 115 },
    abilities: { 0: "Fumigation" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  lazahrusk: {
    num: 2028,
    name: "Lazahrusk",
    types: ["Bug", "Ghost"],
    baseStats: { hp: 89, atk: 105, def: 140, spa: 105, spd: 106, spe: 20 },
    abilities: { 0: "Diseased" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  cogwyld: {
    num: 2029,
    name: "Cogwyld",
    types: ["Dark", "Steel"],
    baseStats: { hp: 97, atk: 102, def: 87, spa: 72, spd: 87, spe: 97 },
    abilities: { 0: "Self-Repair" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  folibower: {
    num: 2030,
    name: "Folibower",
    types: ["Flying", "Grass"],
    baseStats: { hp: 90, atk: 101, def: 83, spa: 85, spd: 70, spe: 106 },
    abilities: { 0: "Treasure Craze" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  araquisis: {
    num: 2031,
    name: "Araquisis",
    types: ["Psychic", "Dark"],
    baseStats: { hp: 109, atk: 117, def: 92, spa: 80, spd: 88, spe: 38 },
    abilities: { 0: "Precognition" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  liwyzard: {
    num: 2032,
    name: "Liwyzard",
    types: ["Dragon", "Fairy"],
    baseStats: { hp: 75, atk: 75, def: 75, spa: 100, spd: 100, spe: 100 },
    abilities: { 0: "Magic Missile" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  shail: {
    num: 2033,
    name: "Shail",
    types: ["Ice", "Ground"],
    baseStats: { hp: 55, atk: 65, def: 113, spa: 101, spd: 124, spe: 41 },
    abilities: { 0: "Snowhazard" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  fightinfly: {
    num: 2034,
    name: "Fightinfly",
    types: ["Bug", "Fighting"],
    baseStats: { hp: 60, atk: 110, def: 70, spa: 105, spd: 70, spe: 115 },
    abilities: { 0: "Nocturnal" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  arthrostrike: {
    num: 2035,
    name: "Arthrostrike",
    types: ["Bug", "Fighting"],
    baseStats: { hp: 80, atk: 120, def: 85, spa: 50, spd: 65, spe: 60 },
    abilities: { 0: "Preeminence" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  magmouth: {
    num: 2036,
    name: "Magmouth",
    types: ["Ground", "Normal"],
    baseStats: { hp: 144, atk: 60, def: 100, spa: 90, spd: 53, spe: 20 },
    abilities: { 0: "Searing Remark" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  orchidauntless: {
    num: 2037,
    name: "Orchidauntless",
    types: ["Grass", "Psychic"],
    baseStats: { hp: 84, atk: 121, def: 76, spa: 118, spd: 79, spe: 121 },
    abilities: { 0: "Dewdrop" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  boillusk: {
    num: 2038,
    name: "Boillusk",
    types: ["Water", "Fire"],
    baseStats: { hp: 88, atk: 86, def: 132, spa: 96, spd: 118, spe: 20 },
    abilities: { 0: "Absorber" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  minkai: {
    num: 2039,
    name: "Minkai",
    types: ["Fighting", "Ice"],
    baseStats: { hp: 80, atk: 60, def: 110, spa: 120, spd: 60, spe: 110 },
    abilities: { 0: "Nocturnal" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  shurifluri: {
    num: 2040,
    name: "Shurifluri",
    types: ["Ice", "Steel"],
    baseStats: { hp: 66, atk: 128, def: 54, spa: 78, spd: 78, spe: 108 },
    abilities: { 0: "Snowhazard" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  roolette: {
    num: 2041,
    name: "Roolette",
    types: ["Normal", "Fighting"],
    baseStats: { hp: 100, atk: 120, def: 75, spa: 100, spd: 75, spe: 100 },
    abilities: { 0: "Spin the Wheel" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  frenzaiai: {
    num: 2042,
    name: "Frenzaiai",
    types: ["Normal", "Poison"],
    baseStats: { hp: 83, atk: 95, def: 85, spa: 80, spd: 92, spe: 110 },
    abilities: { 0: "Asymmetry" },
    weightkg: 50,
    prevo: "Grafaiai",
    evoType: "levelFriendship",
    eggGroups: ["Undiscovered"]
  },
  buffball: {
    num: 2043,
    name: "Buffball",
    types: ["Fighting", "Bug"],
    baseStats: { hp: 101, atk: 127, def: 71, spa: 103, spd: 71, spe: 97 },
    abilities: { 0: "Preparation" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  rootfraction: {
    num: 2044,
    name: "Rootfraction",
    types: ["Grass", "Poison"],
    baseStats: { hp: 95, atk: 60, def: 94, spa: 121, spd: 94, spe: 66 },
    abilities: { 0: "Refraction" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  remnant: {
    num: 2045,
    name: "Remnant",
    types: ["Ghost"],
    baseStats: { hp: 75, atk: 75, def: 145, spa: 75, spd: 155, spe: 75 },
    abilities: { 0: "Night March" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  marlord: {
    num: 2046,
    name: "Marlord",
    types: ["Steel", "Fighting"],
    baseStats: { hp: 91, atk: 124, def: 67, spa: 67, spd: 118, spe: 74 },
    abilities: { 0: "Polychrome" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  marsonmallow: {
    num: 2047,
    name: "Marsonmallow",
    types: ["Fairy", "Fire"],
    baseStats: { hp: 72, atk: 107, def: 96, spa: 91, spd: 136, spe: 23 },
    abilities: { 0: "big stick" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  trawlutre: {
    num: 2048,
    name: "Trawlutre",
    types: ["Water", "Fighting"],
    baseStats: { hp: 72, atk: 104, def: 75, spa: 94, spd: 75, spe: 120 },
    abilities: { 0: "Super Rod" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  manticrash: {
    num: 2049,
    name: "Manticrash",
    types: ["Normal", "Ground"],
    baseStats: { hp: 105, atk: 108, def: 86, spa: 71, spd: 89, spe: 42 },
    abilities: { 0: "Comeback" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  ichthyocorn: {
    num: 2050,
    name: "Ichthyocorn",
    types: ["Water", "Fairy"],
    baseStats: { hp: 85, atk: 60, def: 85, spa: 80, spd: 105, spe: 105 },
    abilities: { 0: "Capricious" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  cryobser: {
    num: 2051,
    name: "Cryobser",
    types: ["Normal", "Ice"],
    baseStats: { hp: 113, atk: 70, def: 91, spa: 70, spd: 111, spe: 50 },
    abilities: { 0: "Medic" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  skibidragon: {
    num: 2052,
    name: "Skibidragon",
    types: ["Dragon"],
    baseStats: { hp: 90, atk: 90, def: 98, spa: 105, spd: 92, spe: 125 },
    abilities: { 0: "Bathroom Break" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  tuxquito: {
    num: 2053,
    name: "Tuxquito",
    types: ["Bug", "Flying"],
    baseStats: { hp: 95, atk: 100, def: 75, spa: 110, spd: 75, spe: 145 },
    abilities: { 0: "Bloodsucking" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  cosmole: {
    num: 2054,
    name: "Cosmole",
    types: ["Ground", "Psychic"],
    baseStats: { hp: 124, atk: 108, def: 79, spa: 61, spd: 79, spe: 89 },
    abilities: { 0: "Quick Thinking" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  suragon: {
    num: 2055,
    name: "Suragon",
    types: ["Psychic", "Dragon"],
    baseStats: { hp: 80, atk: 70, def: 70, spa: 122, spd: 122, spe: 86 },
    abilities: { 0: "Antimatter" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  shufflux: {
    num: 2056,
    name: "Shufflux",
    types: ["Fairy", "Normal"],
    baseStats: { hp: 92, atk: 60, def: 60, spa: 114, spd: 124, spe: 84 },
    abilities: { 0: "Draw Four" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  mindwyrm: {
    num: 2057,
    name: "Mindwyrm",
    types: ["Bug", "Dragon"],
    baseStats: { hp: 120, atk: 120, def: 90, spa: 60, spd: 90, spe: 90 },
    abilities: { 0: "Quick Thinking" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  crashtank: {
    num: 2058,
    name: "Crashtank",
    types: ["Normal"],
    baseStats: { hp: 60, atk: 100, def: 140, spa: 50, spd: 120, spe: 70 },
    abilities: { 0: "Brace for Impact" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  leviadon: {
    num: 2059,
    name: "Leviadon",
    types: ["Dragon"],
    baseStats: { hp: 131, atk: 91, def: 66, spa: 140, spd: 61, spe: 61 },
    abilities: { 0: "Gangster" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  oonoonsi: {
    num: 2060,
    name: "Oonoonsi",
    types: ["Bug", "Psychic"],
    baseStats: { hp: 73, atk: 65, def: 85, spa: 125, spd: 135, spe: 80 },
    abilities: { 0: "Puppet Master" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  contradox: {
    num: 2061,
    name: "Contradox",
    types: ["Ice", "Psychic"],
    baseStats: { hp: 85, atk: 120, def: 85, spa: 100, spd: 70, spe: 106 },
    abilities: { 0: "Antimatter" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  roddammit: {
    num: 2062,
    name: "Roddammit",
    types: ["Dark", "Grass"],
    baseStats: { hp: 75, atk: 130, def: 134, spa: 95, spd: 86, spe: 45 },
    abilities: { 0: "Outclass" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  },
  rizzquaza: {
    num: 2063,
    name: "Rizzquaza",
    types: ["Dragon", "Water"],
    baseStats: { hp: 110, atk: 80, def: 95, spa: 75, spd: 90, spe: 90 },
    abilities: { 0: "Iron Fistening" },
    weightkg: 50,
    eggGroups: ["Undiscovered"]
  }
};
//# sourceMappingURL=pokedex.js.map
