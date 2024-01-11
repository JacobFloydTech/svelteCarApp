<script lang="ts">
	import { onMount } from "svelte";
	import type { Comment } from "../../types";
	
    export let linkComponent: string;
    let comments: Comment[] = [];

    async function getComments(linkComponent: string) { 
        const link = `https://www.hemmings.com/auctions/api/${linkComponent}/comment`
        const response = await fetch('http://localhost:3000/getComments', { method: "POST", body: JSON.stringify({link}), headers: { 
            'Content-Type': ' application/json'
        }});
        comments = await response.json()
    }
    onMount(() =>  getComments(linkComponent));
    
</script>


<div>
    {JSON.stringify(comments)}
</div>