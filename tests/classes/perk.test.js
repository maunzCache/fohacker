"use strict";

import { assert } from "std/assert/mod.ts";

import Perk from "../../src/classes/perk.js";

Deno.test("Perk constructor", () => {
  const testTitle = "my-title";
  const testDescription = [
    "my-level-1-description",
    "my-level-2-description",
  ];
  const testLevel = 0;
  const testMaxLevel = 0;

  const actualResult = new Perk(
    testTitle,
    testDescription,
    testLevel,
    testMaxLevel,
  );

  assert(actualResult);
});
