'use strict';

import TerminalData from '../../src/classes/terminaldata';

describe('TerminalData', () => {
    test('constructor', () => {
        let actualResult = new TerminalData();

        expect(actualResult);
    });

    test('maxCharacters', () => {
        let testTerminalData = new TerminalData();

        let actualResult = testTerminalData.maxCharacters();

        expect(actualResult).toBe(384);
    });

    test('codeString', () => {
        let dummyCode = [
            "One line",
            "Another line"
        ]

        let testTerminalData = new TerminalData();
        testTerminalData.code = dummyCode

        let actualResult = testTerminalData.codeString();

        expect(actualResult).toBe("One lineAnother line");
    });
});
