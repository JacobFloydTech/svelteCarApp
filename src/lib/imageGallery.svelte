<script lang='ts'>
	import { onMount } from "svelte";
    import type { Gallery } from "../../types";
	import { getHemmingsCookie } from "./firebaseConfig";
    import arrowLeft from '$lib/svg/arrowLeft.svelte'
    import arrowRight from '$lib/svg/arrowRight.svelte'
	import ArrowLeft from "$lib/svg/arrowLeft.svelte";
	import ArrowRight from "$lib/svg/arrowRight.svelte";
    export let linkComponent: string;


    let data: Gallery[] | null = null;
    let currentGallery: Gallery | null = null;
    let imageGallery: HTMLDivElement;
    let currentImageIndex = 0;
    onMount(() => { 
        document.addEventListener('scroll', () => { 
            if (window.scrollY > 200) { 
                imageGallery.classList.add('scaleDownImageGallery')
            } else { 
                imageGallery.classList.remove('scaleDownImageGallery')
            }
        })
    })



    const scrollToImage = () => { 
        const el = document.getElementById(currentImageIndex + '');
        console.log(el);
        if (!el) { return}
        el.scrollIntoView({behavior: "smooth"})
    }
    const getTitle = (title: string) => { return title.slice(0,1)+title.slice(1).toLowerCase() }
    async function fetchImages() { 
        const cookie = await getHemmingsCookie();
        if (!cookie) { return null}
        const response = await fetch('http://localhost:3000', {method: "POST", headers:{  
            'Content-Type': 'application/json',
        },
         body: JSON.stringify({linkComponent})});
        const repsonseData = await response.json();
   
        data = repsonseData;
        if (data) currentGallery = data[0]

    }
    fetchImages()

</script>

<div class="flex flex-col space-y-4 ">
    <div class="sticky top-20">
    <div class="text-white flex space-x-8 items-center w-full justify-center ">
    {#if data}
        {#each data as gallery, index }
            <button class={'transition-all duration-150 py-4 ' + (currentGallery?.title == gallery.title ? " scale-105 -translate-y-1" : "scale-100 -translate-y-0")} on:click={() => { if (data) { currentGallery = data[index]; currentImageIndex = 0} }}>{getTitle(gallery.title)}</button>            
        {/each}
    {/if}
    </div>
    {#if currentGallery}
    <div class="relative">
        <div bind:this={imageGallery} class="flex overflow-x-scroll imageGallery">
                {#each currentGallery.images as image, i }
                    <img id={i+ ''} alt={`currentGallery${i}`} src={image.src}/>
                {/each}
     
        </div>
        <div class="text-white text-3xl h-full w-full top-0 left-0 absolute">
            <button class={'absolute top-1/2 -translate-y-1/2 left-6 border-4 rounded-full border-black backdrop-blur-sm bg-gray-200 bg-opacity-10 ' + (currentImageIndex == 0 ? 'hidden' : '')} on:click={() => {currentImageIndex--; scrollToImage()}} > <ArrowLeft/> </button>
            <button class={'absolute top-1/2 -translate-y-1/2 right-6 border-4 rounded-full border-black backdrop-blur-sm bg-gray-200 bg-opacity-10 ' + (currentImageIndex == currentGallery.images.length-1 ? 'hidden' : '')} on:click={() => { {currentImageIndex++; scrollToImage()}}}><ArrowRight/></button>
        </div>
    </div>
    {/if}
    <div class="flex flex-wrap items-center justify-center">
        {#if currentGallery}
            {#each currentGallery.images as _, index}
                <div>
                    <button on:click={() => {currentImageIndex = index; scrollToImage()}} class={"transition-all duration-150 h-8 w-8 rounded-full overflow-hidden m-2 " + (currentImageIndex == index ? " bg-red-500 scale-110" : " bg-red-800 scale-100")}></button>
                </div>
            {/each}
        {/if}
    </div>
    </div>
</div>

