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
var scripts_exports = {};
__export(scripts_exports, {
  Scripts: () => Scripts
});
module.exports = __toCommonJS(scripts_exports);
const Scripts = {
  gen: 9,
  inherit: "gen9",
  init() {
    for (const id in this.data.Pokedex) {
      const types = Array.from(new Set(this.data.Pokedex[id].types.map((type) => type.replace(/(Ghost|Fairy)/g, "Psychic").replace(/Bug/g, "Grass").replace(/Ice/g, "Water").replace(/(Rock|Ground)/g, "Fighting").replace(/Flying/g, "Normal").replace(/Poison/g, "Dark"))));
      this.modData("Pokedex", id).types = types;
    }
    for (const id in this.data.Moves) {
      const move = this.data.Moves[id];
      const type = move.type.replace(/(Ghost|Fairy)/g, "Psychic").replace(/Bug/g, "Grass").replace(/Ice/g, "Water").replace(/(Rock|Ground)/g, "Fighting").replace(/Flying/g, "Normal").replace(/Poison/g, "Dark");
      this.modData("Moves", id).type = type;
    }
    for (const id in this.data.Items) {
      const item = this.data.Items[id];
      if (item.onPlate) {
        const type = item.onPlate.replace(/(Ghost|Fairy)/g, "Psychic").replace(/Bug/g, "Grass").replace(/Ice/g, "Water").replace(/(Rock|Ground)/g, "Fighting").replace(/Flying/g, "Normal").replace(/Poison/g, "Dark");
        this.modData("Items", id).onPlate = type;
      }
      if (item.onDrive) {
        const type = item.onDrive.replace(/(Ghost|Fairy)/g, "Psychic").replace(/Bug/g, "Grass").replace(/Ice/g, "Water").replace(/(Rock|Ground)/g, "Fighting").replace(/Flying/g, "Normal").replace(/Poison/g, "Dark");
        this.modData("Items", id).onDrive = type;
      }
      if (item.onMemory) {
        const type = item.onMemory.replace(/(Ghost|Fairy)/g, "Psychic").replace(/Bug/g, "Grass").replace(/Ice/g, "Water").replace(/(Rock|Ground)/g, "Fighting").replace(/Flying/g, "Normal").replace(/Poison/g, "Dark");
        this.modData("Items", id).onMemory = type;
      }
      if (item.zMoveType) {
        const type = item.zMoveType.replace(/(Ghost|Fairy)/g, "Psychic").replace(/Bug/g, "Grass").replace(/Ice/g, "Water").replace(/(Rock|Ground)/g, "Fighting").replace(/Flying/g, "Normal").replace(/Poison/g, "Dark");
        this.modData("Items", id).zMoveType = type;
      }
      if (item.naturalGift) {
        const type = item.naturalGift.type.replace(/(Ghost|Fairy)/g, "Psychic").replace(/Bug/g, "Grass").replace(/Ice/g, "Water").replace(/(Rock|Ground)/g, "Fighting").replace(/Flying/g, "Normal").replace(/Poison/g, "Dark");
        const overriddenBerries = [
          "chartiberry",
          "cobaberry",
          "kasibberry",
          "kebiaberry",
          "roseliberry",
          "shucaberry",
          "tangaberry",
          "yacheberry"
        ];
        if (overriddenBerries.includes(id)) {
          this.modData("Items", id).naturalGift = { ...item.naturalGift, type };
        } else {
          this.modData("Items", id).naturalGift.type = type;
        }
      }
    }
  },
  pokemon: {
    hasType(type) {
      const thisTypes = this.getTypes();
      if (typeof type === "string") {
        return thisTypes.includes(type.replace(/(Ghost|Fairy)/g, "Psychic").replace(/Bug/g, "Grass").replace(/Ice/g, "Water").replace(/(Rock|Ground)/g, "Fighting").replace(/Flying/g, "Normal").replace(/Poison/g, "Dark"));
      }
      for (const typeName of type) {
        if (thisTypes.includes(typeName.replace(/(Ghost|Fairy)/g, "Psychic").replace(/Bug/g, "Grass").replace(/Ice/g, "Water").replace(/(Rock|Ground)/g, "Fighting").replace(/Flying/g, "Normal").replace(/Poison/g, "Dark"))) {
          return true;
        }
      }
      return false;
    },
    runImmunity(source, message) {
      if (!source) return true;
      const type = typeof source !== "string" ? source.type : source;
      if (typeof source !== "string") {
        if (source.ignoreImmunity && (source.ignoreImmunity === true || source.ignoreImmunity[type])) {
          return true;
        }
      }
      if (!type || type === "???") return true;
      if (!this.battle.dex.types.isName(type)) {
        throw new Error("Use runStatusImmunity for " + type);
      }
      const negateImmunity = !this.battle.runEvent("NegateImmunity", this, type);
      const notImmune = type === "Fighting" ? this.isGrounded(negateImmunity) : negateImmunity || this.battle.dex.getImmunity(type, this);
      if (notImmune) return true;
      if (!message) return false;
      if (notImmune === null) {
        this.battle.add("-immune", this, "[from] ability: Levitate");
      } else {
        this.battle.add("-immune", this);
      }
      return false;
    }
  }
};
//# sourceMappingURL=scripts.js.map
