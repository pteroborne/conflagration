// lobbyStore.js
import { writable } from "svelte/store";
import {supabase} from "$lib/supabaseClient.js";

export const lobbyMembers = writable([]);

export async function fetchLobbyMembers(lobbyId) {
    try {
        const { data, error } = await supabase
            .from("lobby_members")
            .select(`
                user_id,
                user_name,
                character_id (
                    id,
                    name
                )
            `)
            .eq("lobby_id", lobbyId);

        if (error) throw error;
        lobbyMembers.set(data);
    } catch (error) {
        console.error("Error fetching lobby members:", error);
    }
}
