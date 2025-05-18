<script>
    import { gameStore } from '../../stores/gameStore.js';
    
    export let activeEvent;
</script>

<div class="bg-nebula-black border-2 border-cosmic-purple  p-4 mb-6 shadow-[0_0_15px_rgba(157,78,221,0.4)]">
    <strong class="block text-cosmic-purple text-lg mb-3 font-retro">{activeEvent.name || 'Evento inesperado'}</strong>
    <p class="text-white mb-4 font-doto">{activeEvent.message}</p>

    {#if activeEvent.type !== 'ship'}
        <button 
            on:click={() => gameStore.clearActiveEvent()}
            class="px-4 py-2 bg-cosmic-purple/20 text-cosmic-purple border border-cosmic-purple  hover:bg-cosmic-purple hover:text-white transition-colors duration-300 cursor-crosshair"
        >
            CERRAR EVENTO
        </button>
    {/if}
</div>
