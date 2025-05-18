<script>
    export let fame = 0; // nivel actual del Renegado (0–6)
</script>

<div class="relative bg-nebula-black border border-red-800 p-3 font-doto text-white flex items-center gap-4 h-32">
    <!-- Icono del Renegado -->
    <img src={`/assets/img/icons/renegade${fame < 4 ? '-1' : ''}.webp`} alt="Renegado" class="w-24 h-24 object-contain" />

    <div class="flex-1">
        <p class="text-red-500 text-sm mb-1 tracking-widest">RENEGADO</p>
        <div class="flex items-center gap-2 text-base">
            <span class="text-white">Fama:</span>
            <span class="text-red-400 font-bold">{fame}/6</span>
        </div>
    </div>
</div>
