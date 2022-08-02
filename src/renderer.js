'use strict';

const $ = require('jquery');

const Game = require('./classes/game');

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
                lineNumber = (parseInt(lineNumber, terminalData.rows) + (i * 12)).toString(16).toUpperCase();// TODO: allow overflow!

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

    static addFOHackerVersionBeforeInfoInput = function () {
        $('.info .input').before('Fallout Hacker<br>Version ' + Game.version + '<br>');
    }

    static showPasswordInTerminalHeader = function (password) {
        $('.password').text('(Password=' + password + ')');
    }

    static addAttemptBlock = function () {
        $('#attempts').append('<span class="attempt">&nbsp;&nbsp;</span>');
    }

    static showSkillpointAmount = function (skillpoints) {
        $('.perklist').append('Skillpoints: <div class="skillpoints">' + skillpoints + '</div><br>');
    }

    static appendPerkBoxToPerklist = function (classes, key, perk, description) {
        $('.perklist').append('<div class="' + classes.join(' ') + '" data-id="' + key + '" title="' + perk.description[0] + '">'
            + '<b>' + perk.title + '</b> (' + perk.level + '/' + perk.maxlevel + ')<br>'
            + '<span>' + description + '</span>'
            + '</div>');
    }

    static addSelectedPasswordBeforeInput = function (selectedPassword) {
        $('.info .input').before('<span class="try">' + selectedPassword + '</span><br>');
    }

    static addAnyHtmlBeforeInput = function (html) {
        // TODO: Input is not sanitized.
        $('.info .input').before(html);
    }

    static emptyPerklist = function () {
        $('.perklist').empty();
    }
}

module.exports = Renderer;
