import React, { useState } from "react";

export function Terminal() {
  const [attempts, setAttempts] = useState(3);

  return (
    <div id="terminal">
      <div className="header">
        <p>Welcome to ROBCO Industries (TM) Termlink</p>
        <p>
          Password Required <span className="password"></span>
        </p>
        <p id="attempts">
          Attempts Remaining: {attempts}
        </p>
      </div>
      <div className="linenumber column"></div>
      <div className="code left column">
        <div className="code left column"></div>
      </div>
      <div className="linenumber column"></div>
      <div className="code right column">
        <div className="code right column"></div>
      </div>
      <div className="info column">
        <span className="input">&nbsp;</span>
      </div>
    </div>
  );
}
