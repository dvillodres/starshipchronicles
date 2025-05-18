<script>
    export let state;

        $: statusItems = [
        {
            label: 'FUEL',
            icon: '/assets/img/icons/fuel.webp',
            value: state.cargo.fuel
        },
        {
            label: 'FAMA',
            icon: '/assets/img/icons/fame.webp',
            value: state.fame
        },
        {
            label: 'CRÉDITOS',
            icon: '/assets/img/icons/credits.webp',
            value: state.credits
        },
        {
            label: 'REPUTACIÓN CRIMINAL',
            icon: '/assets/img/icons/bounty.webp',
            value: state.bounty
        }
        ];
</script>

<div class="bg-deep-space/80 border h-48 border-crt-green p-4 shadow-[0_0_15px_rgba(57,255,20,0.3)] font-doto">
    <h2 class="text-sm text-crt-green mb-4">{`<Estado General\\>`}</h2>

    <div class="grid grid-cols-2 gap-3">
        {#each statusItems as item}
            <div class="flex items-center gap-3 bg-nebula-black p-2 border border-crt-green/40 text-sm text-white">
                <img src={item.icon} alt={item.label} class="w-10 h-10 object-contain opacity-80" />
                <span class="flex-1">{item.label}:</span>
                <span class="text-crt-green">{item.value}</span>
            </div>
        {/each}
    </div>
</div>
