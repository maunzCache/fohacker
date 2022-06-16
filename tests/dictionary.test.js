'use strict';

const Dictionary = require('../src/classes/dictionary');

test('Dictionary', () => {
    let dummy_wordlist = [];
    let test_dictionary = new Dictionary(dummy_wordlist);

    expect(test_dictionary.wordList).toStrictEqual([]);
});