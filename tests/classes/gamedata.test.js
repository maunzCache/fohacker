'use strict';

const GameData = require('../../src/classes/gamedata');

describe('GameData', () => {
    test('constructor', () => {
        let actualResult = new GameData();

        expect(actualResult);
    });
});