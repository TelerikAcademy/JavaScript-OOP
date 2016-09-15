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
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!',
        INVALID_ALIGNMENT: 'Alignment must be good, neutral or evil!'
    };

    const validator = {
        validateName(name) {
            const invalidType = typeof name !== 'string';
                
            if(invalidType) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            }

            validator.validateRange(name.length, 2, 20, ERROR_MESSAGES.INVALID_NAME_LENGTH);

            const invalidSymbols = /[^a-zA-Z ]/.test(name);

            if(invalidSymbols) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
            }
        },
        validateMana(manaValue) {
            const invalidType = isNaN(manaValue),
                invalidRange = manaValue < 0;

            if (invalidType || invalidRange) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }
        },
        validateAlignment(alignment) {
            const invalidAlignment = ['good', 'neutral', 'evil'].indexOf(alignment) === -1;

            if (invalidAlignment) {
                throw new Error(ERROR_MESSAGES.INVALID_ALIGNMENT);
            }
        },
        validateRange(value, min, max, message) {
            
            if ((value < min) || (max < value)) {
                throw new Error(message);
            }
        },
        validateEffect(effect) {
            const invalidType = typeof effect !== 'function';

            if (invalidType || (effect.length !== 1)) {
                throw new Error(ERROR_MESSAGES.INVALID_EFFECT);
            }
        },
        validateNonNull(value, message) {
            if (value == null) {
                throw new Error(message);
            }
        },
        validateCastManaCost(mana, manaCost) {
            if (mana < manaCost) {
                throw new Error(ERROR_MESSAGES.NOT_ENOUGH_MANA);
            }
        },
        validateBattleUnit(unit, message) {
            const invalidDamage = isNaN(unit.damage),
                invalidHealth = isNaN(unit.health),
                invalidCount = isNaN(unit.count);

            if(invalidDamage || invalidCount || invalidHealth) {
                throw new Error(message);
            }
        }
    };

    function *getIdGenerator() {
        let id = 0;

		while(true) {
			id += 1;
			yield id;
		}
    }

    const idGenerator = getIdGenerator();

    const spell = {
        get name() {
            return this._name;
        },
        set name(value) {
            validator.validateName(value);

            this._name = value;
        },
        get manaCost() {
            return this._manaCost;
        },
        set manaCost(value) {
            validator.validateMana(value);
            this._manaCost = value;
        },
        get effect() {
            return this._effect;
        },
        set effect(value) {
            validator.validateEffect(value);

            this._effect = value;
        },
        init(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;

            return this;
        }
    };

    const unit = {
        get name() {
            return this._name;
        },
        set name(value) {
            validator.validateName(value);
            this._name = value;
        },
        get alignment() {
            return this._alignment;
        },
        set alignment(value) {
            validator.validateAlignment(value);
            this._alignment = value;
        },
        init(name, alignment) {
            this.name = name;
            this.alignment = alignment;

            return this;
        }
    };

    const armyUnit = (function (parent) {
        const armyUnit = Object.create(parent);

        Object.defineProperties(armyUnit, {
            id: {
                get () {
                    return this._id;
                }
            },
            count: {
                get () {
                    return this._count;
                },
                set (value) {
                    validator.validateRange(value, 0, Infinity, ERROR_MESSAGES.INVALID_COUNT);
                    this._count = value;
                }
            },
            speed: {
                get () {
                    return this._speed;
                },
                set (value) {
                    validator.validateRange(value, 0, 100, ERROR_MESSAGES.INVALID_SPEED);
                    this._speed = value;
                }
            },
            damage: {
                get () {
                    return this._damage;
                },
                set (value) {
                    validator.validateRange(value, 0, 100, ERROR_MESSAGES.INVALID_DAMAGE);
                    this._damage = value;
                }
            },
            health: {
                get () {
                    return this._health;
                },
                set (value) {
                    validator.validateRange(value, 0, 200, ERROR_MESSAGES.INVALID_HEALTH);

                    this._health = value;
                }
            },
            init: {
                value (name, alignment, damage, health, count, speed) {
                    this.damage = damage;
                    this.health = health;
                    this.count = count;
                    this.speed = speed;
                    this._id = idGenerator.next().value;
                    return parent.init.call(this, name, alignment);
                }
            }
        });

        return armyUnit;
    } (unit));

    const commanderProto = (function (parent) {
        const commander = Object.create(parent);

        Object.defineProperties(commander, {
            mana: {
                get () {
                    return this._mana;
                },
                set (value) {
                    validator.validateMana(value);
                    this._mana = value;
                }
            },
            init: {
                value (name, alignment, mana) {
                    this.mana = mana;
                    this.army = [];
                    this.spellbook = [];
                    return parent.init.call(this, name, alignment);
                }
            }
        });

        return commander;
    } (unit));

    const battlemanager = (function () {

        function meetsRequirements(object, requirements) {

            for (const req in requirements) {
                if (object[req] !== requirements[req]) {
                    return false;
                }
            }

            return true;
        }

        function compareStrings(first, second) {
            return Number(first > second) - 0.5
        }

        function bySpeed(first, second) {
            if (second.speed - first.speed) {
                return second.speed - first.speed;
            }

            return compareStrings(first.name, second.name)
        }

        const commanders = [];

        return {
            getCommander(name, alignment, mana) {
                return Object.create(commanderProto).init(name, alignment, mana);
            },
            getArmyUnit(options) {
                const newUnit = Object.create(armyUnit).init(
                    options.name,
                    options.alignment,
                    options.damage,
                    options.health,
                    options.count,
                    options.speed
                );

                return newUnit;
            },
            getSpell(name, manaCost, effect) {
                return Object.create(spell).init(name, manaCost, effect);
            },
            findCommanders(query) {
                return commanders.filter(c => meetsRequirements(c, query)).sort((f, s) => compareStrings(f.name, s.name));
            },
            findArmyUnitById(id) {
                for (const c of commanders) {
                    const unit = c.army.find(u => u.id === id);

                    if (unit) {
                        return unit;
                    }
                }
            },
            findArmyUnits(query) {
                const result = [];

                for (const c of commanders) {
                    const units = c.army.filter(u => meetsRequirements(u, query));
                    if (units.length) {
                        [].push.apply(result, units);
                    }
                }

                return result.sort(bySpeed);
            },
            addCommanders(...newCommanders) {
                [].push.apply(commanders, newCommanders);
                return this;
            },
            addSpellsTo(commanderName, ...newSpells) {
                const passedCommander = this.findCommanders({ name: commanderName })[0];

                for(const spell of newSpells) {
                    try {
                        validator.validateName(spell.name);
                        validator.validateMana(spell.manaCost);
                        validator.validateEffect(spell.effect);
                    } catch (error) {
                        error.message = ERROR_MESSAGES.INVALID_SPELL_OBJECT;
                        throw error;
                    }
                }

                [].push.apply(passedCommander.spellbook, newSpells);

                return this;
            },
            addArmyUnitTo(commanderName, newUnit) {
                const passedCommander = this.findCommanders({ name: commanderName })[0];

                passedCommander.army.push(newUnit);

                return this;
            },
            spellcast(casterName, spellName, targetUnitId) {
                const caster = this.findCommanders({ name: casterName })[0];

                validator.validateNonNull(caster, 'Cannot cast with non-existant commander ' + casterName + '!');

                const spell = caster.spellbook.find(s => s.name === spellName);

                validator.validateNonNull(spell, casterName + ' does not know ' + spellName);
                validator.validateCastManaCost(caster.mana, spell.manaCost);

                const target = this.findArmyUnitById(targetUnitId);

                validator.validateNonNull(target, ERROR_MESSAGES.TARGET_NOT_FOUND);

                spell.effect(target);

                caster.mana -= spell.manaCost;

                return this;
            },
            battle(attacker, defender) {
                
                validator.validateBattleUnit(attacker, ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT);
                validator.validateBattleUnit(defender, ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT);
                const defenderCountAfterBattle = Math.ceil(((defender.health * defender.count) - (attacker.damage * attacker.count)) / defender.health);

                if(defenderCountAfterBattle < 0) {
                    defender.count = 0;
                } else {
                    defender.count = defenderCountAfterBattle;
                }

                return this;
            }
        };
    } ());

    return battlemanager;
}

module.exports = solve;