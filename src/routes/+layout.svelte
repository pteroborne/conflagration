<script>
    import {onMount} from 'svelte';
    import {supabase} from '$lib/supabaseClient.js';
    import '../app.css'
    import { user } from '$lib/userStore.js';

    export async function load({ page, session }) {
        const currentUser = await supabase.auth.user;
        if (currentUser) {
            user.set(currentUser);
        }
        return { props: {} };
    }

    onMount(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                const currentUser = session ? session.user : null;
                user.set(currentUser);
            }
        });
    });

    async function signout() {
        const {error} = await supabase.auth.signOut();
    }
</script>

<div id="navbarBasic" class="navbar-menu">
    <div class="navbar-start">
        {#if $user}
            <a class="navbar-item" href="/dashboard">
                Dashboard
            </a>
            <a class="navbar-item" href="/create-character">
                Create a Character
            </a>
            <a class="navbar-item" href="/lobby">Lobby</a>
            <a class="navbar-item" on:click="{signout}">
                Sign out
            </a>
        {:else}
            <a class="navbar-item" href="/">
                Home
            </a>
            <a class="navbar-item" href="/about">
                About
            </a>
            <a class="navbar-item" href="/settings">
                Settings
            </a>
        {/if}
    </div>
</div>

<section class="section">
    <div class="container">
        <slot></slot>
    </div>
</section>
