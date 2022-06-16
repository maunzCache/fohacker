'use strict';

export default class Perk {
  constructor(title, description, maxlevel) {
    this.title = title;
    this.description = description;
    this.level = 0;
    this.maxlevel = maxlevel;
    this.meetsRequirements = true; // TODO: Implement!
  };
};
