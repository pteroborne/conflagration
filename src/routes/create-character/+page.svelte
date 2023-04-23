<script>
    import {onMount, setContext} from 'svelte';
    import CharacterForm from './CharacterForm.svelte';
    import CharacterPreview from "$lib/character-preview/CharacterPreview.svelte";
    import { saveCharacterToDB } from '$lib/saveCharacter.js';
    import { user } from '$lib/userStore.js';
    import { get } from 'svelte/store';
    import {
        characterStore,
        characterSkillsStore,
        chosenWeaponsStore,
        characterArmor,
        characterArrowheads,
    } from '$lib/characterStore.js';
    import {updateContext} from "$lib/contextSetup.js";

    onMount(async () => {
        updateContext({ mode: 'create' });
    });

    async function saveToDB() {
        console.log($user);
        if (!$user) {
            console.error('User not logged in.');
            return;
        }

        const characterData = {
            character: get(characterStore),
            characterSkills: get(characterSkillsStore),
            characterWeapons: get(chosenWeaponsStore),
            characterArmor: get(characterArmor),
            characterArrowheads: get(characterArrowheads),
        };
        console.log(characterData);

        // Save character data to the database
        await saveCharacterToDB(characterData, $user);
    }

</script>

<div class="container">
    <div class="has-text-right">
        <button class="button is-primary is-large" on:click="{saveToDB}">Save to DB</button>
    </div>
    <div class="columns">
        <div class="column is-half">
            <CharacterForm/>
        </div>
        <div class="column is-half">
            <CharacterPreview />
        </div>
    </div>
</div>
