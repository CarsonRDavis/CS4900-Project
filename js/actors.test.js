Actor = require('./actors.js').Actor;
Melee = require('./actors.js').Melee;
Defender = require('./actors.js').Defender;
Ranged = require('./actors').Ranged;

//Test whether the base attacxk formula works as expected
test('Base actor attack test', () => {
    let actor1 = new Actor('Bill');
    let actor2 = new Actor('Jim');

    actor1.attack(actor2);
    expect(actor2.hitPts).toBe(8);
})

//Test to ensure the Actor subclasses are properly created
test('Melee values check', () => {
    let m = new Melee('Mike');

    expect(m.hitPts).toBe(10);
    expect(m.weakness).toContain('Defender');
    expect(m.attType).toContain('Melee');
})

test('Defender values check', () => {
    let m = new Defender('Dan');

    expect(m.hitPts).toBe(10);
    expect(m.weakness).toContain('Ranged');
    expect(m.attType).toContain('Defender');
})

test('Ranged values check', () => {
    let m = new Ranged('Rick');

    expect(m.hitPts).toBe(10);
    expect(m.weakness).toContain('Melee');
    expect(m.attType).toContain('Ranged');
})

//Test to determine if the attack formula works when the arg actor is weak to this actor
test('Modified attacked test', () => {
    let ran = new Ranged('Rick');
    let def = new Defender('Dan');

    ran.attack(def);
    expect(def.hitPts).toBe(6);
})

//Test to determine if the attack formula works when the arg actor is resistant to this actor
test('Modified resistance test', () => {
    let def = new Defender('Dan');
    let mel = new Melee('Mike');

    def.resist = ['Melee'];
    mel.attack(def);
    expect(def.hitPts).toBe(9);
})