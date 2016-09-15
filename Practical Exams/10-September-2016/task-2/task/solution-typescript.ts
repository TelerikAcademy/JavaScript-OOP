/* globals module */
interface ISpell {
    effect: Function,
    manaCost: number,
    name: string
}

interface IUnit {
    name: string,
    alignment: string
}

interface IArmyUnit extends IUnit {
    damage: number,
    health: number,
    count: number,
    id: number,
    speed: number
}

interface ICommander extends IUnit {
    army: IArmyUnit[],
    spellbook: ISpell[],
    mana: number
}

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
        validateName(name: string) {
            const invalidType = typeof name !== 'string';

            if (invalidType) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            }

            validator.validateRange(name.length, 2, 20, ERROR_MESSAGES.INVALID_NAME_LENGTH);

            const invalidSymbols = /[^a-zA-Z ]/.test(name);

            if (invalidSymbols) {
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
        validateEffect(effect: Function) {
            const invalidType = typeof effect !== 'function';

            if (invalidType || (effect.length !== 1)) {
                throw new Error(ERROR_MESSAGES.INVALID_EFFECT);
            }
        },
        validateNonNull(value, message: string) {
            if (value == null) {
                throw new Error(message);
            }
        },
        validateCastManaCost(mana: number, manaCost: number) {
            if (mana < manaCost) {
                throw new Error(ERROR_MESSAGES.NOT_ENOUGH_MANA);
            }
        },
        validateBattleUnit(unit: IArmyUnit, message: string) {
            const invalidDamage = isNaN(unit.damage),
                invalidHealth = isNaN(unit.health),
                invalidCount = isNaN(unit.count);

            if (invalidDamage || invalidCount || invalidHealth) {
                throw new Error(message);
            }
        }
    };

    function* getNextId() {
        let currentId = 0;

        while (true) {
            yield currentId;
            currentId += 1;
        }
    }

    const ID_GENERATOR = getNextId();

    class Spell implements ISpell {
        private _name: string;
        private _manaCost: number;
        private _effect: Function;

        constructor(name: string, manaCost: number, effect: Function) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;
        }

        get name(): string {
            return this._name;
        }

        set name(value: string) {
            validator.validateName(value);

            this._name = value;
        }

        get manaCost(): number {
            return this._manaCost;
        }

        set manaCost(value: number) {
            validator.validateMana(value);
            this._manaCost = value;
        }

        get effect(): Function {
            return this._effect;
        }

        set effect(value: Function) {
            validator.validateEffect(value);

            this._effect = value;
        }
    };

    class Unit implements IUnit {
        private _name: string;
        private _alignment: string;

        constructor(name: string, alignment: string) {
            this.name = name;
            this.alignment = alignment;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            validator.validateName(value);
            this._name = value;
        }

        get alignment() {
            return this._alignment;
        }

        set alignment(value: string) {
            validator.validateAlignment(value);
            this._alignment = value;
        }
    };

    class ArmyUnit extends Unit implements IArmyUnit {
        private _id: number;
        private _count: number;
        private _speed: number;
        private _damage: number;
        private _health: number;

        constructor(name: string, alignment: string, damage: number, health: number, speed: number, count: number) {
            super(name, alignment);
            this._id = ID_GENERATOR.next().value;
            this.damage = damage;
            this.health = health;
            this.speed = speed;
            this.count = count;
        }

        get id(): number {
            return this._id;
        }

        get count(): number {
            return this._count;
        }
        set count(value: number) {
            validator.validateRange(value, 0, Infinity, ERROR_MESSAGES.INVALID_COUNT);
            this._count = value;
        }

        get speed(): number {
            return this._speed;
        }

        set speed(value: number) {
            validator.validateRange(value, 0, 100, ERROR_MESSAGES.INVALID_SPEED);
            this._speed = value;
        }

        get damage(): number {
            return this._damage;
        }

        set damage(value: number) {
            validator.validateRange(value, 0, 100, ERROR_MESSAGES.INVALID_DAMAGE);
            this._damage = value;
        }

        get health(): number {
            return this._health;
        }
        set health(value: number) {
            validator.validateRange(value, 0, 200, ERROR_MESSAGES.INVALID_HEALTH);

            this._health = value;
        }
    }


    class Commander extends Unit implements ICommander {
        private _mana: number;
        public army: IArmyUnit[];
        public spellbook: ISpell[];

        constructor(name: string, alignment: string, mana: number) {
            super(name, alignment);
            this.mana = mana;
            this.army = [];
            this.spellbook = [];
        }
        get mana(): number {
            return this._mana;
        }
        set mana(value: number) {
            validator.validateMana(value);
            this._mana = value;
        }
    };

    const battlemanager = (function () {

        function meetsRequirements(object, requirements): boolean {

            for (const req in requirements) {
                if (object[req] !== requirements[req]) {
                    return false;
                }
            }

            return true;
        }

        function compareStrings(first: string, second: string): number {
            return Number(first > second) - 0.5
        }

        function bySpeed(first: IArmyUnit, second: IArmyUnit): number {
            if (second.speed - first.speed) {
                return second.speed - first.speed;
            }

            return compareStrings(first.name, second.name)
        }

        const commanders: ICommander[] = [];

        return {
            getCommander(name: string, alignment: string, mana: number): ICommander {
                return new Commander(name, alignment, mana);
            },
            getArmyUnit(options): IArmyUnit {
                const newUnit: IArmyUnit = new ArmyUnit(
                    options.name,
                    options.alignment,
                    options.damage,
                    options.health,
                    options.speed,
                    options.count
                );

                return newUnit;
            },
            getSpell(name: string, manaCost: number, effect: Function) {
                return new Spell(name, manaCost, effect);
            },
            findCommanders(query): ICommander[] {
                return commanders.filter(c => meetsRequirements(c, query)).sort((f, s) => compareStrings(f.name, s.name));
            },
            findArmyUnitById(id: number): IArmyUnit {
                for (const c of commanders) {
                    const unit = c.army.find(u => u.id === id);

                    if (unit) {
                        return unit;
                    }
                }
            },
            findArmyUnits(query): IArmyUnit[] {
                const result: IArmyUnit[] = [];

                for (const c of commanders) {
                    const units = c.army.filter(u => meetsRequirements(u, query));
                    if (units.length) {
                        [].push.apply(result, units);
                    }
                }

                return result.sort(bySpeed);
            },
            addCommanders(...newCommanders: ICommander[]) {
                [].push.apply(commanders, newCommanders);
                return this;
            },
            addSpellsTo(commanderName: string, ...newSpells: ISpell[]) {
                const passedCommander: ICommander = this.findCommanders({ name: commanderName })[0];

                for (const spell of newSpells) {
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
            addArmyUnitTo(commanderName: string, newUnit: IArmyUnit) {
                const passedCommander: ICommander = this.findCommanders({ name: commanderName })[0];

                passedCommander.army.push(newUnit);

                return this;
            },
            spellcast(casterName: string, spellName: string, targetUnitId: number) {
                const caster: ICommander = this.findCommanders({ name: casterName })[0];

                validator.validateNonNull(caster, 'Cannot cast with non-existant commander ' + casterName + '!');

                const spell: ISpell = caster.spellbook.find(s => s.name === spellName);

                validator.validateNonNull(spell, casterName + ' does not know ' + spellName);
                validator.validateCastManaCost(caster.mana, spell.manaCost);

                const target: IArmyUnit = this.findArmyUnitById(targetUnitId);

                validator.validateNonNull(target, ERROR_MESSAGES.TARGET_NOT_FOUND);

                spell.effect(target);

                caster.mana -= spell.manaCost;

                return this;
            },
            battle(attacker: IArmyUnit, defender: IArmyUnit) {

                validator.validateBattleUnit(attacker, ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT);
                validator.validateBattleUnit(defender, ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT);
                const defenderCountAfterBattle: number = Math.ceil(((defender.health * defender.count) - (attacker.damage * attacker.count)) / defender.health);

                if (defenderCountAfterBattle < 0) {
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