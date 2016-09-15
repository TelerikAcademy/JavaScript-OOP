function solve() {
	function* getId() {
		let id = 0;

		while(true) {
			id += 1;
			yield id;
		}
	}

	const idGenerator = getId();

	const Validator = {
		validateString(str, name) {
			if(typeof str !== 'string') {
				throw Error(`${name} is not a string`);
			}
		},
		validateLength2_20(str, name) {
			if(str.length < 2 || str.length > 20) {
				throw Error(`${name} must be between between 2 and 20 symbols long!`);
			}
		},
		validateOnlyLatin(str, name) {
			if(str.match(/[^a-zA-Z ]/)) {
				throw Error(`${name} can contain only latin symbols!`);
			}
		},

		validatePositiveInteger(num, name) {
			if(typeof num !== 'number' || !(num > 0) || num !== (num | 0)) {
				throw Error(`${name} must be a positive integer number!`);
			}
		},
		validatePositiveBelow(num, name, upperBound) {
			if(typeof num !== 'number' || !(num >= 0 && num <= upperBound)) {
				throw Error(`${name} must be a positive number below ${upperBound}!`)
			}
		},

		validateAlignment(alignment, name) {
			if(alignment !== 'good' && alignment !== 'neutral' && alignment !== 'evil') {
				throw Error(`${name} must be good, neutral or evil!`);
			}
		}
	};

	class Spell {
		constructor(name, manaCost, effect) {
			this.name = name;
			this.manaCost = manaCost;
			this.effect = effect;
		}

		get name() {
			return this._name;
		}
		set name(name) {
			Validator.validateString(name, 'Name');
			Validator.validateLength2_20(name, 'Name');
			Validator.validateOnlyLatin(name, 'Name');

			this._name = name;
		}

		get manaCost() {
			return this._manaCost;
		}
		set manaCost(manaCost) {
			Validator.validatePositiveInteger(manaCost, 'Mana');

			this._manaCost = manaCost;
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
		set name(name) {
			Validator.validateString(name, 'Name');
			Validator.validateLength2_20(name, 'Name');
			Validator.validateOnlyLatin(name, 'Name');

			this._name = name;
		}

		get alignment() {
			return this._alignment;
		}
		set alignment(alignment) {
			Validator.validateAlignment(alignment, 'Alignment');

			this._alignment = alignment;
		}
	}

	class ArmyUnit extends Unit {
		constructor(name, alignment, damage, health, count, speed) {
			super(name, alignment);

			this._id = idGenerator.next().value;
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
		set damage(damage) {
			Validator.validatePositiveBelow(damage, 'Damage', 100);

			this._damage = damage;
		}

		get health() {
			return this._health;
		}
		set health(health) {
			Validator.validatePositiveBelow(health, 'Health', 100);

			this._health = health;
		}

		get count() {
			return this._count;
		}
		set count(count) {
			Validator.validatePositiveInteger(count, 'Count');

			this._count = count;
		}

		get speed() {
			return this._speed;
		}
		set speed(speed) {
			Validator.validatePositiveBelow(speed, 'Speed', 100);

			this._speed = speed;
		}
	}

	class Commander extends Unit {
		constructor(name, alignment, mana) {
			super(name, alignment);

			this.mana = mana;
			this.spellbook = [];
			this.army = [];
		}

		get mana() {
			return this._mana;
		}
		set mana(mana) {
			Validator.validatePositiveInteger(mana, 'Mana');

			this._mana = mana;
		}
	}

	class BattleManager {
		constructor() {
			this._commanders = [];
			this._army_units = [];
		}

		getCommander(name, alignment, mana) {
			return new Commander(name, alignment, mana);
		}

		getArmyUnit(options) {
			return new ArmyUnit(options.name, options.alignment, options.damage, options.health, options.count, options.speed);
		}

		getSpell(name, manaCost, effect) {
			return new Spell(name, manaCost, effect);
		}

		addCommanders(...commanders) {
			this._commanders.push(...commanders);
			return this;
		}

		addSpellsTo(commanderName, ...spells) {
			let commander = this._commanders.find(commander => commander.name === commanderName);
			if(commander === undefined) {
				throw Error(`No such commander`);
			}

			commander.spellbook.push(...spells);
			return this;
		}

		addArmyUnitTo(commanderName, armyUnit) {
			let commander = this._commanders.find(commander => commander.name === commanderName);
			if(commander === undefined) {
				throw Error(`No such commander`);
			}

			commander.army.push(armyUnit);
			this._army_units.push(armyUnit);
			return this;
		}

		spellcast(casterName, spellName, targetUnitId) {
			let commander = this._commanders.find(commander => commander.name === casterName);
			if(commander === undefined) {
				throw Error(`Can't cast with non-existant Commander`);
			}

			let spell = commander.spellbook.find(spell => spell.name === spellName);
			if(spell === undefined) {
				throw Error(`${commanderName} doesn't know ${spellName}`);
			}
			if(commander.mana < spell.manaCost) {
				throw Error(`Not enough mana!`);
			}

			if(this._army_units.find(unit => unit.id === targetUnitId) === undefined) {
				throw Error(`Target not found!`);
			}

			commander.mana -= spell.manaCost;
			spell.effect(targetUnitId);

			return this;
		}

		findCommanders(query) {
			return this._commanders
				.filter(commander => Object.keys(query).every(prop => query[prop] === commander[prop]));
		}

		findArmyUnitById(id) {
			return this._army_units.find(unit => unit.id === id);
		}

		findArmyUnits(query) {
			return this._army_units
				.filter(unit => Object.keys(query).every(prop => query[prop] === unit[prop]));
		}

		battle(attacker, defender) {
			// still not clear what to do here
			let totalDamage = attacker.damage * attacker.count;
			let totalHealth = defender.health * defender.count;
			totalHealth -= totalDamage;
			defender.count = Math.ceil(totalHealth / defender.health);

			if(defender.count < 0) {
				defender.count = 0;
			}
			
			return this;
		}
	}

	return new BattleManager;
}

module.exports = solve;
