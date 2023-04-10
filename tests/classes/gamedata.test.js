'use strict';

import GameData from '../../src/classes/gamedata.js';

describe('GameData', () => {
    test('constructor', () => {
        let actualResult = new GameData();

        expect(actualResult);
    });
});
