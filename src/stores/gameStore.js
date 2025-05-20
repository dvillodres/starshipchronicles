import { writable } from 'svelte/store';
import { generatePlanets } from '../utils/planets.js';
import {generateMissionsForPlanet} from '../utils/missions.js';
import { generateEvent } from '../utils/events.js';


function createGameStore() {
    const initialState = {
        hull: 4,
        maxHull: 4,
        lasers: 2,
        cargoLimit: 4,
        cargo: {
            food: 0,
            plastics: 0,
            computers: 0,
            narcotics: 0,
            fuel: 3,
        },
        bounty: 0,
        fame: 0,
        credits: 10,
        shield: {
            hasShield: false,
            usedThisPhase: false,
        },
        mission: null,
        log: [],
        phase: 'system', // 'system' | 'travel' | 'planet'
        renegadeFame: 0,
        currentEnemy: null,
        currentPlanet: null,
        availableMissions: [],
        gameOver: false,
        pendingEvents: 0,
        activeEvent: null,
        galaxy: generatePlanets(10),
        currentPlanetIndex: null,
        isDemo: false,
        demoTravelCount: 0,
        demoTravelLimit: 2,
    };

    let logId = 0;

    function logMessage(state, message) {
        state.log.unshift({
            id: logId++,
            text: `${message}`
        });
    }



    const { subscribe, set, update } = writable(structuredClone(initialState));

    return {
        subscribe,

        reset: () => {
            logId = 0;
            const freshState = structuredClone(initialState);
            freshState.log = [{
                id: logId++,
                text: `[${freshState.phase.toUpperCase()}] Bienvenido a Starships Chronicles`
            }];
            set(freshState);
        },

        addLog: (message) => update(state => {
            logMessage(state, `[${state.phase.toUpperCase()}] ${message}`);
            return state;
        }),

        combatRound: () => update(state => {
            if (!state.currentEnemy){
                state.pendingEvents -= 1;
                state.activeEvent = null;
                return state;
            }

            const playerRoll = Math.floor(Math.random() * 6) + 1 + state.lasers;
            const enemyRoll = Math.floor(Math.random() * 6) + 1 + state.currentEnemy.baseLasers;

            logMessage(state, `[COMBATE] Tú: ${playerRoll} | Enemigo: ${enemyRoll}`);

            if (playerRoll > enemyRoll) {
                state.currentEnemy.currentHull -= 1;
                logMessage(state, `[COMBATE] Golpeas al enemigo. Hull restante: ${state.currentEnemy.currentHull}`);
                if (state.currentEnemy.currentHull <= 0) {
                    logMessage(state, `[VICTORIA] Has destruido al ${state.currentEnemy.shipType}`);
                    const reward = state.currentEnemy.reward;
                    if (reward.credits) state.credits += reward.credits;
                    if (reward.fame) state.fame += reward.fame;
                    if (reward.bounty) state.bounty += reward.bounty;
                    state.currentEnemy = null;
                    state.pendingEvents -= 1;
                    state.activeEvent = null;

                    if (state.phase === 'travel' && state.pendingEvents === 0) {
                        state.phase = 'planet';
                        logMessage(state, `[LLEGADA] Has alcanzado ${state.currentPlanet.name}.`);
                    }
                }
            } else if (enemyRoll > playerRoll) {
                if (state.shield.hasShield && !state.shield.usedThisPhase) {
                    state.shield.usedThisPhase = true;
                    logMessage(state, `[ESCUDO] El escudo absorbió el daño.`);
                } else {
                    state.hull -= 1;
                    logMessage(state, `[COMBATE] Recibes daño. Hull actual: ${state.hull}`);
                    if (state.hull <= 0) {
                        logMessage(state, `[GAME OVER] La nave ha sido destruida.`);
                        state.gameOver = true;
                    }
                }
            } else {
                logMessage(state, '[COMBATE] Empate. Ningún daño.');
            }

            return state;
        }),

        fleeCombat: () => update(state => {
            if (!state.currentEnemy) return state;

            const cost = state.currentEnemy.fleeCost;
            if (cost?.hull) {
                state.hull = Math.max(0, state.hull - cost.hull);
                logMessage(state, `[HUIDA] Escapas, pero pierdes ${cost.hull} Hull.`);
            }

            state.currentEnemy = null;

            state.pendingEvents -= 1;
            state.activeEvent = null;

            if (state.phase === 'travel' && state.pendingEvents <= 0) {
                state.phase = 'planet';
                logMessage(state, `[LLEGADA] Has alcanzado ${state.currentPlanet.name}.`);
            }

            return state;
        }),

        selectPlanet: (planet) => update(state => {
            if (state.isDemo && state.demoTravelCount >= state.demoTravelLimit) {
                logMessage(state, '[DEMO] Has alcanzado el límite de viajes en la versión demo.');
                return state;
            }

            const destinationIndex = state.galaxy.findIndex(p => p.name === planet.name);
            if (destinationIndex === -1) {
                logMessage(state, '[ERROR] Planeta no encontrado en la galaxia.');
                return state;
            }

            const fromIndex = state.currentPlanetIndex === null ? -1 : state.currentPlanetIndex;
            const distance = Math.abs(destinationIndex - fromIndex);

            if (distance === 0 || distance > state.cargo.fuel) {
                logMessage(state, `[ERROR] No puedes alcanzar ${planet.name} con el fuel disponible.`);
                return state;
            }

            state.cargo.fuel -= distance;
            state.currentPlanetIndex = destinationIndex;
            state.currentPlanet = planet;

            state.availableMissions = generateMissionsForPlanet(planet, state.galaxy, planet.missionsAvailable );

            state.phase = 'travel';
            state.pendingEvents = distance;

            logMessage(state, `[VIAJE] Viajando a ${planet.name} (distancia: ${distance}, eventos: ${distance})`);

            return state;
        }),


        acceptMission: (mission) => update(state => {
            if (state.mission) {
                state.fame = Math.max(0, state.fame - 1);
                logMessage(state, '[MISIÓN] Has abandonado la misión anterior. Pierdes 1 Fama.');
            }
            state.mission = mission;
            state.availableMissions = state.availableMissions.filter(m => m !== mission);
            logMessage(state, `[MISIÓN] Aceptaste la misión: ${mission.name}`);
            return state;
        }),

        completeMissionIfPossible: () => update(state => {
            const m = state.mission;
            const p = state.currentPlanet;

            if (!m || !p) return state;

            const req = m.requirements;
            let complete = true;

            if (req.planetId && req.planetId !== p.id) complete = false;

            if (req.sell) {
                for (let item in req.sell) {
                    if (state.cargo[item] < req.sell[item]) {
                        complete = false;
                        break;
                    }
                }
            }

            if (complete) {
                if (req.sell) {
                    for (let item in req.sell) {
                        state.cargo[item] -= req.sell[item];
                    }
                }

                const reward = m.reward;
                if (reward.credits) state.credits += reward.credits;
                if (reward.fame) state.fame += reward.fame;
                if (reward.bounty) state.bounty += reward.bounty;
                if (reward.bounty < 0) {
                    state.bounty = Math.max(0, state.bounty + reward.bounty);
                }

                logMessage(state, `[MISIÓN] Completaste: ${m.name}`);
                state.mission = null;
            } else {
                logMessage(state, '[MISIÓN] No cumples con los requisitos.');
            }

            return state;
        }),


        clearActiveEvent: () => update(state => {
            state.activeEvent = null;
            return state;
        }),


        processNextEvent: () => update(state => {
            if (state.phase !== 'travel' || state.pendingEvents <= 0) {
                logMessage(state, '[ERROR] No hay eventos que procesar.');
                return state;
            }
            const event = generateEvent(state);
            state.activeEvent = event;
            logMessage(state, `[EVENTO] ${event.message}`);

            switch (event.type) {
                case 'environment':
                    if (event.effect === 'damage') {
                        state.hull =  Math.max(0, state.hull - event.amount);
                        if (state.hull <= 0) {
                            logMessage(state, '[GAME OVER] La nave fue destruida durante el viaje.');
                            state.gameOver = true;
                        }
                    } else if (event.effect === 'credits') {
                        state.credits += event.amount;
                    }
                    break;

                case 'renegade':
                    state.renegadeFame += event.amount;
                    if (state.renegadeFame >= 6) {
                        logMessage(state, '[DERROTA] El Renegado ha alcanzado 6 de Fama.');
                        state.gameOver = true;
                    }
                    break;

                case 'ship':
                    state.currentEnemy = {
                        ...event,
                        currentHull: event.hull
                    };
                    logMessage(state, `[ENCUENTRO] Entras en combate con un ${event.shipType}`);
                    return state;

                default:
                    logMessage(state, '[EVENTO] No ocurrió nada relevante.');
            }

            state.pendingEvents -= 1;
            state.activeEvent = null;
            if (state.pendingEvents <= 0 && state.hull > 0 && !state.currentEnemy) {
                state.phase = 'planet';
                logMessage(state, `[LLEGADA] Has alcanzado ${state.currentPlanet.name}.`);
            }

            return state;
        }),
        repairHull: () => update(state => {
            if (state.phase !== 'planet') {
                logMessage(state, '[ERROR] Solo puedes reparar en la fase Planet.');
                return state;
            }

            const planet = state.currentPlanet;
            if (!planet || !planet.repairCost) {
                logMessage(state, '[ERROR] El planeta actual no ofrece reparaciones.');
                return state;
            }

            const damage = state.maxHull - state.hull;
            const costPerHull = planet.repairCost;

            if (damage <= 0) {
                logMessage(state, '[INFO] La nave ya está completamente reparada.');
                return state;
            }

            if (state.credits < costPerHull) {
                logMessage(state, '[ERROR] No tienes suficientes créditos para reparar.');
                return state;
            }

            state.hull += 1;
            state.credits -= costPerHull;

            logMessage(state, `[REPARACIÓN] Has reparado 1 Hull por ${costPerHull} créditos.`);

            return state;
        }),


        leavePlanet: () => update(state => {
            if (state.phase !== 'planet') {
                logMessage(state, '[ERROR] Solo puedes salir de un planeta estando en la fase Planet.');
                return state;
            }

            if (state.cargo.fuel === 0) {
                state.hull = 0;
                logMessage(state, '[GAME OVER] No tienes fuel al comenzar la fase System. Has perdido.');
                state.phase = 'end';
                state.gameOver = true;
                return state;
            }

            state.phase = 'system';
            state.currentPlanet = null
            logMessage(state, '[SISTEMA] Abandonaste el planeta. Nuevos destinos disponibles.');
            if (state.isDemo) {
                state.demoTravelCount += 1;
            }
            return state;
        }),

        buyCargo: (type) => update(state => {
            if (state.phase !== 'planet') {
                logMessage(state, '[ERROR] Solo puedes comprar mercancías en un planeta.');
                return state;
            }

            const price = state.currentPlanet?.prices?.[type];
            if (!price) {
                logMessage(state, `[ERROR] Este planeta no vende ${type}.`);
                return state;
            }

            const currentCargo = Object.values(state.cargo).reduce((a, b) => a + b, 0);
            const hasSpace = currentCargo < state.cargoLimit;

            if (!hasSpace) {
                logMessage(state, `[ERROR] No tienes espacio en la bodega para ${type}.`);
                return state;
            }

            if (state.credits < price) {
                logMessage(state, `[ERROR] No tienes suficientes créditos para comprar ${type}.`);
                return state;
            }

            state.credits -= price;
            state.cargo[type] += 1;

            logMessage(state, `[COMPRA] Compraste 1 unidad de ${type} por ${price} créditos.`);

            return state;
        }),
        buyShield: () => update(state => {
            if (state.phase !== 'planet') {
                logMessage(state, '[ERROR] Solo puedes comprar el escudo en un planeta.');
                return state;
            }

            const planet = state.currentPlanet;
            if (!planet?.sellsShield) {
                logMessage(state, '[ERROR] Este planeta no ofrece escudos.');
                return state;
            }

            const price = planet.shieldPrice || 10;
            if (state.credits < price) {
                logMessage(state, '[ERROR] No tienes suficientes créditos para comprar el escudo.');
                return state;
            }

            if (state.shield.hasShield) {
                logMessage(state, '[INFO] Ya tienes un escudo instalado.');
                return state;
            }

            state.credits -= price;
            state.shield.hasShield = true;
            state.shield.usedThisPhase = false;

            logMessage(state, `[MEJORA] Compraste un escudo por ${price} créditos.`);

            return state;
        }),
        sellCargo: (type) => update(state => {
            if (state.phase !== 'planet') {
                logMessage(state, '[ERROR] Solo puedes vender mercancías en un planeta.');
                return state;
            }

            if (state.cargo[type] <= 0) {
                logMessage(state, `[ERROR] No tienes ${type} para vender.`);
                return state;
            }

            const price = state.currentPlanet?.prices?.[type];
            if (!price) {
                logMessage(state, `[ERROR] Este planeta no compra ${type}.`);
                return state;
            }

            state.cargo[type] -= 1;
            state.credits += price;

            logMessage(state, `[VENTA] Vendiste 1 unidad de ${type} por ${price} créditos.`);

            return state;
        }),

        startDemo: () => update(state => {
            state.isDemo = true;
            state.demoTravelCount = 0;
            state.demoTravelLimit = 2;
            logMessage(state, '[DEMO] Iniciaste la versión demo. Tienes 2 viajes disponibles.');
            return state;
        }),
    };
}

export const gameStore = createGameStore();
