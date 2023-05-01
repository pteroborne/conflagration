<!-- src/lib/conflict/Conflict.svelte-->
<script>
    import {onMount} from 'svelte';
    import {supabase} from '$lib/supabaseClient';
    import Fight from './conflictTypes/Fight.svelte';
    import RangeAndCover from './conflictTypes/RangeAndCover.svelte';
    import DuelOfWits from './conflictTypes/DuelOfWits.svelte';
    import {lobbyMembers, fetchLobbyMembers} from "$lib/lobbyStore";
    import {dndzone} from 'svelte-dnd-action';


    onMount(async () => {
        await fetchLobbyMembers(gameData.id);
    });


    async function pairOpponents() {
        // ...
        // Add a new fight entry in the fights table
        const {data: fightData, error: fightError} = await supabase
            .from('fights')
            .insert([{lobby_id: gameData.id}]);

        if (fightError) {
            console.error('Error creating fight:', fightError);
            return;
        }

        const fightId = fightData[0].id;

        // Add the pair to the engagements table in Supabase
        for (let i = 0; i < lobbyMembers.length - 1; i += 2) {
            const player1 = lobbyMembers[i];
            const player2 = lobbyMembers[i + 1];

            supabase
                .from('engagements')
                .insert([
                    {
                        fight_id: fightId,
                        player1_character_id: player1.character_id,
                        player2_character_id: player2.character_id,
                    },
                ])
                .then(({data, error}) => {
                    if (error) throw error;
                    console.log('Engagement created:', data);
                })
                .catch((error) => {
                    console.error('Error creating engagement:', error);
                });
        }

        isEngagementsReady = true;
    }


    let isEngagementsReady = false;


    export let gameData;
    let engagements;
</script>


<section class="section">
    <h2 class="title">Lobby Members:</h2>
    <ul>
        {#each $lobbyMembers as member}
            <li>
                {member.user_name} - {member.character_id ? member.character_id.name : 'No character selected'}
                (Character ID: {member.character_id ? member.character_id.id : 'N/A'})
            </li>
        {/each}
    </ul>

    <button class="button is-primary" on:click={pairOpponents}>Pair Opponents</button>
</section>

<!-- Add this section after the Pair Opponents button -->
<section class="section">
    <h2 class="title">Choose characters for conflict</h2>
    <div class="columns is-multiline">
        {#each $lobbyMembers as member}
            {#if member.character_id}
                <div
                        class="column is-one-quarter"
                        use:dndzone="{{items: [{...member, id: member.character_id.id}], type: 'character'}}"
                >
                    <div class="card">
                        <div class="card-content">
                            <p class="title">{member.character_id.name}</p>
                        </div>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
    {#if $lobbyMembers.some(member => member.character_id)}
        <div class="notification is-primary">
            {#each $lobbyMembers as member}
                {#if member.character_id}
                    {member.character_id.name}{#if $lobbyMembers.indexOf(member) < $lobbyMembers.length - 1}, {/if}
                {/if}
            {/each}
            have been chosen for conflict
        </div>
    {/if}
</section>




{#if isEngagementsReady}
    <section class="section">
        <h2 class="title">Engagements:</h2>
        {#each $engagements as engagement}
            <div class="box">
                <h3 class="subtitle">Engagement ID: {engagement.id}</h3>
                <p>
                    Player 1 Character ID: {engagement.player1_character_id} vs. Player 2 Character
                    ID: {engagement.player2_character_id}
                </p>
            </div>
        {/each}
    </section>
{/if}

{#if gameData.game_system === 'Fight!' && isEngagementsReady}
    <section class="section">
        <Fight {gameData}/>
    </section>
{:else if gameData.game_system === 'Range and Cover'}
    <section class="section">
        <RangeAndCover {gameData}/>
    </section>
{:else if gameData.game_system === 'Duel of Wits'}
    <section class="section">
        <DuelOfWits {gameData}/>
    </section>
{/if}
