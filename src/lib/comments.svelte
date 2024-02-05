<script lang="ts">
	import { onMount } from "svelte";
	import type { Comment } from "../../types";
 
	import { ip } from "../store";
  
    export let linkComponent: string;
    let comments: Comment[] = [];
    let children: Comment[] =[];
    async function getComments(linkComponent: string) { 
        const link = `https://www.hemmings.com/auctions/api/${linkComponent}/comment`
        const response = await fetch(`${$ip}/getComments`, { method: "POST", body: JSON.stringify({link}), headers: { 
            'Content-Type': ' application/json'
        }});
        let data: Comment[] = await response.json();
        let childComments = data.filter(e => e.parent_id != null);
        children = childComments
        data = data.filter(e => e.parent_id == null)
        comments = data;
        insertChildComments();
    }
    function insertChildComments() { 
        if (children.length == 0) {return}
        for (var i = 0 ; i < children.length; i++) { 
            for (var x = 0 ; x < comments.length; x++) { 

                if (children[i]?.parent_id == comments[x]?.id) { 
            
                    comments.splice(x+1, 0, children[i])
                    children.splice(i, 1);
                }
            }
        }
        return insertChildComments();

    }
    function daysAgo(date: Date) { 
        const curr = new Date();
        //@ts-expect-error
        const diff = curr-date;
        return Math.ceil(diff/(1000*60*60*24))
    }
    onMount(() =>  getComments(linkComponent));
    
</script>


<div class="text-base md:text-3xl flex flex-col space-y-6 md:space-y-12 text-white w-full md:w-2/3 xl:w-1/2 mx-auto my-12">
    {#each comments as comment}
        {#if comment.is_bid}
            <div>
                <div class="inline-block text-lg md:text-3xl bg-red-500 px-4 py-2 rounded-full">    
                    {@html comment.comment}
                </div>
            </div>
        {:else}
            <div class={"flex flex-col space-y-2 "  + (comment?.parent_id == null ? 'ml-0': 'ml-6 md:ml-12')}>
                <p class="text-lg py-4">{comment.commentator?.user_name} - <span class="italic text-base ">{daysAgo(new Date(comment.created_at))} days ago</span></p>
                {@html comment.comment}
            </div>
        {/if}
    {/each}
</div>