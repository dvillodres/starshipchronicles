<script>
    import { gameStore } from '../../stores/gameStore.js';
    
    export let availableMissions;
    export let currentMission;
</script>

<div>
    <p class="font-doto text-sm text-cosmic-purple mb-3">{`<Misiones disponibles\\>`}</p>
    {#if availableMissions.length > 0}
        {#if currentMission }
            <p class="font-doto text-sm bg-red-700 p-2 text-center mb-3">Si aceptas misiones teniendo una activa perderás fama.</p>
        {/if}
        <div class="overflow-x-auto  hide-scrollbar mb-4">
            <ul class="flex no-scrollbar gap-4 px-1">
                {#each availableMissions as m}
                    <li class="flex-shrink-0 w-3/4 sm:w-80 bg-nebula-black border border-cosmic-purple/50 p-4 font-doto">
                        <strong class="block text-white mb-2">{m.name}</strong>
                        <p class="text-sm text-white/80 mb-2">{m.description}</p>
                        <p class="text-sm text-crt-green/80 mb-4">Distancia: {m.distance}</p>

                        <button
                                on:click={() => gameStore.acceptMission(m)}
                                class="px-3 py-1 bg-cosmic-purple/20 text-cosmic-purple border border-cosmic-purple hover:bg-cosmic-purple hover:text-white transition-colors duration-300 text-sm cursor-crosshair"
                        >
                            ACEPTAR
                        </button>
                    </li>
                {/each}
            </ul>
        </div>

    {:else}
        <p class="text-white/60 font-doto mb-4">No hay misiones disponibles en este planeta.</p>
    {/if}
</div>

<style>
    .hide-scrollbar {
        scrollbar-width: 0px;
        scrollbar-color: transparent;
    }
    .hide-scrollbar::-webkit-scrollbar { display: none; }
</style>
