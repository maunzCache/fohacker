import React, { useState } from "react";

import CodeInput from "./codeinput.jsx";

export default function Terminal() {
  const [attempts, setAttempts] = useState(3);
  const [hoverValue, setHoverValue] = useState("");

  const lineBaseNumber = Math.floor(Math.random() * 9999);

  function generateLineNumber(increment) {
    // TODO: Increment should be a multiple of 2
    const lineNumber = (lineBaseNumber + increment).toString(16);
    const sizeDiff = 4 - lineNumber.length;
    return "0x" + Array(sizeDiff + 1).join("0") + lineNumber;
  }

  function getRandomString() {
    const dudCharacters = ",;.:^<>()[]{}!?@%$`'\"*+-=/\|_";
    // const startDuds = "<([{";
    // const endDuds = ">)]}";
    return [...Array(12)].map((_value, _key) => {
      return dudCharacters[Math.floor(Math.random() * dudCharacters.length)];
    });
  }

  const maxLines = 16;

  function hoveringCodeWord(value) {
    setHoverValue(value);
  }

  // TODO: Pages start with the same number
  function terminalPage({ pageName }) {
    return (
      <>
        <div className="linenumber column">
          {[...Array(maxLines)].map((_value, key) => {
            return (
              <>
                <span key={"lineno_" + pageName + key}>{generateLineNumber(key * 12)}</span>
                <br></br>
              </>
            );
          })}
        </div>
        <div className={"code column " + pageName}>
          {[...Array(maxLines)].map((_, key) => {
            const codeWord = getRandomString().join("");
            return (
              <>
                <span key={"codeno_" + pageName + key} className="dud" data-word={codeWord} onMouseOver={() => hoveringCodeWord(codeWord)} onMouseOut={() => hoveringCodeWord("")}>{codeWord}</span>
                <br></br>
              </>
            );
          })}
        </div>
      </>
    );
  }

  // TODO: '.input .info' element is left of the terminal window instead of below.
  // Dirty fix with fixed width of 580px
  return (
    <div id="terminal">
      <div className="header">
        <p>Welcome to ROBCO Industries (TM) Termlink</p>
        <p>
          Password Required <span className="password"></span>
        </p>
        <p id="attempts">
          Attempts Remaining: {[...Array(attempts)].map(() => {
            return (
              <>
                <span className="attempt">&nbsp;&nbsp;</span>
              </>
            );
          })}
        </p>
      </div>
      {terminalPage("left")}
      {terminalPage("right")}
      <CodeInput previewSolution={hoverValue} />
    </div>
  );
}
