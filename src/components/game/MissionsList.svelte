<script>
    import { gameStore } from '../../stores/gameStore.js';
    
    export let availableMissions;
    export let currentMission;
</script>

<div>
    <p class="font-doto text-sm text-cosmic-purple mb-3">{`<Misiones disponibles\\>`}</p>
    {#if availableMissions.length > 0}
        <ul class="space-y-3 mb-4 grid grid-cols-2">
            {#each availableMissions as m}
                <li class="bg-nebula-black border border-cosmic-purple/50 p-3  font-doto">
                    <strong class="block text-white mb-1">{m.name}</strong>
                    <p class="text-sm text-white/80 mb-2">{m.description}</p>
                    <p class="text-sm text-crt-green/80 mb-2">El planeta se encuentra a: {m.distance}</p>

                    <button 
                        on:click={() => gameStore.acceptMission(m)}
                        class="px-3 py-1 bg-cosmic-purple/20 text-cosmic-purple border border-cosmic-purple  hover:bg-cosmic-purple hover:text-white transition-colors duration-300 text-sm cursor-crosshair"
                    >
                        ACEPTAR
                    </button>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="text-white/60 font-doto mb-4">No hay misiones disponibles en este planeta.</p>
    {/if}
</div>
