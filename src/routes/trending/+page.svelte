<script lang='ts'>
    import CarComponent from '$lib/carComponent.svelte';
	import { onMount } from 'svelte';
    import type {Car} from '../../../types';
	import CarContent from '$lib/carContent.svelte';

    let data: Car[] = [];
    async function getRecommended() { 
        const response = await fetch('http://localhost:3000/getRecommended');
        const {results} = await response.json();
        data = results;

    }
    onMount(() => getRecommended());
</script>

<div>
    <div class="w-full h-[300px] 2xl:h-[400px] overflow-hidden relative">
        <img src="./190e.webp" class="object-cover h-full w-full blurBackground " style="object-position: 0% 75%;" alt="Trending Background"/>
        <div class="absolute top-0 left-0 w-full text-white h-full flex flex-col justify-center items-center space-y-12">
            <h1 class="text-5xl font-bold ">Trending</h1>
            <p class="text-2xl">See the hottest cars on the market</p>
        </div>

    </div>
    <div class="grid grid-cols-3 gap-4 p-4 pt-12">
    {#each data as car}
        <CarComponent {car}/>
    {/each}
    </div>
</div>