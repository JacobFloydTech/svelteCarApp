<script lang="ts">
    export let data: Car;
	import CarComponent from '$lib/carComponent.svelte';
	import CarContent from '$lib/carContent.svelte';
	import Comments from '$lib/comments.svelte';
    import ImageGallery from '$lib/imageGallery.svelte';
	import type { Car } from '../../../types';
    const linkComponent = data.url.split('/').pop()!
</script>

<div class="px-4">
    <div class="grid grid-cols-2 gap-4 ">
        <ImageGallery {linkComponent}/>
        <CarContent {data}/>
    </div>
    <Comments {linkComponent}/>
</div>