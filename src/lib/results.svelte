<script lang="ts">
    import {query} from "../store"
	import CarComponent from "./carComponent.svelte";
    
</script>

<div class='grid grid-cols-3 gap-4 px-4 py-8'>
    {#if ($query !== null && $query !== undefined)}
        {#each $query as car (car.id) }
            <CarComponent car={car}/>
        {/each}
    {/if}
  </div>