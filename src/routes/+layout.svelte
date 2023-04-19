<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabaseClient.js';
    import { goto } from '$app/navigation';
    import '../app.css'

    onMount(() => {
        const unsubscribe = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                console.log('User signed in:', session.user);
                goto('/dashboard');
            } else if (event === 'SIGNED_OUT') {
                console.log('User signed out');
            }
        });

        return () => {
            unsubscribe();
        };
    });
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/">
            Conflagration
        </a>
    </div>

    <div id="navbarBasic" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item" href="/">
                Home
            </a>
            <a class="navbar-item" href="/about">
                About
            </a>
            <a class="navbar-item" href="/settings">
                Settings
            </a>
            <a class="navbar-item" href="/dashboard">
                Dashboard
            </a>
        </div>
    </div>
</nav>

<section class="section">
    <div class="container">
        <slot></slot>
    </div>
</section>
