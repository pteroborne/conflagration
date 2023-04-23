// src/routes/api/get-lobby.js
import {supabase} from "$lib/supabaseClient.js";

export async function getLobby(id) {
    console.log('running the get lobby thing')
    if (!id) {
        return {
            status: 400,
            error: 'Missing lobby ID',
        };
    }

    const { data, error } = await supabase
        .from('lobbies')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return {
            status: 500,
            error: 'Error fetching lobby',
        };
    }

    return {
        status: 200,
        lobby: data,
    };
}
