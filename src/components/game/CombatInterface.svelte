<script>
    import { gameStore } from '../../stores/gameStore.js';
    
    export let enemy;
</script>

<div class="bg-nebula-black border-2 border-warning-amber  p-4 mb-4">
    <h4 class="text-warning-amber text-lg mb-3 font-retro flex items-center justify-center">
         COMBATE CONTRA {enemy.shipType.toUpperCase()}
    </h4>
    
    <div class="bg-deep-space py-2 px-3  mb-4 led-display text-center">
        HULL ENEMIGO: <span class="text-warning-amber">{enemy.currentHull}</span>
    </div>
    
    <div class="grid grid-cols-2 gap-3">
        <button 
            on:click={() => gameStore.combatRound()}
            class="px-3 py-2 bg-warning-amber text-nebula-black font-bold  hover:bg-white hover:text-warning-amber transition-colors duration-300 cursor-crosshair flex items-center justify-center"
        >
            ATACAR
        </button>
        
        <button 
            on:click={() => gameStore.fleeCombat()}
            class="px-3 py-2 bg-nebula-black text-warning-amber border-2 border-warning-amber font-bold  hover:bg-warning-amber/20 transition-colors duration-300 cursor-crosshair flex items-center justify-center"
        >
             HUIR
        </button>
    </div>
</div>
