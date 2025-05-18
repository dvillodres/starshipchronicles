<script>
    import {gameStore} from '../../stores/gameStore.js';

    export let fuelAmount;
    export let planets;
    export let currentPlanetIndex;

    let planetsWithMeta = [];

    $: planetsWithMeta = planets.map((planet, i) => {
        const distance = Math.abs(currentPlanetIndex === null ? i + 1 : i - currentPlanetIndex);
        const reachable = distance > 0 && distance <= fuelAmount;
        const isCurrentPlanet = i === currentPlanetIndex;
        return { planet, index: i, distance, reachable, isCurrentPlanet };
    });
</script>

<div class="bg-deep-space/80 border border-neon-cyan p-4 min-h-96">
    <p class="text-crt-green font-doto text-sm mb-2">{`<Planetas\\>`}</p>


    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        {#each planetsWithMeta as { planet, distance, reachable }, i}
                <button on:click={reachable ? () => gameStore.selectPlanet(planet) : null}
                        class={`p-2 text-left transition-all duration-300 border w-full  ${reachable ? 'bg-nebula-black border-neon-cyan text-white hover:bg-neon-cyan/20 cursor-crosshair' : 'bg-black/30 border-gray-700 text-gray-500 cursor-not-allowed'} ${planet.isCurrentPlanet ? 'border-warning-amber' : ''}`} >
                    <span class="flex gap-3 items-center">
                        <img src={`/assets/img/icons/planet-${planet.id + 1}.webp`} alt="Escudo" class={`w-12 h-12 object-contain ${reachable ? '' : 'opacity-40'}`} />
                    <span class="block">
                        <span class="block text-neon-cyan font-retro text-xs mb-1">{planet.name}</span>
                        <span class="flex gap-3 text-xs font-doto">
                            {#if reachable}
                                <small>DISTANCIA/EVENTOS: <span class="text-crt-green"> {distance}</span></small>
                            {:else}
                                <small>NO PUEDES LLEGAR</small>
                            {/if}
                        </span>
                    </span>
                    </span>
                </button>
        {/each}
    </div>
</div>
