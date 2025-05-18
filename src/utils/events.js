// utils/events.js

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateEvent(state) {
    const templates = [];

    // 🌌 Eventos de entorno
    templates.push(() => {
        const locations = ['una nebulosa densa', 'un campo de escombros', 'una tormenta ionizada'];
        const amount = 1 + Math.floor(Math.random() * 2);
        return {
            type: 'environment',
            name: 'Daño ambiental',
            effect: 'damage',
            amount,
            message: `Atravesaste ${randomFrom(locations)}. Tu nave sufre ${amount} punto(s) de daño.`
        };
    });

    templates.push(() => {
        const items = ['una cápsula de emergencia', 'restos de una nave colonial', 'una carga abandonada'];
        const credits = 5 + Math.floor(Math.random() * 6);
        return {
            type: 'environment',
            name: 'Hallazgo espacial',
            effect: 'credits',
            amount: credits,
            message: `Encuentras ${randomFrom(items)}. Obtienes ${credits} créditos.`
        };
    });

    // 🌠 Evento del Renegado
    if (Math.random() < 0.3) {
        const acts = ['saboteado una estación orbital', 'derrotado a una patrulla imperial', 'liberado una colonia minera'];
        return {
            type: 'renegade',
            name: 'Hazaña del Renegado',
            effect: 'fame',
            amount: 1,
            message: `El Renegado ha ${randomFrom(acts)}. Gana 1 punto de fama.`
        };
    }

    // 🚨 Encuentros hostiles o no, con narrativa
    if (state.bounty >= 3) {
        const lines = [
            'Una patrulla imperial bloquea tu trayectoria.',
            'Te detectan en una zona de vigilancia.',
            'Interceptas una transmisión: "Tienes recompensa activa..."'
        ];
        return {
            type: 'ship',
            shipType: 'Patrulla de Seguridad',
            hull: 4,
            baseLasers: 2,
            aggressive: true,
            reward: { credits: 20, fame: 1 },
            fleeCost: { hull: 1 },
            message: `${randomFrom(lines)} ¡Prepárate para el combate!`
        };
    }

    templates.push(() => {
        const threats = ['un cazarrecompensas', 'un grupo de saqueadores', 'una nave pirata'];
        const reward = 8 + Math.floor(Math.random() * 6);
        return {
            type: 'ship',
            shipType: 'Pirata',
            hull: 2 + Math.floor(Math.random() * 2),
            baseLasers: 2,
            aggressive: true,
            reward: { credits: reward, fame: 1 },
            fleeCost: { hull: 1 },
            message: `Te cruzas con ${randomFrom(threats)}. ¡Combate inevitable!`
        };
    });

    templates.push(() => {
        const greetings = ['te saluda amistosamente', 'ofrece intercambiar coordenadas', 'te ignora por completo'];
        return {
            type: 'ship',
            shipType: 'Comerciante',
            hull: 2,
            baseLasers: 0,
            aggressive: false,
            reward: { credits: 10, bounty: 1 },
            fleeCost: { none: true },
            message: `Una nave comerciante ${randomFrom(greetings)}.`
        };
    });

    // Elegimos y ejecutamos una plantilla al azar
    const selected = randomFrom(templates);
    return selected();
}
