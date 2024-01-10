<script lang='ts'>
    export let content: string;
    let element: HTMLDivElement | null = null;
    function onHover() { 
        element?.classList.add("hover")
    }

    function offHover() { 
        element?.classList.remove('hover')
    }
</script>

<button on:mouseenter={onHover} on:mouseleave={offHover} class="relative text-white">
    <p class="text-lg font-bold">{content}</p>
    <div class="h-[2px] bg-white absolute left-1/2 -translate-x-1/2 navbarButton" bind:this={element}/>
</button>