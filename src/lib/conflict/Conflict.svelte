<!-- src/lib/conflict/Conflict.svelte-->
<script>
    import {onMount, onDestroy} from 'svelte';
    import {supabase} from '$lib/supabaseClient';
    import {
        lobbyMembers,
        fetchLobbyMembers,
        subscribeLobbyMembers,
        unsubscribeLobbyMembers,
        setReadyStatus, resetReadyStatus
    } from "$lib/lobbyStore";
    import {pairOpponents, isEngagementsReady, engagementsStore} from './conflictService.js';
    import CharacterList from "$lib/conflict/CharacterList.svelte";
    import {user} from "$lib/userStore.js";
    import {goto} from "$app/navigation";

    async function handlePairOpponents() {
        const newEngagements = await pairOpponents(gameData.id, $lobbyMembers);
        engagementsStore.set(newEngagements);
    }


    let engagements;
    export let gameData;

    let characters = [];


    async function fetchCharacter(character_id) {
        const {data, error} = await supabase
            .from('characters')
            .select('*')
            .eq('id', character_id)
            .single()
            .select();

        if (error) {
            console.error('Error fetching character:', error);
            return null;
        }

        return data;
    }


    let subscription;

    onMount(async () => {
        await fetchLobbyMembers(gameData.id);
        await resetReadyStatus(gameData.id);
        await handlePairOpponents();
        // await fetchEngagements(gameData.id);


        subscription = await subscribeLobbyMembers(gameData.id);

    });


    onDestroy(() => {
        unsubscribeLobbyMembers(subscription);
    });

    $: hasCharactersSelected = $lobbyMembers?.some(member => member.character_id);


    $: pairs = sliceIntoChunks(characters, 2);


    $: if ($lobbyMembers && $lobbyMembers.length) {
        const fetchCharacters = async () => {
            const characterPromises = $lobbyMembers.map(async (member) => {
                if (member.character_id) {
                    const characterData = await fetchCharacter(member.character_id);
                    return {...characterData, user_id: member.user_id, user_name: member.user_name};
                }
                return {user_id: member.user_id, user_name: member.user_name};
            });

            characters = await Promise.all(characterPromises);
        };

        fetchCharacters();

    }


    function sliceIntoChunks(arr, chunkSize) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    $: pairs = sliceIntoChunks(characters, 2);


    async function handleReady() {
        // Set the ready status for the current user
        await setReadyStatus(gameData.id, $user.id);
    }

    $: if ($lobbyMembers && $lobbyMembers.every((member) => member.ready)) {
        console.log('All users are ready');
        console.log($engagementsStore, userEngagement)
        if (!userEngagement) {
            console.log('no engagement')
        } else {
            goto(`./\${gameId}/fight/` + userEngagement.id, { userEngagement, userCharacterId });

        }
    }

    $: userCharacterId = characters.find(character => character.user_id === $user.id)?.id;

    $: userEngagement = $engagementsStore?.find(
        engagement =>
            engagement.player1_character_id === userCharacterId || engagement.player2_character_id === userCharacterId
    );


    // Add this function in your Conflict.svelte script
    async function fetchEngagements(fightId) {
        const { data, error } = await supabase
            .from('engagements')
            .select('*')
            .eq('fight_id', fightId);

        if (error) {
            console.error('Error fetching engagements:', error);
            return;
        }

        engagementsStore.set(data);
    }



</script>


<section class="section">
    <h2 class="title">Lobby Members:</h2>
    <ul>
        {#if characters.length > 0}
            {#each characters as character (character.user_id)}
                <li>
                    {character.user_name} - {character.name ? character.name : 'No character selected'}
                    (Character ID: {character.id ? character.id : 'N/A'})
                    {#if $lobbyMembers.find(member => member.user_id === character.user_id).ready}
                        &#x2713;
                    {/if}
                </li>
            {/each}
        {/if}
    </ul>

</section>


<section class="section">
    <h3 class="title is-4">Engaged Opponents</h3>
    <div class="columns">
        {#if pairs.length > 0 && Array.isArray($engagementsStore)}
            {#each pairs as pair, index}
                <div class="column is-one-third">
                    {#if $engagementsStore[index]}
                        <CharacterList items={pair} engagementId={$engagementsStore[index].id}
                                       on:engagementUpdated="{(e) => fetchEngagements(e.detail.fightId)}"/>

                    {/if}

                    {#if pair.some((character) => character.user_id === $user.id)}
                        <button on:click="{handleReady}" class="button is-primary">
                            Ready
                        </button>
                    {/if}
                </div>
            {/each}
        {/if}
    </div>
</section>


{#if Array.isArray($engagementsStore)}
    <section class="section">
        <h2 class="title">Engagements:</h2>
        {#each $engagementsStore as engagement}
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


