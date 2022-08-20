'use strict';

class TerminalData {
    constructor() {
        this.rowsPerColumn = 16;
        this.columns = 2;// Number of "pages"
        this.dataPerColumn = 12;// Characters per column
        this.code = [];
        this.markup = [];
    }

    maxCharacters() {
        return this.dataPerColumn * this.rowsPerColumn * this.columns;
    }

    codeString() {
        return this.code.join("");
    }
}

export default TerminalData;
