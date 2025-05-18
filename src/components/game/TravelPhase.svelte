<script>
    import { gameStore } from '../../stores/gameStore.js';
    import ActiveEvent from './ActiveEvent.svelte';
    import CombatInterface from './CombatInterface.svelte';
    
    export let state;
</script>

<div class="bg-deep-space/80 border border-neon-cyan min-h-96 p-4 shadow-[0_0_15px_rgba(81,230,255,0.3)]">
    <h3 class="text-lg text-neon-cyan mb-4 font-retro flex items-center">
        <span class="mr-2">✴️</span> EVENTOS DEL VIAJE
    </h3>
    <p class="text-sm text-white mb-6 font-doto">Eventos restantes: <span class="text-crt-green">{state.pendingEvents}</span></p>

    {#if state.activeEvent}
        <ActiveEvent activeEvent={state.activeEvent} />
    {/if}

    {#if state.currentEnemy}
        <CombatInterface enemy={state.currentEnemy} />
    {:else if !state.activeEvent}
        <button 
            on:click={() => gameStore.processNextEvent()}
            class="cursor-crosshair w-full px-4 py-2 bg-neon-cyan text-nebula-black font-bold  transition-all duration-300 hover:bg-white hover:shadow-[0_0_10px_rgba(81,230,255,0.7)]"
        >
            CONTINUAR VIAJE
        </button>
    {/if}
</div>
