"use strict";

import { assertEquals } from "std/assert/mod.ts";

import GameData from "../../src/classes/gamedata.js";

Deno.test("jest", () => {
  describe("GameData", () => {
    test("constructor", () => {
      const actualResult = new GameData();

      expect(actualResult);
    });
  });
});
