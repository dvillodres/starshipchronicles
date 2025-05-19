<script>
    import {onMount} from 'svelte';
    import {gameStore} from '../../stores/gameStore.js';

    import GameOver from './GameOver.svelte';
    import TravelPhase from './TravelPhase.svelte';
    import ShipStatus from './ShipStatus.svelte';
    import PlanetSelection from './PlanetSelection.svelte';
    import PlanetInfo from './PlanetInfo.svelte';
    import GameLog from './GameLog.svelte';
    import CargoInventory from "./CargoInventory.svelte";
    import RenegadeStatus from "./RenegadeStatus.svelte";
    import HullStatus from "./HullStatus.svelte";
    import VictoryScreen from "./VictoryScreen.svelte";
    import CurrentMission from "./CurrentMission.svelte";

    let state;
    export let isDemo = false;
    const unsubscribe = gameStore.subscribe(value => {
        state = value;
    });
    let dismissed = false;

    onMount(() => {
        if (isDemo) {
            gameStore.startDemo();
        }

        gameStore.addLog('Bienvenido a Starchips Chronicles');
    });
</script>

{#if state.fame >= 6}
    <VictoryScreen/>
{:else}

    <div class="max-w-6xl mx-auto p-4 md:p-6 flex gap-6 flex-col font-retro">

        {#if state.isDemo && state.demoTravelCount >= state.demoTravelLimit}

                <div class="fixed inset-0  bg-black/90 text-crt-green flex items-center justify-center text-center z-50 p-6 font-doto">
                    <div class="max-w-md">
                        <h2 class="text-2xl mb-4">🚧 Has alcanzado el límite de la demo</h2>
                        <p class="mb-6">
                            Has realizado los 2 viajes disponibles en esta versión de prueba.<br>
                            Inicia sesión para continuar tu aventura intergaláctica.
                        </p>

                        <a href="/juego" class="px-6 py-3 bg-crt-green text-black text-lg font-bold border border-crt-green hover:bg-transparent hover:text-crt-green transition">
                            🚀 Inicia Sesión
                        </a>
                    </div>
                </div>
        {/if}

        {#if !dismissed}
            <div class="block lg:hidden bg-black/80 text-white text-center p-4 border border-red-600 text-sm font-doto">
                ⚠️ Este juego se disfruta mucho más en pantalla grande. Prueba en un ordenador para una mejor experiencia.

                <button
                        on:click={() => dismissed = true}
                        class="mt-2 text-red-400 underline text-xs hover:text-red-200 transition"
                >
                    Cerrar información
                </button>
            </div>
        {/if}

        <div class="flex flex-col lg:flex-row gap-4">
            <div class="w-full lg:w-1/2 flex flex-col gap-2">
                <ShipStatus {state} />
                <div class="grid grid-cols-2 gap-2">

                    <HullStatus hull={state.hull} maxHull={state.maxHull} shield={state.shield.hasShield
                ? (state.shield.usedThisPhase ? 'Usado' : 'Activo')
                : 'No instalado'} />

                    <RenegadeStatus fame={state.renegadeFame} />
                </div>
            </div>
            <div class="w-full lg:w-1/2 flex flex-col gap-2">
                <CargoInventory cargo={state.cargo} cargoLimit={state.cargoLimit} phase={state.phase} planet={state.currentPlanet} />
                <CurrentMission currentMission={state.mission} />

            </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-4">
            <div class="w-full lg:w-1/3 flex flex-col gap-3">
                <GameLog log={state.log} phase={state.phase.toUpperCase()} />


            </div>
            <div class="w-full lg:w-2/3">
                {#if state.gameOver}
                    <GameOver />
                {:else if state.phase === 'travel'}
                    <TravelPhase {state} />
                {:else if !state.gameOver}
                    {#if state.phase === 'system'}
                        <PlanetSelection
                        planets={state.galaxy}
                        fuelAmount={state.cargo.fuel}
                        currentPlanetIndex={state.currentPlanetIndex}
                        hasShield={state.shield.hasShield}
                        />
                    {/if}

                    {#if state.currentPlanet}
                        <PlanetInfo
                                planet={state.currentPlanet}
                                availableMissions={state.availableMissions}
                                mission={state.mission}
                        />
                    {/if}
                {/if}
            </div>
        </div>


        <a

                href="/"
                class=" blockbg-black/80 text-center p-2 border border-red-600 font-doto mt-2 text-red-600 underline text-xs hover:text-red-200 transition cursor-crosshair"
        >
            Salir del juego
        </a>

    </div>

{/if}


