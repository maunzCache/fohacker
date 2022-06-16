'use strict';

class TerminalData {
    constructor() {
        this.rows = 16;
        this.columns = 2;// Number of "pages"
        this.dataPerColumn = 12;// Characters per column
        this.code = [];
        this.markup = [];
    }

    maxCharacters = function () {
        return this.dataPerColumn * this.rows * this.columns;
    };

    codeString = function () {
        var returnString = "";
        for (var i = 0; this.code.length > i; i++) {
            returnString += this.code[i];
        }
        return returnString;
    };
};

module.exports = TerminalData;