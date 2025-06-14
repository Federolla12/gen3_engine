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
var uno_exports = {};
__export(uno_exports, {
  UNO: () => UNO,
  commands: () => commands,
  roomSettings: () => roomSettings
});
module.exports = __toCommonJS(uno_exports);
var import_lib = require("../../lib");
/**
 * UNO
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This plugin allows rooms to run games of scripted UNO
 *
 * @license MIT license
 */
const MAX_TIME = 60;
const rgbGradients = {
  Green: "rgba(0, 122, 0, 1), rgba(0, 185, 0, 0.9)",
  Yellow: "rgba(255, 225, 0, 1), rgba(255, 255, 85, 0.9)",
  Blue: "rgba(40, 40, 255, 1), rgba(125, 125, 255, 0.9)",
  Red: "rgba(255, 0, 0, 1), rgba(255, 125, 125, 0.9)",
  Black: "rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.55)"
};
const textColors = {
  Green: "rgb(0, 128, 0)",
  Yellow: "rgb(175, 165, 40)",
  Blue: "rgb(75, 75, 255)",
  Red: "rgb(255, 0, 0)",
  Black: "inherit"
};
const textShadow = "text-shadow: 1px 0px black, -1px 0px black, 0px -1px black, 0px 1px black, 2px -2px black;";
function cardHTML(card, fullsize) {
  let surface = card.value.replace(/[^A-Z0-9+]/g, "");
  const background = rgbGradients[card.color];
  if (surface === "R") surface = '<i class="fa fa-refresh" aria-hidden="true"></i>';
  return `<button class="button" style="font-size: 14px; font-weight: bold; color: white; ${textShadow} padding-bottom: 117px; text-align: left; height: 135px; width: ${fullsize ? "72" : "37"}px; border-radius: 10px 2px 2px 3px; color: white; background: ${card.color}; background: -webkit-linear-gradient(${background}); background: -o-linear-gradient(${background}); background: -moz-linear-gradient(${background}); background: linear-gradient(${background})" name=send value="/uno play ${card.name}" aria-label="${card.name}">${surface}</button>`;
}
function createDeck() {
  const colors = ["Red", "Blue", "Green", "Yellow"];
  const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Reverse", "Skip", "+2"];
  const basic = [];
  for (const color of colors) {
    basic.push(...values.map((v) => {
      const c = { value: v, color, name: `${color} ${v}` };
      return c;
    }));
  }
  return [
    // two copies of the basic stuff (total 96)
    ...basic,
    ...basic,
    // The four 0s
    ...[0, 1, 2, 3].map((v) => {
      const c = { color: colors[v], value: "0", name: `${colors[v]} 0` };
      return c;
    }),
    // Wild cards
    ...[0, 1, 2, 3].map((v) => {
      const c = { color: "Black", value: "Wild", name: "Wild" };
      return c;
    }),
    // Wild +4 cards
    ...[0, 1, 2, 3].map((v) => {
      const c = { color: "Black", value: "+4", name: "Wild +4" };
      return c;
    })
  ];
}
class UNO extends Rooms.RoomGame {
  constructor(room, cap, suppressMessages) {
    super(room);
    this.gameid = "uno";
    this.title = "UNO";
    this.allowRenames = true;
    this.timer = null;
    this.maxTime = MAX_TIME;
    this.autostartTimer = null;
    this.state = "signups";
    this.currentPlayer = null;
    this.deck = import_lib.Utils.shuffle(createDeck());
    this.discards = [];
    this.topCard = null;
    this.awaitUnoPlayer = null;
    this.unoId = null;
    this.direction = 1;
    this.spectators = /* @__PURE__ */ Object.create(null);
    this.isPlusFour = false;
    this.gameNumber = room.nextGameNumber();
    this.playerCap = cap;
    this.suppressMessages = suppressMessages || false;
    this.sendToRoom(`|uhtml|uno-${this.gameNumber}|<div class="broadcast-blue"><p style="font-size: 14pt; text-align: center">A new game of <strong>UNO</strong> is starting!</p><p style="font-size: 9pt; text-align: center"><button class="button" name="send" value="/uno join"><strong>Join and play</strong></button> <button class="button" name="send" value="/uno spectate">Watch</button></p>${this.suppressMessages ? `<p style="font-size: 6pt; text-align: center">Game messages won't show up unless you're playing or watching.</p>` : ""}</div>`, true);
  }
  onUpdateConnection() {
  }
  onConnect(user, connection) {
    if (this.state === "signups") {
      connection.sendTo(
        this.room,
        `|uhtml|uno-${this.gameNumber}|<div class="broadcast-blue"><p style="font-size: 14pt; text-align: center">A new game of <strong>UNO</strong> is starting!</p><p style="font-size: 9pt; text-align: center"><button class="button" name="send" value="/uno join"><strong>Join and play</strong></button> <button class="button" name="send" value="/uno spectate">Watch</button></p>${this.suppressMessages ? `<p style="font-size: 6pt; text-align: center">Game messages won't show up unless you're playing or watching.` : ""}</div>`
      );
    } else if (this.onSendHand(user) === false) {
      connection.sendTo(
        this.room,
        `|uhtml|uno-${this.gameNumber}|<div class="infobox"><p>A game of UNO is currently in progress.<button class="button" name="send" value="/uno spectate">Spectate Game</button></p>${this.suppressMessages ? `<p style="font-size: 6pt">Game messages won't show up unless you're playing or watching.` : ""}</div>`
      );
    }
  }
  onStart(isAutostart) {
    if (this.playerCount < 2) {
      if (isAutostart) {
        this.room.add("The game of UNO was forcibly ended because there aren't enough users.");
        this.destroy();
        return false;
      } else {
        throw new Chat.ErrorMessage("There must be at least 2 players to start a game of UNO.");
      }
    }
    if (this.autostartTimer) clearTimeout(this.autostartTimer);
    this.sendToRoom(`|uhtmlchange|uno-${this.gameNumber}|<div class="infobox"><p>The game of UNO has started. <button class="button" name="send" value="/uno spectate">Spectate Game</button></p>${this.suppressMessages ? `<p style="font-size: 6pt">Game messages won't show up unless you're playing or watching.` : ""}</div>`, true);
    this.state = "play";
    this.onNextPlayer();
    for (const player of this.players) {
      player.hand.push(...this.drawCard(7));
    }
    do {
      this.topCard = this.drawCard(1)[0];
      this.discards.unshift(this.topCard);
    } while (this.topCard.color === "Black");
    this.sendToRoom(`|raw|The top card is <span style="font-weight:bold;color: ${textColors[this.topCard.color]}">${this.topCard.name}</span>.`);
    this.onRunEffect(this.topCard.value, true);
    this.nextTurn(true);
  }
  joinGame(user) {
    if (user.id in this.playerTable) {
      throw new Chat.ErrorMessage("You have already joined the game of UNO.");
    }
    if (this.state === "signups" && this.addPlayer(user)) {
      this.sendToRoom(`${user.name} has joined the game of UNO.`);
      return true;
    }
    return false;
  }
  leaveGame(user) {
    const player = this.playerTable[user.id];
    if (!player) return false;
    this.sendToRoom(`${user.name} has left the game of UNO.`);
    return this.state === "signups" ? this.removePlayer(player) : this.eliminate(player);
  }
  /**
   * Overwrite the default makePlayer so it makes an UNOPlayer instead.
   */
  makePlayer(user) {
    return new UNOPlayer(user, this);
  }
  onRename(user, oldUserid, isJoining, isForceRenamed) {
    if (!(oldUserid in this.playerTable) || user.id === oldUserid) return false;
    if (!user.named && !isForceRenamed) {
      user.games.delete(this.roomid);
      user.updateSearch();
      return;
    }
    this.renamePlayer(user, oldUserid);
  }
  eliminate(player) {
    if (!player) return false;
    const name = player.name;
    if (this.playerCount === 2) {
      this.removePlayer(player);
      this.onWin(this.players[0]);
      return true;
    }
    const removingCurrentPlayer = player === this.currentPlayer;
    if (removingCurrentPlayer) {
      if (this.state === "color") {
        if (!this.topCard) {
          throw new Error(`No top card in the discard pile.`);
        }
        this.topCard.changedColor = this.discards[1].changedColor || this.discards[1].color;
        this.sendToRoom(`|raw|${import_lib.Utils.escapeHTML(name)} has not picked a color, the color will stay as <span style="color: ${textColors[this.topCard.changedColor]}">${this.topCard.changedColor}</span>.`);
      }
    }
    if (this.awaitUnoPlayer === player) this.awaitUnoPlayer = null;
    if (!this.topCard) {
      throw new Chat.ErrorMessage(`Unable to disqualify ${name}.`);
    }
    this.discards.push(...player.hand);
    if (removingCurrentPlayer) {
      this.onNextPlayer();
    }
    this.removePlayer(player);
    if (removingCurrentPlayer) {
      this.nextTurn(true);
    }
    return true;
  }
  sendToRoom(msg, overrideSuppress = false) {
    if (!this.suppressMessages || overrideSuppress) {
      this.room.add(msg).update();
    } else {
      for (const player of this.players) {
        player.sendRoom(msg);
      }
      for (const i in this.spectators) {
        if (i in this.playerTable) continue;
        const user = Users.getExact(i);
        if (user) user.sendTo(this.roomid, msg);
      }
    }
  }
  getPlayers(showCards) {
    let playerList = this.players;
    if (this.direction === -1) playerList = [...playerList].reverse();
    if (!showCards) {
      return playerList.map((p) => import_lib.Utils.escapeHTML(p.name)).join(", ");
    }
    let buf = `<ol style="padding-left:0;">`;
    for (const player of playerList) {
      buf += `<li${this.currentPlayer === player ? ` style="font-weight:bold;"` : ""}>`;
      buf += `${import_lib.Utils.escapeHTML(player.name)} (${player.hand.length})`;
      buf += `</li>`;
    }
    buf += `</ol>`;
    return buf;
  }
  onAwaitUno() {
    return new Promise((resolve) => {
      if (!this.awaitUnoPlayer) return void resolve();
      this.state = "uno";
      setTimeout(() => resolve(), 750);
    });
  }
  nextTurn(starting) {
    void this.onAwaitUno().then(() => {
      if (!starting) this.onNextPlayer();
      if (this.timer) clearTimeout(this.timer);
      const player = this.currentPlayer;
      this.sendToRoom(`|c:|${Math.floor(Date.now() / 1e3)}|~|${player.name}'s turn.`);
      this.state = "play";
      if (player.cardLock) player.cardLock = null;
      player.sendDisplay();
      this.timer = setTimeout(() => {
        this.sendToRoom(`|c:|${Math.floor(Date.now() / 1e3)}|~|${player.name} has been automatically disqualified.`);
        this.eliminate(player);
      }, this.maxTime * 1e3);
    });
  }
  onNextPlayer() {
    this.currentPlayer = this.getNextPlayer();
  }
  getNextPlayer() {
    this.currentPlayer ||= this.players[Math.floor(this.playerCount * Math.random())];
    let player = this.players[this.players.indexOf(this.currentPlayer) + this.direction];
    player ||= this.direction === 1 ? this.players[0] : this.players[this.playerCount - 1];
    return player;
  }
  onDraw(player) {
    if (this.currentPlayer !== player || this.state !== "play") return false;
    if (player.cardLock) return true;
    this.onCheckUno();
    this.sendToRoom(`|c:|${Math.floor(Date.now() / 1e3)}|~|${player.name} has drawn a card.`);
    const card = this.onDrawCard(player, 1);
    player.sendDisplay();
    player.cardLock = card[0].name;
    if (this.topCard && card[0].color !== "Black" && card[0].color !== (this.topCard.changedColor || this.topCard.color) && card[0].value !== this.topCard.value) {
      player.sendRoom(`|c:|${Math.floor(Date.now() / 1e3)}||You can't play a card, ${player.name}. You must pass.`);
    }
  }
  onPlay(player, cardName) {
    if (this.currentPlayer !== player || this.state !== "play") return false;
    const card = player.hasCard(cardName);
    if (!card) return "You do not have that card.";
    if (!this.topCard) {
      throw new Error(`No top card in the discard pile.`);
    }
    if (player.cardLock && player.cardLock !== cardName) return `You can only play ${player.cardLock} after drawing.`;
    if (card.color !== "Black" && card.color !== (this.topCard.changedColor || this.topCard.color) && card.value !== this.topCard.value) {
      return `You cannot play this card; you can only play: Wild cards, ${this.topCard.changedColor ? "and" : ""} ${this.topCard.changedColor || this.topCard.color} cards${this.topCard.changedColor ? "" : ` and cards with the digit ${this.topCard.value}`}.`;
    }
    if (card.value === "+4" && !player.canPlayWildFour()) {
      return "You cannot play Wild +4 when you still have a card with the same color as the top card.";
    }
    if (this.timer) clearTimeout(this.timer);
    this.onCheckUno();
    this.topCard = card;
    player.removeCard(cardName);
    this.discards.unshift(card);
    if (player.hand.length === 1) {
      this.awaitUnoPlayer = player;
      this.unoId = Math.floor(Math.random() * 100).toString();
    }
    player.sendDisplay();
    this.sendToRoom(`|raw|${import_lib.Utils.escapeHTML(player.name)} has played a <span style="font-weight:bold;color: ${textColors[card.color]}">${card.name}</span>.`);
    if (!player.hand.length) {
      this.onWin(player);
      return;
    }
    this.onRunEffect(card.value);
    if (this.state === "play") this.nextTurn();
  }
  onRunEffect(value, initialize) {
    const colorDisplay = `|uhtml|uno-color|<table style="width: 100%; border: 1px solid black"><tr><td style="width: 50%"><button style="width: 100%; background-color: red; border: 2px solid rgba(0 , 0 , 0 , 0.59); border-radius: 5px; padding: 5px" name=send value="/uno color Red">Red</button></td><td style="width: 50%"><button style="width: 100%; background-color: blue; border: 2px solid rgba(0 , 0 , 0 , 0.59); border-radius: 5px; color: white; padding: 5px" name=send value="/uno color Blue">Blue</button></td></tr><tr><td style="width: 50%"><button style="width: 100%; background-color: green; border: 2px solid rgba(0 , 0 , 0 , 0.59); border-radius: 5px; padding: 5px" name=send value="/uno color Green">Green</button></td><td style="width: 50%"><button style="width: 100%; background-color: yellow; border: 2px solid rgba(0 , 0 , 0 , 0.59); border-radius: 5px; padding: 5px" name=send value="/uno color Yellow">Yellow</button></td></tr></table>`;
    switch (value) {
      case "Reverse":
        this.direction *= -1;
        this.sendToRoom(`|c:|${Math.floor(Date.now() / 1e3)}|~|The direction of the game has changed.`);
        if (!initialize && this.playerCount === 2) this.onNextPlayer();
        break;
      case "Skip":
        this.onNextPlayer();
        this.sendToRoom(`|c:|${Math.floor(Date.now() / 1e3)}|~|${this.currentPlayer.name}'s turn has been skipped.`);
        break;
      case "+2":
        this.onNextPlayer();
        this.sendToRoom(`|c:|${Math.floor(Date.now() / 1e3)}|~|${this.currentPlayer.name} has been forced to draw 2 cards.`);
        this.onDrawCard(this.currentPlayer, 2);
        break;
      case "+4":
        this.currentPlayer.sendRoom(colorDisplay);
        this.state = "color";
        const next = this.getNextPlayer();
        this.sendToRoom(`|c:|${Math.floor(Date.now() / 1e3)}|~|${next.name} has been forced to draw 4 cards.`);
        this.onDrawCard(next, 4);
        this.isPlusFour = true;
        this.timer = setTimeout(() => {
          this.sendToRoom(`|c:|${Math.floor(Date.now() / 1e3)}|~|${this.currentPlayer.name} has been automatically disqualified.`);
          this.eliminate(this.currentPlayer);
        }, this.maxTime * 1e3);
        break;
      case "Wild":
        this.currentPlayer.sendRoom(colorDisplay);
        this.state = "color";
        this.timer = setTimeout(() => {
          this.sendToRoom(`|c:|${Math.floor(Date.now() / 1e3)}|~|${this.currentPlayer.name} has been automatically disqualified.`);
          this.eliminate(this.currentPlayer);
        }, this.maxTime * 1e3);
        break;
    }
    if (initialize) this.onNextPlayer();
  }
  onSelectColor(player, color) {
    if (!["Red", "Blue", "Green", "Yellow"].includes(color) || player !== this.currentPlayer || this.state !== "color") {
      return false;
    }
    if (!this.topCard) {
      throw new Error(`No top card in the discard pile.`);
    }
    this.topCard.changedColor = color;
    this.sendToRoom(`|c:|${Math.floor(Date.now() / 1e3)}|~|The color has been changed to ${color}.`);
    if (this.timer) clearTimeout(this.timer);
    player.sendRoom("|uhtmlchange|uno-color|");
    player.sendDisplay();
    if (this.isPlusFour) {
      this.isPlusFour = false;
      this.onNextPlayer();
    }
    this.nextTurn();
  }
  onDrawCard(player, count) {
    if (typeof count === "string") count = parseInt(count);
    if (!count || isNaN(count) || count < 1) count = 1;
    const drawnCards = this.drawCard(count);
    player.hand.push(...drawnCards);
    player.sendRoom(
      `|raw|You have drawn the following card${Chat.plural(drawnCards)}: ${drawnCards.map((card) => `<span style="color: ${textColors[card.color]}">${card.name}</span>`).join(", ")}.`
    );
    return drawnCards;
  }
  drawCard(count) {
    if (typeof count === "string") count = parseInt(count);
    if (!count || isNaN(count) || count < 1) count = 1;
    const drawnCards = [];
    for (let i = 0; i < count; i++) {
      if (!this.deck.length) {
        this.deck = this.discards.length ? import_lib.Utils.shuffle(this.discards) : import_lib.Utils.shuffle(createDeck());
        this.discards = [];
      }
      drawnCards.push(this.deck[this.deck.length - 1]);
      this.deck.pop();
    }
    return drawnCards;
  }
  onUno(player, unoId) {
    if (this.unoId !== unoId || player !== this.awaitUnoPlayer) return false;
    this.sendToRoom(`|c:|${Math.floor(Date.now() / 1e3)}|~|**UNO!** ${player.name} is down to their last card!`);
    this.awaitUnoPlayer = null;
    this.unoId = null;
  }
  onCheckUno() {
    if (!this.awaitUnoPlayer) return;
    if (this.awaitUnoPlayer !== this.currentPlayer) {
      this.sendToRoom(`|c:|${Math.floor(Date.now() / 1e3)}|~|${this.awaitUnoPlayer.name} forgot to say UNO! and is forced to draw 2 cards.`);
      this.onDrawCard(this.awaitUnoPlayer, 2);
    }
    this.awaitUnoPlayer = null;
    this.unoId = null;
  }
  onSendHand(user) {
    if (this.state === "signups") return false;
    this.playerTable[user.id]?.sendDisplay();
  }
  onWin(player) {
    this.sendToRoom(
      import_lib.Utils.html`|raw|<div class="broadcast-blue">Congratulations to ${player.name} for winning the game of UNO!</div>`,
      true
    );
    this.destroy();
  }
  destroy() {
    if (this.timer) clearTimeout(this.timer);
    if (this.autostartTimer) clearTimeout(this.autostartTimer);
    this.sendToRoom(`|uhtmlchange|uno-${this.gameNumber}|<div class="infobox">The game of UNO has ended.</div>`, true);
    this.setEnded();
    for (const player of this.players) player.destroy();
    this.room.game = null;
  }
}
class UNOPlayer extends Rooms.RoomGamePlayer {
  constructor(user, game) {
    super(user, game);
    this.hand = [];
    this.cardLock = null;
  }
  canPlayWildFour() {
    if (!this.game.topCard) {
      throw new Error(`No top card in the discard pile.`);
    }
    const color = this.game.topCard.changedColor || this.game.topCard.color;
    if (this.hand.some((c) => c.color === color)) return false;
    return true;
  }
  hasCard(cardName) {
    return this.hand.find((card) => card.name === cardName);
  }
  removeCard(cardName) {
    for (const [i, card] of this.hand.entries()) {
      if (card.name === cardName) {
        this.hand.splice(i, 1);
        break;
      }
    }
  }
  buildHand() {
    return import_lib.Utils.sortBy(this.hand, (card) => [card.color, card.value]).map((card, i) => cardHTML(card, i === this.hand.length - 1));
  }
  sendDisplay() {
    const hand = this.buildHand().join("");
    const players = `<p><strong>Players (${this.game.playerCount}):</strong></p> ${this.game.getPlayers(true)}`;
    const draw = '<button class="button" style="width: 45%; background: rgba(0, 0, 255, 0.05)" name=send value="/uno draw">Draw a card!</button>';
    const pass = '<button class="button" style=" width: 45%; background: rgba(255, 0, 0, 0.05)" name=send value="/uno pass">Pass!</button>';
    const uno = `<button class="button" style=" width: 90%; background: rgba(0, 255, 0, 0.05); height: 60px; margin-top: 2px;" name=send value="/uno uno ${this.game.unoId || "0"}">UNO!</button>`;
    if (!this.game.topCard) {
      throw new Error(`No top card in the discard pile.`);
    }
    const top = `<strong>Top Card: <span style="color: ${textColors[this.game.topCard.changedColor || this.game.topCard.color]}">${this.game.topCard.name}</span></strong>`;
    this.sendRoom("|uhtmlchange|uno-hand|");
    this.sendRoom(
      `|uhtml|uno-hand|<div style="border: 1px solid skyblue; padding: 0 0 5px 0"><table style="width: 100%; table-layout: fixed; border-radius: 3px"><tr><td colspan="4" rowspan="2" style="padding: 5px"><div style="overflow-x: auto; white-space: nowrap; width: 100%">${hand}</div></td>${this.game.currentPlayer === this ? `<td colspan="2" style="padding: 5px 5px 0 5px">${top}</td></tr>` : ""}<tr><td colspan="2" style="vertical-align: top; padding: 0px 5px 5px 5px"><div style="overflow-y: scroll">${players}</div></td></tr></table>${this.game.currentPlayer === this ? `<div style="text-align: center">${draw}${pass}<br />${uno}</div>` : ""}</div>`
    );
  }
}
const commands = {
  uno: {
    // roomowner commands
    off: "disable",
    disable(target, room, user) {
      room = this.requireRoom();
      this.checkCan("gamemanagement", null, room);
      if (room.settings.unoDisabled) {
        throw new Chat.ErrorMessage("UNO is already disabled in this room.");
      }
      room.settings.unoDisabled = true;
      room.saveSettings();
      return this.sendReply("UNO has been disabled for this room.");
    },
    on: "enable",
    enable(target, room, user) {
      room = this.requireRoom();
      this.checkCan("gamemanagement", null, room);
      if (!room.settings.unoDisabled) {
        throw new Chat.ErrorMessage("UNO is already enabled in this room.");
      }
      delete room.settings.unoDisabled;
      room.saveSettings();
      return this.sendReply("UNO has been enabled for this room.");
    },
    // moderation commands
    new: "create",
    make: "create",
    createpublic: "create",
    makepublic: "create",
    createprivate: "create",
    makeprivate: "create",
    create(target, room, user, connection, cmd) {
      room = this.requireRoom();
      this.checkCan("minigame", null, room);
      if (room.settings.unoDisabled) throw new Chat.ErrorMessage("UNO is currently disabled for this room.");
      if (room.game) throw new Chat.ErrorMessage("There is already a game in progress in this room.");
      const suppressMessages = cmd.includes("private") || !(cmd.includes("public") || room.roomid === "gamecorner");
      let cap = parseInt(target);
      if (isNaN(cap)) cap = 12;
      if (cap < 2) cap = 2;
      room.game = new UNO(room, cap, suppressMessages);
      this.privateModAction(`A game of UNO was created by ${user.name}.`);
      this.modlog("UNO CREATE");
    },
    cap: "setcap",
    setcap(target, room, user) {
      room = this.requireRoom();
      this.checkCan("minigame", null, room);
      const game = this.requireGame(UNO);
      if (game.state !== "signups") {
        throw new Chat.ErrorMessage(`There is no UNO game in the signups phase in this room, so adjusting the player cap would do nothing.`);
      }
      let cap = parseInt(target);
      if (isNaN(cap) || cap < 2) {
        cap = 2;
      }
      game.playerCap = cap;
      this.privateModAction(`The playercap was set to ${game.playerCap} by ${user.name}.`);
      this.modlog("UNO PLAYERCAP");
    },
    start(target, room, user) {
      room = this.requireRoom();
      this.checkCan("minigame", null, room);
      const game = this.requireGame(UNO);
      if (game.state !== "signups") {
        throw new Chat.ErrorMessage("There is no UNO game in signups phase in this room.");
      }
      game.onStart();
      this.privateModAction(`The game of UNO was started by ${user.name}.`);
      this.modlog("UNO START");
    },
    stop: "end",
    end(target, room, user) {
      room = this.requireRoom();
      this.checkCan("minigame", null, room);
      if (!room.game || room.game.gameid !== "uno") {
        throw new Chat.ErrorMessage("There is no UNO game going on in this room.");
      }
      room.game.destroy();
      room.add("The game of UNO was forcibly ended.").update();
      this.privateModAction(`The game of UNO was ended by ${user.name}.`);
      this.modlog("UNO END");
    },
    autodq: "timer",
    timer(target, room, user) {
      room = this.requireRoom();
      this.checkCan("minigame", null, room);
      const game = this.requireGame(UNO);
      const amount = parseInt(target);
      if (!amount || amount < 5 || amount > 300) {
        throw new Chat.ErrorMessage("The amount must be a number between 5 and 300.");
      }
      game.maxTime = amount;
      if (game.timer) clearTimeout(game.timer);
      game.timer = setTimeout(() => {
        game.eliminate(game.currentPlayer);
      }, amount * 1e3);
      this.addModAction(`${user.name} has set the UNO automatic disqualification timer to ${amount} seconds.`);
      this.modlog("UNO TIMER", null, `${amount} seconds`);
    },
    autostart(target, room, user) {
      room = this.requireRoom();
      this.checkCan("minigame", null, room);
      const game = this.requireGame(UNO);
      if (toID(target) === "off") {
        if (!game.autostartTimer) throw new Chat.ErrorMessage("There is no autostart timer running on.");
        this.addModAction(`${user.name} has turned off the UNO autostart timer.`);
        clearTimeout(game.autostartTimer);
        return;
      }
      const amount = parseInt(target);
      if (!amount || amount < 30 || amount > 600) {
        throw new Chat.ErrorMessage("The amount must be a number between 30 and 600 seconds.");
      }
      if (game.state !== "signups") throw new Chat.ErrorMessage("The game of UNO has already started.");
      if (game.autostartTimer) clearTimeout(game.autostartTimer);
      game.autostartTimer = setTimeout(() => {
        game.onStart(true);
      }, amount * 1e3);
      this.addModAction(`${user.name} has set the UNO autostart timer to ${amount} seconds.`);
    },
    dq: "disqualify",
    disqualify(target, room, user) {
      room = this.requireRoom();
      this.checkCan("minigame", null, room);
      const game = this.requireGame(UNO);
      const player = game.playerTable[toID(target)];
      if (!player) throw new Chat.ErrorMessage(`Player "${target}" not found.`);
      game.eliminate(player);
      this.privateModAction(`${user.name} has disqualified ${player.name} from the UNO game.`);
      this.modlog("UNO DQ", toID(target));
      room.add(`${player.name} has been disqualified from the UNO game.`).update();
    },
    // player/user commands
    j: "join",
    join(target, room, user) {
      const game = this.requireGame(UNO);
      this.checkChat();
      if (!game.joinGame(user)) throw new Chat.ErrorMessage("Unable to join the game.");
      return this.sendReply("You have joined the game of UNO.");
    },
    l: "leave",
    leave(target, room, user) {
      const game = this.requireGame(UNO);
      if (!game.leaveGame(user)) throw new Chat.ErrorMessage("Unable to leave the game.");
      return this.sendReply("You have left the game of UNO.");
    },
    play(target, room, user) {
      const game = this.requireGame(UNO);
      if (!game) throw new Chat.ErrorMessage("There is no UNO game going on in this room right now.");
      const player = game.playerTable[user.id];
      if (!player) throw new Chat.ErrorMessage(`You are not in the game of UNO.`);
      const error = game.onPlay(player, target);
      if (typeof error === "string") throw new Chat.ErrorMessage(error);
    },
    draw(target, room, user) {
      room = this.requireRoom();
      const game = room.getGame(UNO);
      if (!game) throw new Chat.ErrorMessage("There is no UNO game going on in this room right now.");
      const player = game.playerTable[user.id];
      if (!player) throw new Chat.ErrorMessage(`You are not in the game of UNO.`);
      const error = game.onDraw(player);
      if (error) throw new Chat.ErrorMessage("You have already drawn a card this turn.");
    },
    pass(target, room, user) {
      const game = this.requireGame(UNO);
      if (!game) throw new Chat.ErrorMessage("There is no UNO game going on in this room right now.");
      const player = game.playerTable[user.id];
      if (!player) throw new Chat.ErrorMessage(`You are not in the game of UNO.`);
      if (game.currentPlayer !== player) throw new Chat.ErrorMessage("It is currently not your turn.");
      if (!player.cardLock) throw new Chat.ErrorMessage("You cannot pass until you draw a card.");
      if (game.state === "color") throw new Chat.ErrorMessage("You cannot pass until you choose a color.");
      game.sendToRoom(`|c:|${Math.floor(Date.now() / 1e3)}|~|${user.name} has passed.`);
      game.nextTurn();
    },
    color(target, room, user) {
      const game = this.requireGame(UNO);
      const player = game.playerTable[user.id];
      if (!player) throw new Chat.ErrorMessage(`You are not in the game of UNO.`);
      let color;
      if (target === "Red" || target === "Green" || target === "Blue" || target === "Yellow" || target === "Black") {
        color = target;
      } else {
        throw new Chat.ErrorMessage(`"${target}" is not a valid color.`);
      }
      game.onSelectColor(player, color);
    },
    uno(target, room, user) {
      const game = this.requireGame(UNO);
      const player = game.playerTable[user.id];
      if (!player) throw new Chat.ErrorMessage(`You are not in the game of UNO.`);
      game.onUno(player, toID(target));
    },
    // information commands
    "": "hand",
    hand(target, room, user) {
      const game = this.requireGame(UNO);
      game.onSendHand(user);
    },
    "c": "cards",
    cards(target, room, user) {
      const game = this.requireGame(UNO);
      if (!this.runBroadcast()) return false;
      const players = `<strong>Players (${game.playerCount}):</strong></p>${game.getPlayers(true)}`;
      this.sendReplyBox(`<tr><td colspan="2" style="vertical-align: top; padding: 0px 5px 5px 5px"><div style="overflow-y: scroll">${players}</div></td></tr></table>`);
    },
    players: "getusers",
    users: "getusers",
    getplayers: "getusers",
    getusers(target, room, user) {
      const game = this.requireGame(UNO);
      if (!this.runBroadcast()) return false;
      this.sendReplyBox(`<strong>Players (${game.playerCount})</strong>:${game.getPlayers()}`);
    },
    help(target, room, user) {
      this.parse("/help uno");
    },
    // suppression commands
    suppress(target, room, user) {
      room = this.requireRoom();
      const game = this.requireGame(UNO);
      this.checkCan("minigame", null, room);
      target = toID(target);
      const state = target === "on" ? true : target === "off" ? false : void 0;
      if (state === void 0) {
        return this.sendReply(`Suppression of UNO game messages is currently ${game.suppressMessages ? "on" : "off"}.`);
      }
      if (state === game.suppressMessages) {
        throw new Chat.ErrorMessage(`Suppression of UNO game messages is already ${game.suppressMessages ? "on" : "off"}.`);
      }
      game.suppressMessages = state;
      this.addModAction(`${user.name} has turned ${state ? "on" : "off"} suppression of UNO game messages.`);
      this.modlog("UNO SUPRESS", null, state ? "ON" : "OFF");
    },
    spectate(target, room, user) {
      const game = this.requireGame(UNO);
      if (!game) throw new Chat.ErrorMessage("There is no UNO game going on in this room right now.");
      if (!game.suppressMessages) throw new Chat.ErrorMessage("The current UNO game is not suppressing messages.");
      if (user.id in game.spectators) throw new Chat.ErrorMessage("You are already spectating this game.");
      game.spectators[user.id] = 1;
      this.sendReply("You are now spectating this private UNO game.");
    },
    unspectate(target, room, user) {
      const game = this.requireGame(UNO);
      if (!game) throw new Chat.ErrorMessage("There is no UNO game going on in this room right now.");
      if (!game.suppressMessages) throw new Chat.ErrorMessage("The current UNO game is not suppressing messages.");
      if (!(user.id in game.spectators)) throw new Chat.ErrorMessage("You are currently not spectating this game.");
      delete game.spectators[user.id];
      this.sendReply("You are no longer spectating this private UNO game.");
    }
  },
  unohelp: [
    `/uno create [player cap] - creates a new UNO game with an optional player cap (default player cap at 12). Use the command [createpublic] to force a public game or [createprivate] to force a private game. Requires: % @ # ~`,
    `/uno setcap [player cap] - adjusts the player cap of the current UNO game. Requires: % @ # ~`,
    `/uno timer [amount] - sets an auto disqualification timer for [amount] seconds. Requires: % @ # ~`,
    `/uno autostart [amount] - sets an auto starting timer for [amount] seconds. Requires: % @ # ~`,
    `/uno end - ends the current game of UNO. Requires: % @ # ~`,
    `/uno start - starts the current game of UNO. Requires: % @ # ~`,
    `/uno disqualify [player] - disqualifies the player from the game. Requires: % @ # ~`,
    `/uno hand - displays your own hand.`,
    `/uno cards - displays the number of cards for each player.`,
    `/uno getusers - displays the players still in the game.`,
    `/uno [spectate|unspectate] - spectate / unspectate the current private UNO game.`,
    `/uno suppress [on|off] - Toggles suppression of game messages.`
  ]
};
const roomSettings = (room) => ({
  label: "UNO",
  permission: "editroom",
  options: [
    [`disabled`, room.settings.unoDisabled || "uno disable"],
    [`enabled`, !room.settings.unoDisabled || "uno enable"]
  ]
});
//# sourceMappingURL=uno.js.map
