import React from "react";

export default function CodeInput({ previewSolution }) {
    return (
        <div className="info column">
            <span className="input" data-content={previewSolution ? previewSolution : "\u00A0"}>{previewSolution ? "" : "\u00A0"}</span>
        </div>
    );
}