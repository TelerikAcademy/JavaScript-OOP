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

    const VALIDATOR = {
      isString: function(x) {
        if(typeof x !== 'string') {
          throw Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
        }
      },
      isInRange: function(x, min, max, err) {
        if(x < min || x > max || Number.isNaN(x)) {
          throw Error(err);
        }
      },
      isLengthInRange2_20: function(x) {
        this.isInRange(x.length, 2, 20, ERROR_MESSAGES.INVALID_NAME_LENGTH);
      },
      isConsistedOfValidSymbols: function(x) {
        if(x.match(/[^a-zA-Z ]/)) {
          throw Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
        }
      },
      isValidMana: function(x) {
        if(typeof x !== 'number' || x <= 0 || Number.isNaN(x)) {
          throw Error(ERROR_MESSAGES.INVALID_MANA);
        }
      },
      isValidEffect: function(x) {
        if(typeof x !== 'function' || x.length !== 1) {
          throw Error(ERROR_MESSAGES.INVALID_EFFECT);
        }
      },
      isValidAlignment: (function() {
        const validAlignments = ['good', 'neutral', 'evil'];
        return function (x) {
          if(validAlignments.indexOf(x) < 0) {
            throw Error(`Alignment must be good, neutral or evil!`);
          }
        };
      })(),
      isValidDamage: function(x) {
        this.isInRange(x, 0, 100, ERROR_MESSAGES.INVALID_DAMAGE);
      },
      isValidHealth: function(x) {
        this.isInRange(x, 0, 200, ERROR_MESSAGES.INVALID_HEALTH);
      },
      isValidCount: function(x) {
        if((typeof x !== 'number') || (x < 0) || ((x | 0) !== x) || Number.isNaN(x)) {
          throw Error(ERROR_MESSAGES.INVALID_COUNT);
        }
      },
      isValidSpeed: function(x) {
        this.isInRange(x, 0, 100, ERROR_MESSAGES.INVALID_SPEED);
      }
    };

    const getNextId = (function() {
      let counter = 0;
      return function() {
        counter += 1;
        return counter;
      };
    })();

    class Spell {
      constructor(name, manaCost, effect) {
        this.name = name;
        this.manaCost = manaCost;
        this.effect = effect;
      }

      get name() {
        return this._name;
      }
      set name(x) {
        VALIDATOR.isString(x);
        VALIDATOR.isLengthInRange2_20(x);
        VALIDATOR.isConsistedOfValidSymbols(x);
        this._name = x;
      }
      get manaCost() {
        return this._manaCost;
      }
      set manaCost(x) {
        VALIDATOR.isValidMana(x);
        this._manaCost = x;
      }
      get effect() {
        return this._effect;
      }
      set effect(x) {
        VALIDATOR.isValidEffect(x);
        this._effect = x;
      }
    }

    class Unit {
      constructor(name, alignment) {
        this.name = name;
        this.alignment = alignment;
      }

      get name() {
        return this._name;
      }
      set name(x) {
        VALIDATOR.isString(x);
        VALIDATOR.isLengthInRange2_20(x);
        VALIDATOR.isConsistedOfValidSymbols(x);
        this._name = x;
      }

      get alignment() {
        return this._alignment;
      }
      set alignment(x) {
        VALIDATOR.isValidAlignment(x);
        this._alignment = x;
      }
    }

    class ArmyUnit extends Unit {
      constructor(name, alignment, damage, health, count, speed) {
        super(name, alignment);
        this._id = getNextId();
        this.damage = damage;
        this.health = health;
        this.count = count;
        this.speed = speed;
      }

      get id() {
        return this._id;
      }

      get damage() {
        return this._damage;
      }
      set damage(x) {
        VALIDATOR.isValidDamage();
        this._damage = x;
      }

      get health() {
        return this._health;
      }
      set health(x) {
        VALIDATOR.isValidHealth(x);
        this._health = x;
      }

      get count() {
        return this._count;
      }
      set count(x) {
        VALIDATOR.isValidCount(x);
        this._count = x;
      }

      get speed() {
        return this._speed;
      }
      set speed(x) {
        VALIDATOR.isValidSpeed(x);
        this._speed = x;
      }
    }

    class Commander extends Unit {
      constructor(name, alignment, mana) {
        super(name, alignment);
        this.mana = mana;
        this.spellbook = [];
        this.army = [];
      }

      get mana () {
        return this._mana;
      }
      set mana(x) {
        VALIDATOR.isValidMana(x);
        this._mana = x;
      }

      get spellbook () {
        return this._spellbook;
      }
      set spellbook(x) {
        this._spellbook = x;
      }

      get army () {
        return this._army;
      }
      set army(x) {
        this._army = x;
      }

    }

    const battlemanagerData = {
      commanders: [],
      armyUnitsObj: {},
      armyUnits: [],
    };

    Array.prototype.filterByProperty = function(query, propName) {
      if(!query.hasOwnProperty(propName)) {
        return this;
      }

      const value = query[propName];
      return this.filter(x => x[propName] === value);
    };

    const battlemanager = {
      getCommander: function(name, alignment, mana) {
        return new Commander(name, alignment, mana)
      },
      getArmyUnit: function(options) {
        const { name, alignment, damage, health, count, speed } = options;
        const unit = new ArmyUnit(name, alignment, damage, health, count, speed);
        battlemanagerData.armyUnitsObj[unit.id] = unit;
        battlemanagerData.armyUnits.push(unit);
        return unit;
      },
      getSpell: function(name, manaCost, effect) {
        return new Spell(name, manaCost, effect);
      },
      addCommanders: function(...commanders) {
        battlemanagerData.commanders.push(...commanders);
        return this;
      },
      addArmyUnitTo: function(commanderName, armyUnit) {
        // ATTENTION: Check if not commander is not found
        battlemanagerData.commanders
          .find(c => c.name === commanderName)
          .army.push(armyUnit);

        return this;
      },
      addSpellsTo: function(commanderName, ...spells) {
        try {  // Ujas
          battlemanagerData.commanders
            .find(c => c.name === commanderName)
            .spellbook.push(...(spells.map(s => new Spell(s.name, s.manaCost, s.effect))));
        }
        catch(e) {
          throw Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
        }

        return this;
      },
      findCommanders: function(query) {
        return battlemanagerData.commanders
          .slice()
          .filterByProperty(query, 'name')
          .filterByProperty(query, 'alignment')
          .sort((x, y) => x.name.localeCompare(y.name)); // Check sort with one argument for callback
      },
      findArmyUnitById: function(id) {
        return battlemanagerData.armyUnitsObj[id];
      },
      findArmyUnits: function(query) {
        return battlemanagerData.armyUnits
          .slice()
          .filterByProperty(query, 'id')
          .filterByProperty(query, 'name')
          .filterByProperty(query, 'alignment')
          .sort((x, y) => {
            const cmp = y.speed - x.speed;
            if(cmp === 0) {
              return x.name.localeCompare(y.name);
            }
            return cmp;
          });
      },
      spellcast: function(casterName, spellName, targetUnitId){
        const commander = battlemanagerData.commanders
          .find(c => c.name === casterName);
        if(typeof commander === 'undefined') {
          throw Error(`Can't cast with non-existant commander ${casterName}!`);
        }

        const spell = commander.spellbook
          .find(s => s.name === spellName);
        if(typeof spell === 'undefined') {
          throw Error(`${casterName} doesn't know ${spellName}`);
        }

        if(commander.mana < spell.manaCost) {
          throw Error(ERROR_MESSAGES.NOT_ENOUGH_MANA);
        }
        commander.mana -= spell.manaCost;

        const unit = this.findArmyUnitById(targetUnitId);
        if(typeof unit === 'undefined') {
          throw Error(ERROR_MESSAGES.TARGET_NOT_FOUND);
        }

        spell.effect(unit);

        return this;
      },
      battle: (function() {
        const properties = 'name, alignment, damage, health, count, speed'.split(', ');
        return function(attacker, defender) {
          [attacker, defender]
            .forEach(unit => properties.forEach(p => {
              if(typeof unit[p] === 'undefined') {
                throw Error(ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT);
              }
            }));

          const totalDamage = attacker.damage * attacker.count;
          const totalHealth = defender.health * defender.count;
          const newCount = Math.ceil((totalHealth - totalDamage) / defender.health);
          defender.count = newCount < 0 ? 0 : newCount;

          return this;
        };
      })()
    };

    return battlemanager;
}

module.exports = solve;
