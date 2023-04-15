<script>
    import CharacterForm from './CharacterForm.svelte';
    import CharacterPreview from './CharacterPreview.svelte';
    import { supabase } from '$lib/supabaseClient.js';

    let character;

    async function handleCharacterSubmit(event) {
        character = event.detail;

        const response = await supabase.from('characters').insert([
            {
                ...character,
                user_id: supabase.auth.user()?.id,
            },
        ]);

        if (response.error) {
            console.error('Failed to create character:', response.error);
        } else {
            character = response.data;
        }
    }
</script>

<div class="container">
    <div class="columns">
        <div class="column is-half">
            <CharacterForm on:submit="{handleCharacterSubmit}" />
        </div>
        {#if character}
            <div class="column is-half">
                <CharacterPreview {character} />
            </div>
        {/if}
    </div>
</div>
