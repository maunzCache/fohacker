"use strict";

import { assert } from "std/assert/mod.ts";

import LinkedList from "../../src/classes/linkedlist.js";

Deno.test("LinkedList constructor", () => {
  const actualResult = new LinkedList();

  assert(actualResult);
});
