'use strict';

const Dictionary = require('../../src/classes/dictionary');

describe('Dictionary', () => {
    test('constructor', () => {
        let dummyWordlist = [];

        let actualResult = new Dictionary(dummyWordlist);

        expect(actualResult.wordList).toStrictEqual([]);
    });
});