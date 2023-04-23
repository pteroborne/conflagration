<script>
    import Login from '$lib/login.svelte';
    import {user} from '$lib/userStore.js';
</script>

{#if $user}
    <p>Welcome, {$user.email}!</p>
{:else}
    <h1>Login</h1>
    <Login/>
{/if}