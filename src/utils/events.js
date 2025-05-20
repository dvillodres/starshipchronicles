// utils/events.js

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateEvent(state) {
    const templates = [];
    templates.push(() => {
        const locations = [
            'una nebulosa densa',
            'un campo de escombros',
            'una tormenta ionizada',
            'una zona de radiación solar',
            'una nube de partículas inestables',
            'un cinturón de asteroides',
            'una región con anomalías gravitacionales',
            'una zona de interferencia electromagnética',
            'una tormenta de polvo cósmico',
            'una región de plasma inestable'
        ];

        const intros = [
            'Atravesaste',
            'Tu nave cruzó por',
            'Te adentraste en',
            'Pasaste por',
            'Te arriesgaste en',
            'Navegaste a través de',
            'Fuiste forzado a cruzar',
            'Sin alternativa, entraste en',
            'El trayecto te llevó por',
            'Terminaste en'
        ];

        const outcomes = [
            'Tu nave sufre',
            'Recibes',
            'Se registra',
            'Tu casco recibe',
            'El sistema reporta',
            'El escudo cede ante',
            'Tu estructura sufre',
            'Los sensores alertan de',
            'El impacto deja',
            'El daño acumulado resulta en'
        ];

        const amount = 1 + Math.floor(Math.random() * 2);

        return {
            type: 'environment',
            name: 'Daño ambiental',
            effect: 'damage',
            amount,
            message: `${randomFrom(intros)} ${randomFrom(locations)}. ${randomFrom(outcomes)} ${amount} punto(s) de daño.`
        };
    });


    templates.push(() => {
        const items = [
            'una cápsula de emergencia',
            'restos de una nave colonial',
            'una carga abandonada',
            'un contenedor flotando en el vacío',
            'una baliza sin identificar',
            'una cápsula de escape parcialmente intacta',
            'una nave destruida con restos aprovechables',
            'un módulo de carga olvidado',
            'una señal de socorro sin responder',
            'una estructura alienígena deteriorada'
        ];

        const intros = [
            'Encuentras',
            'Detectas',
            'Tu escáner localiza',
            'Te aproximas a',
            'Una señal te guía hacia',
            'Divisas en la distancia',
            'Interceptas',
            'Tu nave identifica',
            'En los sensores aparece',
            'Accidentalmente tropiezas con'
        ];

        const rewards = [
            'Obtienes',
            'Recoges',
            'Reclamas',
            'Recuperas',
            'Ganas',
            'Tu tripulación extrae',
            'Cosechas',
            'Consigues',
            'Adquieres',
            'Aseguras'
        ];

        const credits = 5 + Math.floor(Math.random() * 6);

        return {
            type: 'environment',
            name: 'Hallazgo espacial',
            effect: 'credits',
            amount: credits,
            message: `${randomFrom(intros)} ${randomFrom(items)}. ${randomFrom(rewards)} ${credits} créditos.`
        };
    });

    if (Math.random() < 0.3) {
        const acts = [
            'saboteado una estación orbital',
            'derrotado a una patrulla imperial',
            'liberado una colonia minera',
            'infiltrado una base enemiga',
            'desactivado un sistema de defensa planetario',
            'robado suministros de alto valor',
            'rescatado prisioneros políticos',
            'bloqueado una ruta comercial imperial',
            'difundido información clasificada',
            'provocado un motín en una estación espacial'
        ];
        return {
            type: 'renegade',
            name: 'Hazaña del Renegado',
            effect: 'fame',
            amount: 1,
            message: `El Renegado ha ${randomFrom(acts)}. Gana 1 punto de fama.`
        };
    }


    if (state.bounty >= 3) {
        const lines = [
            'Una patrulla imperial bloquea tu trayectoria.',
            'Te detectan en una zona de vigilancia.',
            'Interceptas una transmisión: "Tienes recompensa activa..."',
            'Una nave de seguridad aparece en tus sensores.',
            'Una señal de rastreo se fija en tu nave.',
            'La autoridad local ha identificado tu firma.',
            'Te rodean luces rojas: has sido marcado.',
            'Interceptan tu ruta desde un puesto avanzado.',
            'Recibes un mensaje cifrado: "Orden de captura en curso."',
            'Un escuadrón se desvía hacia ti con intenciones hostiles.'
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
        const threats = [
            'un cazarrecompensas',
            'un grupo de saqueadores',
            'una nave pirata',
            'una banda de forajidos espaciales',
            'un mercenario armado hasta los dientes',
            'una fragata corsaria',
            'una escuadra de piratas del vacío',
            'un renegado con sed de créditos',
            'una nave hostil sin identificación',
            'un atacante buscando su próxima presa'
        ];

        const intros = [
            'Te cruzas con',
            'Aparece en tu ruta',
            'Tu radar detecta',
            'Emergiendo de la oscuridad, surge',
            'Tu trayecto es interceptado por',
            'No puedes evitar a',
            'Desde una zona ciega salta',
            'Te embosca',
            'Frente a ti aparece',
            'Se aproxima rápidamente'
        ];

        const endings = [
            '¡Combate inevitable!',
            '¡No hay forma de evitarlo!',
            '¡Prepárate para luchar!',
            '¡Activa los escudos!',
            '¡Sin opción de escape!',
            '¡Te preparas para el enfrentamiento!',
            '¡El conflicto es inminente!',
            '¡Se avecina una batalla!',
            '¡No hay negociación posible!',
            '¡Todo apunta a un ataque inmediato!'
        ];

        const reward = 8 + Math.floor(Math.random() * 6);

        return {
            type: 'ship',
            shipType: 'Pirata',
            hull: 2 + Math.floor(Math.random() * 2),
            baseLasers: 2,
            aggressive: true,
            reward: { credits: reward, fame: 1 },
            fleeCost: { hull: 1 },
            message: `${randomFrom(intros)} ${randomFrom(threats)}. ${randomFrom(endings)}`
        };
    });


    templates.push(() => {
        const greetings = [
            'te saluda amistosamente',
            'ofrece intercambiar coordenadas',
            'te ignora por completo',
            'envía una señal de paz',
            'te transmite una antigua canción espacial',
            'pregunta si necesitas suministros',
            'se muestra cautelosa pero no hostil',
            'te envía datos sobre rutas seguras',
            'ofrece comerciar sin compromiso',
            'pide paso sin causar problemas'
        ];

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
