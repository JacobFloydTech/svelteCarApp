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
    onMount(() => getDescription(data.url, data.id))
</script>

<div class="flex flex-col text-white text-xl space-y-2">
    <img alt="Car Thumbnail" class="h-96 object-cover hidden md:block" src={data.thumbnail.xl["16:9"]}/>

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
                {@html description}
            </div>


    </div>
</div>