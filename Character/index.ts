export interface CharacterParameters {
  health?: number,
  mana?: number,
  damage?: number,
  name?: string,
  onDeath?: (Character) => void
}

export default abstract class Character {
  protected health: number;
  protected mana: number;
  protected damage: number;
  protected name: string;

  private _onDeath: (c: Character) => void;

  public static DEFAULT_PARAMETERS: CharacterParameters = {
    name: "Character",
    health: 100,
    mana: 100,
    damage: 10,
    onDeath: (c: Character) => {}
  };

  abstract beat(Character): void;

  constructor(parameters: CharacterParameters = Character.DEFAULT_PARAMETERS) {
    this.health = parameters.health;
    this.mana = parameters.mana;
    this.damage = parameters.damage;
    this.name = parameters.name;
    this._onDeath = parameters.onDeath || Character.DEFAULT_PARAMETERS.onDeath;
  }

  get Name(): string {
    return this.name;
  }

  get Health(): number {
    return this.health;
  }

  get Mana(): number {
    return this.mana;
  }

  get Damage(): number {
    return this.damage;
  }

  public checkDeath(): void {
    if (this.health <= 0) {
      this.health = 0;
      try {
        this._onDeath(this);
      } catch (err) {
        console.error(err);
      }
    }
  }

  public getDamage(damage: number): void {
    if (this.health <= 0) return;
    
    this.health -= damage;
    this.checkDeath();
  }
}
