'use strict';

const Game = require('../../src/classes/game.js');

describe('Game', () => {
    test('constructor', () => {
        let actualResult = new Game();

        expect(actualResult);
    });

    test('nextLevelExp', () => {
        let testGame = new Game();

        var actualResult = testGame.nextLevelExp();

        // From level 0 to 1
        expect(actualResult).toBe(12);

        // From level 9 to 10
        testGame.gameData.level = 9;
        actualResult = testGame.nextLevelExp();
        expect(actualResult).toBe(434);

        // From level 19 to 20
        testGame.gameData.level = 19;
        actualResult = testGame.nextLevelExp();
        expect(actualResult).toBe(39104);
    });

    test('levelUp', () => {
        document.body.innerHTML =
            '<div class="info">' +
            '    <div class="input"></div>' +
            '</div>';

        let testGame = new Game();

        testGame.levelUp();
        var actualResult = testGame.gameData.level;

        // Start at level 1
        expect(actualResult).toBe(1);

        // Level up to level 2
        testGame.gameData.experience = 13;
        testGame.levelUp();
        actualResult = testGame.gameData.level;
        expect(actualResult).toBe(2);
    });

    test('addExperience', () => {
        document.body.innerHTML =
            '<div class="info">' +
            '    <div class="input"></div>' +
            '</div>';

        // TODO: What does that argument mean? Words is bad!
        let dummyWords = 10;

        let testGame = new Game();

        testGame.addExperience(dummyWords);
        var actualResult = testGame.gameData.experience;

        expect(actualResult).toBe(3);
    });

    describe('getDifficulty', () => {
        test('Easy', () => {
            let testGame = new Game();
            testGame.gameData.difficulty = Math.random() * (5 - 4) + 4;

            var actualResult = testGame.getDifficulty();

            expect(actualResult).toBe('Easy');
        });

        test('Advanced', () => {
            let testGame = new Game();
            testGame.gameData.difficulty = Math.random() * (8 - 6) + 6;

            var actualResult = testGame.getDifficulty();

            expect(actualResult).toBe('Advanced');
        });

        test('Expert', () => {
            let testGame = new Game();
            testGame.gameData.difficulty = Math.random() * (10 - 9) + 9;

            var actualResult = testGame.getDifficulty();

            expect(actualResult).toBe('Expert');
        });

        test('Master', () => {
            let testGame = new Game();
            testGame.gameData.difficulty = Math.random() * (12 - 11) + 11;

            var actualResult = testGame.getDifficulty();

            expect(actualResult).toBe('Master');
        });
    });

    test('updateUI', () => {
        // TODO: Implement better test
        let testGame = new Game();

        let actualResult = testGame.updateUI();

        expect(actualResult);
    });

    test('clearOld', () => {
        document.body.innerHTML =
            '<div class="terminal">' +
            '    <div class="linenumber"></div>' +
            '    <div class="code"></div>' +
            '</div>' +
            '<div class="info"></div>';

        let testGame = new Game();

        testGame.clearOld();
        let actualResult = testGame.gameData;

        expect(actualResult.attempts).toBe(4);
    });

    test('createPointers', () => {
        // TODO: Implement better test
        document.body.innerHTML =
            '<div class="terminal">' +
            '    <div class="linenumber"></div>' +
            '</div>';

        let testGame = new Game();

        let actualResult = testGame.createPointers();

        expect(actualResult);
    });

    test('createDudCode', () => {
        // TODO: Implement better test
        let testGame = new Game();

        testGame.createDudCode();
        let actualResult = testGame.terminalData

        expect(actualResult);
    });

    test('createCurrentPasswords', () => {
        // TODO: Implement better test
        let testGame = new Game();

        testGame.createCurrentPasswords();
        let actualResult = testGame.gameData.password

        expect(actualResult);
    });

    test('addPasswords', () => {
        // TODO: Implement better test
        let testGame = new Game();
        testGame.createCurrentPasswords()

        testGame.addPasswords();
        let actualResult = testGame.gameData.password

        expect(actualResult);
    });

    test('findDuds', () => {
        // TODO: Implement better test
        let testGame = new Game();
        testGame.createDudCode()

        let actualResult = testGame.findDuds();

        expect(actualResult);
    });

    test('createMarkup', () => {
        // TODO: Implement better test and well actual function
        let testGame = new Game();

        let actualResult = testGame.createMarkup();

        expect(actualResult);
    });

    test('addHtml', () => {
        // TODO: Implement better test and well actual function
        document.body.innerHTML =
            '<div class="terminal">' +
            '    <div class="left code"></div>' +
            '    <div class="right code"></div>' +
            '</div>';

        let testGame = new Game();

        let actualResult = testGame.addHtml();

        expect(actualResult);
    });

    test('addScript', () => {
        // TODO: Implement better test and well actual function
        document.body.innerHTML =
            '<div class="terminal">' +
            '    <div class="left code"></div>' +
            '    <div class="right code"></div>' +
            '</div>';

        let testGame = new Game();

        let actualResult = testGame.addScript();

        expect(actualResult);
    });

    test('createTerminal', () => {
        // TODO: Implement better test and well actual function
        document.body.innerHTML =
            '<div class="terminal">' +
            '    <div class="left code"></div>' +
            '    <div class="right code"></div>' +
            '</div>';

        let testGame = new Game();

        let actualResult = testGame.createTerminal();

        expect(actualResult);
    });
});