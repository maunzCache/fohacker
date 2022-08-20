'use strict';

// TODO: Refactor name due to singular-plural conflict
class DudHelper {
    constructor() {
        this.duds = [];
    }

    addDud(dudToAdd) {
        this.duds.push(dudToAdd);
    }
}
DudHelper.dudCharacters = ",;.:^<>()[]{}!?@%$`'\"*+-=/|_";
DudHelper.startDuds = "<([{";
DudHelper.endDuds = ">)]}";

export default DudHelper;
