<!-- src/routes/lobby/[id]/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import {user} from '$lib/userStore';

    export let data;
    let lobby;

    onMount(() => {
        if (data) {
            lobby = data.lobby;
        }
    });

    console.log(data);
    let currentUser = $user;
</script>

<div class="section">
    <div class="container">
        {#if lobby}
            <h1 class="title">Lobby: {lobby.code}</h1>
            <p>System: {lobby.game_system}</p>
            <p>Status: {lobby.status}</p>
        {:else}
            <p>Loading lobby information...</p>
        {/if}
    </div>
</div>
