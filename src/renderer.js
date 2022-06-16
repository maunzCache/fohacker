'use strict';

const $ = require('jquery');

class Renderer {
    // TODO: Implement testing
    static addLevelUpBeforeInfoInput = function () {
        $('.info .input').before('<span class="info">Level Up</span><br>');
    };

    static addExpBeforeInfoInput = function (addExp) {
        $('.info .input').before('<span class="info">EXP +' + addExp + '</span><br>');
    };

    static emptyTerminalLinenumber = function () {
        $('.terminal .linenumber').empty();
    };

    static emptyTerminalCode = function () {
        $('.terminal .code').empty();
    };

    static emptyInfo = function () {
        $('.info').empty();
    };

    static appendInputSpanToInfo = function () {
        $('.info').append('<span class="input">&nbsp</span>');
    };

    static createPointersForEachTerminalLinenumber = function (terminalData, lineNumber) {
        // TODO: Consider moving back logic to Game (game.js)
        $('.terminal .linenumber').each(function (key, value) {
            for (var i = 0; i < terminalData.rows; i++) {
                lineNumber = (parseInt(lineNumber, terminalData.rows) + (i * 12)).toString(16).toUpperCase();// Todo allow overflow!

                if (lineNumber.length > 4) {
                    lineNumber = lineNumber.slice(1, 5);
                }
                while (lineNumber.length < 4) {
                    lineNumber = "0" + lineNumber;
                }

                if (i === 15) {
                    Renderer.appendLineNumberSpan(value, lineNumber, true);
                } else {
                    Renderer.appendLineNumberSpan(value, lineNumber, false);
                }
            }
        });
    };

    static appendLineNumberSpan = function (value, lineNumber, isLastLine) {
        if (isLastLine) {
            $(value).append("<span>0x" + lineNumber + "</span>");
        } else {
            $(value).append("<span>0x" + lineNumber + "</span><br>");
        }
    }
}

module.exports = Renderer;