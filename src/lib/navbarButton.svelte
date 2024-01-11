<script lang='ts'>
	import type { Button } from "../../types";

    export let content: Button;
    let element: HTMLDivElement | null = null;
    function onHover() { 
        element?.classList.add("hover")
    }

    function offHover() { 
        element?.classList.remove('hover')
    }
</script>

<button on:click={() => window.location.href = content.slug} on:mouseenter={onHover} on:mouseleave={offHover} class="relative text-white">
    <p class="text-lg font-bold">{content.title}</p>
    <div class="h-[2px] bg-white absolute left-1/2 -translate-x-1/2 navbarButton" bind:this={element}/>
</button>