'use strict';

class Perk {
  constructor(title, description, level, maxlevel) {
    this.title = title;
    this.description = description;
    this.level = level ? level : 0;
    this.maxlevel = maxlevel;
    this.meetsRequirements = true; // TODO: Implement!
  };
};

module.exports = Perk;
