export function generatePlanets(count) {
    return Array.from({ length: count }, (_, i) => generatePlanet(i));
}

const list1 = [
    'Astra', 'Nova', 'Zeta', 'Orion', 'Quasar',
    'Luna', 'Vega', 'Draco', 'Titan',
    'Nebula', 'Helios', 'Phoenix',
    'Elysium', 'Cygnus', 'Andromeda',
    'Electra', 'Sirius', 'Borealis',
    'Ceres', 'Atlas', 'Solara',
    'Pulsar', 'Zenith', 'Aether'
];

const list2 = [
    'Terra', 'Vortex', 'Celestia', 'Nox', 'Solaris',
    'Aetherium', 'Arcadia', 'Obsidian',
    'Horizon', 'Nexus', 'Gaia',
    'Chronos', 'Lumina', 'Pyxis',
    'Eclipse', 'Aurora', 'Tempest',
    'Valhalla', 'Zenith', 'Equinox',
    'Mirage', 'Infinity', 'Cascade'
];

function randomFrom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function generateName() {
    return `${randomFrom(list1)} ${randomFrom(list2)}`;
}

function getPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generatePlanet(id) {
    return {
        id,
        name: generateName(),
        prices: {
            food: getPrice(2, 4),
            plastics: getPrice(6, 10),
            computers: getPrice(12, 25),
            narcotics: getPrice(10, 20),
            fuel: getPrice(2, 4)
        },
        repairCost: getPrice(2, 4),
        missionsAvailable: getPrice(3, 3),
        sellsShield: Math.random() < 0.3,
        shieldPrice: 10
    };
}

