<script lang="ts">
    import SearchButton from "$lib/SearchButton.svelte";
	import Filters from "$lib/filters.svelte";
    import Header from "$lib/header.svelte";
	import Results from "$lib/results.svelte";
   

</script>

<div class="flex flex-col">
    <Header/>
    <SearchButton />

    <Results/>
</div>