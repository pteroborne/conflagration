<!-- src/routes/lobby/[id]/+page.svelte -->
<script>
    import {onMount, onDestroy} from 'svelte';
    import {supabase} from '$lib/supabaseClient.js';
    import {user} from '$lib/userStore';
    import Select from "svelte-select";
    import CharacterPreview from '$lib/character-preview/CharacterPreview.svelte';
    import {goto} from '$app/navigation';
    import {updateContext} from '$lib/contextSetup.js';
    import {writable} from 'svelte/store';
    import {
        lobbyMembers,
        fetchLobbyMembers,
        updateLobbyMember,
        subscribeLobbyMembers,
        unsubscribeLobbyMembers,
        subscribeLobby,
        unsubscribeLobby
    } from "$lib/lobbyStore";

    export let data;
    let lobby;
    let selectedSystem = '';
    let selectedCharacter = writable(null);
    let characters = [];


    let lobbyMembersSubscription;
    let lobbySubscription

    async function init() {
        if (!data) return;

        lobby = data.lobby;
        await fetchLobbyMembers(lobby.id);

        lobbyMembersSubscription = await subscribeLobbyMembers(lobby.id);
        lobbySubscription = await subscribeLobby(lobby.id, (newData) => {
            lobby = newData;
        });
    }

    $: if ($user) {
        (async () => {
            const {data: charactersData, error: charactersError} = await supabase
                .from('characters')
                .select(`
                *,
                character_skills(*),
                character_arrowheads(*),
                character_weapons(*),
                character_armor(*)
            `)
                .eq('user_id', $user.id);

            if (charactersError) {
                console.error('Error fetching characters:', charactersError);
            } else {
                characters = charactersData;

                // Check if a character is already selected
                const lobbyMember = $lobbyMembers.find((member) => member.user_id === $user.id);
                if (lobbyMember) {
                    const selectedChar = characters.find((char) => char.id === lobbyMember.character_id);
                    if (selectedChar) {
                        selectedCharacter.set(selectedChar);
                    }
                }
            }
        })();
    }


    onMount(() => {
        init();
    });

    onDestroy(() => {
        if (lobbyMembersSubscription) {
            unsubscribeLobbyMembers(lobbyMembersSubscription);
        }
        if (lobbySubscription) { // Unsubscribe from the lobby table when the component is destroyed
            unsubscribeLobby(lobbySubscription);
        }
    });


    async function startGame() {
        if ($user.id !== lobby.creator_id) {
            console.error('Error: Only the host can start the game');
            return;
        }

        // Implement game starting logic here
        console.log('Starting the game...');
        await goto(`/conflict/${lobby.id}`, {state: {id: lobby.id}});
    }


    async function selectSystem(system) {
        if ($user.id !== lobby.creator_id) {
            console.error('Error: Only the host can select the system');
            return;
        }

        lobby.game_system = system;
    }

    // stuff for previewing the character
    function updateSelectedCharacter(char) {
        selectedCharacter.set(char);
        updateContext({
            character: char,
            characterSkills: char.character_skills,
            characterArrowheads: char.character_arrowheads,
            chosenWeapons: char.character_weapons,
            characterArmor: char.character_armor,
        });
    }

    function onCharacterChange(character) {
        updateSelectedCharacter(character);
    }

    $: if ($selectedCharacter && $user) {
        updateLobbyMember(lobby.id, $user.id, $selectedCharacter.id);
    }


</script>


<div class="section">
    <div class="container">
        {#if lobby}
            <div class="columns">
                <div class="column is-one-third">
                    <div class="box">
                        <h1 class="title">Lobby: {lobby.code}</h1>
                        <p>System: {lobby.game_system}</p>
                        <p>Status: {lobby.status}</p>
                    </div>


                    {#if $user.id === lobby.creator_id}
                        <div class="select-system box">
                            <h2 class="title is-4">Select a System</h2>
                            <label class="label">
                                <input type="radio" value="Fight!" bind:group={selectedSystem}
                                       on:change={() => selectSystem('Fight!')}/> Fight!
                            </label>
                            <label class="label">
                                <input type="radio" value="Range and Cover" bind:group={selectedSystem}
                                       on:change={() => selectSystem('Range and Cover')}/> Range and Cover
                            </label>
                            <label class="label">
                                <input type="radio" value="Duel of Wits" bind:group={selectedSystem}
                                       on:change={() => selectSystem('Duel of Wits')}/> Duel of Wits
                            </label>
                        </div>
                    {/if}


                    <div class="box">
                        <h2 class="title is-4">Players:</h2>
                        <ul>
                            {#each $lobbyMembers as player}
                                <li>
                                    {player.user_name}
                                    - {characters.find(char => char.id === player.character_id)?.name || 'No character selected'}
                                </li>
                            {/each}
                        </ul>

                    </div>


                    {#if $user.id === lobby.creator_id}
                        <button class="button is-primary" on:click={startGame}>Start Game</button>
                    {/if}
                </div>
                <div class="column is-two-thirds">
                    <div class="select-character">
                        {#if characters.length > 0}
                            <div class="box">
                                <label class="label">Select a character:</label>
                                <Select
                                        items={characters}
                                        label="name"
                                        placeholder="Select a character"
                                        on:change={(e) => onCharacterChange(e.detail)}
                                />
                            </div>
                            {#if selectedCharacter}
                                <CharacterPreview/>
                            {/if}
                        {:else}
                            <p>No characters available.</p>
                        {/if}
                    </div>
                </div>
            </div>
        {:else}
            <p>Loading lobby information...</p>
        {/if}
    </div>
</div>

