'use strict'

const expect = require('chai').expect

let MANAGER

beforeEach(() => {
    MANAGER = require('../task/solution')()
})

function compareUnits(first, second) {
    if (second.speed - first.speed)
        return second.speed - first.speed

    return compareNames(first.name, second.name)
}

function compareNames(first, second) {
    return Number(first > second) - 0.5
}

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
}

Object.prototype.json = function () {
    return JSON.stringify(this)
}

describe('Zero tests', () => {

    function assertFunction(fn) {
        expect(typeof fn).to.equal('function')
    }

    function assertFunctionAndArgsCount(fn, argsCount) {
        expect(typeof fn).to.equal('function')
        expect(fn.length).to.equal(argsCount)
    }

    it('getCommander should be a function with 3 arguments', () => assertFunctionAndArgsCount(MANAGER.getCommander, 3))

    it('getArmyUnit should be a function with 1 argument', () => assertFunctionAndArgsCount(MANAGER.getArmyUnit, 1))

    it('getSpell should be a function with 3 arguments', () => assertFunctionAndArgsCount(MANAGER.getSpell, 3))

    it('addCommanders should be a function', () => assertFunction(MANAGER.addCommanders))

    it('addArmyUnit to should be a function with 2 arguments', () => assertFunctionAndArgsCount(MANAGER.addArmyUnitTo, 2))

    it('addSpellsTo to should be a function', () => assertFunction(MANAGER.addSpellsTo))

    it('findCommanders should be a function with 1 argument', () => assertFunctionAndArgsCount(MANAGER.findCommanders, 1))

    it('findArmyUnitById should be a function with 1 argument', () => assertFunctionAndArgsCount(MANAGER.findArmyUnitById, 1))

    it('findArmyUnits should be a function with 1 argument', () => assertFunctionAndArgsCount(MANAGER.findArmyUnits, 1))

    it('spellcast should be a function with 3 arguments', () => assertFunctionAndArgsCount(MANAGER.spellcast, 3))

    it('battle should be a function with 2 arguments', () => assertFunctionAndArgsCount(MANAGER.battle, 2))
})

describe('Regular tests', () => {

    describe('Commanders and related methods', () => {

        describe('Valid', () => {
            it('should create commander with correct properties', () => {
                const cyki = MANAGER.getCommander('Cyki', 'evil', 20)

                expect(cyki.name).to.equal('Cyki', 'Name should equal "Cyki"')
                expect(cyki.alignment).to.equal('evil', 'Alignment should be "evil"')
                expect(cyki.mana).to.equal(20, 'Mana should be 20')
                expect(cyki.spellbook).to.be.instanceof(Array)
                expect(cyki.spellbook.length).to.equal(0)
                expect(cyki.army).to.be.instanceof(Array)
                expect(cyki.army.length).to.equal(0)
            })

            it('should add all passed commanders', () => {

                const commanders = [
                    { name: 'Tinky Winky', alignment: 'good', mana: 5 },
                    { name: 'Gypsy', alignment: 'good', mana: 10 },
                    { name: 'Bill Gates', alignment: 'evil', mana: 5 },
                ].map(c => MANAGER.getCommander(c.name, c.alignment, c.mana))

                MANAGER.addCommanders(...commanders)

                commanders.forEach(function (c) {
                    expect(MANAGER.findCommanders({ name: c.name, alignment: c.alignment })[0]).to.equal(c)
                })
            })

            it('should add commander to battlemanager and make it retrievable via find', () => {

                const koceto = MANAGER.getCommander('Koce', 'evil', 33),
                    cyki = MANAGER.getCommander('Cyki', 'evil', 20)

                MANAGER
                    .addCommanders(koceto)
                    .addCommanders(cyki)

                const kocetoMaybe = MANAGER.findCommanders({ name: 'Koce' })[0]

                expect(kocetoMaybe).to.equal(koceto)

                const cykiMaybe = MANAGER.findCommanders({ name: 'Cyki' })[0]

                expect(cykiMaybe).to.equal(cyki)
            })

            it('should find commanders by name and/or alignment correctly', () => {

                const commanders = [
                    { name: 'CukRoth', alignment: 'evil', mana: 5 },
                    { name: 'EvloggSaron', alignment: 'evil', mana: 10 },
                    { name: 'John Doe', alignment: 'good', mana: 5 },
                    { name: 'Luke Skywalker', alignment: 'good', mana: 20 },
                    { name: 'Darth Vader', alignment: 'evil', mana: 33 },
                    { name: 'Homer', alignment: 'neutral', mana: 2 }
                ].map(c => MANAGER.getCommander(c.name, c.alignment, c.mana))

                MANAGER.addCommanders(...commanders)

                function assertAlignmentSearch(alignment) {
                    const names = MANAGER.findCommanders({ alignment }).map(c => c.name).sort(compareNames),
                        originalames = commanders.filter(c => c.alignment === alignment).map(c => c.name).sort(compareNames)

                    expect(names.json()).to.equal(originalames.json())
                }

                assertAlignmentSearch('evil')
                assertAlignmentSearch('good')
                assertAlignmentSearch('neutral')

                const darthVader = MANAGER.findCommanders({ name: 'Darth Vader', alignment: 'evil' })[0]

                expect(darthVader).to.equal(commanders.find(c => c.name === 'Darth Vader'))

                expect(MANAGER.findCommanders({ name: 'Homer', alignment: 'evil' }).length).to.equal(0)
            })
        })

        describe('Invalid', () => {

            it('should throw with correct message for bad commander name', () => {
                const addCommanderWithInvalidNameLength = () => MANAGER.getCommander('a', 'good', 13)

                expect(addCommanderWithInvalidNameLength).to.throw(Error, ERROR_MESSAGES.INVALID_NAME_LENGTH)

                const addCommanderWithInvalidSymbolsInName = () => MANAGER.getCommander('_x;@', 'evil', 15)

                expect(addCommanderWithInvalidSymbolsInName).to.throw(Error, ERROR_MESSAGES.INVALID_NAME_SYMBOLS)
            })

            it('should throw with correct message for bad alignment', () => {

                const addCommanderWithBadAlignment = () => MANAGER.getCommander('Hans', 'pizza', 33)

                expect(addCommanderWithBadAlignment).to.throw(Error, ERROR_MESSAGES.INVALID_ALIGNMENT)
            })

            it('should throw with correct message for bad mana', () => {

                const addCommandersWithBadMana = [
                    () => MANAGER.getCommander('SpiderPig', 'good', -5),
                    () => MANAGER.getCommander('Homer', 'neutral', 'hello'),
                    () => MANAGER.getCommander('Petko', 'evil', NaN)
                ]

                addCommandersWithBadMana.forEach(c => expect(c).to.throw(Error, ERROR_MESSAGES.INVALID_MANA))

            })

        })
    })

    describe('Army units and related methods', () => {

        describe('Valid', () => {
            it('should create ArmyUnit with correct properties', () => {

                const options = {
                    name: 'Cavalry',
                    damage: 80,
                    health: 80,
                    speed: 30,
                    count: 15,
                    alignment: 'neutral'
                },
                    cavalry = MANAGER.getArmyUnit(options)

                for (const prop in options) {
                    expect(cavalry[prop]).to.equal(options[prop])
                }
            })

            it('should add ArmyUnit to commander correctly', () => {

                const javaScriptDevs = MANAGER.getArmyUnit({
                    name: 'JS Devs',
                    damage: 10,
                    health: 1,
                    speed: 80,
                    count: 10000,
                    alignment: 'evil'
                })

                const commander = MANAGER.getCommander('Douglas Crockford', 'evil', 99)

                MANAGER
                    .addCommanders(commander)
                    .addArmyUnitTo(commander.name, javaScriptDevs)

                expect(commander.army[0]).to.equal(javaScriptDevs)
            })

            it('should create units with unique id', () => {
                const armyUnits = [
                    MANAGER.getArmyUnit({ name: 'Horsemen', speed: 65, damage: 33, health: 44, alignment: 'neutral', count: 50 }),
                    MANAGER.getArmyUnit({ name: 'Code Monkeys', speed: 5, damage: 5, health: 5, alignment: 'evil', count: 300 }),
                    MANAGER.getArmyUnit({ name: 'Pikemen', speed: 20, damage: 25, health: 33, alignment: 'good', count: 100 }),
                    MANAGER.getArmyUnit({ name: 'Mages', speed: 15, damage: 60, health: 25, alignment: 'good', count: 5 })
                ]

                const map = {}
                
                armyUnits.map(au => au.id).forEach(function (id) {
                    expect(map[id]).to.be.undefined
                    map[id] = true
                })
            })

            it('should correctly add multiple units to commanders', () => {

                const cyki = MANAGER.getCommander('Cyki', 'good', 42),
                    koceto = MANAGER.getCommander('Koceto', 'evil', 29)

                MANAGER.addCommanders(cyki, koceto)

                const armyUnits = {
                    horsemen: MANAGER.getArmyUnit({ name: 'Horsemen', speed: 65, damage: 33, health: 44, alignment: 'neutral', count: 50 }),
                    codeMonkeys: MANAGER.getArmyUnit({ name: 'Code Monkeys', speed: 5, damage: 5, health: 5, alignment: 'evil', count: 300 }),
                    pikemen: MANAGER.getArmyUnit({ name: 'Pikemen', speed: 20, damage: 25, health: 33, alignment: 'good', count: 100 }),
                    mages: MANAGER.getArmyUnit({ name: 'Mages', speed: 15, damage: 60, health: 25, alignment: 'good', count: 5 })
                }

                MANAGER
                    .addArmyUnitTo('Cyki', armyUnits.pikemen)
                    .addArmyUnitTo('Cyki', armyUnits.codeMonkeys)
                    .addArmyUnitTo('Koceto', armyUnits.horsemen)
                    .addArmyUnitTo('Koceto', armyUnits.mages)

                expect(koceto.army.length).to.equal(2)
                expect(koceto.army.some(au => au === armyUnits.horsemen)).to.be.true
                expect(koceto.army.some(au => au === armyUnits.mages)).to.be.true

                expect(cyki.army.length).to.equal(2)
                expect(cyki.army.some(au => au === armyUnits.codeMonkeys)).to.be.true
                expect(cyki.army.some(au => au === armyUnits.pikemen)).to.be.true
            })

            it('find army units should return units with given alignment as option', () => {
                const cyki = MANAGER.getCommander('Cyki', 'good', 42),
                    koceto = MANAGER.getCommander('Koceto', 'evil', 29)

                MANAGER.addCommanders(cyki, koceto)

                const armyUnits = {
                    horsemen: MANAGER.getArmyUnit({ name: 'Horsemen', speed: 65, damage: 33, health: 44, alignment: 'neutral', count: 50 }),
                    codeMonkeys: MANAGER.getArmyUnit({ name: 'Code Monkeys', speed: 5, damage: 5, health: 5, alignment: 'evil', count: 300 }),
                    pikemen: MANAGER.getArmyUnit({ name: 'Pikemen', speed: 20, damage: 25, health: 33, alignment: 'good', count: 100 }),
                    mages: MANAGER.getArmyUnit({ name: 'Mages', speed: 15, damage: 60, health: 25, alignment: 'good', count: 5 })
                }

                MANAGER
                    .addArmyUnitTo('Cyki', armyUnits.pikemen)
                    .addArmyUnitTo('Cyki', armyUnits.codeMonkeys)
                    .addArmyUnitTo('Koceto', armyUnits.horsemen)
                    .addArmyUnitTo('Koceto', armyUnits.mages)

                const good = MANAGER.findArmyUnits({ alignment: 'good' })

                expect(good.length).to.equal(2)
                expect(good.some(au => au === armyUnits.mages))
                expect(good.some(au => au === armyUnits.pikemen))
            })

            it('find army units should work with different options variaties', () => {
                const tinkyWinky = MANAGER.getCommander('Tinky Winky', 'good', 66),
                    billGates = MANAGER.getCommander('Bill Gates', 'evil', 66)

                MANAGER.addCommanders(tinkyWinky, billGates)

                const armyUnits = {
                    dwarfs: MANAGER.getArmyUnit({ name: 'Dwarfs', speed: 65, damage: 33, health: 44, alignment: 'neutral', count: 50 }),
                    codeMonkeys: MANAGER.getArmyUnit({ name: 'Code Monkeys', speed: 5, damage: 5, health: 5, alignment: 'evil', count: 300 }),
                    students: MANAGER.getArmyUnit({ name: 'Students', speed: 20, damage: 25, health: 33, alignment: 'good', count: 100 }),
                    mages1: MANAGER.getArmyUnit({ name: 'Mages', speed: 15, damage: 60, health: 25, alignment: 'evil', count: 5 }),
                    mages2: MANAGER.getArmyUnit({ name: 'Mages', speed: 15, damage: 60, health: 25, alignment: 'good', count: 50 }),
                    mages3: MANAGER.getArmyUnit({ name: 'Mages', speed: 15, damage: 60, health: 25, alignment: 'evil', count: 3 }),
                }

                MANAGER
                    .addArmyUnitTo('Tinky Winky', armyUnits.dwarfs)
                    .addArmyUnitTo('Bill Gates', armyUnits.codeMonkeys)
                    .addArmyUnitTo('Bill Gates', armyUnits.students)
                    .addArmyUnitTo('Bill Gates', armyUnits.mages1)
                    .addArmyUnitTo('Tinky Winky', armyUnits.mages2)
                    .addArmyUnitTo('Bill Gates', armyUnits.mages3)

                const allMages = MANAGER.findArmyUnits({ name: 'Mages' })

                expect(allMages.length).to.equal(3)
                expect(allMages.some(m => m === armyUnits.mages1))
                expect(allMages.some(m => m === armyUnits.mages2))
                expect(allMages.some(m => m === armyUnits.mages3))

                const microsoftMages = MANAGER.findArmyUnits({ name: 'Mages', alignment: 'evil' })

                expect(microsoftMages.length).to.equal(2)
                expect(microsoftMages.some(m => m === armyUnits.mages1))
                expect(microsoftMages.some(m => m === armyUnits.mages3))

                const mageId = allMages[0].id

                expect(MANAGER.findArmyUnitById(mageId)).to.equal(allMages[0])
            })

            it('findArmyUnits should return units sorted by speed descending and by name ascending', () => {
                const tinkyWinky = MANAGER.getCommander('Tinky Winky', 'good', 66),
                    billGates = MANAGER.getCommander('Bill Gates', 'evil', 66)

                MANAGER.addCommanders(tinkyWinky, billGates)

                const armyUnits = {
                    dwarfs: MANAGER.getArmyUnit({ name: 'Dwarfs', speed: 20, damage: 33, health: 44, alignment: 'good', count: 50 }),
                    codeMonkeys: MANAGER.getArmyUnit({ name: 'Code Monkeys', speed: 20, damage: 5, health: 5, alignment: 'good', count: 300 }),
                    students: MANAGER.getArmyUnit({ name: 'Students', speed: 20, damage: 25, health: 33, alignment: 'good', count: 100 }),
                    mages1: MANAGER.getArmyUnit({ name: 'Mages One', speed: 15, damage: 60, health: 25, alignment: 'good', count: 5 }),
                    mages2: MANAGER.getArmyUnit({ name: 'Mages Two', speed: 15, damage: 60, health: 25, alignment: 'good', count: 50 }),
                    mages3: MANAGER.getArmyUnit({ name: 'Mages Three', speed: 15, damage: 60, health: 25, alignment: 'good', count: 3 }),
                }

                MANAGER
                    .addArmyUnitTo('Tinky Winky', armyUnits.dwarfs)
                    .addArmyUnitTo('Bill Gates', armyUnits.codeMonkeys)
                    .addArmyUnitTo('Bill Gates', armyUnits.students)
                    .addArmyUnitTo('Bill Gates', armyUnits.mages1)
                    .addArmyUnitTo('Tinky Winky', armyUnits.mages2)
                    .addArmyUnitTo('Bill Gates', armyUnits.mages3)

                const allUnits = MANAGER.findArmyUnits({})

                const sortedArmyUnits = Object.keys(armyUnits).map(k => armyUnits[k]).sort(compareUnits)

                expect(allUnits.length).to.equal(sortedArmyUnits.length)

                for (let i = 0; i < sortedArmyUnits.length; i += 1) {
                    expect(allUnits[i]).to.equal(sortedArmyUnits[i])
                }
            })
        })

        describe('Invalid', () => {

            it('should throw when unit with invalid options is created', () => {
                const options = {
                    name: '___',
                    damage: 200,
                    health: 80,
                    speed: -15,
                    count: 15,
                    alignment: 'o hai'
                },
                    getInvalidArmyUnit = () => MANAGER.getArmyUnit(options)

                expect(getInvalidArmyUnit).to.throw(Error, '')
            })

        })
    })

    describe('Spells', () => {

        describe('Valid', () => {

            it('should create spells with correct properties', () => {

                const spells = {
                    confusion: MANAGER.getSpell('Confusion', 15, target => target.speed -= 5),
                    magicArrow: MANAGER.getSpell('Magic Arrow', 5, target => target.count -= ((target.health * target.count) - 200) / target.health),
                    polymorph: MANAGER.getSpell('Polymorph', 20, target => { target.speed = 0; target.damage = 0; target.health *= 2; })
                }

                expect(spells.confusion.name).to.equal('Confusion')
                expect(spells.confusion.manaCost).to.equal(15)
                expect(typeof spells.confusion.effect).to.equal('function')
                expect(spells.confusion.effect.length).to.equal(1)
            })

            it('should correctly add spells to commanders', () => {

                const mengsk = MANAGER.getCommander('Arcturus Mengsk', 'evil', 20),
                    kerrigan = MANAGER.getCommander('Sarah Kerrigan', 'neutral', 50)


                const spells = {
                    psionicStorm: MANAGER.getSpell('Psionic Storm', 15, target => target.count -= ((target.health * target.count) - 400) / target.health),
                    transfuse: MANAGER.getSpell('Transfuse', 10, target => target.health += 5)
                }

                MANAGER
                    .addCommanders(mengsk, kerrigan)
                    .addSpellsTo('Sarah Kerrigan', spells.psionicStorm, spells.transfuse)

                expect(kerrigan.spellbook.length).to.equal(2)
                expect(kerrigan.spellbook.some(s => s === spells.psionicStorm))
                expect(kerrigan.spellbook.some(s => s === spells.transfuse))
                expect(mengsk.spellbook.length).to.equal(0)
            })
        })

        describe('Invalid', () => {

            it('should throw when spell is created with invalid parameters', () => {
                const getSpellInvalidName = () => MANAGER.getSpell(';;;;;', 15, target => target.speed += 1),
                    getSpellInvalidManaCost = () => MANAGER.getSpell('dsfdsf', -5, target => target.speed += 1),
                    getSpellInvalidEffect = () => MANAGER.getSpell('dfsf', 50, {})

                expect(getSpellInvalidEffect).to.throw(Error, ERROR_MESSAGES.INVALID_EFFECT, 'Should throw for invalid effect')
                expect(getSpellInvalidName).to.throw(Error, ERROR_MESSAGES.INVALID_NAME_SYMBOLS, 'Should throw for invalid name')
                expect(getSpellInvalidManaCost).to.throw(Error, ERROR_MESSAGES.INVALID_MANA, 'Should throw for invalid mana cost')
            })

            it('should throw for addition of objects that are not Spell-like', () => {
                const mage = MANAGER.getCommander('Mage', 'neutral', 30),
                    validSpell = MANAGER.getSpell('Valid spell', 15, target => { })

                MANAGER.addCommanders(mage)

                const addSpellWithBadName = () => MANAGER.addSpellsTo('Mage', validSpell, { name: 'Magic ^.^', manaCost: 15, effect: target => { } })
                expect(addSpellWithBadName).to.throw(Error, ERROR_MESSAGES.INVALID_SPELL_OBJECT)

                const addSpellWithBadManaCost = () => MANAGER.addSpellsTo('Mage', validSpell, { name: 'Magic', manaCost: -1, effect: target => { } })
                expect(addSpellWithBadManaCost).to.throw(Error, ERROR_MESSAGES.INVALID_SPELL_OBJECT)

                const addSpellWithBadEffect = () => MANAGER.addSpellsTo('Mage', validSpell, { name: 'Magic', manaCost: 15, effect: null })
                expect(addSpellWithBadEffect).to.throw(Error, ERROR_MESSAGES.INVALID_SPELL_OBJECT)

                expect(mage.spellbook.length).to.equal(0)
            })

        })

    })

    describe('Battlemanager', () => {

        describe('spellcast', () => {

            describe('Valid', () => {
                it('should apply spell effect with spellcast', () => {
                    const mengsk = MANAGER.getCommander('Arcturus Mengsk', 'evil', 20),
                        kerrigan = MANAGER.getCommander('Sarah Kerrigan', 'neutral', 50)

                    let psiStormEffectExecuted = false,
                        transfuseEffectExecuted = false

                    const spells = {
                        psionicStorm: MANAGER.getSpell('Psionic Storm', 15, target => { target.count -= ((target.health * target.count) - 400) / target.health; psiStormEffectExecuted = true }),
                        transfuse: MANAGER.getSpell('Transfuse', 10, target => { target.health += 5; transfuseEffectExecuted = true })
                    }

                    const units = {
                        marines: MANAGER.getArmyUnit({ name: 'Marines', alignment: 'neutral', damage: 20, health: 10, speed: 15, count: 100 }),
                        zerglings: MANAGER.getArmyUnit({ name: 'Zerglings', alignment: 'evil', damage: 10, health: 5, speed: 25, count: 150 })
                    }

                    MANAGER
                        .addCommanders(mengsk, kerrigan)
                        .addSpellsTo('Sarah Kerrigan', spells.psionicStorm, spells.transfuse)
                        .addArmyUnitTo('Arcturus Mengsk', units.marines)
                        .addArmyUnitTo('Sarah Kerrigan', units.zerglings)
                        .spellcast('Sarah Kerrigan', 'Psionic Storm', units.marines.id)
                        .spellcast('Sarah Kerrigan', 'Transfuse', units.zerglings.id)

                    expect(psiStormEffectExecuted).to.be.true
                    expect(transfuseEffectExecuted).to.be.true
                })

                it('should decrease the casters mana when spellcasting', () => {
                    const mengsk = MANAGER.getCommander('Arcturus Mengsk', 'evil', 20),
                        kerrigan = MANAGER.getCommander('Sarah Kerrigan', 'neutral', 50)

                    let psiStormEffectExecuted = false,
                        transfuseEffectExecuted = false

                    const spells = {
                        psionicStorm: MANAGER.getSpell('Psionic Storm', 15, target => { target.count -= ((target.health * target.count) - 400) / target.health; psiStormEffectExecuted = true }),
                        transfuse: MANAGER.getSpell('Transfuse', 10, target => { target.health += 5; transfuseEffectExecuted = true })
                    }

                    const units = {
                        marines: MANAGER.getArmyUnit({ name: 'Marines', alignment: 'neutral', damage: 20, health: 10, speed: 15, count: 100 }),
                        zerglings: MANAGER.getArmyUnit({ name: 'Zerglings', alignment: 'evil', damage: 10, health: 5, speed: 25, count: 150 })
                    }

                    expect(kerrigan.mana).to.equal(50)

                    MANAGER
                        .addCommanders(mengsk, kerrigan)
                        .addSpellsTo('Sarah Kerrigan', spells.psionicStorm, spells.transfuse)
                        .addArmyUnitTo('Arcturus Mengsk', units.marines)
                        .addArmyUnitTo('Sarah Kerrigan', units.zerglings)
                        .spellcast('Sarah Kerrigan', 'Psionic Storm', units.marines.id)

                    expect(kerrigan.mana).to.equal(50 - spells.psionicStorm.manaCost)

                    MANAGER
                        .spellcast('Sarah Kerrigan', 'Transfuse', units.zerglings.id)

                    expect(kerrigan.mana).to.equal(50 - spells.psionicStorm.manaCost - spells.transfuse.manaCost)
                })

                it('should target correct unit with spellcast', () => {
                    const mengsk = MANAGER.getCommander('Arcturus Mengsk', 'evil', 20),
                        kerrigan = MANAGER.getCommander('Sarah Kerrigan', 'neutral', 50)

                    let psiStormEffectExecuted = false,
                        transfuseEffectExecuted = false

                    const spells = {
                        psionicStorm: MANAGER.getSpell('Psionic Storm', 15, target => { target.count -= ((target.health * target.count) - 400) / target.health; psiStormEffectExecuted = true }),
                        transfuse: MANAGER.getSpell('Transfuse', 10, target => { target.health += 5; transfuseEffectExecuted = true })
                    }

                    const units = {
                        marines: MANAGER.getArmyUnit({ name: 'Marines', alignment: 'neutral', damage: 20, health: 10, speed: 15, count: 100 }),
                        zerglings: MANAGER.getArmyUnit({ name: 'Zerglings', alignment: 'evil', damage: 10, health: 5, speed: 25, count: 150 })
                    }

                    expect(kerrigan.mana).to.equal(50)

                    expect(units.marines.count).to.equal(100)

                    MANAGER
                        .addCommanders(mengsk, kerrigan)
                        .addSpellsTo('Sarah Kerrigan', spells.psionicStorm, spells.transfuse)
                        .addArmyUnitTo('Arcturus Mengsk', units.marines)
                        .addArmyUnitTo('Sarah Kerrigan', units.zerglings)
                        .spellcast('Sarah Kerrigan', 'Psionic Storm', units.marines.id)

                    expect(units.marines.count).to.be.below(100)
                })
            })

            describe('Invalid', () => {
                it('shoud throw when commander is not found', () => {
                    const spellcastWithInvalidCommanderName = () => MANAGER.spellcast('George', 'Some spell', 13)

                    expect(spellcastWithInvalidCommanderName).to.throw(Error, "Can't cast with non-existant commander George!")
                })

                it('should throw when spell is not found', () => {
                    MANAGER.addCommanders(MANAGER.getCommander('Cyki', 'good', 20))

                    const spellcastWithUnknownSpell = () => MANAGER.spellcast('Cyki', 'Write C#', 0)

                    expect(spellcastWithUnknownSpell).to.throw(Error, `Cyki doesn't know Write C#`)
                })

                it('should throw when not enough mana', () => {
                    const kerrigan = MANAGER.getCommander('Sarah Kerrigan', 'neutral', 1),
                        transfuse = MANAGER.getSpell('Transfuse', 10, target => target.health += 5),
                        zerglings = MANAGER.getArmyUnit({ name: 'Zerglings', alignment: 'evil', damage: 10, health: 5, speed: 25, count: 150 })

                    expect(kerrigan.mana).to.equal(1)

                    MANAGER
                        .addCommanders(kerrigan)
                        .addSpellsTo('Sarah Kerrigan', transfuse)
                        .addArmyUnitTo('Sarah Kerrigan', zerglings)

                    const spellcastWithNoMana = () => MANAGER.spellcast('Sarah Kerrigan', 'Transfuse', zerglings.id)

                    expect(spellcastWithNoMana).to.throw(Error, ERROR_MESSAGES.NOT_ENOUGH_MANA)
                })
            })
        })

        describe('battle', () => {

            describe('Valid', () => {

                it('should correctly decrease defender count', () => {
                    const cyki = MANAGER.getCommander('Cyki', 'good', 30),
                        koceto = MANAGER.getCommander('Koce', 'good', 20)

                    const penguins = MANAGER.getArmyUnit({
                        name: 'Penguin warriors',
                        alignment: 'good',
                        damage: 10,
                        health: 30,
                        speed: 10,
                        count: 40
                    }),
                        programmers = MANAGER.getArmyUnit({
                            name: 'Devs on horses',
                            alignment: 'evil',
                            damage: 30,
                            health: 60,
                            speed: 50,
                            count: 10
                        })

                    MANAGER
                        .addCommanders(cyki, koceto)
                        .addArmyUnitTo('Cyki', penguins)
                        .addArmyUnitTo('Koce', programmers)

                    expect(penguins.count).to.equal(40)
                    expect(programmers.count).to.equal(10)

                    const countAfterBattle = Math.ceil((programmers.health * programmers.count - penguins.damage * penguins.count) / programmers.health)

                    MANAGER.battle(penguins, programmers)

                    expect(programmers.count).to.equal(countAfterBattle)
                })

                it('should set count to zero when too much damage is dealt', () => {

                    const cyki = MANAGER.getCommander('Cyki', 'good', 30),
                        koceto = MANAGER.getCommander('Koce', 'good', 20)

                    const penguins = MANAGER.getArmyUnit({
                        name: 'Penguin warriors',
                        alignment: 'good',
                        damage: 50,
                        health: 30,
                        speed: 10,
                        count: 40
                    }),
                        programmers = MANAGER.getArmyUnit({
                            name: 'Devs on horses',
                            alignment: 'evil',
                            damage: 30,
                            health: 60,
                            speed: 50,
                            count: 10
                        })

                    MANAGER
                        .addCommanders(cyki, koceto)
                        .addArmyUnitTo('Cyki', penguins)
                        .addArmyUnitTo('Koce', programmers)

                    expect(penguins.count).to.equal(40)
                    expect(programmers.count).to.equal(10)

                    MANAGER.battle(penguins, programmers)

                    expect(programmers.count).to.equal(0)
                })


                it('should deal lower damage with attacked units', () => {
                    const cyki = MANAGER.getCommander('Cyki', 'good', 30),
                        koceto = MANAGER.getCommander('Koce', 'good', 20)

                    const penguins = MANAGER.getArmyUnit({
                        name: 'Penguin warriors',
                        alignment: 'good',
                        damage: 10,
                        health: 30,
                        speed: 10,
                        count: 40
                    }),
                        programmers = MANAGER.getArmyUnit({
                            name: 'Devs on horses',
                            alignment: 'evil',
                            damage: 30,
                            health: 60,
                            speed: 50,
                            count: 10
                        })

                    MANAGER
                        .addCommanders(cyki, koceto)
                        .addArmyUnitTo('Cyki', penguins)
                        .addArmyUnitTo('Koce', programmers)

                    expect(penguins.count).to.equal(40)
                    expect(programmers.count).to.equal(10)

                    const countAfterBattle = Math.ceil((programmers.health * programmers.count - penguins.damage * penguins.count) / programmers.health)

                    MANAGER.battle(penguins, programmers)

                    expect(programmers.count).to.equal(countAfterBattle)

                    const countAfterSecondBattle = Math.ceil((penguins.health * penguins.count - programmers.damage * programmers.count) / penguins.health)
                    MANAGER.battle(programmers, penguins)

                    expect(penguins.count).to.equal(countAfterSecondBattle)
                })
            })

            describe('Invalid', () => {

                it('should throw when attacker or defender is not ArmyUnit-like', () => {
                    const cyki = MANAGER.getCommander('Cyki', 'good', 30),
                        koceto = MANAGER.getCommander('Koce', 'good', 20)

                    const penguins = MANAGER.getArmyUnit({
                        name: 'Penguin warriors',
                        alignment: 'good',
                        damage: 10,
                        health: 30,
                        speed: 10,
                        count: 40
                    }),
                        programmers = MANAGER.getArmyUnit({
                            name: 'Devs on horses',
                            alignment: 'evil',
                            damage: 30,
                            health: 60,
                            speed: 50,
                            count: 10
                        })
                    MANAGER
                        .addCommanders(cyki, koceto)
                        .addArmyUnitTo('Cyki', penguins)
                        .addArmyUnitTo('Koce', programmers)

                    const simulateInvalidAttackerBattle = () => MANAGER.battle({ damage: 10, count: 'gosho' }, programmers)
                    expect(simulateInvalidAttackerBattle).to.throw(Error, ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT)

                    const simulateInvalidDefenderBattle = () => MANAGER.battle(programmers, { damage: 10, count: 'gosho' })
                    expect(simulateInvalidDefenderBattle).to.throw(Error, ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT)
                })

            })

        })
    })
})