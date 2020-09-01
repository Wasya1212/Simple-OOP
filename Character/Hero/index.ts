import Character, { CharacterParameters } from "../";
import Enemy from "../Enemy";

export default class Hero extends Character {
  private _totalExperience: number;
  private _level: number;
  private _maxManaLevel: number;

  protected experienceStep = 10000;
  protected damageLevelStep = 1.1;
  protected spellManaPrice = 10;

  constructor(parameters: CharacterParameters) {
    super(parameters);

    this._maxManaLevel = this.mana;
    this._level = 1;
    this._totalExperience = 0;
  }

  get Experience(): number {
    return this._totalExperience;
  }

  get Level(): number {
    return this._level;
  }

  public pushExperience(experience: number): void {
    this._totalExperience += experience;
    if (this._level < Math.ceil(this._totalExperience / this.experienceStep)) {
      this._level = Math.ceil(this._totalExperience / this.experienceStep);
      this.damage = Math.round(this.damage * this.damageLevelStep);
    }
  }

  public beat(enemy: Enemy): void {
    enemy.getDamage(this.damage);
  }

  public debuff(enemy: Enemy): void {
    if (this.mana >= this.spellManaPrice) {
      enemy.debuff();
      this.mana -= this.spellManaPrice;
    }
  }

  public restoreMana(): void {
    this.mana = this._maxManaLevel;
  }
}
