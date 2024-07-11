import React from "react";

export default function CodeInput({ previewSolution }) {
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