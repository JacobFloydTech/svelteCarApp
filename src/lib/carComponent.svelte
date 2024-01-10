<script lang="ts">
    import type { Car } from "../../types";
    export let car: Car;
    let imageElement: HTMLImageElement;
    function generateLink(id: number, link: string) { 
        let arr = link.split('/').pop()!.split('-');
        arr.pop();
        return  arr.join('-') + `-${id}`
    }
</script>

<a   href={generateLink(car.id, car.url)} on:mouseleave={() => {imageElement.classList.remove('hover')}}  on:mouseenter={() => {imageElement.classList.add('hover')} } class='w-full h-full rounded-xl border-2 border-black overflow-hidden relative '>
    <img bind:this={imageElement} class="baseImage" alt="thumbnail" src={car.thumbnail.xl['16:9']}/>
    <div class="absolute space-y-2 bg-gradient-to-b from-transparent to-black from-40% top-0 text-white left-0 w-full h-full flex flex-col justify-end p-4">
        <h1 class="font-bold text-3xl">{car.title}</h1>
        <p class="text-xl">{car.current_bid ?? car.current_price} - <span class="italic">{car.location}</span></p>
    </div>
</a>