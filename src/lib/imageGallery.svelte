<script lang='ts'>
	import { onDestroy, onMount } from "svelte";
    import type { Gallery } from "../../types";
	import { getHemmingsCookie } from "./firebaseConfig";

	import ArrowLeft from "$lib/svg/arrowLeft.svelte";
	import ArrowRight from "$lib/svg/arrowRight.svelte";
	import { ip } from "../store";
    export let linkComponent: string;


    let data: Gallery[] | null = null;
    let currentGallery: Gallery = {images: [], title: ""}
    let imageGallery: HTMLDivElement;
    let currentImageIndex = 0;
    onMount(() => { 
        document.addEventListener('scroll', handleScroll, false)
        window.addEventListener('resize', fetchImages, false);
        fetchImages();
    })
    const handleScroll = () => { 
        if (window.scrollY > 200) { 
                imageGallery.classList.add('scaleDownImageGallery')
            } else { 
                imageGallery.classList.remove('scaleDownImageGallery')
            }   
    }


    const scrollToImage = () => { 
        const el = document.getElementById(currentImageIndex + '');
        if (!el || !currentGallery) { return}
        const screenWidth = imageGallery.clientWidth;
        const newHeight = (currentGallery.images[currentImageIndex].h/currentGallery.images[currentImageIndex].w)*screenWidth;
        console.log(newHeight);
        imageGallery.scrollTo({left: el.offsetLeft, behavior: "smooth"})
        Array.from(imageGallery.children).forEach((e) => (e as HTMLElement).style.width = `${screenWidth}px`)

   
    }
    const getTitle = (title: string) => { return title.slice(0,1)+title.slice(1).toLowerCase() }
    async function fetchImages() { 
        const cookie = await getHemmingsCookie();
        if (!cookie) { return null}
        const response = await fetch($ip, {method: "POST", headers:{  
            'Content-Type': 'application/json',
        },
         body: JSON.stringify({linkComponent})});
        const repsonseData = await response.json();
   
        data = repsonseData;
        if (data) {
            currentGallery = data[0];
        }
        const el = document.getElementById('imageGallery');
        if (!el || !data) { return}
        const screenWidth = el.clientWidth;
        const aspectRatio = data[0].images[currentImageIndex].w / data[0].images[currentImageIndex].h;
        const newHeight = (screenWidth / data[0].images[currentImageIndex].w) * data[0].images[currentImageIndex].h;
        const newWidth = newHeight * aspectRatio;

        el.style.width = `${newWidth}px`;
        el.style.height = `${newHeight}px`;
    }

</script>

<div class="flex flex-col space-y-4 w-full ">
    <div class="sticky top-20">
    <div class="text-white grid grid-cols-2 md:auto-cols-max md:grid-flow-col md:space-x-8 items-center w-full justify-center ">
        {#if data}
            {#each data as gallery, index }
                <button class={'transition-all duration-150 md:py-4 py-2 ' + (currentGallery?.title == gallery.title ? " scale-105 -translate-y-1" : "scale-100 -translate-y-0") + (data.length > 4 ? "text-xs md:text-base" : "text-sm md:text-xl")} on:click={() => { if (data) { currentGallery = data[index]; currentImageIndex = 0} }}>{getTitle(gallery.title)}</button>            
            {/each}
        {/if}
    </div>
    <div  class="relative overflow-hidden">
        <div id='imageGallery' bind:this={imageGallery} class={"flex overflow-x-scroll imageGallery  "}>
                {#each currentGallery.images as image, i }
                    <img class="object-cover w-full h-full"  id={i+ ''} alt={`currentGallery${i}`} src={image.src}/>
                {/each}
     
        </div>
        {#if currentGallery.images.length > 0}
        <div class="text-white text-3xl h-full w-full top-0 left-0 absolute">
            <button class={'scale-75 md:scale-100 absolute top-1/2 -translate-y-1/2 left-6 border-4 rounded-full border-black backdrop-blur-sm bg-gray-200 bg-opacity-10 ' + (currentImageIndex == 0 ? 'hidden' : '')} on:click={() => {currentImageIndex--; scrollToImage()}} > <ArrowLeft color='black'/> </button>
            <button class={'scale-75 md:scale-100 absolute top-1/2 -translate-y-1/2 right-6 border-4 rounded-full border-black backdrop-blur-sm bg-gray-200 bg-opacity-10 ' + (currentImageIndex == currentGallery.images.length-1 ? 'hidden' : '')} on:click={() => { {currentImageIndex++; scrollToImage()}}}><ArrowRight color='black'/></button>
        </div>
        {/if}
    </div>
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

