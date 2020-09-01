import Enemy, { EnemyCharacteristics, EnemiesTypes } from "./";

export interface AbaddonCharacteristics {
  name: string,
  onDeath?: (Enemy) => void
}

export default class Abaddon extends Enemy {
  public static DEFAULT_PARAMETERS: EnemyCharacteristics = {
    name: "",
    health: 120,
    mana: 80,
    damage: 20,
    type: EnemiesTypes.UNDEAD,
    experienceCost: 700
  };

  constructor(parameters: AbaddonCharacteristics) {
    super({...Abaddon.DEFAULT_PARAMETERS, ...parameters});
  }
}
