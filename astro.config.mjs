// @ts-check
import { defineConfig } from 'astro/config';
import clerk from "@clerk/astro";
import tailwindcss from '@tailwindcss/vite';
import { dark } from '@clerk/themes'

import svelte from '@astrojs/svelte';
import { esES } from '@clerk/localizations'

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [svelte(), clerk({
    localization: esES,
    appearance: {
      baseTheme: dark,
    },
  })],

  adapter: vercel(),
  output: "server",
});
