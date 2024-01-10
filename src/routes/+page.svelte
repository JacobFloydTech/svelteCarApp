<script lang="ts">
    import SearchButton from "$lib/SearchButton.svelte";
    import Header from "$lib/header.svelte";
   
    import { query } from "../store";
</script>

<div class="flex flex-col">
    <Header/>
    <SearchButton />
    <p class="text-white text-4xl">{$query}</p>
</div>