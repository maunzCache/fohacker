"use strict";

import { assertEquals } from "std/assert/mod.ts";

import LinkedList from "../../src/classes/linkedlist.js";

Deno.test("jest", () => {
  describe("LinkedList", () => {
    test("constructor", () => {
      const actualResult = new LinkedList();

      expect(actualResult);
    });
  });
});
