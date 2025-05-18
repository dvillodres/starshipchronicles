<script>
    import {gameStore} from '../../stores/gameStore.js';

</script>

<div class="fixed inset-0 z-50 bg-black">
    <!-- Imagen de fondo -->
    <div class="absolute inset-0">
        <img
                src="/assets/img/bg.webp"
                alt="Victoria"
                class="w-full h-full object-cover opacity-70"
        />
    </div>

    <!-- Contenido centrado -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white font-doto px-4">
        <h1 class="text-3xl md:text-5xl font-retro text-crt-green mb-4">¡Enhorabuena, has ganado!
        </h1>
        <p class="text-sm md:text-base text-white/80 mb-6">
            Has alcanzado el máximo nivel de fama y te has convertido en una leyenda galáctica.
        </p>

        <button
                on:click={() => {gameStore.reset()}}
                class="cursor-crosshair px-4 py-2 bg-crt-green text-black text-sm font-bold border border-crt-green hover:bg-transparent hover:text-crt-green transition"
        >
            Reiniciar partida
        </button>
    </div>
</div>
