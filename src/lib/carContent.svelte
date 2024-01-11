<script lang='ts'>
	import { onMount } from "svelte";
	import type { Car } from "../../types";
    export let data: Car;

    let description: String[] = [];
    async function getDescription(url: string, id: number) { 
 
        const response = await fetch('http://localhost:3000/getDescription', { 
            method: "POST",
            body: JSON.stringify({url, id}),
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        description = data;
    }
    onMount(() => getDescription(data.url, data.id))
</script>

<div class="flex flex-col text-white text-xl space-y-2">
    <img alt="Car Thumbnail" class="h-96 object-cover" src={data.thumbnail.xl["16:9"]}/>

    <div class="flex flex-col space-y-2 px-12">
        <h1>{data.long_title}</h1>
        <div class="grid grid-cols-2">
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
        <div class="flex flex-col space-y-8 text-lg py-4">
            {#each description as des }
                <p>{des}</p>
            {/each}
        </div>
    </div>
</div>