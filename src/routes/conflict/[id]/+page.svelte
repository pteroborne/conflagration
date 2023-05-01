<!--src/routes/conflict/[id]/+page.svelte-->
<script>
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabaseClient.js";
    import { user } from "$lib/userStore";
    import Conflict from "$lib/conflict/Conflict.svelte";
    import { page } from '$app/stores';

    let id;
    let gameData;

    onMount(async () => {
        id = $page.params.id; // Get the id from the page store

        const { data, error } = await supabase
            .from("lobbies")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error("Error fetching game data:", error);
        } else {
            gameData = data;
        }
    });
</script>

<div class="section">
    <div class="container">
        {#if gameData}
            <Conflict {gameData} />
        {:else}
            <p>Loading game...</p>
        {/if}
    </div>
</div>
