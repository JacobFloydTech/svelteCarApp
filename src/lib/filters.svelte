<script lang="ts">
    import data from '$lib/makes.json';
	import { onMount } from 'svelte';
	import type { Filter } from '../../types';

	import { query } from '../store';


    type Company = { 
        id: number,
        name: string
    }
    let filter: Filter = {min_price: null, max_price: null, max_year: null, min_year: null, make_id: []};
    let makes = data.map((e) => {return {id: e.id, name: e.name}})
    let currentSearches: Company[]  = [];
    let currentSelectedCompanies: string[] = [];

    function handleChange(e: Event) { 
        currentSearches = [];
        if (e.target instanceof HTMLInputElement) {
            const search = e.target.value.toLowerCase();
            if (search.trim() == '') { return currentSearches = []}
            currentSearches = makes.filter((e) => e.name.toLowerCase().includes(search));
            
        }
    }

    async function setQuery(filter: Filter) { 
        const res = await fetch('http://localhost:3000/filterSearch', { 
            method: "POST",
            body: JSON.stringify({filter}),
            headers :{ 'Content-Type': "application/json"}
        })
        const {results} = await res.json()
        console.log(results);
        query.set(results);
    }

    function handleCheckChange(id: string) { 
        const element = document.getElementById(id) as HTMLInputElement;
        if (!element) return
        if (element.checked) { 
            currentSelectedCompanies.push(id)
        } else { 
            for (var i = 0 ;i< currentSelectedCompanies.length; i++) { 
                if (currentSelectedCompanies[i] == id) { 
                    currentSelectedCompanies.splice(i, 1);
                }
            }
        }
        filter.make_id = currentSelectedCompanies;

    }

    function handleNumberChange(e: Event, variable: string) { 
        if (e.target instanceof HTMLInputElement) { 
            switch(variable) { 
                case 'min_year':
                    filter.min_year = e.target.value
                    break
                case 'max_year':
                    filter.max_year = e.target.value
                    break
                case 'min_price':
                    filter.min_price = e.target.value
                    break;
                case 'max_price':
                    filter.max_price = e.target.value
                    break;
                default:
                    break;
            }
        }

    }
    onMount(() => { 
        document.addEventListener('keydown', ({code}) => { 
            if (code == 'Enter') {
                setQuery(filter)
            } 
        })
    })
</script>

<div class="flex relative h-16 items-center w-full rounded-full  mx-auto bg-gray-700 mt-4">
    <div class="h-full w-[20%] 2xl:w-[24%] border-black border-2 relative  ">
        <div class="absolute translate-y-[25%] h-full w-full left-6">
            <input on:input={handleChange} class="rounded-xl p-1 px-2 " placeholder="Company here"/>
            {#if currentSearches}
            <div class="flex flex-col max-h-48 overflow-y-scroll">
                {#each currentSearches as c,i}
                    <div class="bg-white text-black px-4 py-2 flex space-x-2">
                        <input id={c.id + ''} on:input={() => handleCheckChange(c.id+ '')} type="checkbox"/>
 
                        <p>{c.name}</p>
                    </div>
            
                {/each}
            </div>
            {/if}
     
        </div>
    </div>
    <div class="flex  justify-around  w-3/4 m-4 float-right ">
        <input on:input={(e) => handleNumberChange(e, "min_year")} class="2xl:w-36 w-24 rounded-xl p-1 px-2" type="number" placeholder="Min Year" />
        <input on:input={(e) => handleNumberChange(e, "max_year")} class="2xl:w-36 w-24 rounded-xl p-1 px-2" type="number" placeholder="Max Year" />
        <input on:input={(e) => handleNumberChange(e, "min_price")} class="2xl:w-36 w-24 rounded-xl p-1 px-2" type="number" placeholder="Min Price" />
        <input on:input={(e) => handleNumberChange(e, "max_price")} class="2xl:w-36 w-24 rounded-xl p-1 px-2" type="number" placeholder="Max Price" />
    </div>
    


</div>