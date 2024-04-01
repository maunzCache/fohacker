"use strict";

import { assertEquals } from "std/assert/mod.ts";

import TerminalData from "../../src/classes/terminaldata.js";

Deno.test("jest", () => {
  describe("TerminalData", () => {
    test("constructor", () => {
      const actualResult = new TerminalData();

      expect(actualResult);
    });

    test("maxCharacters", () => {
      const testTerminalData = new TerminalData();

      const actualResult = testTerminalData.maxCharacters();

      expect(actualResult).toBe(384);
    });

    test("codeString", () => {
      const dummyCode = [
        "One line",
        "Another line",
      ];

      const testTerminalData = new TerminalData();
      testTerminalData.code = dummyCode;

      const actualResult = testTerminalData.codeString();

      expect(actualResult).toBe("One lineAnother line");
    });
  });
});
