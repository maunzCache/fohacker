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

function CodeLine({ codeWord, onWordOver, onWordOut }) {
  // TODO: Handle dud code; handle multiline passwords
  return <>
    {codeWord.start}
    <span className="word" data-word={codeWord.word} onMouseOver={onWordOver} onMouseOut={onWordOut}>{codeWord.word}</span>
    {codeWord.end}
  </>
}

export default function Terminal({ lineBaseNumber, maxLines, maxColumns, terminalState, currentSolution }) {
  const [attempts, setAttempts] = useState(4);
  const [hoverValue, setHoverValue] = useState("");

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

  function hoveringCodeWord(value) {
    setHoverValue(value);
  }

  const codeLines = terminalState.map((value, key) => {
    return (
      <>
        <CodeLine key={"codeno_" + key} codeWord={value} onWordOver={() => hoveringCodeWord(value.word)} onWordOut={() => hoveringCodeWord("")} />
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
          Password Required <span className="password">(PASSWORD={currentSolution})</span>
        </p>
      </div>
      <div>
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
