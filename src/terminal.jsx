import React from "react";

export function Terminal() {
  return (
    <div id="terminal">
      <div className="header">
        <p>Welcome to ROBCO Industries (TM) Termlink</p>
        <p>
          Password Required <span className="password"></span>
        </p>
        <p id="attempts">
          Attempts Remaining:
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
        <span className="input">&nbsp</span>
      </div>
    </div>
  );
}
