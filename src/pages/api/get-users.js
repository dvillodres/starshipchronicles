export async function GET({ url, locals }) {
    const { userId } = locals.auth();

    if (!userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL;

    if (!STRAPI_API_URL) {
        console.error('❌ STRAPI_API_URL no está definida. Verifica tu .env');
        return new Response('Server Misconfiguration', { status: 500 });
    }

    const page = Number(url.searchParams.get('page')) || 1;
    const limit = 10;
    const start = (page - 1) * limit;

    const sortField = url.searchParams.get('sort');
    const validSorts = ['wins', 'losses'];
    const sortParam = validSorts.includes(sortField) ? `${sortField}:DESC` : 'wins:DESC'; // default: más victorias

    try {
        const res = await fetch(
            `${STRAPI_API_URL}/player-stats?_start=${start}&_limit=${limit}&_sort=${sortParam}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!res.ok) {
            const text = await res.text();
            console.error(`❌ Error consultando usuarios en Strapi: ${res.status} - ${text}`);
            return new Response('Error consultando Strapi', { status: res.status });
        }

        const data = await res.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('❌ Error general en GET /api/player-stats:', err);
        return new Response('Server Error', { status: 500 });
    }
}
