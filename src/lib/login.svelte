<script>
    import {supabase} from '$lib/supabaseClient.js';

    async function signInWithDiscord() {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'discord',
        });
    }

    async function signout() {
        const {error} = await supabase.auth.signOut();
    }


</script>

<button on:click="{signInWithDiscord}">Sign in with Discord</button>
<button on:click="{signout}">Sign out</button>

