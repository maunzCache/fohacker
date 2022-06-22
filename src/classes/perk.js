'use strict';

class Perk {
  constructor(title, description, level) {
    this.title = title;
    this.description = description;
    this.level = level ? level : 0;
    this.maxlevel = description.length;
    this.meetsRequirements = true; // TODO: Implement!
  };
};

module.exports = Perk;
