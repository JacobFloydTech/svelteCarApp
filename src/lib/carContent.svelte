<script lang='ts'>
	import { onMount } from "svelte";
	import type { Car } from "../../types";
	import { ip } from "../store";
    export let data: Car;
    
    let description: String = ''
    async function getDescription(url: string, id: number) { 
        
        const response = await fetch(`${$ip}/getDescription`, { 
            method: "POST",
            body: JSON.stringify({url, id}),
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        const {data} = await response.json();
        console.log(data);
        description = data;
    }
    onMount(() => {getDescription(data.url, data.id)})
</script>

<div class="flex flex-col text-white text-xl space-y-2">
    <img alt="Car Thumbnail" class="h-full object-cover hidden md:block" src={data.thumbnail.xl["3:2"]}/>

    <div class="flex flex-col space-y-2 px-4 md:px-12">
        <h1>{data.long_title}</h1>
        <div class="grid grid-cols-2 my-4">
            <div class="flex flex-col justify-between">
                {#if data.price}
                    <p>Starting price - {data.price}</p>
                {/if}
                {#if data.current_price}
                    <p>Current Price - {data.current_price}</p>
                {/if}
            </div>
            <div class="flex flex-col space-y-4 justify-between items-end">
                <p>Location - {data.location}</p>
                <p>Listing Date - {(new Date(data.start_date)).toDateString()}</p>
            </div>
        </div>
            <div class="text-base md:text-xl xl:text-2xl">            
                {#if description == ''}
                    <div class="w-full flex flex-col space-y-4 py-12 justify-center items-center">
                        <p class="text-[#981b1b] font-bold text-3xl">Loading description</p>
                        <svg class="loadingIcon" width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#981b1b" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                    </div>
                {:else}
                    {@html description}
                {/if}
            </div>


    </div>
</div>