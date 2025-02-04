import React, { useState } from "react";

function CodeInput({ previewSolution }) {
  // TODO: Pull from build step
  const gameVersion = "0.1 (alpha)"

  return (
    <div className="info column">
      Fallout Hacker<br />
      Version {gameVersion}<br />
      <span className="input" data-content={previewSolution ? previewSolution : "\u00A0"}>{previewSolution ? "\u00A0" : "\u00A0"}</span>
    </div>
  );
}

function CodeLine({codeWord, onWordOver, onWordOut}) {
  return <span className="dud" data-word={codeWord} onMouseOver={onWordOver} onMouseOut={onWordOut}>{codeWord}</span>
}

export default function Terminal() {
  const [attempts, setAttempts] = useState(3);
  const [hoverValue, setHoverValue] = useState("");

  const lineBaseNumber = Math.floor(Math.random() * 9999);
  const maxLines = 16;
  const maxColumns = 2;

  const lineNumbers = [...Array(maxLines * maxColumns)].map((_, key) => {
    const lineNumber = (lineBaseNumber + (key * 12)).toString(16);
    const sizeDiff = 4 - lineNumber.length;
    return (
      <>
        <span key={"lineno_" + key}>0x{Array(sizeDiff + 1).join("0")}{lineNumber}</span>
        <br></br>
      </>
    );
  });

  function getRandomString() {
    const dudCharacters = ",;.:^<>()[]{}!?@%$`'\"*+-=/\|_";
    // const startDuds = "<([{";
    // const endDuds = ">)]}";
    return [...Array(12)].map((_value, _key) => {
      return dudCharacters[Math.floor(Math.random() * dudCharacters.length)];
    });
  }

  function hoveringCodeWord(value) {
    setHoverValue(value);
  }

  const codeLines = [...Array(maxLines * maxColumns)].map((_, key) => { 
    const codeWord = getRandomString().join("");
    return (
      <>
        <CodeLine key={"codeno_" + key} codeWord={codeWord} onWordOver={() => hoveringCodeWord(codeWord)} onWordOut={() => hoveringCodeWord("")} />
        <br></br>
      </>
    );
   });

   const terminalPages = (
    <>
      <div className="linenumber column">
      {lineNumbers.slice(0, maxLines)}
      </div>
      <div className={"code column left"}>
      {codeLines.slice(0, maxLines)}
      </div>
      <div className="linenumber column">
      {lineNumbers.slice(maxLines, maxLines * maxColumns)}
      </div>
      <div className={"code column right"}>
      {codeLines.slice(maxLines, maxLines * maxColumns)}
      </div>
    </>
  );

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
                <span key={attempts} className="attempt">&nbsp;&nbsp;</span>
              </>
            );
          })}
        </p>
      </div>
      {terminalPages}
      <CodeInput previewSolution={hoverValue} />
    </div>
  );
}
