const shipTypes = [
    { name: "Fighter", minFuel: 2, maxFuel: 3, minCargo: 3, maxCargo: 4, minHull: 2, maxHull: 3, minAttack: 4, maxAttack: 5 },
    { name: "Transporter", minFuel: 2, maxFuel: 3, minCargo: 6, maxCargo: 8, minHull: 1, maxHull: 2, minAttack: 1, maxAttack: 2 },
    { name: "Explorer", minFuel: 3, maxFuel: 5, minCargo: 3, maxCargo: 5, minHull: 2, maxHull: 3, minAttack: 2, maxAttack: 3 },
    { name: "Miner", minFuel: 2, maxFuel: 4, minCargo: 4, maxCargo: 7, minHull: 2, maxHull: 4, minAttack: 1, maxAttack: 2 },
    { name: "Smuggler", minFuel: 3, maxFuel: 5, minCargo: 4, maxCargo: 6, minHull: 1, maxHull: 3, minAttack: 2, maxAttack: 3 },
];

export const generateShips = (count) => {
    const ships = [];

    for (let i = 0; i < count; i++) {
        const ship = generateShip();
        ships.push(ship);
    }

    return ships;
}

const generateShip = () => {
    const shipType = shipTypes[Math.floor(Math.random() * shipTypes.length)];

    let fuel, cargoSpace, hull, attack;

    do {
        fuel = Math.floor(Math.random() * (shipType.maxFuel - shipType.minFuel + 1)) + shipType.minFuel;
        cargoSpace = Math.floor(Math.random() * (shipType.maxCargo - shipType.minCargo + 1)) + shipType.minCargo;
        hull = Math.floor(Math.random() * (shipType.maxHull - shipType.minHull + 1)) + shipType.minHull;
        attack = Math.floor(Math.random() * (shipType.maxAttack - shipType.minAttack + 1)) + shipType.minAttack;
    } while (fuel + cargoSpace + hull + attack > 15);

    const ship = {
        type: shipType.name,
        fuel: fuel,
        cargoSpace: cargoSpace,
        hull: hull,
        attack: attack,
    };
    ship.name = generateShipName(ship);
    return ship;
}

const generateShipName = (ship) => {
    let name = "";

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    name += prefix;

    if (ship.attack > 3) {
        name += " " + suffixes[Math.floor(Math.random() * suffixes.length)];
    } else {
        name += " " + suffixes[Math.floor(Math.random() * suffixes.length)];
    }

    name += ` #${Math.floor(Math.random() * 100) + 1}`;

    return name;
}
