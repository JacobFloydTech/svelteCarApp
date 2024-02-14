<script lang="ts">
    import { data, query, ip } from '../store';
    import Filters from "./filters.svelte";
	import Categories from "$lib/categories.svelte";
    function changeState(e:Event) { 
        e.preventDefault();
        if (!e.target) { return}
        const target = e.target as HTMLInputElement;
        data.update((state) => ({...state, query: `&q=${target.value}`}))   
    }

    async function searchDatabase() { 
        query.set("loading")
        const response = await fetch(`${$ip}/search`, { method: "POST", headers: { 
            "Content-Type": "application/json",
        }, body: JSON.stringify($data)})
        const results = await response.json();
        
        query.set(results)
    }
</script>

<div class="flex md:w-3/4 xl:w-1/2 w-[90%]  mx-auto flex-col  space-y-8">
    <Categories/>
    <Filters/>
    <div class="w-full pr-2 md:pr-0 rounded-full mx-auto bg-white flex h-12 overflow-hidden ">

        <input on:input={(e) =>  changeState(e)} class="w-[90%] h-full pl-4 outline-none text-xl" placeholder="Search here.."/>
        <button on:click={searchDatabase} class="w-[10%] h-full flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
</div>