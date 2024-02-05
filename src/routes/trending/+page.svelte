<script lang='ts'>

	import { onMount } from 'svelte';
    import type {Car} from '../../../types';
	import ArrowLeft from '$lib/svg/arrowLeft.svelte';
	import ArrowRight from '$lib/svg/arrowRight.svelte';
    import Results from '$lib/results.svelte';
    import {blurCars, query, ip} from '../../store';
	import LoadingComponent from '$lib/loadingComponent.svelte';
    
    
    let page = 1;

    async function getRecommended() { 

        const response = await fetch(`${ip}getRecommended`, { 
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({page})
        });
        let {results} = await response.json();
        results = results.filter((x: Car) => x.thumbnail !== null);
        query.set(results)
        blurCars.set(false)

    }
    onMount(() =>{ 
        const item = sessionStorage.getItem('page')
        !item ? sessionStorage.setItem('page', '1') :  page = parseFloat(item);
        getRecommended()
    });
</script>



<div>
    <div class="w-full h-[300px] 2xl:h-[400px] overflow-hidden relative">
        <img src="./190e.webp" class="object-cover h-full w-full blurBackground " style="object-position: 0% 75%;" alt="Trending Background"/>
        <div class="absolute top-0 left-0 w-full text-white h-full flex flex-col justify-center items-center space-y-12">
            <h1 class="text-5xl font-bold ">Trending</h1>
            <p class="text-2xl">See the hottest cars on the market</p>
        </div>

    </div>
    {#if $query}
        <Results/>
        <div class="flex w-full items-center justify-center pb-4">
            <button class={page == 1 ? "invisible " :  'block'} on:click={() => {page--;getRecommended(); blurCars.set(true) }}>
                <ArrowLeft color="white"/>
            </button>
            <p class="text-4xl font-bold text-white">{page}</p>
            <button on:click={() => {page++;getRecommended(); blurCars.set(true) }}>
                <ArrowRight color="white"/>
            </button>
        </div>        
    {:else}
        <LoadingComponent/>
    {/if}


</div>