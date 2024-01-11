<script lang="ts">
	import type { Comment } from "../../types";
	import { getHemmingsCookie } from "./firebaseConfig";

    export let linkComponent: string;
    let comments: Comment[] = [];

    async function getComments(linkComponent: string) { 
        const link = `https://www.hemmings.com/auctions/api/${linkComponent}/comment`
        const response = await fetch('http://localhost:3000/getComments', { method: "POST", body: JSON.stringify({link})});
        comments = await response.json()
    }
    getComments(linkComponent);
    
</script>


<div>
    {JSON.stringify(comments)}
</div>