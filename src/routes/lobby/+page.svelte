<!-- src/routes/lobby/+page.svelte -->
<script>
    import {onMount} from 'svelte';
    import {supabase} from '$lib/supabaseClient.js';
    import {user} from '$lib/userStore';
    import {goto} from '$app/navigation';

    let lobbies = [];
    let currentUser;
    let code;

    user.subscribe(($user) => {
        currentUser = $user;
    });

    onMount(async () => {
        if (!currentUser) {
            // Redirect to the login page if the user is not logged in
            window.location.href = '/';
        }

        const {data, error} = await supabase.from('lobbies').select('*');
        if (error) {
            console.error('Error fetching lobbies:', error);
        } else {
            lobbies = data;
        }
    });

    function generateLobbyCode(length = 6) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    async function createLobby() {
        const lobbyCode = generateLobbyCode();
        const gameSystem = 'Fight!'; // You can change this to a dynamic value based on user input
        const status = 'waiting';

        console.log('Creating lobby with:', {
            code: lobbyCode,
            creator_id: currentUser.id,
            game_system: gameSystem,
            status: status,
        });

        const response = await supabase
            .from('lobbies')
            .insert([
                    {
                        code: lobbyCode,
                        creator_id: currentUser.id,
                        game_system: gameSystem,
                        status: status,
                    },
                ],
            )
            .single()
            .select();

        console.log('Supabase response:', response);

        const {data, error} = response;

        if (error) {
            console.error('Error creating lobby:', error);
        } else {
            console.log('Lobby created:', data.id);
            // Navigate to the newly created lobby
            await goto(`/lobby/${data.id}`);
        }
    }


    async function joinLobby(code) {
        // Implement lobby joining logic here
    }
</script>

<div class="lobby section">
    <div class="container">
        <h1 class="title">Lobby</h1>
        <div class="field is-grouped">
            <p class="control">
                <button class="button is-primary" on:click={createLobby}>Create Lobby</button>
            </p>
            <p class="control">
                <input class="input" type="text" bind:value={code} placeholder="Enter lobby code">
            </p>
            <p class="control">
                <button class="button is-link" on:click={() => joinLobby(code)}>Join Lobby</button>
            </p>
        </div>

        <div class="lobbies">
            {#each lobbies as lobby}
                <div class="box">
                    <h2 class="subtitle">{lobby.code}</h2>
                    <p>System: {lobby.game_system}</p>
                    <p>Status: {lobby.status}</p>
                </div>
            {/each}
        </div>
    </div>
</div>