<script lang="ts">
	import { data, ip, query } from '../store';
	import ShowLess from './svg/showLess.svelte';
	import ShowMore from './svg/showMore.svelte';
	import type { Button, Link } from '../../types';

	let extend: boolean = false;

	const buttons: Button[] = [
		{ title: 'Exotics', slug: 'Exotics' },
		{ title: 'Classics', slug: 'Classics' },
		{ title: 'Muscle Cars', slug: 'Muscle-Cars' },
		{ title: 'Trucks', slug: 'Trucks' },
		{ title: 'Performance Cars', slug: 'Performance-Cars' },
		{ title: 'Restomods and Customs', slug: 'Restomods-Customs' },
		{ title: 'Motorcycles', slug: 'Motorcycles' },
		{ title: 'Military Vehicles', slug: 'Military' },
		{ title: 'RVs Trailers and Boats', slug: 'RVs-Trailers-Boats' },
		{ title: 'Replicas and Kits', slug: 'Replicas and Kits' },
		{ title: 'Other', slug: 'Other' },
		{ title: 'Sports Cars', slug: 'Sports Cars' },
		{ title: 'British', slug: 'British' },
		{ title: 'Japanese/JDM', slug: 'Japanese' },
		{ title: 'European', slug: 'European' },
		{ title: 'Race/Competition', slug: 'Race' },
		{ title: 'Convertibles', slug: 'Convertibles' },
		{ title: 'Late Model', slug: 'Late-Model' },
		{ title: 'Luxury Cars', slug: 'Luxury-Cars' },
		{ title: 'Wagons', slug: 'Wagons' },
		{ title: 'American', slug: 'American' },
		{ title: '4x4s', slug: '4x4s' },
		{ title: 'Electric', slug: 'Electric' },
		{ title: 'SUVs', slug: 'SUVs' }
	];

	async function setCategory(slug: string) {
		slug = `&category[]=${slug}`;
		data.update((state) => ({ ...state, category: slug }));
		let body = JSON.stringify($data);
		let link = `${$ip}/search`;
		console.log(body, link);
		const res = await fetch(`${$ip}/search`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: body
		});
		console.log(res);
		const results = await res.json();
		query.set(results);
	}
</script>

<div>
	<div class="flex justify-between text-white items-center my-4">
		<p>Categories</p>
		<button on:click={() => (extend = !extend)} class="border-2 py-2 px-4 rounded-full"
			>{#if extend}
				<div class="flex items-center space-x-2 w-28">
					<ShowLess />
					<p>Show Less</p>
				</div>
			{:else}
				<div class="flex items-center space-x-2 w-28">
					<ShowMore />
					<p>Show More</p>
				</div>
			{/if}</button
		>
	</div>
	<div class="grid text-white grid-cols-3 gap-x-4 md:gap-x-6 gap-y-4">
		{#each buttons.slice(0, extend ? buttons.length : 9) as button}
			<button
				class="border-white border-2 text-xs sm:text-sm md:text-lg font-bold rounded-full transition duration-100 hover:scale-105 py-2"
				on:click={() => setCategory(button.slug)}>{button.title}</button
			>
		{/each}
	</div>
</div>
