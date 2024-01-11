<script lang="ts">
  import NavbarButton from "$lib/navbarButton.svelte";
	import type { Button } from "../../types";
  import "../app.css";
  let buttons: Button[] = [{title:"Search", slug: "/"}, {title: "Trending", slug: "/trending"}, {title:"About Us", slug:"/about"}];
</script>


<div class="sticky top-0 left-0 w-full h-auto flex justify-between items-center bg-[#282828] px-4 z-50">
  <p class="p-2 text-xl font-bold text-[#770000]">MarketCars.com</p>
  <div class="flex space-x-4  items-center justify-center py-2">
    {#each buttons as content }
      <NavbarButton  content={content}/>
    {/each}
    <button class="border-2 rounded-full px-2 text-white font-bold text-xl py-2 hover:bg-white hover:text-black">Sign In</button>
  </div>
</div>
<div class="py-4"/>
<slot />