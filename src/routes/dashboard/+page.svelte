<!--routes/dashboard/+page.svelte-->
<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabaseClient.js';
    import { user } from '$lib/userStore.js';
    import CharacterPreview from '$lib/character-preview/CharacterPreview.svelte';
    import {updateContext} from '$lib/contextSetup.js';

    let characters = [];
    let selectedCharacter = null;
    let errorMessage = null;

    async function fetchCharacters() {
        try {
            const { data, error } = await supabase
                .from('characters')
                .select(`
          *,
          character_skills(*),
          character_arrowheads(*),
          character_weapons(*),
          character_armor(*)
        `)
                .eq('user_id', $user.id);

            if (error) throw error;

            characters = data;
            console.log(characters);
        } catch (error) {
            errorMessage = 'Error fetching characters: ' + error.message;
            console.error(errorMessage);
        }
    }

    function setSelectedCharacter(char) {
        try {
            selectedCharacter = char;
            updateContext({
                character: char,
                characterSkills: char.character_skills,
                characterArrowheads: char.character_arrowheads,
                chosenWeapons: char.character_weapons,
                characterArmor: char.character_armor,
            });
        } catch (error) {
            errorMessage = 'Error setting selected character: ' + error.message;
            console.error(errorMessage);
        }
    }



    function handleError(e) {
        errorMessage = e.detail;
        console.error(errorMessage);
    }

    onMount(async () => {
        document.title = 'Dashboard - Conflagration';
        await fetchCharacters();
    });
</script>


<section class="section">
    {#if $user}
        <div class="container">
            <h1 class="title">Dashboard</h1>
            {#if errorMessage}
                <p class="has-text-danger">{errorMessage}</p>
            {/if}
            {#if characters.length > 0}
                <div class="columns">
                    <div class="column is-one-third">
                        <ul>
                            {#each characters as character}
                                <li>
                                    {character.name}
                                    <button class="button is-small is-primary"
                                            on:click={() => setSelectedCharacter(character)}>
                                        Preview
                                    </button>
                                </li>
                            {/each}
                        </ul>
                    </div>
                    {#if selectedCharacter}
                        <CharacterPreview on:error={handleError} />
                    {/if}
                </div>
            {:else}
                <p>No characters found.</p>
            {/if}
        </div>
    {:else}
        <div class="container">
            <p>Please log in to view your dashboard.</p>
        </div>
    {/if}
</section>
