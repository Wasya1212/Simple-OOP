import Character, { CharacterParameters } from "../";
import Hero from "../Hero";

export enum EnemiesTypes {
  BEAST = "BEAST",
  UNDEAD = "UNDEAD",
  FLYING = "FLYING",
  DRAGON = "DRAGON",
  FIEND = "FIEND",
  HUMANOID = "HUMANOID",
  MACHINE = "MACHINE",
  PLANT = "PLANT",
  FLAN = "FLAN",
  STONE = "STONE",
  HEAVY = "HEAVY"
};

export interface EnemyCharacteristics extends CharacterParameters {
  type: EnemiesTypes,
  experienceCost: number
}

export default class Enemy extends Character {
  private _type: EnemiesTypes;
  private _experienceCost: number;

  protected buffed: boolean = false;

  constructor(parameters: EnemyCharacteristics) {
    super(parameters);

    this._type = parameters.type;
    this._experienceCost = parameters.experienceCost;
  }

  get Type(): EnemiesTypes {
    return this._type;
  }

  get ExperienceCost(): number {
    return this._experienceCost;
  }

  public static checkType(enemy: Enemy): EnemiesTypes | undefined {
    return enemy.Type in EnemiesTypes ? enemy.Type : undefined;
  }

  public beat(hero: Hero): void {
    hero.getDamage(this.damage);
  }

  public buff(): void {
    if (!this.buffed) {
      this.damage *= 2.5;
      this.buffed = true;
    }
  }

  public debuff(): void {
    if (this.buffed) {
      this.damage /= 2.5;
      this.buffed = false;
    }
  }
}
