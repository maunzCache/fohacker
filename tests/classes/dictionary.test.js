'use strict';

import Dictionary from '../../src/classes/dictionary.js';

describe('Dictionary', () => {
    test('constructor', () => {
        let dummyWordlist = [];

        let actualResult = new Dictionary(dummyWordlist);

        expect(actualResult.wordList).toStrictEqual([]);
    });
});
