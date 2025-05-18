export function generatePlanets(count) {
    return Array.from({ length: count }, (_, i) => generatePlanet(i));
}

export const planets = [
    {
        name: 'Arculus',
        prices: {
            food: 3,
            plastics: 10,
            computers: 22,
            narcotics: 20,
            fuel: 2
        },
        repairCost: 2,
        missionsAvailable: 1
    },
    {
        name: 'Delta Prime',
        prices: {
            food: 2,
            plastics: 7,
            computers: 15,
            narcotics: 5,
            fuel: 3
        },
        repairCost: 3,
        missionsAvailable: 2
    },
    {
        name: 'Foster\'s World',
        prices: {
            food: 3,
            plastics: 8,
            computers: 17,
            narcotics: 15,
            fuel: 3
        },
        repairCost: 3,
        missionsAvailable: 2
    }
];


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

const list3 = [
    'Brillante', 'Oscuro', 'Lejano', 'Místico', 'Antiguo',
    'Radiante', 'Silencioso', 'Sagrado',
    'Fértil', 'Desolado', 'Glorioso',
    'Enigmático', 'Majestuoso', 'Abundante',
    'Frío', 'Caliente', 'Vibrante',
    'Eterno', 'Sombrío', 'Espectral',
    'Rápido', 'Lento', 'Serpenteante'
];

function randomFrom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function generateName() {
    const roll = Math.random();
    return `${randomFrom(list1)} ${randomFrom(list2)}`;

    if (roll < 0.4) {
        return `${randomFrom(list1)} ${randomFrom(list2)}`;
    } else if (roll < 0.75) {
        return `${randomFrom(list1)} ${randomFrom(list3)}`;
    } else {
        return `${randomFrom(list1)} ${randomFrom(list2)} ${randomFrom(list3)}`;
    }
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
        missionsAvailable: getPrice(1, 2),
        sellsShield: Math.random() < 0.3,
        shieldPrice: 10
    };
}

