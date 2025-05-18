<script>
    import MissionsList from './MissionsList.svelte';
    import { gameStore } from '../../stores/gameStore.js';

    export let planet;
    export let hasShield;
    export let availableMissions;
    export let mission;
    const cargoNames = {
        food: 'Comida',
        plastics: 'Plásticos',
        computers: 'Computadoras',
        narcotics: 'Narcóticos',
        fuel: 'Combustible'
    }
</script>

<div class="relative bg-deep-space/80 border border-cosmic-purple  p-4 overflow-y-auto">


    <div class="z-30 relative">

        <p class="font-doto text-sm text-cosmic-purple mb-3">Planeta: {`<${planet.name}\\>`}</p>

        <MissionsList availableMissions={availableMissions} currentMission={mission} />


        <p class="font-doto text-sm text-cosmic-purple mb-3">{`<Acciones\\>`}</p>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <button
                    on:click={() => gameStore.repairHull()}
                    class="group flex items-center gap-3 bg-nebula-black border border-cosmic-purple/50 p-3 font-doto cursor-crosshair hover:bg-neon-cyan/10 transition-all"
            >
                <img src='/assets/img/icons/repair.webp' class="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-125" />
                <div class="flex flex-col flex-1 text-left">
                    <span class="text-white">Reparar 1</span>
                    <span class="text-crt-green text-sm">{planet.repairCost} CR</span>
                </div>
            </button>

            {#if planet.sellsShield && !hasShield}
                <button
                        on:click={() => gameStore.buyShield()}
                        class="group flex items-center gap-3 bg-nebula-black border border-cosmic-purple/50 p-3 font-doto cursor-crosshair hover:bg-neon-cyan/10 transition-all"
                >
                    <img src="/assets/img/icons/shield.webp" alt="Escudo" class="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-125" />
                    <div class="flex flex-col flex-1 text-left">
                        <span class="text-white">Comprar escudo</span>
                        <span class="text-crt-green text-sm">{planet.shieldPrice || 10} CR</span>
                    </div>
                </button>
            {/if}

            {#each Object.entries(planet.prices) as [type, price]}
                <button
                        on:click={() => gameStore.buyCargo(type)}
                        class="group flex items-center gap-3 bg-nebula-black border border-cosmic-purple/50 p-3 font-doto cursor-crosshair hover:bg-neon-cyan/10 transition-all"
                >
                    <img src={`/assets/img/icons/${type}.webp`} alt={type} class="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-125" />
                    <div class="flex flex-col flex-1 text-left">
                        <span class="text-white">{cargoNames[type]}</span>
                        <span class="text-crt-green text-sm">{price} CR</span>
                    </div>
                </button>
            {/each}


            <button
                    on:click={() => gameStore.leavePlanet()}
                    class="group flex items-center gap-3 bg-nebula-black border border-cosmic-purple/50 p-3 font-doto cursor-crosshair hover:bg-neon-cyan/10 transition-all"
            >
                <img src="/assets/img/icons/go-up.webp" alt="Escudo" class="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-125" />
                <div class="flex flex-col flex-1 text-left">
                    <span class="text-white">Abandonar Planeta</span>
                    <span class="text-crt-green text-sm">GRATIS</span>
                </div>
            </button>
        </div>



    </div>
</div>
