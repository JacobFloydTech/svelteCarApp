<script lang="ts">
    import data from '$lib/makes.json';

	import { query } from '../store';


    type Company = { 
        id: number,
        name: string
    }
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

    async function setQuery(companyIDs: string[]) { 
        const res = await fetch('http://localhost:3000/getCategory', { 
            method: "POST",
            body: JSON.stringify({ids: companyIDs}),
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
        setQuery(currentSelectedCompanies)
    }
</script>

<div class="flex relative h-16 items-center w-full rounded-full  mx-auto bg-gray-700 mt-4">
    <div class="h-full w-[20%] 2xl:w-[24%]  ">
        <div class="absolute translate-y-[25%] h-full left-6">
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
        <input class="2xl:w-36 w-24 rounded-xl p-1 px-2" type="number" placeholder="Min Year" />
        <input class="2xl:w-36 w-24 rounded-xl p-1 px-2" type="number" placeholder="Max Year" />
        <input class="2xl:w-36 w-24 rounded-xl p-1 px-2" type="number" placeholder="Min Price" />
        <input class="2xl:w-36 w-24 rounded-xl p-1 px-2" type="number" placeholder="Max Price" />
    </div>
    


</div>