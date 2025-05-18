<script>
    import { gameStore } from '../../stores/gameStore.js';

    export let currentMission;

</script>

{#if currentMission}
    <div class="bg-nebula-black border-2 border-crt-green p-3  mb-3 font-doto">
        <p class="mb-2">
            <strong class="text-crt-green">MISIÓN ACTUAL:</strong>
            <span class="block">{currentMission.name} - {currentMission.description}</span>
        </p>
        <button
                on:click={() => gameStore.completeMissionIfPossible()}
                class="w-full px-3 py-2 bg-crt-green/20 text-crt-green border border-crt-green  hover:bg-crt-green hover:text-nebula-black transition-colors duration-300 cursor-crosshair"
        >
            INTENTAR COMPLETAR
        </button>
    </div>
{:else}

    <div class="bg-nebula-black border-2 border-crt-green p-3  h-32 mb-3 font-doto">
        <p class="mb-2">
            <strong class="text-crt-green">MISIÓN ACTUAL:</strong>
            <span class="block">Ninguna misión activa</span>
        </p>
    </div>
{/if}
