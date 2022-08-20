'use strict';

import Renderer from '../renderer.js';
import GameData from './gamedata.js';
import Perk from './perk.js';
import TerminalData from './terminaldata.js';
import Dictionary from './dictionary.js';
import Dud from './dud.js';
import DudHelper from './dudhelper.js';

// TODO: Deprecated. Replace with Renderer.
import $ from 'jquery';

// TODO: Implement loading from assets folder as JSON
let perks = [
    new Perk(
        "Peek-A-Boo",
        [
            "You can see the current password but you still have to click it by yourself.",
            "Less searching, more clicking. The password gets highlighted too."
        ],
        2),
    new Perk(
        "More Of The Same",
        [
            "More possibilities. More trying. More experience."
        ],
        0),
    new Perk(
        "Just One More Minute ...",
        [
            "Increases max. attempts.",
            "Increases max. attempts.",
            "Increases max. attempts.",
            "Increases max. attempts.",
            "Increases max. attempts.",
            "Increases max. attempts."
        ],
        0),
    new Perk(
        "Enter The Matrix",
        [
            "Highlight duds.",
            "Multiline duds."
        ],
        0),
    new Perk(
        "Rubbersome",
        [
            "Be rubber, my friend. Less damage when shocked by a locked terminal.",
            "Reduce damage even more when shocked by a locked terminal.",
            "No more damage from locked terminal.",
            "Get one more attempt when locking the terminal",
        ],
        0),
    new Perk(
        "Nerd Rage",
        [
            "Stop typing passwords. Start smashing terminals. Half the money, but skip the current attempt. Needs to be charged."
        ],
        0),
];

class Game {
    constructor() {
        this.gameData = new GameData();
        this.terminalData = new TerminalData();
    }

    nextLevelExp() {
        return Math.round(Math.exp((this.gameData.level + 1) * 0.45) + Math.exp(this.gameData.level * 0.45) * 6);
    }

    levelUp() {
        let nextExp = this.nextLevelExp();

        while (this.gameData.experience > nextExp) {
            let possibleOverhead = nextExp - this.gameData.experience;
            if (possibleOverhead <= 0) {
                this.gameData.level++;
                this.gameData.skillpoints++;
                Renderer.addLevelUpBeforeInfoInput();
                this.gameData.totalExperience += this.gameData.experience;
                this.gameData.experience = Math.abs(possibleOverhead);
            }
        }
    }

    addExperience(words) {
        let addExp = Math.round((words + 1) * this.gameData.difficulty * 0.35);
        this.gameData.experience += addExp;
        Renderer.addExpBeforeInfoInput(addExp);
        this.levelUp();
    }

    getDifficulty() {
        if (this.gameData.difficulty >= 4 && this.gameData.difficulty <= 5) {
            return "Easy";
        } else if (this.gameData.difficulty >= 6 && this.gameData.difficulty <= 8) {
            return "Advanced";
        } else if (this.gameData.difficulty >= 9 && this.gameData.difficulty <= 10) {
            return "Expert";
        } else if (this.gameData.difficulty >= 11 && this.gameData.difficulty <= 12) {
            return "Master";
        }
    }

    updateUI() {
        $('.infobar .difficulty').text(this.getDifficulty());
        $('.infobar .level').text(this.gameData.level);
        $('.expbar').css('width', this.gameData.experience / (this.nextLevelExp() / 100));

        if (perks[0]["level"] > 0) {
            Renderer.showPasswordInTerminalHeader(this.gameData.password);
        }

        $('#attempts .attempt').detach();
        for (var i = 0; this.gameData.attempts > i; i++) {
            Renderer.addAttemptBlock();
        }

        Renderer.emptyPerklist();
        Renderer.showSkillpointAmount(this.gameData.skillpoints);
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

                Renderer.appendPerkBoxToPerklist(classes, key, perk, description);
            }
        });
        $('.perklist').append();

        let _this = this; // TODO: Workaround because of scope
        $('.perkdiv').on('click', function () {
            if (_this.gameData.skillpoints > 0) {
                var perkid = $(this).data("id");
                if ((perks[perkid].level + 1) <= perks[perkid].maxlevel) {
                    perks[perkid].level++;
                    _this.gameData.skillpoints--;
                    _this.updateUI();
                }
            }
        });
    }

    clearOld() {
        // TODO: This can obviously be refactored.
        Renderer.emptyTerminalLinenumber();
        Renderer.emptyTerminalCode();
        this.gameData.attempts = 4;
        this.gameData.currentPasswords = this.gameData.passwords()[this.gameData.difficulty];
        Renderer.emptyInfo();
        Renderer.appendInputSpanToInfo();
    }

    createPointersForTerminal() {
        let lineNumber = Math.random().toString(16).slice(2, 6);
        Renderer.createPointersForEachTerminalLinenumber(this.terminalData, lineNumber);
    }

    createDudCode() {
        // TODO: Replace with code that ensures duds by using a certain skill
        // Iterate for each character
        for (var dataIndex = 0; (this.terminalData.columns * this.terminalData.rowsPerColumn) > dataIndex; dataIndex++) {
            let randomData = "";
            // Iterate per "line"
            for (var rowNumber = 0; this.terminalData.dataPerColumn > rowNumber; rowNumber++) {
                let randomDudIndex = Math.round(Math.random() * (DudHelper.dudCharacters.length - 1));
                randomData += DudHelper.dudCharacters[randomDudIndex];
            }
            console.debug("Duds [" + dataIndex + "]: " + randomData);
            this.terminalData.code[dataIndex] = randomData;
        }
    }

    createCurrentPasswords() {
        // TODO: Replace with code that ensures passwords by using a certain skill
        let currentPasswords = [];

        // If dictionary is too small
        let passwordsForDifficulty = this.gameData.passwords()[this.gameData.difficulty];
        let amountOfPasswords = passwordsForDifficulty.wordList.length;
        if (this.gameData.passwordsOnScreen > amountOfPasswords) {
            this.gameData.passwordsOnScreen = amountOfPasswords;
            console.log("Dictionary " + this.getDifficulty() + "(Size: " + this.gameData.difficulty + ") has too few entries (" + amountOfPasswords + ").");
        }

        let tempPasswords = passwordsForDifficulty.wordList.slice();
        // Pick password
        this.gameData.password = tempPasswords[Math.round(Math.random() * (tempPasswords.length - 1))];
        for (var passwordIndex = 0; this.gameData.passwordsOnScreen > passwordIndex; passwordIndex++) {
            currentPasswords[passwordIndex] = tempPasswords[Math.round(Math.random() * (tempPasswords.length - 1))];

            let position = tempPasswords.indexOf(currentPasswords[passwordIndex], tempPasswords);
            if (~position) {
                tempPasswords.splice(position, 1);
            }
        }
        console.log(currentPasswords);
        this.gameData.currentPasswords = new Dictionary(currentPasswords)
    }

    addPasswordsToData() {
        let tempPasswords = this.gameData.currentPasswords.wordList.slice();
        let blockedPositions = [];

        while (tempPasswords.length > 0) {
            let randomIndex = this.getRandomIndexForPasswordStart(blockedPositions);
            if (randomIndex == -1) {
                continue
            }

            let rowNumberFromRandomIndex = Math.floor(randomIndex / this.terminalData.dataPerColumn);
            let columnNumberFromRandomIndex = randomIndex % (this.terminalData.dataPerColumn);

            let nextPassword = tempPasswords.shift();
            if ((rowNumberFromRandomIndex + 1) > (this.terminalData.columns * this.terminalData.rowsPerColumn)) {
                console.log("Accidentally hit " + (rowNumberFromRandomIndex + 1) + "th row during password insertion.");
            }

            // TODO: Check in test if there is a dependency to another method
            // Code seems to be undefined
            let rowIndex = rowNumberFromRandomIndex; // TODO: Potential off-by-one error
            let columnIndex = columnNumberFromRandomIndex;
            let code = this.terminalData.code[rowIndex];

            if (code) {
                // TODO: Some words are selected but don't exist in code...
                if ((columnIndex + this.gameData.difficulty) > this.terminalData.dataPerColumn) { // Password needs more than one row
                    continue;
                } else if ((rowIndex >= 0) && (rowIndex <= (this.terminalData.rowsPerColumn * this.terminalData.columns - 1))) {
                    this.terminalData.code[rowIndex] = code.substr(0, columnIndex) + nextPassword + code.substr(columnIndex + nextPassword.length);
                    // TODO: Refactor blocked position to work like duds.
                    blockedPositions.push(randomIndex, randomIndex - 1, randomIndex + 1, randomIndex - 2, randomIndex + 2, randomIndex - 3, randomIndex + 3, randomIndex - 4, randomIndex + 4);
                } else {
                    console.error("Row calculation row for password", rowIndex, nextPassword);
                }
            } else {
                console.log("code is not defined. Implement testing.")
            }
        }
    }

    getRandomIndexForPasswordStart(blockedPositions) {
        let randomPosition = Math.round(Math.random() * (this.terminalData.maxCharacters() - this.gameData.difficulty)); // Password fits into last line

        if (randomPosition < 0) {
            randomPosition = 0;
        }

        if (blockedPositions.indexOf(randomPosition) > -1) {
            randomPosition = -1; // Get a new random position
        }

        if (randomPosition >= this.terminalData.maxCharacters()) {
            console.log("Position calculation wrong: " + randomPosition + " of " + this.terminalData.maxCharacters());
        }

        return randomPosition;
    }

    findDuds() {
        console.log("Terminal has size: " + this.terminalData.code.length);
        // Get the end duds first
        let duds = [];
        for (var rowIndex = 0; this.terminalData.code.length > rowIndex; rowIndex++) {
            // TODO: Code below hits only once. Better RegEx?
            for (var indexInColumn = this.terminalData.code[0].length; 0 < indexInColumn; indexInColumn--) {
                let endPosition = DudHelper.endDuds.indexOf(this.terminalData.code[rowIndex][indexInColumn]); // TODO: This whole mess makes no sense
                if (~endPosition) {
                    let cutString = this.terminalData.code[rowIndex].substr(0, endPosition);
                    let startPosition = cutString.indexOf(DudHelper.startDuds[endPosition]);
                    if (~startPosition) {
                        duds.push([new Dud(endPosition, startPosition, indexInColumn)]);
                        console.log("Adding duds: " + endPosition + "/" + startPosition + "/" + indexInColumn);
                        console.debug(this.terminalData.code[rowIndex]);
                        // TODO: Only highlights initial duds but not new.
                    }
                }
            }
        }
        if (duds.length > 0) {
            console.log("Final list of duds: ");
            console.log(duds);
        }
    }

    createMarkup() {
        // TODO: Maybe no longer required
    }

    addHtml() {
        // TODO: currentPasswords does not exist maybe. Fix in test at least.
        let tmpPasswords = this.gameData.currentPasswords.wordList.slice();

        // TODO: Use markup array
        // TODO: More than two rows
        for (var rowIndex = 0; this.terminalData.code.length > rowIndex; rowIndex++) {
            var selector = "";
            if (rowIndex < this.terminalData.rowsPerColumn) {
                selector = '.terminal .left.code';
            } else {
                selector = '.terminal .right.code';
            }

            // TODO: Finds passwords in a single row
            let lineValue = this.terminalData.code[rowIndex];
            // Workaround to fix nasty html side effects; does it break the < > dud?
            lineValue = lineValue.replace(/</g, "&lt;");
            lineValue = lineValue.replace(/>/g, "&gt;");

            let replacedPassword = "";
            let _this = this; // TODO: Workaround because of scope
            tmpPasswords.forEach(function (value) {
                // Finds all single line passwords
                // TODO: Fails for words including other words
                let tempNewLineValue = lineValue.replace(value, '<span class="word" data-word="' + value + '">' + value + '</span>');

                // Assume nothing has been replaced
                // TODO: Can contain non replaced word
                // Look a head if word is in next line
                if (tempNewLineValue === lineValue) {
                    if (rowIndex < _this.terminalData.code.length - 1) {
                        // Find the index in the line we need to look up for the split word
                        // e.g. a 4 letter word can have a max of 3 chars and a min of 1 char in one line
                        let limitOldLine = (_this.terminalData.dataPerColumn - 1) - (value.length - 1);// Actually this will be an index

                        let limitNewLine = (value.length - 1);// Also an index
                        let lineLookAhead = _this.terminalData.code[rowIndex].substr(limitOldLine) + _this.terminalData.code[rowIndex + 1].substr(0, limitNewLine + 1);
                        console.debug("Lookahead ", value, limitOldLine, limitNewLine, lineLookAhead);

                        // This is the index of the cut and spliced lines
                        // let startIndex = lineLookAhead.indexOf(value);
                        // let endIndex = startIndex + value.length;

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

            // TODO: Move to renderer
            $(selector).append('<span id="span' + rowIndex + '"></span><br>');
            // Note: If rendered as html some duds will break stuff.
            $('#span' + rowIndex).html(lineValue);

            tmpPasswords = tmpPasswords.filter(function (value) {
                return value !== replacedPassword;
            });
        }
    }

    addScript() {
        // TODO: Move to renderer
        // TODO: Simulate typing the hovered word
        $('.code .word').on('mouseover', function (event) {
            let passwordHovered = event.target.textContent;
            console.debug("Hovering: " + passwordHovered);
            $('.info .input').attr('data-content', passwordHovered);
        });
        $('.code .word').on('mouseout', function () {
            console.debug("End hover");
            $('.info .input').attr('data-content', '');
        });
        // Todo: Merge code from createTerminal()
    }

    createTerminal() {
        let _this = this; // TODO: Workaround for scope
        this.clearOld();

        console.log("--- Creating pointers ---");
        this.createPointersForTerminal();// Create "random" line numbers
        console.log("--- Creating duds---");
        this.createDudCode();// Create password text filled with duds
        console.log("--- Create passwords ---");
        this.createCurrentPasswords();// Generate current password list
        console.log("--- Merge passwords and duds ---");
        this.addPasswordsToData();// Merge duds and passwords
        console.log("--- Find/highlight duds---");
        this.findDuds();
        console.log("--- Create markup ---");
        this.createMarkup();
        console.log("--- Add html ---");
        this.addHtml();// Create HTML
        console.log("--- Add events and listeners ---");
        this.addScript();

        // TODO: Move some code to renderer
        if (perks[0].level >= 2) {
            $('.code .word').each(function () {
                if (_this.gameData.password == $(this).data("word")) {
                    $(this).addClass("highlight");
                }
            });
        }

        // Create settings menubar
        // TODO: move code to ui building code -> renderer
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
            let selectedPassword = event.target.textContent;

            let position = _this.gameData.currentPasswords.wordList.indexOf(selectedPassword);
            if (~position) {
                _this.gameData.currentPasswords.wordList.splice(position, 1);
            }

            let likeness = 0;
            for (var i = 0; _this.gameData.difficulty > i; i++) {
                if (_this.gameData.password[i] == selectedPassword[i]) {
                    likeness++;
                }
            }

            if (_this.gameData.password == selectedPassword) {
                let oldLength = _this.gameData.currentPasswords.wordList.length;
                _this.createTerminal();
                _this.addExperience(oldLength);
                Renderer.addSelectedPasswordBeforeInput(selectedPassword);
                Renderer.addAnyHtmlBeforeInput('<span class="text">Access granted.</span><br>');
            } else {
                _this.gameData.attempts--;
                Renderer.addSelectedPasswordBeforeInput(selectedPassword);
                Renderer.addAnyHtmlBeforeInput('<span class="likeness">Likeness=' + likeness + '</span><br>');
                Renderer.addAnyHtmlBeforeInput('<span class="text">Entry denied.</span><br>');
                if (_this.gameData.attempts == 0) {
                    _this.createTerminal();
                    Renderer.addSelectedPasswordBeforeInput(selectedPassword);
                    Renderer.addAnyHtmlBeforeInput('<span class="text">Terminal locked.</span><br>');
                }
            }

            _this.updateUI();
        });

        // Break special
        let linebreak = $('.linebreak');
        linebreak.on('mouseenter', function () {
            let dataWord = $(this).data("word");
            let siblings = $('[data-word="' + dataWord + '"]');
            $(siblings).each(function () {
                $(this).css("background-color", "#82FA58");
                $(this).css("color", "#0B1907");
            });
        }, function () {
            linebreak.css("background-color", "#0B1907");
            linebreak.css("color", "#82FA58");
        });

        // TODO: update data word :(
        let pagebreak = $('.pagebreak');
        pagebreak.on('mouseenter', function () {
            pagebreak.css("background-color", "#82FA58");
            pagebreak.css("color", "#0B1907");
        }, function () {
            pagebreak.css("background-color", "#0B1907");
            pagebreak.css("color", "#82FA58");
        });

        this.updateUI();
    }
}
Game.version = "0.1 (alpha)"; // TODO: Make static. Get from package.json

export default Game;
