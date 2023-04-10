'use strict';

import Perk from '../../src/classes/perk';

describe('Perk', () => {
    test('constructor', () => {
        let testTitle = "my-title";
        let testDescription = [
            "my-level-1-description",
            "my-level-2-description",
        ];
        let testLevel = 0;
        let testMaxLevel = 0;

        let actualResult = new Perk(testTitle, testDescription, testLevel, testMaxLevel);

        expect(actualResult);
    });
});
