<script>
    import { gameStore } from '../../stores/gameStore.js';

    export let cargo;
    export let cargoLimit;
    export let phase;
    export let planet;

    const cargoNames = {
        food: 'Comida',
        plastics: 'Plásticos',
        computers: 'Computadoras',
        narcotics: 'Narcóticos',
        fuel: 'Combustible'
    };

    const cargoIcons = {
        food: '/assets/img/icons/food.webp',
        plastics: '/assets/img/icons/plastics.webp',
        computers: '/assets/img/icons/computers.webp',
        narcotics: '/assets/img/icons/narcotics.webp',
        fuel: '/assets/img/icons/fuel.webp'
    };

    $: cargoList = Object.entries(cargo).flatMap(([type, amount]) =>
        Array(amount).fill(type)
    );

    $: displaySlots = [...cargoList, ...Array(cargoLimit - cargoList.length).fill(null)];
</script>

<div class="bg-deep-space/80 border h-48 border-cosmic-purple p-4">
    <p class="text-cosmic-purple text-sm font-doto mb-4">{`<Carga\\>`}</p>

    <div class="grid grid-cols-4 gap-2 mb-4">
        {#each displaySlots as type, index}
            {#if type}
                <div class="relative bg-nebula-black border border-cosmic-purple/40 p-2 flex flex-col items-center justify-center">
                    <img src={cargoIcons[type]} alt={type} class="w-8 h-8 object-contain mb-1" />
                    <span class="text-white text-xs font-doto text-center">{cargoNames[type]}</span>

                    {#if phase === 'planet' && planet?.prices?.[type]}
                        <button
                                class="mt-1 text-[10px] px-2 py-0.5 bg-neon-cyan text-black rounded hover:bg-neon-cyan/80 cursor-crosshair"
                                on:click={() => gameStore.sellCargo(type)}
                        >
                            Vender
                        </button>
                    {/if}
                </div>
            {:else}
                <div class="bg-black/30 border border-cosmic-purple/20 p-2 flex items-center justify-center text-white/30 text-xs font-doto">
                    Vacío
                </div>
            {/if}
        {/each}
    </div>

    <p class="text-xs text-right text-white/60 font-doto">
        CARGA: {cargoList.length} / {cargoLimit}
    </p>
</div>
