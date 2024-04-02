"use strict";

import { assert, assertEquals } from "std/assert/mod.ts";

import TerminalData from "../../src/classes/terminaldata.js";

Deno.test("TerminalData constructor", () => {
  const actualResult = new TerminalData();

  assert(actualResult);
});

Deno.test("TerminalData maxCharacters", () => {
  const testTerminalData = new TerminalData();

  const actualResult = testTerminalData.maxCharacters();

  assertEquals(actualResult, 384);
});

Deno.test("TerminalData codeString", () => {
  const dummyCode = [
    "One line",
    "Another line",
  ];

  const testTerminalData = new TerminalData();
  testTerminalData.code = dummyCode;

  const actualResult = testTerminalData.codeString();

  assertEquals(actualResult, "One lineAnother line");
});
