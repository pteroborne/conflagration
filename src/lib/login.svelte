<script>
    import {supabase} from '$lib/supabaseClient.js';
    import {user} from '$lib/userStore';
    import {goto} from '$app/navigation';

    async function signInWithDiscord() {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'discord',
        });
    }

    async function signout() {
        const {error} = await supabase.auth.signOut();
    }

    async function createGuestUser() {
        const guestId = `guest-${Date.now()}`;
        const guestEmail = `${guestId}@example.com`;
        const guestPassword = Math.random().toString(36).slice(2);

        const { user: guestUser, error: signUpError } = await supabase.auth.signUp({
            email: guestEmail,
            password: guestPassword,
        });

        if (signUpError) {
            console.error('Error creating guest user:', signUpError);
        } else {
            // Navigate to the lobby page
            await goto('/dashboard');
        }
    }


</script>

<div class="container has-text-centered">
    <div class="buttons are-medium">
        <button class="button is-primary" on:click="{signInWithDiscord}">
            Sign in with Discord
        </button>
        <button class="button is-danger" on:click="{signout}">
            Sign out
        </button>
        <button class="button is-info" on:click="{createGuestUser}">
            Guest Login
        </button>
    </div>
</div>
