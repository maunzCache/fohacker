"use strict";

import { assertEquals } from "std/assert/mod.ts";

import Dictionary from "../../src/classes/dictionary.js";

Deno.test("Dictionary constructor", () => {
  const dummyWordlist = [];

  const actualResult = new Dictionary(dummyWordlist);

  assertEquals(actualResult.wordList, []);
});
