export async function POST({ locals }) {
    const { userId } = locals.auth();

    if (!userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    const user = await locals.currentUser();
    const username = user.username;

    if (!username) {
        return new Response('Unauthorized', { status: 401 });
    }

    return new Response('Success', { status: 201 });
/*
    const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL;

    if (!STRAPI_API_URL) {
        console.error('❌ STRAPI_API_URL no está definida. Verifica tu .env');
        return new Response('Server Misconfiguration', { status: 500 });
    }

    try {
        const res = await fetch(`${STRAPI_API_URL}/player-stats?[username]=${username}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            const text = await res.text();
            console.error(`❌ Error al buscar en Strapi: ${res.status} - ${text}`);
            return new Response('Error consultando Strapi', { status: res.status });
        }

        const data = await res.json();
        const record = data?.[0];
        if (record) {
            const statId = record.id;
            const currentWins = record.wins || 0;

            const updateRes = await fetch(`${STRAPI_API_URL}/player-stats/${statId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    wins: currentWins + 1
                }),
            });

            if (!updateRes.ok) {
                const text = await updateRes.text();
                console.error(`❌ Error actualizando en Strapi: ${updateRes.status} - ${text}`);
                return new Response('Error actualizando Strapi', { status: updateRes.status });
            }

            const updated = await updateRes.json();
            return new Response(JSON.stringify(updated), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            const createRes = await fetch(`${STRAPI_API_URL}/player-stats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    wins: 1,
                }),
            });

            if (!createRes.ok) {
                const text = await createRes.text();
                console.error(`❌ Error creando en Strapi: ${createRes.status} - ${text}`);
                return new Response('Error creando en Strapi', { status: createRes.status });
            }

            const created = await createRes.json();
            return new Response(JSON.stringify(created), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (err) {
        console.error('❌ Error general en POST /api/increase-victory:', err);
        return new Response('Server Error', { status: 500 });
    }*/
}
