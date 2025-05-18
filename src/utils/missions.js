const missionTemplates = [
    {
        type: 'delivery',
        name: 'Entregar suministros',
        goods: 'food',
        amount: 2,
        fame: 1,
        credits: 6
    },
    {
        type: 'contraband',
        name: 'Tráfico ilegal',
        goods: 'narcotics',
        amount: 1,
        fame: 1,
        credits: 10,
        bounty: 1
    },
    {
        type: 'rescue',
        name: 'Misión de rescate',
        fame: 0,
        bounty: -2
    }
];

function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function generateMissionsForPlanet(currentPlanet, galaxy, count = 1) {
    const missions = [];

    // 🧠 Encuentra el índice del planeta actual en la galaxia
    const currentIndex = galaxy.findIndex(p => p.id === currentPlanet.id);
    if (currentIndex === -1) return [];

    // 🔎 Filtra planetas dentro de rango máximo
    const maxDistance = 3;

    const nearbyPlanets = galaxy.filter((planet, index) => {
        const distance = Math.abs(index - currentIndex);
        return distance > 0 && distance <= maxDistance;
    });

    for (let i = 0; i < count; i++) {
        const template = randomFrom(missionTemplates);
        const targetPlanet = randomFrom(nearbyPlanets);

        const mission = {
            name: template.name,
            description: '',
            requirements: { planetId: targetPlanet.id },
            planetName: targetPlanet.name, // solo para mostrar
            reward: {},
            distance: Math.abs(currentIndex - targetPlanet.id)
        };

        if (template.type === 'delivery' || template.type === 'contraband') {
            mission.requirements.sell = { [template.goods]: template.amount };
            mission.reward.credits = template.credits;
            mission.reward.hull = template.fame;
            if (template.bounty) mission.reward.bounty = template.bounty;

            mission.description = `Vende ${template.amount} ${template.goods} en ${targetPlanet.name}`;
        }

        if (template.type === 'rescue') {
            mission.reward.bounty = template.bounty;
            mission.description = `Viaja a ${targetPlanet.name} para realizar una evacuación.`;
        }

        missions.push(mission);
    }

    return missions;
}

