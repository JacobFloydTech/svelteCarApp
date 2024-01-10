import { getHemmingsCookie, getLink } from '$lib/firebaseConfig';

export async function POST({request}: { request: Request}) {
    const { query } = await request.json();
    const cookie = await getHemmingsCookie();
    if (!cookie) { return }
    console.log(query);
    const response = await fetch(getLink(query.replace(" ", "+")), { 
        headers: { 
            "cookie": cookie
        }
    })

    const { results } = await response.json();
    return results;
}
