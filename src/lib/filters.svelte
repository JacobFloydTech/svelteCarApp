<script lang="ts">
    import makes from '$lib/makes.json';
	import { onMount } from 'svelte';
	import type { Link } from '../../types';

	import { query, data, ip} from '../store';


    type Company = { 
        id: number,
        name: string
    }
    let modifyMakes = makes.map((e) => {return {id: e.id, name: e.name}})
    let currentSearches: Company[]  = [];
    let currentSelectedCompanies: string[] = [];
    let dialog: HTMLDialogElement;

    function handleChange(e: Event) { 
        currentSearches = [];
        if (e.target instanceof HTMLInputElement) {
            const search = e.target.value.toLowerCase();
            if (search.trim() == '') { return currentSearches = []}
            currentSearches = modifyMakes.filter((e) => e.name.toLowerCase().includes(search));
            
        }
    }

    async function setQuery(link: Link) {      
        query.set("loading"); 
        const res = await fetch(`${$ip}/search`, { 
            method: "POST",
            body: JSON.stringify(link),
            headers :{ 'Content-Type': "application/json"}
        })
        query.set(await res.json())
    }

    function handleCheckChange(id: string) { 
        const element = document.getElementById(id) as HTMLInputElement;
        if (!element) return
        if (element.checked) { 
            currentSelectedCompanies = [...currentSelectedCompanies, id]
        } else { 
            currentSelectedCompanies = currentSelectedCompanies.filter((e) => e !== id);
        }

        let companies = '&make_id[]=' + currentSelectedCompanies.join('&make_id[]=')
        data.update((state) => ({...state, companies: companies}));
    }

    function handleNumberChange(e: Event, variable: string) { 

            const target = e.target as HTMLInputElement;
            switch(variable) { 
                case 'min_year':
                    data.update((state) => ({...state, min_year: `&min_year=${target.value}`}))
                    break
                case 'max_year':
                    data.update((state) => ({...state, max_year: `&max_year=${target.value}`}))
                    break
                case 'min_price':
                    data.update((state) => ({...state, min_price: `&min_price=${target.value}`}))
                    break;
                case 'max_price':
                    data.update((state) => ({...state, max_price: `&max_price=${target.value}`}))
                    break;
                default:
                    break;
            }
        

    }
    onMount(() => { 
        document.addEventListener('keydown', ({code}) => { 
            if (code == 'Enter') {
                dialog.open = false;
                setQuery($data);
            } 
        })
    })
</script>

<div class="flex relative items-center w-full md:rounded-full  mx-auto bg-gray-700 mt-4">
    <div class="grid grid-cols-2  grid-rows-3 gap-4 md:grid-rows-1 md:grid-cols-5 h-1/2 items-center justify-center w-full m-4 float-right ">
        <div class="relative z-50 w-full  h-full hidden md:block">
            <input on:input={handleChange} class="rounded-t-md h-full p-1 px-2 w-full" placeholder="Company name here"/>
                <dialog bind:this={dialog} class="w-full" open>
                    <div class="max-h-96 overflow-y-scroll">
                        {#each currentSearches as c,i}
                            <div class="flex w-full p-1 px-2 space-x-2 z-50">
                                <label class="items-center flex justify-center">
                                    <input class="hidden" id={`${c.id}`} on:input={() => {handleCheckChange(c.id + '')}} type="checkbox"/>
                                    <div class={`w-4 h-4 rounded-full  ${currentSelectedCompanies.includes(c.id + '') ? "bg-red-500" : "bg-gray-500"}`}></div>
                                </label>
                          
                          
                                <p class="py-1 text-sm">{c.name}</p>
                            </div>
                        {/each}
                    </div>
                </dialog>
        </div>
        <input on:input={(e) => handleNumberChange(e, "min_year")} class="border-2 rounded-t-md p-1 px-2" type="number" placeholder="Min Year" />
        <input on:input={(e) => handleNumberChange(e, "max_year")} class="border-2 rounded-t-md p-1 px-2" type="number" placeholder="Max Year" />
        <input on:input={(e) => handleNumberChange(e, "min_price")} class="border-2 rounded-t-md p-1 px-2" type="number" placeholder="Min Price" />
        <input on:input={(e) => handleNumberChange(e, "max_price")} class="border-2 rounded-t-md p-1 px-2" type="number" placeholder="Max Price" />
        <div class="relative  w-full  h-full col-span-2 md:hidden block">
            <input on:input={handleChange} class="rounded-t-md h-full p-1 px-2 w-full" placeholder="Company name here"/>
                <dialog class="w-full" open>
                    <div class="max-h-96 overflow-y-scroll">
                        {#each currentSearches as c,i}
                            <div class="flex w-full p-1 px-2 space-x-2 z-50">
                                <label class="items-center flex justify-center">
                                    <input class="hidden" id={`${c.id}`} on:input={() => {handleCheckChange(c.id + '')}} type="checkbox"/>
                                    <div class="w-4 h-4 bg-black rounded-full"></div>
                                </label>
                          
                          
                                <p class="py-1 text-sm">{c.name}</p>
                            </div>
                        {/each}
                    </div>
                </dialog>
        </div>
    </div>
    


</div>