import { getHemmingsCookie } from '$lib/firebaseConfig';
import type { PageServerLoad } from './$types';
import type { Car } from '../../../types';

export const load = (async ({params: { link}}: {params: { link: string}}) => {
    
    const id: number = parseFloat(link.split('-').pop()!);
    const year: string = link.split('-')[0];
    const page = 1;
    const cookie = await getHemmingsCookie();
    const carData = await searchAPIbyID(id, year, page, cookie);
    return carData

 
}) satisfies PageServerLoad;

async function searchAPIbyID(id: number, year: string, page: number, cookie: string) { 


    if (!cookie ) { return};
    let carData: Car| null = null;

    while (carData == null && page <= 1000) { 
        const link = getLink(id, year, page);
        let results = await search(link, cookie);
        if (!results || results.length == 0) { page = 10000}
        results = results.filter((x: Car) => x.id == id);
        if (results[0]) { 
            carData = results[0]
        } else { 
            page++;
            return await searchAPIbyID(id, year, page, cookie); 
        }

    }
    return carData;
    
}

async function search(link: string,  cookie: string) { 
    const response = await fetch(link, { headers: { cookie: cookie}})
    const {results} = await response.json();
    return results;
}

const getLink = (id: number, year: string, page: number) => { 
    return `https://www.hemmings.com/stories-api/search/listings?adtype=cars-for-sale&page=${page}&sort_by=recommended&min_year=${year}&max_year=${year}`
}