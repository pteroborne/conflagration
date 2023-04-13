<script context="module">
    import {goto} from '$app/navigation';
    import {supabase} from '$lib/supabaseClient';
    import {isAdmin} from '$lib/utils';

    export async function load({session}) {
        const supabase = supabase;
        const {user} = await supabase.auth.api.getUser(session.access_token);

        if (!user || !isAdmin(user)) {
            goto('/login');
            return {status: 302};
        }

        return {props: {user}};


    }

    import AddAction from './AddAction.svelte';

    export let user;
</script>

<main>
    <h1>Admin Page</h1>
    <AddAction user={user}/>
</main>
