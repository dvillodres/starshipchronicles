<script>
    export let hull = 0; // nivel actual del Renegado (0–6)
    export let maxHull = 0; // nivel actual del Renegado (0–6)
    export let shield; // nivel actual del Renegado (0–6)
</script>

<div class="relative bg-nebula-black border border-crt-green p-3 font-doto text-white flex items-center gap-4  h-32">
    <!-- Icono del Renegado -->
    <img src={`/assets/img/icons/ship-${hull}.webp`} alt="hull" class="w-24 h-24 object-contain" />

    <div class="flex-1">
        <p class="text-crt-green text-xs mb-1 tracking-widest">INTEGRIDAD <span class="text-crt-green font-bold">{hull}/{maxHull}</span></p>
        <small class="flex items-center gap-2">
            <img src='/assets/img/icons/shield.webp' class="w-6 h-6 object-contain opacity-80" /> Escudo [ {shield} ]
        </small>


    </div>

</div>
