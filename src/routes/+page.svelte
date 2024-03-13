<script lang="ts">
    import SearchButton from "$lib/SearchButton.svelte";
    import Header from "$lib/header.svelte";
	import Results from "$lib/results.svelte";
    
</script>

<div class="flex flex-col">
    <Header/>
    <SearchButton />
    <div class="relative">
        <Results/>
    </div>
</div>