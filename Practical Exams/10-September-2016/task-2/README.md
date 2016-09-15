# Battlemanager
- Implement a function that returns a battlemanager object that simulates battles between two or more commanders. The battlemanager should work with the following components:
- You are given a sample usage of the battle manager in the `demo.js` file.
- You are given the error messages in the solution template.
- Run your tests locally by running the `npm install` and `npm test` commands in `cmd` or `terminal`.

# Components and functionality:

### `Spell`
- Has the following properties:
    - `name`
        - **string** value with length at least 2 and at most 20 symbols
        - can contain only uppercase and lowercase latin symbols
            - if name is not a **string** value, **throw** error with message **Name must be string!**
            - if a name has invalid length, **throw** error with message **Name must be between between 2 and 20 symbols long!**
            - if a name has invalid symbols, **throw** error with message **Name can contain only latin symbols and whitespaces!**
    - `manaCost`
        - **number** that indicates how much mana does the spell cost
        - must be a **number** above zero
            - if an invalid value is passed, **throw** error with message **Mana must be a positive integer number!**
    - `effect`
        - a **Function** that accepts a target `ArmyUnit` and executes an action on him
            - if a value that is not a function or doesn't accept a single parameter is passed, **throw** error with message **Effect must be a function with 1 parameter!**

### `Unit`
- Has the following properties:
    - `name`
        - **string** value with length at least 2 and at most 20 symbols
        - can contain only uppercase and lowercase latin symbols
            - if name is not a **string** value, **throw** error with message **Name must be string!**
            - if a name has invalid length, **throw** error with message **Name must be between between 2 and 20 symbols long!**
            - if a name has invalid symbols, **throw** error with message **Name can contain only latin symbols!**
    - `alignment`
        - **string** that can be one out of the following values:
            - **good**, **neutral**, **evil**
                - If any other value is passed, **throw** error with message **Alignment must be good, neutral or evil!**

### `ArmyUnit`
- **Inherits `Unit`**
- Has the following properties:
    - `id`
        - **number** value that is unique for every different army unit
        - should be generated on creation of `ArmyUnit`
    - `damage`
        - non-negative **number** that can't be greater than 100
            - if invalid value is passed, **throw** error with message **Damage must be a positive number that is at most 100!**
    - `health`
        - non-negative **number** below 200
            - if invalid value is passed, **throw** error with message **Health must be a positive number that is at most 200!**
    - `count`
        - non-negative **integer number** that represents how many creatures the `ArmyUnit` contains
            - if invalid value is passed, **throw** error with message **Count must be a positive integer number!**
    - `speed`
        - positive **number** value below 100 that indicates how fast the `Unit` can act in battle
            - if invalid value is passed, **throw** error with message **Speed must be a positive number that is at most 100!**

### `Commander`
- **Inherits `Unit`**
- Has the following properties:
    - `mana`
        - **number** value that is the resource for casting spells
            - if an invalid value is passed, **throw** error with message **Mana must be a positive integer number!**
    - `spellbook`
        - array of `Spells` that the commander can cast
    - `army`
        - array of `ArmyUnits` that represent the `Commanders` army
    
### `Battlemanager`
- Has the following public methods:
    - **`getCommander(name, alignment, mana)`**
        - **Parameters**:
            - **name**, **alignment** and **mana** of the new `Commander`
        - **Behaviour**:
            - creates and returns a new `Commander` with the provided parameters
    - **`getArmyUnit(options)`**
        - **Parameters**:
            - **options** is an object which contains the properties `name`, `alignment`, `speed`, `count`, `damage` and `health`. Those are needed for creating a new `ArmyUnit`
        - **Behaviour**:
            - creates an `ArmyUnit` from the **options**(i.e. having the same `name`, `alignment`, `damage`, `health`, `speed` and `count`) and returns it
    - **`getSpell(name, manaCost, effect)`**
        - **Parameters**:
            - **name**, **manaCost** and **effect** of the new `Spell`
        - **Behaviour**:
            - creates a new `Spell` with the given parameters and returns it
    - **`addCommanders(commander1, commander2, commander3, ...)`**
        - **Parameters**:
            - arbitary number of `Commander` objects created with the `getCommander` method
        - **Behaviour**:
            - adds all passed commanders to the `Battlemanager`
            - should enable chaining
    - **`addArmyUnitTo(commanderName, armyUnit)`**
        - **Parameters**:
            - **commanderName** - a name of a `Commander` that has been added to the `Battlemanager`
            - **armyUnit** - object created with the `getArmyUnit` method
        - **Behaviour**:
            - adds the **armyUnit** to the `army` of the `Commander` with the passed name
            - should enable chaining
    - **`addSpellsTo(commanderName, spell1, spell2, spell3, ...)`**
        - **Parameters**:
            - **commanderName** - a name of a `Commander` that has been added to the `Battlemanager`
            - arbitary number of `Spell`-like objects
        - **Behaviour**:
            - finds the `Commander` with name equal to **commanderName** and adds all passed spells to his/her `spellbook`
            - should enable chaining
        - **Throws** when:
            - any of the passed spell objects are not `Spell`-like object, **throw** an exception with message **Passed objects must be Spell-like objects!**
                - an object is considered `Spell`-like if it has the properties `name`, `manaCost` and `effect` that meet the same requirements as the same properties of `Spell`
                - if a passed object fails the validation, do not add any of the objects!
        
    - **`findCommanders(query)`**
        - **Parameters**:
            - **query** is an object that can have properties `name` and/or `alignment`
        - **Behaviour**:
            - returns all commanders that have the same values of the passed properties, **sorted by `name` in ascending order**
            ```js
            battlemanager
                    .addCommanders(
                        battlemanager.getCommander('Cyki', 'evil', 50),
                        battlemanager.getCommander('Koce', 'evil', 50),
                        battlemanager.getCommander('John', 'good', 40)
                    )
                    .findCommanders({ alignment: 'evil' });
                    // [ { name: 'Cyki', ... }, { name: 'Koce', ... } ]

            battlemanager.findCommanders({ name: 'John', alignment: 'evil' }); 
            // no matches, []
            ```
    - **`findArmyUnitById(id)`**
        - **Parameters**:
            - **id** - `id` of an `ArmyUnit` created by the `Battlemanager`
        - **Behaviour**:
            - returns the `ArmyUnit` added to the `Battlemanager` that has `id` equal to the passed **id**
            - if no such `ArmyUnit` is found, return `undefined`
            ```js
            battlemanager.addCommanders(battlemanager.getCommander('Darth Vader', 'evil', 50));

            const siths = battlemanager.getArmyUnit({
                name: 'Sith',
                alignment: 'evil',
                damage: 60,
                health: 25,
                speed: 50,
                count: 10
            });

            battlemanager.addArmyUnitTo('Darth Vader', siths);
            battlemanager.findArmyUnitById(siths.id); // returns the siths object
            ```
    - **`findArmyUnits(query)`**
        - **Parameters**:
            - **query** is an object that can have properties `id`, `name`, `alignment`
        - **Behaviour**:
            - returns an array of all `ArmyUnits` in the `Battlemanager` that have the same values for the passed properties
            - the returned `ArmyUnits` should be **sorted by `speed` in descending order**
                - if two `ArmyUnits` have equal speed, **sort them by their `names` in ascending order**
            ```js
            battlemanager
                    .addCommanders(
                        battlemanager.getCommander('Cyki', 'evil', 50),
                        battlemanager.getCommander('Koce', 'evil', 50)
                    );

            const units = {
                zerg: battlemanager.getArmyUnit({ name: 'Zerg', alignment: 'evil', damage: 50, 
                                                speed: 40, health: 30, count: 100 }),
                programmers: battlemanager.getArmyUnit({ name: 'Devs', alignment: 'good', damage: 40, 
                                                        speed: 30, health: 30, count: 130 }),
                goodTrainers: battlemanager.getArmyUnit({ name: 'Trainers', alignment: 'good', damage: 80, 
                                                        speed: 40, health: 40, count: 4 }),
                evilTrainers: battlemanager.getArmyUnit({ name: 'Trainers', alignment: 'evil', damage: 90,
                                                        speed: 30, health: 40, count: 4 })
            };

            battlemanager
                    .addArmyUnitTo('Cyki', units.programmers)
                    .addArmyUnitTo('Cyki', units.goodTrainers)
                    .addArmyUnitTo('Koce', units.zerg);

            battlemanager.findArmyUnits({ name: 'Trainers', alignment: 'evil' })
            // [ { name: 'Trainers', alignment: 'evil', ... } ]   
            battlemanager.findArmyUnits({ name: 'Trainers' })
            /* [ { name: 'Trainers', alignment: 'good', ... }, 
                { name: 'Trainers', alignment: 'evil', ... } ]  */               
            ```
    - **`spellcast(casterName, spellName, targetUnitId)`**
        - **Parameters**:
            - **casterName** - the name of the `Commander` that should cast the `Spell`
            - **spellName** - the name of the `Spell` that should be cast
            - **targetUnitId** - the `id` of the `ArmyUnit` on which the `Spell` should be cast
        - **Behaviour**:
            - finds a `Commander` in the `Battlemanager` with `name` equal to **casterName**
            - searches his/her `spellbook` for a `Spell` with `name` equal to **spellName** and takes its `effect`
            - finds an `ArmyUnit` by `id` equal to **targetId**, then calls the `effect` of the `Spell` with the found `ArmyUnit` as parameter
            - also, casting the `Spell` should decrease the casting `Commander`'s mana by its cost
            - should enable chaining
        - **Throw** when:
            - no `Commander` with such name is found, **throw** error with message **Cannot cast with non-existant commander {commanderName}**
            - no `Spell` with such name is found, **throw** error with message **{commanderName} does not know {spellName}**
            - the `Commander` doesn't have enough mana, **throw** error with message **Not enough mana!**
            - no `ArmyUnit` with such id is found, **throw** error with message **Target not found!**
    - **`battle(attacker, defender)`**
        - **Parameters**:
            - **attacker** - an `ArmyUnit` or `ArmyUnit`-like object
            - **defender** - an `ArmyUnit` or `ArmyUnit`-like object
        - **Behaviour**:
            - simulates a battle in the following way:
            - the attacker's `total damage` is equal to the attacker's `damage` **x** `count`
            - the defender's `total health` is equal to the defender's `health` **x** `count`
            - the defender's `total health` is decreased by the attacker's `total damage`
            - the defender's `count` is now equal to current `total health` **/** `health`, rounded to the next integer number
            - _Еxample:_

                ```
                A: { damage: 15, count: 5, ... } attacks D: { health: 20, count: 20 }
                A total damage = 15 * 5 = 75
                D total health = 20 * 20 = 400
                D total health after the attack = 400 - 75
                D count after the attack = 325 / 20(D health) = 16.25
                16.25 rounded to the next integer is 17
                D count is 17
                ```
            - should enable chaining
        - **Throw** when:
            - the **attacker** or the **defender** are not `ArmyUnit`-like objects, **throw** error with message **Battle participants must be ArmyUnit-like!**
                - `ArmyUnit`-like means that the objects must have properties `health`, `damage` and `count` that meet the same requirements as the same properties in regular `ArmyUnits`

# Solution template

```js
function solve() {
    'use strict';

    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!'
    };
    
    // your implementation goes here

    const battlemanager = {
        
    };

    return battlemanager;
}
```

# Example usage
```js
const battlemanager = solve();

const cyki = battlemanager.getCommander('Cyki', 'good', 15),
    koce = battlemanager.getCommander('Koce', 'good', 20);

battlemanager.addCommanders(cyki, koce);

const penguins = battlemanager.getArmyUnit({
        name: 'Penguin Warriors',
        alignment: 'neutral',
        damage: 15,
        health: 40,
        speed: 10,
        count: 120
    }),
    cavalry = battlemanager.getArmyUnit({
        name: 'Horsemen',
        alignment: 'good',
        damage: 40,
        health: 60,
        speed: 50,
        count: 50
    });

const openVim = battlemanager.getSpell('Open vim', 10, target => target.damage -= 5),
    haste = battlemanager.getSpell('Haste', 5, target => target.speed += 5),
    callReinforcements = battlemanager.getSpell('Reinforcements', 10, target => target.count += 5)

battlemanager
        .addArmyUnitTo('Cyki', penguins)
        .addSpellsTo('Cyki', openVim, haste)
        .addArmyUnitTo('Koce', cavalry)
        .addSpellsTo('Koce', haste, callReinforcements)
        .spellcast('Koce', 'Haste', cavalry.id)
        .spellcast('Cyki', 'OpenVim', cavalry.id)
        .battle(penguins, cavalry)
        .spellcast('Koce', 'Reinforcements', cavalry.id);
``` 