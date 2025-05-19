<script>
    import { gameStore } from '../../stores/gameStore.js';
    import {onMount} from "svelte";

    async function increaseVictory() {
        await fetch('/api/increase-losses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    onMount(async () => {
        await increaseVictory();
    })
</script>

<div class="flex flex-col items-center justify-center p-8 bg-nebula-black/80 border-2 border-warning-amber  shadow-lg">
    <h1 class="text-3xl text-warning-amber mb-8 font-retro tracking-wider">HAS PERDIDO</h1>
    <button 
        on:click={() => gameStore.reset()}
        class="px-6 py-3 bg-transparent text-warning-amber font-bold  border-2 border-warning-amber hover:bg-warning-amber hover:text-nebula-black transition-colors duration-300 cursor-crosshair"
    >
        REINICIAR JUEGO
    </button>
</div>
