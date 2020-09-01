import Abaddon from "./Character/Enemy/Abaddon";
import Hero from "./Character/Hero";

let abbadons: Array<Abaddon> = [...new Array(53)].map(() => (
  new Abaddon({
    name: "Abaddon",
    onDeath: (abaddon: Abaddon) => {
      // console.log("Emeny death!");
      hero.pushExperience(abaddon.ExperienceCost);
      hero.restoreMana();
    }
  }))
);

const hero = new Hero({
  name: "Hero",
  health: 100,
  mana: 100,
  damage: 27
});

showDeriver();
showInitInfo();
showDeriver();
showCharacteristics();
showDeriver();

beatEnemy();
beatHero();
debuffEnemy();
buffEnemy();
beatHero();
debuffEnemy();
beatHero();
beatEnemy();

showDeriver();
showTitle(`Now characteristics looks like:`);
showDeriver();
showCharacteristics();

showDeriver();
showTitle(`After killing ${abbadons.length} ${abbadons[0].Name} enemies...`);
showDeriver();
killAllEnemies();
showCharacteristics();
showDeriver();

function killAllEnemies() {
  abbadons.forEach((abaddon: Abaddon) => {
    while (abaddon.Health > 0) {
      hero.beat(abaddon);
    }
  });
}

function showTitle(title: string): void {
  console.log(`\n    ${title}\n`);
}

function showInitInfo(): void {
  console.log(`
    Created ${abbadons.length} '${abbadons[0].Type}' type ${abbadons[0].Name} enemies!

    Created hero with name '${hero.Name}'!
  `);
}

function showDeriver(): void {
  console.log(`\n________________________________________________________________________________________\n`);
}

function showCharacteristics(): void {
  console.log(`
    First enemy characteristics:

      1. health - ${abbadons[0].Health};
      2. mana - ${abbadons[0].Mana};
      3. damage - ${abbadons[0].Damage};
      4. experience by killing - ${abbadons[0].ExperienceCost};


    Hero characteristics:

      1. health - ${hero.Health};
      2. mana - ${hero.Mana};
      3. damage - ${hero.Damage};
      4. level - ${hero.Level};
      5. experience - ${hero.Experience};
  `);
}

function beatEnemy(): void {
  hero.beat(abbadons[0]);
  console.log(`\n    Hero beat enemy! Enemy health points now is ${abbadons[0].Health}!\n`);
}

function beatHero(): void {
  abbadons[0].beat(hero);
  console.log(`\n    ${abbadons[0].Name} beat hero! ${hero.Name} health points now is ${hero.Health}!\n`);
}

function debuffEnemy(): void {
  hero.debuff(abbadons[0]);
  console.log(`\n    Hero debuff enemy! Now hero mana is ${hero.Mana}! Enemy damage is ${abbadons[0].Damage}!\n`);
}

function buffEnemy(): void {
  abbadons[0].buff();
  console.log(`\n    ${abbadons[0].Name} buff self! Now enemy damage is ${abbadons[0].Damage}!\n`);
}
