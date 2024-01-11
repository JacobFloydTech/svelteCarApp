<script lang="ts">
    import { search, query } from "../store";
    import { getHemmingsCookie, getLink } from '$lib/firebaseConfig';
    import Filters from "./filters.svelte";
	import Categories from "$lib/categories.svelte";
    //@ts-ignore
    function changeState(e) { 
        e.preventDefault();
        if (!e.target) { return}
        search.set(e.target.value);
    }

    async function searchDatabase() { 
        const cookie = await getHemmingsCookie();
        if (!cookie) { return }
        let input = $search
        const response = await fetch(getLink(input.replace(" ", "+")), { 
            headers: { 
                "cookie": cookie
            }
        })

        const { results } = await response.json();
    
        query.set(results)
        
    }
</script>

<div class="flex w-1/2 flex-col mx-auto space-y-8">
    <Categories/>
    <Filters/>
    <div class="w-full rounded-full mx-auto bg-white flex h-12 overflow-hidden">

        <input on:input={(e) =>  changeState(e)} class="w-[90%] h-full pl-4 outline-none text-xl" placeholder="Search here.."/>
        <button on:click={searchDatabase} class="w-[10%] h-full flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
</div>