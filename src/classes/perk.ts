class Perk {
  title: string;
  description: string[];
  level: number;
  maxlevel: number;
  meetsRequirements: boolean;

  constructor(title: string, description: string[], level: number) {
    this.title = title;
    this.description = description; // TODO: is always description[level]
    this.level = level ? level : 0;
    this.maxlevel = description.length;
    this.meetsRequirements = true; // TODO: Implement!
  }
}

export default Perk;
