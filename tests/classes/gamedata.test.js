"use strict";

import { assert } from "std/assert/mod.ts";

import GameData from "../../src/classes/gamedata.js";

Deno.test("GameData constructor", () => {
  const actualResult = new GameData();

  assert(actualResult);
});
