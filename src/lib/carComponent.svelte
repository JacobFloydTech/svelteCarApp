<script lang="ts">
	import { onMount } from "svelte";
    import type { Car } from "../../types";
	import { blurCars } from "../store";
    export let car: Car;
    let loaded: boolean = false;
    let imageElement: HTMLImageElement;
    let element: HTMLElement;
    function generateLink(id: number, link: string) { 
        let arr = link.split('/').pop()!.split('-');
        arr.pop();
        return  arr.join('-') + `-${id}`
    }
    blurCars.subscribe((el) => { 
        if (el) {
            element?.classList.add('carComponentBlur');
          //  element?.classList.remove('carComponent')
        } else { 
            element?.classList.remove('carComponentBlur')
        }
    })
    onMount(() =>{console.log(car); element?.classList.remove('carComponentBlur')})
</script>

<a  bind:this={element} href={generateLink(car.id, car.url)} on:mouseleave={() => {imageElement.classList.remove('hover')}}  on:mouseenter={() => {imageElement.classList.add('hover')} } class={'w-full h-full rounded-xl border-2 border-black overflow-hidden relative z-0 carComponentBlur carComponent'}>
    <img on:load={() => loaded = true} bind:this={imageElement} class="baseImage" alt="thumbnail" src={Object.values(car.thumbnail.xl)[0]}/>
    {#if loaded}    
        <div class="absolute 2xl:space-y-2 bg-gradient-to-b from-transparent to-black from-40% top-0 text-white left-0 w-full h-full flex flex-col justify-end p-4">
            <h1 class="font-bold  text-2xl md:text-lg xl:text-2xl 2xl:text-3xl">{car.title}</h1>
            <p class="text-2xl sm:text-base md:text-lg 2xl:text-xl">{car.current_bid ?? car.current_price ?? car.price ?? "Inquire "} -  <span class="italic"> {car.location}</span></p>
        </div>
    {/if}
</a>