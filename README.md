# 🌌 Starship Chronicle

> Una odisea retrofuturista de estrategia, comercio y supervivencia estelar.

[🎮 Jugar ahora](https://starshipchronicles.com) · [📄 Tutorial](https://starshipchronicles.com/tutorial) · [🧪 Probar demo](https://starshipchronicles.com/demo)

---

## ✨ Descripción

**Starship Chronicle** es un juego web inspirado en el microjuego de cartas _New Frontier (2020)_, transformado en una experiencia digital narrativa. El jugador comanda una nave estelar a través de una galaxia generada proceduralmente, completando misiones, comerciando entre planetas, y tomando decisiones tácticas mientras compite contra un rival galáctico: **el Renegado**.

Este proyecto fue desarrollado como parte de la [Hackathon de Midudev + Clerk (2025)](https://github.com/midudev/hackaton-clerk-2025/issues), combinando autenticación, SSR y una estética retro inmersiva.

---

## 🚀 Características principales

- ✅ Generación procedural de planetas.
- ✅ Exploración basada en combustible disponible.
- ✅ Eventos narrativos aleatorios (combates, peligros, recompensas).
- ✅ Sistema de comercio con precios dinámicos.
- ✅ Misiones variadas: entregas, contrabando y rescates.
- ✅ Reputación y progreso: fama, créditos, escudos y recompensas.
- ✅ Log narrativo que registra todas tus decisiones.
- ✅ **Ranking de jugadores** con victorias/derrotas (requiere login).
- ✅ Modo demo para probar antes de registrarse.

---

## 🖥️ Stack técnico

- **Frontend:** Svelte + Tailwind CSS
- **Fullstack/SSR:** Astro
- **Auth:** [Clerk](https://clerk.dev)
- **Backend externo:** Strapi (para estadísticas de jugadores)
- **Estética:** CRT, fuente retro, UI minimalista terminal-style

---

## 📦 Instalación local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/dvillodres/starshipchronicles
   cd starshipchronicles
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env`:

   ```env
   PUBLIC_SITE_URL=http://localhost:4321
   VITE_CLERK_PUBLISHABLE_KEY=tu_clave
   VITE_STRAPI_API_URL=https://mi-api-strapi.com
   ```

4. Inicia el proyecto:

   ```bash
   npm run dev
   ```

---

## 🔐 Clerk

El juego requiere login para la versión completa. Clerk se usa para:

- Acceder al modo completo tras autenticación.
- Registrar partidas ganadas/perdidas.
- Proteger rutas y llamadas a la API interna.

[Configura Clerk en Astro →](https://clerk.com/docs/quickstarts/astro)

---

## 📊 Ranking de jugadores

Las estadísticas de jugadores (victorias y derrotas) se almacenan en un backend de Strapi. Para consultar el ranking, ve a:

> [https://starshipchronicles.com/ranking](https://starshipchronicles.com/ranking)

---

## 📸 Capturas

![Captura 1](https://github.com/user-attachments/assets/f9a2289c-8013-4fe8-a798-9836a877e98f)
![Captura 2](https://github.com/user-attachments/assets/607d407c-c000-4945-8336-1e83b402498d)
![Captura 3](https://github.com/user-attachments/assets/cbf1afc4-6092-49d0-959f-12d5746327f3)

---

## 👨‍🚀 Autor

Desarrollado por [Daniel Villodres](https://d-v.es)  
💬 Contacto en [@dvillodres_](https://x.com/dvillodres_)

---

Inspirado en el juego de cartas _New Frontier (2020)_ creado por Matthew Dunstan.
