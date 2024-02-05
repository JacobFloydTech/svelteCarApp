<script lang="ts">
  import NavbarButton from "$lib/navbarButton.svelte";
	import type { Button } from "../../types";
  import "../app.css";
  let buttons: Button[] = [{title:"Search", slug: "/"}, {title: "Trending", slug: "/trending"}, {title:"About Us", slug:"/about"}];
</script>


<div class="sticky top-0 left-0 w-full h-auto flex justify-between items-center bg-[#282828] md:px-4 px-1 py-2 z-50">
  <a href="/" class="p-2 text-sm md:text-xl font-bold text-[#770000]">MarketCars.com</a>
  <div class="flex space-x-4  items-center justify-center py-2">
    {#each buttons as content }
      <NavbarButton  content={content}/>
    {/each}
  </div>
</div>
<div class="py-4"/>
<slot />