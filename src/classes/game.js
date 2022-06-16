'use strict';

import GameData from './gamedata';
import Perk from './perk';
import TerminalData from './terminaldata';

let perks = [
    new Perk(
        "Peek-A-Boo",
        [
            "You can see the current password but you still have to click it by yourself.",
            "Less searching, more clicking. The password gets highlighted too."
        ],
        2, 2),
    new Perk(
        "More Of The Same",
        [
            "More possibilities. More trying. More experience."
        ],
        0, 1),
    new Perk(
        "Just One More Minute ...",
        [
            "Increases max.attempts.",
            "Increases max.attempts.",
            "Increases max.attempts.",
            "Increases max.attempts.",
            "Increases max.attempts.",
            "Increases max.attempts."
        ],
        0, 6),
    new Perk(
        "Enter The Matrix",
        [
            "Highlight duds."
        ],
        0, 1),
    new Perk(
        "Rubbersome",
        [
            "Be rubber, my friend. Less damage when shocked by a locked terminal."
        ],
        0, 1),
    new Perk(
        "Nerd Rage",
        [
            "Stop typing passwords. Start smashing terminals."
        ],
        0, 1),
];

export default class Game {
    static version = "0.1 (alpha)"
    static dudCharacters = ",;.:^<>()[]{}!?@%$`'\"*+-=/\|_";
    static startDuds = "<([{";
    static endDuds = ">)]}";

    constructor() {
        this.gameData = new GameData();
        this.terminalData = new TerminalData();
    }

    nextLevelExp = function () {
        return Math.round(Math.exp((this.gameData.level + 1) * 0.45) + Math.exp(this.gameData.level * 0.45) * 6);
    };

    levelUp = function () {
        let nextExp = this.nextLevelExp();

        while (this.gameData.experience > nextExp) {
            var possibleOverhead = nextExp - this.gameData.experience;
            if (possibleOverhead <= 0) {
                this.gameData.level++;
                this.gameData.skillpoints++;
                $('.info .input').before('<span class="info">Level Up</span><br>');
                this.gameData.totalExperience += this.gameData.experience;
                this.gameData.experience = Math.abs(possibleOverhead);
            }
        }
    };

    addExperience = function (words) {
        var addExp = Math.round((words + 1) * this.gameData.difficulty * 0.35);
        this.gameData.experience += addExp;
        $('.info .input').before('<span class="info">EXP +' + addExp + '</span><br>');
        this.levelUp();
    };

    getDifficulty = function () {
        if (this.gameData.difficulty >= 4 && this.gameData.difficulty <= 5) {
            return "Easy";
        } else if (this.gameData.difficulty >= 6 && this.gameData.difficulty <= 8) {
            return "Advanced";
        } else if (this.gameData.difficulty >= 9 && this.gameData.difficulty <= 10) {
            return "Expert";
        } else if (this.gameData.difficulty >= 11 && this.gameData.difficulty <= 12) {
            return "Master";
        }
    };

    updateUI = function () {
        $('.infobar .difficulty').text(this.getDifficulty());
        $('.infobar .level').text(this.gameData.level);
        $('.expbar').css('width', this.gameData.experience / (this.nextLevelExp() / 100));

        if (perks[0]["level"] > 0) {
            $('.password').text('(Password=' + this.gameData.password + ')');
        }

        $('#attempts .attempt').detach();
        for (var i = 0; this.gameData.attempts > i; i++) {
            $('#attempts').append('<span class="attempt">&nbsp;&nbsp;</span>');
        }

        $('.perklist').empty();
        $('.perklist').append('Skillpoints: <div class="skillpoints">' + this.gameData.skillpoints + '</div><br>');
        $.each(perks, function (key, perk) {
            if (perk.meetsRequirements) {
                var classes = ['perkdiv'];
                if (perk.level > 0) {
                    classes.push('active');
                }

                var description = perk.description[perk.level];
                if (description === undefined) {
                    description = "Maxed out."
                }

                $('.perklist').append('<div class="' + classes.join(' ') + '" data-id="' + key + '">'
                    + '<b>' + perk.title + '</b> (' + perk.level + '/' + perk.maxlevel + ')<br>'
                    + '<span>' + description + '</span>'
                    + '</div>');
            }
        });
        $('.perklist').append();
        $('.perkdiv').on('click', function () {
            if (this.gameData.skillpoints > 0) {
                var perkid = $(this).data("id");
                if ((perks[perkid].level + 1) <= perks[perkid].maxlevel) {
                    perks[perkid].level++;
                    this.gameData.skillpoints--;
                    this.updateUI();
                }
            }
        });
    };

    clearOld = function () {
        $('.terminal .linenumber').empty();
        $('.terminal .code').empty();
        this.gameData.attempts = 4;
        this.gameData.currentPasswords = this.gameData.passwords[this.gameData.difficulty];
        $('.info').empty();
        $('.info').append('<span class="input">&nbsp</span>');
    };

    createPointers = function () {
        var _this = this; // TODO: Workaround because of scoping
        var lineNumber = Math.random().toString(16).slice(2, 6);

        $('.terminal .linenumber').each(function (key, value) {
            for (var i = 0; i < _this.terminalData.rows; i++) {
                lineNumber = (parseInt(lineNumber, _this.terminalData.rows) + (i * 12)).toString(16).toUpperCase();// Todo allow overflow!

                if (lineNumber.length > 4) {
                    lineNumber = lineNumber.slice(1, 5);
                }
                while (lineNumber.length < 4) {
                    lineNumber = "0" + lineNumber;
                }

                if (i === 15) {
                    $(value).append("<span>0x" + lineNumber + "</span>");
                } else {
                    $(value).append("<span>0x" + lineNumber + "</span><br>");
                }
            }
        });
    };

    createDudCode = function () {
        // Iterate for each character
        for (var i = 0; (this.terminalData.columns * this.terminalData.rows) > i; i++) {
            var randomData = "";
            // Iterate per "line"
            for (var j = 0; this.terminalData.dataPerColumn > j; j++) {
                let randomDudIndex = Math.round(Math.random() * (Game.dudCharacters.length - 1));
                randomData += Game.dudCharacters[randomDudIndex];
            }
            // console.log("Duds [" + i + "]: " + randomData);
            this.terminalData.code[i] = randomData;
        }
    };

    createCurrentPasswords = function () {
        var currentPasswords = [];

        // If dictionary is too small
        let passwordsForDifficulty = this.gameData.passwords[this.gameData.difficulty];
        let amountOfPasswords = passwordsForDifficulty.length;
        if (this.gameData.passwordsOnScreen > amountOfPasswords) {
            this.gameData.passwordsOnScreen = amountOfPasswords;
            console.log("Dictionary " + this.getDifficulty() + "(Size: " + this.gameData.difficulty + ") has too few entries (" + amountOfPasswords + ").");
        }

        var tempPasswords = passwordsForDifficulty.wordList.slice();
        // Pick password
        this.gameData.password = tempPasswords[Math.round(Math.random() * (tempPasswords.length - 1))];
        for (var i = 0; this.gameData.passwordsOnScreen > i; i++) {
            currentPasswords[i] = tempPasswords[Math.round(Math.random() * (tempPasswords.length - 1))];

            var position = $.inArray(currentPasswords[i], tempPasswords);
            if (~position) {
                tempPasswords.splice(position, 1);
            }
        }
        console.log(currentPasswords);
    };

    addPasswords = function () {
        var tempPasswords = this.gameData.currentPasswords.wordList.slice();
        var blockedPositions = [];

        while (tempPasswords.length > 0) {
            var randomPosition = Math.round(Math.random() * (this.terminalData.maxCharacters() - this.gameData.difficulty)); // Password fits into last line

            if ($.inArray(randomPosition, blockedPositions) > -1) {
                // console.log("Hit: " + terminalData.code[Math.floor(randomPosition / (terminalData.columns * terminalData.dataPerColumn))]);
                continue; // Get a new random position
            }

            if (randomPosition < 0) {
                randomPosition = 0;
            }

            if (randomPosition >= this.terminalData.maxCharacters()) {
                console.log("Position calculation wrong: " + randomPosition + " of " + this.terminalData.maxCharacters());
            }

            var linePosition = Math.floor(randomPosition / this.terminalData.dataPerColumn);
            var inLinePosition = randomPosition % this.terminalData.dataPerColumn;

            var nextPassword = tempPasswords.shift();
            if ((linePosition + 1) > (this.terminalData.columns * this.terminalData.rows)) {
                console.log("Accidentally hit " + (linePosition + 1) + "th row during password insertion.");
            }

            var code = this.terminalData.code[linePosition];
            if ((inLinePosition + this.gameData.difficulty) > this.terminalData.dataPerColumn) { // Password needs more than one row
                var difference = this.terminalData.dataPerColumn - inLinePosition;

                var overhead = this.gameData.difficulty - difference;
                this.terminalData.code[linePosition] = code.substr(0, inLinePosition) + nextPassword.substr(0, difference);

                code = this.terminalData.code[linePosition + 1];
                this.terminalData.code[linePosition + 1] = nextPassword.substr(difference, overhead) + code.substr(overhead);
                blockedPositions.push(randomPosition, randomPosition - 1, randomPosition + 1, randomPosition - 2, randomPosition + 2, randomPosition - 3, randomPosition + 3, randomPosition - 4, randomPosition + 4);
            } else {
                this.terminalData.code[linePosition] = code.substr(0, inLinePosition) + nextPassword + code.substr(inLinePosition + nextPassword.length);
                blockedPositions.push(randomPosition, randomPosition - 1, randomPosition + 1, randomPosition - 2, randomPosition + 2, randomPosition - 3, randomPosition + 3, randomPosition - 4, randomPosition + 4);
            }
        }
    };

    findDuds = function () {
        console.log("Terminal has size: " + this.terminalData.code.length);
        // Get the end duds first
        var duds = [];
        for (var i = 0; this.terminalData.code.length > i; i++) {
            // TODO Code below hits only once. Better RegEx?
            for (var j = this.terminalData.code.length; 0 < j; j--) {
                var endPosition = $.inArray(this.terminalData.code[i][j], Game.endDuds);
                if (~endPosition) {
                    var cutString = this.terminalData.code[i].substr(0, endPosition);
                    var startPosition = $.inArray(Game.startDuds[endPosition], cutString);
                    if (~startPosition) {
                        duds.push([
                            {
                                "dudPos": endPosition,// Position in char string
                                "startDud": startPosition,
                                "endDud": j
                            }
                        ]);
                        console.log("Adding duds: " + endPosition + "/" + startPosition + "/" + j);
                        console.log(this.terminalData.code[i]);
                        // TODO: Only highlights initial duds but not new.
                    }
                }
            }
        }
        if (duds.length > 0) {
            console.log("Final list of duds: ");
            console.log(duds);
        }
    };

    createMarkup = function () {
    };

    addHtml = function () {
        let tmpPasswords = this.gameData.currentPasswords.wordList.slice();

        // TODO: Use markup array
        // TODO: More than two rows
        for (var i = 0; this.terminalData.code.length > i; i++) {
            var selector = "";
            if (i < 16) {
                selector = '.terminal .left.code';
            } else {
                selector = '.terminal .right.code';
            }

            // TODO: Finds passwords in a single row
            let lineValue = this.terminalData.code[i];
            // Workaround to fix nasty html side effects
            lineValue = lineValue.replace(/</g, "&lt;");
            lineValue = lineValue.replace(/>/g, "&gt;");

            let replacedPassword = "";
            let _this = this; // TODO: Workaround because of scope
            tmpPasswords.forEach(function (value, key, array) {
                // Finds all single line passwords
                // TODO: Fails for words including other words
                let tempNewLineValue = lineValue.replace(value, '<span class="word" data-word="' + value + '">' + value + '</span>');

                // Assume nothing has been replaced
                // TODO: Can contain non replaced word
                // Look a head if word is in next line
                if (tempNewLineValue === lineValue) {
                    if (i < _this.terminalData.code.length - 1) {
                        // Find the index in the line we need to look up for the split word
                        // e.g. a 4 letter word can have a max of 3 chars and a min of 1 char in one line
                        let limitOldLine = (_this.terminalData.dataPerColumn - 1) - (value.length - 1);// Actually this will be an index

                        let limitNewLine = (value.length - 1);// Also an index
                        let lineLookAhead = _this.terminalData.code[i].substr(limitOldLine) + _this.terminalData.code[i + 1].substr(0, limitNewLine + 1);
                        console.log("Lookahead ", value, limitOldLine, limitNewLine, lineLookAhead);

                        // This is the index of the cut and spliced lines
                        let startIndex = lineLookAhead.indexOf(value);
                        let endIndex = startIndex + value.length;

                        // NOTE: At this point the whole stuff will fail as the next line will override the markup of this nice linebreak stuff.
                        // I'd rather not implement linebreaking for now and just ensure limits.
                    }
                } else {
                    // TODO: Replace in split words too
                    // console.log("Replacement", lineValue, "is" , tempNewLineValue);
                    replacedPassword = value;
                }

                lineValue = tempNewLineValue;
                // TODO: One line can yield multiple passwords for small lengths
            });

            $(selector).append('<span id="span' + i + '"></span><br>');
            // Note: If rendered as html some duds will break stuff.
            $('#span' + i).html(lineValue);

            tmpPasswords = tmpPasswords.filter(function (value, key, array) {
                return value !== replacedPassword;
            });
        }
    };

    addScript = function () {
        // TODO: Simulate typing the hovered word
        $('.code .word').on('mouseover', function (event) {
            var passwordHovered = event.target.textContent;
            console.log("Hovering: " + passwordHovered);
            $('.info .input').attr('data-content', passwordHovered);
        });
        $('.code .word').on('mouseout', function (event) {
            console.log("End hover");
            $('.info .input').attr('data-content', '');
        });
        // Todo: Merge code from createTerminal()
    };

    createTerminal = function () {
        this.clearOld();

        console.log("--- Creating pointers ---");
        this.createPointers();// Create "random" line numbers
        console.log("--- Creating duds---");
        this.createDudCode();// Create password text filled with duds
        console.log("--- Create passwords ---");
        this.createCurrentPasswords();// Generate current password list
        console.log("--- Merge passwords and duds ---");
        this.addPasswords();// Merge duds and passwords
        console.log("--- Find/highlight duds---");
        this.findDuds();
        console.log("--- Create markup ---");
        this.createMarkup();
        console.log("--- Add html ---");
        this.addHtml();// Create HTML
        console.log("--- Add events and listeners ---");
        this.addScript();

        if (perks[0]["level"] >= 2) {
            $('.code .word').each(function () {
                if (this.gameData.password == $(this).data("word")) {
                    $(this).addClass("highlight");
                }
            });
        }

        // Create settings menubar
        // Todo move code to ui building code
        // Code by http://www.jacklmoore.com/notes/jquery-tabs/
        $('ul.tabs').each(function () {
            // For each set of tabs, we want to keep track of
            // which tab is active and it's associated content
            var $active, $content, $links = $(this).find('a');

            // If the location.hash matches one of the links, use that as the active tab.
            // If no match is found, use the first link as the initial active tab.
            $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
            $active.addClass('active');

            $content = $($active[0].hash);

            // Hide the remaining content
            $links.not($active).each(function () {
                $(this.hash).hide();
            });

            // Bind the click event handler
            $(this).on('click', 'a', function (e) {
                // Make the old tab inactive.
                $active.removeClass('active');
                $content.hide();

                // Update the variables with the new link and content
                $active = $(this);
                $content = $(this.hash);

                // Make the tab active.
                $active.addClass('active');
                $content.show();

                // Prevent the anchor's default click action
                e.preventDefault();
            });
        });

        // Make passwords clickable
        $('.code .word').on('click', function (event) {
            var selectedPassword = event.target.textContent;

            var position = $.inArray(selectedPassword, this.gameData.currentPasswords);
            if (~position) {
                this.gameData.currentPasswords.splice(position, 1);
            }

            var likeness = 0;
            for (var i = 0; this.gameData.difficulty > i; i++) {
                if (this.gameData.password[i] == selectedPassword[i]) {
                    likeness++;
                }
            }

            if (this.gameData.password == selectedPassword) {
                var oldLength = this.gameData.currentPasswords.length;
                this.createTerminal();
                this.addExperience(oldLength);
                $('.info .input').before('<span class="try">' + selectedPassword + '</span><br>');
                $('.info .input').before('<span class="text">Access granted.</span><br>');
            } else {
                this.gameData.attempts--;
                $('.info .input').before('<span class="try">' + selectedPassword + '</span><br>');
                $('.info .input').before('<span class="likeness">Likeness=' + likeness + '</span><br>');
                $('.info .input').before('<span class="text">Entry denied.</span><br>');
                if (this.gameData.attempts == 0) {
                    this.createTerminal();
                    $('.info .input').before('<span class="try">' + selectedPassword + '</span><br>');
                    $('.info .input').before('<span class="text">Terminal locked.</span><br>');
                }
            }

            this.updateUI();
        });

        // Break special
        $('.linebreak').hover(function () {
            var dataWord = $(this).data("word");
            var siblings = $('[data-word="' + dataWord + '"]');
            $(siblings).each(function () {
                $(this).css("background-color", "#82FA58");
                $(this).css("color", "#0B1907");
            });
        }, function () {
            $('.linebreak').css("background-color", "#0B1907");
            $('.linebreak').css("color", "#82FA58");
        });

        // Todo update data word :(
        $('.pagebreak').hover(function () {
            $('.pagebreak').css("background-color", "#82FA58");
            $('.pagebreak').css("color", "#0B1907");
        }, function () {
            $('.pagebreak').css("background-color", "#0B1907");
            $('.pagebreak').css("color", "#82FA58");
        });

        this.updateUI();
    };
};
