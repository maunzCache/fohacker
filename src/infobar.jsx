import React, { useState } from 'react'

import HealthBar from "./healthbar.jsx";
import ExpBar from "./expbar.jsx";

export default function InfoBar() {
    const [difficulty, setDifficulty] = useState(4); // aka word length
    const maxHealth = 100;
    const [health, setHealth] = useState(100);
    const [level, setLevel] = useState(1);
    const maxExp = 100; // required for next level
    const [exp, setExp] = useState(1);
    const [caps, setCaps] = useState(1000000);

    function getDifficulty() {
        if (difficulty >= 4 && difficulty <= 5) {
          return "Easy";
        } else if (difficulty >= 6 && difficulty <= 8) {
          return "Advanced";
        } else if (
          difficulty >= 9 && difficulty <= 10
        ) {
          return "Expert";
        } else if (
          difficulty >= 11 && difficulty <= 12
        ) {
          return "Master";
        }
      }

    return <div id="infobar">
        Difficulty: <div className="difficulty">{getDifficulty()}</div> |
        Health: <div className="health"><HealthBar size={(health/maxHealth)*100}/></div> |
        Level: <div className="level">{level}</div> |
        Experience: <div className="exp"><ExpBar size={(exp/maxExp)*100}/></div> |
        Caps: <div className="caps">{caps.toLocaleString('en-US')}</div>
    </div>;
  }