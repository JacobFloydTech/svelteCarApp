<script lang="ts">
    import {query} from "../store"
	import CarComponent from "./carComponent.svelte";
	import LoadingComponent from "./loadingComponent.svelte";
    
</script>

<div class='grid md:grid-cols-2 xl:grid-cols-3 gap-4 px-4 py-8 -z-10'>
    {#if ($query !== null && $query !== undefined && $query != "loading")}
        {#each $query as car (car.id) }
            <CarComponent car={car}/>
        {/each}
    {/if}
    {#if $query == 'loading'}
        <LoadingComponent/>
    {/if}
  </div>