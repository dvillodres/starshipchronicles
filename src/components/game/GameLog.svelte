<script>
    export let log;
    export let phase;
</script>

<div class="bg-deep-space/90 border overflow-hidden border-crt-green p-4 h-full">
    <span class="text-crt-green font-doto text-sm">{`<Log\\>`}</span>

    <div class="log overflow-y-auto h-full  p-3 font-doto text-sm">

        {#each log as entry (entry.id)}
            <div class="py-1 border-b border-crt-green/20 last:border-0">
                <span class="text-crt-green">> </span>{entry.text}
            </div>
        {/each}
    </div>
</div>
