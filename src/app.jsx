import React, { useState } from "react";

import Terminal from "./terminal.jsx";
import TabMenu from "./tabmenu.jsx";
import PerkList from "./perklist.jsx";

function CustomBar({ barType, size }) {
  return <span className={ barType } style={{ width: size }}></span>;
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
  return (
    <>
      <InfoBar />
      <Terminal />
      <TabMenu />
      <PerkList />
    </>
  );
}
