import React, { useState } from "react";

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
  const lineBaseNumber = Math.floor(Math.random() * 9999);
  const maxLines = 16;
  const maxColumns = 2;
  const charCountPerLine = 12
  const passwords = {
    4: [
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
      "MIND"
    ]
  }

  function getRandomDudString() {
    const dudCharacters = ",;.:^<>()[]{}!?@%$`'\"*+-=/\|_";
    // const startDuds = "<([{";
    // const endDuds = ">)]}";
    return [...Array(charCountPerLine)].map((_value, _key) => {
      return dudCharacters[Math.floor(Math.random() * dudCharacters.length)];
    });
  }

  const tmpPasswords = passwords[4].slice();
  const passwordBaseChance = 50;

  const terminalState = [...Array(maxLines * maxColumns)].map((_value, _key) => {
    const randomDuds = getRandomDudString().join("")
    let codeLine = randomDuds

    if ((tmpPasswords.length > 0) && (passwordBaseChance) <= Math.floor(Math.random() * 100)) {
      const tmpPassword = tmpPasswords[Math.floor(Math.random() * tmpPasswords.length)];

      const randomOffset = Math.floor(Math.random() * (charCountPerLine - 4));
      const newStart = codeLine.slice(0, randomOffset + 1);
      const newEnd = codeLine.slice(tmpPassword.length + randomOffset + 1, codeLine.length);
      codeLine = newStart + tmpPassword + newEnd;
    }

    return codeLine;
  });

  return (
    <>
      <InfoBar />
      <Terminal lineBaseNumber={lineBaseNumber} maxLines={maxLines} maxColumns={maxColumns} terminalState={terminalState} />
      <TabMenu />
      <PerkList />
    </>
  );
}
