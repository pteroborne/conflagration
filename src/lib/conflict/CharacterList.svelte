<!-- src/lib/conflict/CharacterList.svelte -->
<script>
    import {flip} from 'svelte/animate';
    import {dndzone} from 'svelte-dnd-action';
    import {user} from "$lib/userStore.js";
    import {supabase} from "$lib/supabaseClient.js";
    import { createEventDispatcher } from 'svelte';

    export let items;
    const flipDurationMs = 300;

    const dispatch = createEventDispatcher();
    function handleDndConsider(e) {
        items = e.detail.items;
    }

    export let engagementId;

    function handleDndFinalize(e) {
        items = e.detail.items;
        const player1_character_id = items[0].id;
        const player2_character_id = items[1]?.id;

        updateEngagement(engagementId, player1_character_id, player2_character_id);
    }


    async function updateEngagement(engagementId, player1_character_id, player2_character_id) {
        const { data, error } = await supabase
            .from('engagements')
            .update({
                player1_character_id,
                player2_character_id,
            })
            .eq('id', engagementId)
            .select();

        if (error) {
            console.error('Error updating engagement:', error);
        } else {
            console.log('Engagement updated:', data);
            dispatch('engagementUpdated', { fightId: data[0].fight_id });
        }
    }

</script>


<div
        class="box"
        use:dndzone={{
    items,
    type: 'character',
    flipDurationMs,
  }}
        on:consider="{handleDndConsider}"
        on:finalize="{handleDndFinalize}"
>
    {#if items.length > 0}
        {#each items as character (character.id)}
            <div
                    class="card {character.user_id === $user.id ? 'user' : ''}"
                    animate:flip="{{duration: flipDurationMs}}"
            >
                <div class="card-content">
                    <p class="title">{character.name}</p>
                </div>
            </div>
        {/each}
    {/if}
</div>

<style>
    .box {
        padding: 0.3em;
        border: 1px solid black;
    }

    .card {
        padding: 0.2em;
        border: 1px solid blue;
        margin: 0.15em 0;
    }

    .card.user {
        border-color: green;
    }
</style>
