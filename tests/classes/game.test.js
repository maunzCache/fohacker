"use strict";

import { DOMParser } from "deno_dom/deno-dom-wasm.ts";
import { assert, assertEquals } from "std/assert/mod.ts";

import Game from "../../src/classes/game.js";

Deno.test("Game constructor", () => {
  const actualResult = new Game();

  assert(actualResult);
});

Deno.test("Game nextLevelExp", () => {
  const testGame = new Game();

  let actualResult = testGame.nextLevelExp();

  // From level 0 to 1
  assertEquals(actualResult, 12);

  // From level 9 to 10
  testGame.gameData.level = 9;
  actualResult = testGame.nextLevelExp();
  assertEquals(actualResult, 434);

  // From level 19 to 20
  testGame.gameData.level = 19;
  actualResult = testGame.nextLevelExp();
  assertEquals(actualResult, 39104);
});

Deno.test("Game levelUp", () => {
  const window = Window;
  window.document = new DOMParser().parseFromString(
    `<!DOCTYPE html>
    <html lang="en">
      <body></body>
    </html>`,
    "text/html",
  );
  window.document.body.innerHTML = '<div class="info">' +
    '    <div class="input"></div>' +
    "</div>";

  const testGame = new Game();

  testGame.levelUp();
  let actualResult = testGame.gameData.level;

  // Start at level 1
  assertEquals(actualResult, 1);

  // Level up to level 2
  testGame.gameData.experience = 13;
  testGame.levelUp();
  actualResult = testGame.gameData.level;
  assertEquals(actualResult, 2);
});

Deno.test("Game addExperience", () => {
  document.body.innerHTML = '<div class="info">' +
    '    <div class="input"></div>' +
    "</div>";

  // TODO: What does that argument mean? Words is bad!
  const dummyWords = 10;

  const testGame = new Game();

  testGame.addExperience(dummyWords);
  const actualResult = testGame.gameData.experience;

  assertEquals(actualResult, 3);
});

Deno.test("Game getDifficulty Easy", () => {
  const testGame = new Game();
  testGame.gameData.difficulty = Math.random() * (5 - 4) + 4;

  const actualResult = testGame.getDifficulty();

  assertEquals(actualResult, "Easy");
});

Deno.test("Game getDifficulty Advanced", () => {
  const testGame = new Game();
  testGame.gameData.difficulty = Math.random() * (8 - 6) + 6;

  const actualResult = testGame.getDifficulty();

  assertEquals(actualResult, "Advanced");
});

Deno.test("Game getDifficulty Expert", () => {
  const testGame = new Game();
  testGame.gameData.difficulty = Math.random() * (10 - 9) + 9;

  const actualResult = testGame.getDifficulty();

  assertEquals(actualResult, "Expert");
});

Deno.test("Game getDifficulty Master", () => {
  const testGame = new Game();
  testGame.gameData.difficulty = Math.random() * (12 - 11) + 11;

  const actualResult = testGame.getDifficulty();

  assertEquals(actualResult, "Master");
});

Deno.test("Game updateUI", () => {
  // TODO: Implement better tests
  const testGame = new Game();

  const actualResult = testGame.updateUI();

  assert(actualResult);
});

Deno.test("Game clearOld", () => {
  document.body.innerHTML = '<div class="terminal">' +
    '    <div class="linenumber"></div>' +
    '    <div class="code"></div>' +
    "</div>" +
    '<div class="info"></div>';

  const testGame = new Game();

  testGame.clearOld();
  const actualResult = testGame.gameData;

  assertEquals(actualResult.attempts, 4);
});

Deno.test("Game createPointersForTerminal", () => {
  // TODO: Implement better test
  document.body.innerHTML = '<div class="terminal">' +
    '    <div class="linenumber"></div>' +
    "</div>";

  const testGame = new Game();

  const actualResult = testGame.createPointersForTerminal();

  assert(actualResult);
});

Deno.test("Game createDudCode", () => {
  // TODO: Implement better test
  const testGame = new Game();

  testGame.createDudCode();
  const actualResult = testGame.terminalData;

  assert(actualResult);
});

Deno.test("Game createCurrentPasswords", () => {
  const dummy_wordList = [
    "SAFE",
    "HACK",
    "CORE",
    "TIME",
    "NONE",
    "SORT",
    "ROLL",
    "HUNT",
    "BURN",
    "WIRE",
    "TOOL",
    "BACK",
    "BLUE",
    "HARD",
    "FIRE",
    "TIRE",
    "MIND",
  ];

  const testGame = new Game();
  testGame.difficulty = 4;
  testGame.passwords = function () {
    return {
      4: new Dictionary(dummy_wordList),
    };
  };

  testGame.createCurrentPasswords();
  const actualResult = testGame.gameData.currentPasswords.wordList;

  assertEquals(actualResult.length, 14);
});

Deno.test("Game addPasswordsToData", () => {
  // TODO: Implement better test
  const testGame = new Game();
  testGame.createCurrentPasswords();

  testGame.addPasswordsToData();
  const actualResult = testGame.gameData.password;

  assert(actualResult);
});

Deno.test("Game findDuds", () => {
  // TODO: Implement better test
  const testGame = new Game();
  testGame.createDudCode();

  const actualResult = testGame.findDuds();

  assert(actualResult);
});

Deno.test("Game createMarkup", () => {
  // TODO: Implement better test and well actual function
  const testGame = new Game();

  const actualResult = testGame.createMarkup();

  assert(actualResult);
});

Deno.test("Game addHtml", () => {
  // TODO: Implement better test and well actual function
  document.body.innerHTML = '<div class="terminal">' +
    '    <div class="left code"></div>' +
    '    <div class="right code"></div>' +
    "</div>";

  const testGame = new Game();
  testGame.createCurrentPasswords();

  const actualResult = testGame.addHtml();

  assert(actualResult);
});

Deno.test("Game addScript", () => {
  // TODO: Implement better test and well actual function
  document.body.innerHTML = '<div class="terminal">' +
    '    <div class="left code"></div>' +
    '    <div class="right code"></div>' +
    "</div>";

  const testGame = new Game();

  const actualResult = testGame.addScript();

  assert(actualResult);
});

Deno.test("Game createTerminal", () => {
  // TODO: Implement better test and well actual function
  document.body.innerHTML = '<div class="terminal">' +
    '    <div class="left code"></div>' +
    '    <div class="right code"></div>' +
    "</div>";

  const testGame = new Game();

  const actualResult = testGame.createPointersForTerminal();

  assert(actualResult);
});
