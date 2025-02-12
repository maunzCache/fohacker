import React, { useState } from "react";

import { getRandomInt, shuffleArray } from "./classes/utils.ts";

import Terminal from "./terminal.jsx";
import TabMenu from "./tabmenu.jsx";
import PerkList from "./perklist.jsx";

function CustomBar({ barType, size }) {
  return <span className={barType} style={{ width: size }}></span>;
}

function InfoBar() {
  const [difficulty, setDifficulty] = useState(4); // aka word length
  const maxHealth = 100;
  const [health, setHealth] = useState(100);
  const [level, setLevel] = useState(1);
  const maxExp = 100; // required for next level
  const [exp, setExp] = useState(1);
  const [caps, setCaps] = useState(1000000);

  // Note: Those are Fallout 4 difficulties
  // FO3 and New Vegas have one more, and different naming
  let difficultyWord = "";
  if (difficulty >= 4 && difficulty <= 5) {
    difficultyWord = "Easy";
  } else if (difficulty >= 6 && difficulty <= 8) {
    difficultyWord = "Advanced";
  } else if (
    difficulty >= 9 && difficulty <= 10
  ) {
    difficultyWord = "Expert";
  } else if (
    difficulty >= 11 && difficulty <= 12
  ) {
    difficultyWord = "Master";
  }

  return <div id="infobar">
    Difficulty: <div className="difficulty">{difficultyWord}</div> |
    Health: <div className="health"><CustomBar barType="healthbar" size={(health / maxHealth) * 100} /></div> |
    Level: <div className="level">{level}</div> |
    Experience: <div className="exp"><CustomBar barType="expbar" size={(exp / maxExp) * 100} /></div> |
    Caps: <div className="caps">{caps.toLocaleString('en-US')}</div>
  </div>;
}

export default function App() {
  const lineBaseNumber = getRandomInt(9999);
  const linesPerColumn = 16;
  const maxColumns = 2;
  const maxLines = linesPerColumn * maxColumns;
  const charCountPerLine = 12

  // SPECIAL is not yet relevant here
  // For later: https://www.thegamer.com/fallout-4-guide-terminal-passwords-hacking/
  // or https://fallout.fandom.com/wiki/Hacking_(Fallout_4)
  const passwordCount = 20;
  // TODO: Find a way to dump passwords from the game
  // Those are from random screenshots of all games
  const passwords = {
    4: [
      "AGES",
      "BACK",
      "BLUE",
      "BURN",
      "CASE",
      "CORE",
      "DRAG",
      "EGOS",
      "FIRE",
      "FLAT",
      "GETS",
      "HACK",
      "HARD",
      "HUNT",
      "JUMP",
      "LOSE",
      "LOST",
      "MIND",
      "NONE",
      "POTS",
      "RAIN",
      "RISE",
      "ROAM",
      "ROLL",
      "SAFE",
      "SEED",
      "SHOW",
      "SIGN",
      "SOIL",
      "SORT",
      "STAY",
      "TIME",
      "TIRE",
      "TOOL",
      "TURN",
      "WEAK",
      "WHEN",
      "WIRE",
      "WOOD",
      "WORN",
    ]
  }

  function getRandomDudString() {
    const dudCharacters = ",;.:^<>()[]{}!?@%$`'\"*+-=/\|_";
    // const startDuds = "<([{";
    // const endDuds = ">)]}";
    return [...Array(charCountPerLine)].map((_value, _key) => {
      return dudCharacters[getRandomInt(dudCharacters.length)];
    });
  }

  // Select random passwords from list and pick the solution
  let tmpPasswords = passwords[4].slice();
  shuffleArray(tmpPasswords);
  tmpPasswords = tmpPasswords.slice(0, passwordCount);
  const currentSolution = tmpPasswords[getRandomInt(tmpPasswords.length)];

  // Fill up the list so every line gets a "password", If empty ("") its no password.
  tmpPasswords = tmpPasswords.concat(new Array(maxLines - passwordCount).fill(""));
  shuffleArray(tmpPasswords);

  const terminalState = [...Array(maxLines)].map((_value, passwordIndex) => {
    const randomDuds = getRandomDudString().join("")
    const codeLine = {
      start: "",
      end: "",
      word: ""
    }

    if(tmpPasswords[passwordIndex].length > 0) {
      codeLine.word = tmpPasswords[passwordIndex];
      const randomOffset = getRandomInt(charCountPerLine - codeLine.word.length);
      codeLine.start = randomDuds.slice(0, randomOffset + 1);
      codeLine.end = randomDuds.slice(codeLine.word.length + randomOffset + 1, randomDuds.length);
    } else {
      codeLine.start = randomDuds;
    }

    return codeLine;
  });

  return (
    <>
      <InfoBar />
      <Terminal lineBaseNumber={lineBaseNumber} maxLines={linesPerColumn} maxColumns={maxColumns} terminalState={terminalState} currentSolution={currentSolution}/>
      <TabMenu />
      <PerkList />
    </>
  );
}
