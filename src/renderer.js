'use strict';

import $ from 'jquery';

import Game from './classes/game.js';

class Renderer {
    // TODO: Implement testing
    static addLevelUpBeforeInfoInput() {
        $('.info .input').before('<span class="info">Level Up</span><br>');
    }

    static addExpBeforeInfoInput(addExp) {
        $('.info .input').before('<span class="info">EXP +' + addExp + '</span><br>');
    }

    static emptyTerminalLinenumber() {
        $('.terminal .linenumber').empty();
    }

    static emptyTerminalCode() {
        $('.terminal .code').empty();
    }

    static emptyInfo() {
        $('.info').empty();
    }

    static appendInputSpanToInfo() {
        $('.info').append('<span class="input">&nbsp</span>');
    }

    static createPointersForEachTerminalLinenumber(terminalData, lineNumber) {
        // TODO: Consider moving back logic to Game (game.js)
        $('.terminal .linenumber').each(function (_key, value) {
            for (let i = 0; i < terminalData.rowsPerColumn; i++) {
                lineNumber = (parseInt(lineNumber, terminalData.rowsPerColumn) + (i * 12)).toString(16).toUpperCase();// TODO: allow overflow!

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
    }

    static appendLineNumberSpan(value, lineNumber, isLastLine) {
        if (isLastLine) {
            $(value).append("<span>0x" + lineNumber + "</span>");
        } else {
            $(value).append("<span>0x" + lineNumber + "</span><br>");
        }
    }

    static addFOHackerVersionBeforeInfoInput() {
        $('.info .input').before('Fallout Hacker<br>Version ' + Game.version + '<br>');
    }

    static showPasswordInTerminalHeader(password) {
        $('.password').text('(Password=' + password + ')');
    }

    static addAttemptBlock() {
        $('#attempts').append('<span class="attempt">&nbsp;&nbsp;</span>');
    }

    static showSkillpointAmount(skillpoints) {
        $('.perklist').append('Skillpoints: <div class="skillpoints">' + skillpoints + '</div><br>');
    }

    static appendPerkBoxToPerklist(classes, key, perk, description) {
        $('.perklist').append('<div class="' + classes.join(' ') + '" data-id="' + key + '" title="' + perk.description[0] + '">'
            + '<b>' + perk.title + '</b> (' + perk.level + '/' + perk.maxlevel + ')<br>'
            + '<span>' + description + '</span>'
            + '</div>');
    }

    static addSelectedPasswordBeforeInput(selectedPassword) {
        $('.info .input').before('<span class="try">' + selectedPassword + '</span><br>');
    }

    static addAnyHtmlBeforeInput(html) {
        // TODO: Input is not sanitized.
        $('.info .input').before(html);
    }

    static emptyPerklist() {
        $('.perklist').empty();
    }
}

export default Renderer;
