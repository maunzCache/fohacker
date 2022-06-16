'use strict';

const Dictionary = require('./dictionary');

var passwords = {
    4: new Dictionary([
        "SAFE",
        "HACK",
        "CORE",
        "TIME",
        "NONE",
        "SORT",
        "ROLL",
        "HUNT",
        "BURN",
        "WIRE",
        "TOOL",
        "BACK",
        "BLUE",
        "HARD",
        "FIRE",
        "TIRE",
        "MIND"
    ]),
    5: new Dictionary([
        "WOUND",
    ]),
    6: new Dictionary([
        "WEAPON",
    ]),
    7: new Dictionary([
        "ABCDEFG",
    ]),
    8: new Dictionary([
        "ABCDEFGH",
    ])
};

class GameData {
    constructor() {
        this.passwordsOnScreen = 14;
        this.attempts = 4;
        this.difficulty = 4;// word length
        this.experience = 0;
        this.totalExperience = 0;
        this.level = 1;
        this.skillpoints = 0;
        this.passwords = passwords;
        this.currentPasswords = passwords[this.difficulty];
        this.caps = 0;
        this.health = 100;
        this.maxhealth = 100;
    };
};

module.exports = GameData;