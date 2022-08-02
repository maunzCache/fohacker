'use strict';

// TODO: Refactor name due to singular-plural conflict
class DudHelper {
    static dudCharacters = ",;.:^<>()[]{}!?@%$`'\"*+-=/\|_";
    static startDuds = "<([{";
    static endDuds = ">)]}";

    constructor() {
        this.duds = [];
    }

    addDud = function(dudToAdd) {
        this.duds.push(dudToAdd);
    }
}

module.exports = DudHelper;
