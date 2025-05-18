export function generateEvent(playerState) {
    const events = [
        {
            type: 'environment',
            name: 'Tormenta de meteoritos',
            effect: 'damage',
            amount: 1,
            message: 'Tu nave es golpeada por meteoritos. Pierdes 1 Hull.',
        },
        {
            type: 'environment',
            name: 'Restos espaciales',
            effect: 'credits',
            amount: 5,
            message: 'Encuentras restos con 5 créditos útiles.',
        },
        {
            type: 'renegade',
            name: 'Hazaña del Renegado',
            effect: 'fame',
            amount: 1,
            message: 'El Renegado ha realizado una acción osada. Gana 1 Fama.',
        },
        {
            type: 'ship',
            shipType: 'Pirata',
            hull: 3,
            baseLasers: 3,
            aggressive: true,
            reward: { credits: 10, fame: 1 },
            fleeCost: { hull: 1 },
            message: '¡Un pirata te ataca!'
        },
        {
            type: 'ship',
            shipType: 'Comerciante',
            hull: 2,
            baseLasers: 1,
            aggressive: false,
            reward: { credits: 20, bounty: 1 },
            fleeCost: { none: true },
            message: 'Ves a un comerciante pasando pacíficamente.',
        }
    ];

    return events[Math.floor(Math.random() * events.length)];
}
