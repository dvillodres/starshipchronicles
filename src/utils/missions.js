const goodsList = ['food', 'plastics', 'computers', 'narcotics'];



const cargoNames = {
    food: 'Comida',
    plastics: 'Plásticos',
    computers: 'Computadoras',
    narcotics: 'Narcóticos',
    fuel: 'Combustible'
}

const minimumPrices = {
    food: 2,
    plastics: 6,
    computers: 12,
    narcotics: 10
};

const deliveryMessages = [
    'Una colonia en {planet} necesita {amount} unidad(es) de {goods}.',
    'Transporta {amount} de {goods} a {planet}. Recibirás pago al llegar.',
    'La nave de carga falló. Tu misión: entregar {amount} {goods} en {planet}.',
    'Suministros críticos: lleva {amount} unidad(es) de {goods} a {planet} cuanto antes.',
    'Entrega urgente: {amount} de {goods} deben llegar a {planet} sin demora.',
    'Una base en {planet} espera {amount} unidad(es) de {goods}. No los hagas esperar.',
    'Tu nave es la única disponible. Lleva {amount} de {goods} a {planet}.',
    'Los colonos en {planet} están escasos de {goods}. Entrega {amount} cuanto antes.',
    'Pedido especial: {amount} de {goods} destinados a {planet}.',
    'La situación en {planet} depende de una entrega rápida de {amount} {goods}.',
];


const contrabandMessages = [
    'Un contacto misterioso te espera en {planet}. Lleva {amount} de {goods}. No hagas preguntas.',
    'Contrabando delicado: {amount} unidad(es) de {goods} deben llegar a {planet}.',
    'Tu nave no será registrada… si eres rápido. Entrega {amount} de {goods} en {planet}.',
    'Hay compradores en {planet} interesados en {goods}. Lleva {amount}, discretamente.',
    'El trato está hecho. Transporta {amount} de {goods} a {planet} sin levantar sospechas.',
    'Evita las rutas oficiales y entrega {amount} de {goods} en {planet}.',
    'Un coleccionista privado en {planet} pagará bien por {amount} de {goods}.',
    'Información clasificada: {amount} de {goods} deben llegar a {planet} hoy mismo.',
    'Un envío discreto de {goods} ({amount}) debe ser entregado en {planet}. Sin errores.',
    'La carga es sensible. Lleva {amount} de {goods} a {planet} y no te detengas.',
];


const rescueMessages = [
    'Una señal de auxilio llega desde {planet}. Viaja allí para evacuar a los sobrevivientes.',
    'Colonos atrapados en {planet} necesitan extracción urgente.',
    'Una tormenta solar se acerca. Ve a {planet} y rescata a los técnicos atrapados.',
    'Una instalación remota en {planet} ha quedado aislada. Tu ayuda es vital.',
    'Un accidente ha dejado heridos en {planet}. Acude para asistir en la evacuación.',
    'Un experimento fallido ha puesto en peligro a la tripulación en {planet}. Ve en su ayuda.',
    'Se detectó actividad sísmica en {planet}. Los residentes necesitan ser rescatados.',
    'Una fuga de oxígeno amenaza una base en {planet}. Intervén antes de que sea tarde.',
    'Una nave se estrelló en {planet}. Rescata a los sobrevivientes antes de que anochezca.',
    'Un brote viral ha obligado a evacuar una estación médica en {planet}. Apoya en la extracción.',
];


function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMissionsForPlanet(currentPlanet, galaxy, count = 1) {
    const missions = [];

    const currentIndex = galaxy.findIndex(p => p.id === currentPlanet.id);
    if (currentIndex === -1) return [];

    const maxDistance = 3;

    const nearbyPlanets = galaxy.filter((planet, index) => {
        const distance = Math.abs(index - currentIndex);
        return distance > 0 && distance <= maxDistance;
    });

    for (let i = 0; i < count; i++) {
        const isContraband = Math.random() < 0.25;
        const isRescue = !isContraband && Math.random() < 0.25;
        const targetPlanet = randomFrom(nearbyPlanets);

        let mission = {
            name: '',
            description: '',
            requirements: { planetId: targetPlanet.id },
            planetName: targetPlanet.name,
            reward: {},
            distance: Math.abs(currentIndex - targetPlanet.id),
        };

        if (isRescue) {
            const fame = getRandomInt(1, 2);
            const bounty = -getRandomInt(1, 2);
            mission.name = 'Misión de Rescate';
            mission.reward = { fame, bounty };
            mission.description = randomFrom(rescueMessages)
                .replace('{planet}', targetPlanet.name);
        } else {
            const goods = randomFrom(isContraband ? ['narcotics'] : goodsList.filter(g => g !== 'narcotics'));
            const amount = getRandomInt(1, isContraband ? 2 : 3);
            const fame = getRandomInt(0, 1);

            const basePrice = minimumPrices[goods];
            const totalBaseCost = basePrice * amount;
            const profitMargin = isContraband ? getRandomInt(6, 10) : getRandomInt(3, 6);
            const credits = totalBaseCost + profitMargin;

            mission.name = isContraband ? 'Tráfico Ilegal' : 'Entrega Comercial';
            mission.requirements.sell = { [goods]: amount };
            mission.reward = { credits, fame };
            if (isContraband) mission.reward.bounty = 1;

            const textTemplates = isContraband ? contrabandMessages : deliveryMessages;

            mission.description = randomFrom(textTemplates)
                .replace('{amount}', amount)
                .replace('{goods}', cargoNames[goods])
                .replace('{planet}', targetPlanet.name);
        }

        missions.push(mission);
    }

    return missions;
}
