"use strict";

class ListNode {
  constructor(type, value) {
    this.type = type; // TODO: could implement it via class typing
    this.value = value; // TODO: this should be string. rename to LinkedListStringNode or something else
    this.child = null;
  }
}

export default ListNode;
