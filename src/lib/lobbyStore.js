import {writable} from 'svelte/store';
import {subscribe, supabase} from './supabaseClient';

export const lobbyMembers = writable([]);

export async function fetchLobbyMembers(gameId) {
    const {data, error} = await supabase
        .from('lobby_members')
        .select('*')
        .eq('lobby_id', gameId);

    if (error) {
        console.error('Error fetching lobby members:', error);
    } else {
        lobbyMembers.set(data);
    }
}

export async function subscribeLobbyMembers(gameId) {
    return await subscribe(
        'lobby_members',
        {
            event: '*',
            schema: 'public',
            table: 'lobby_members',
            filter: `lobby_id=eq.` + gameId,
        },
        (payload, eventType) => {

            if (eventType === 'UPDATE') {
                const updatedMember = payload;
                lobbyMembers.update((members) => {
                    const index = members.findIndex((member) => member.id === updatedMember.id);
                    if (index !== -1) {
                        // Return a new array with the updated member
                        return [
                            ...members.slice(0, index),
                            updatedMember,
                            ...members.slice(index + 1),
                        ];
                    }
                    return members;
                });
            } else if (eventType === 'INSERT') {
                lobbyMembers.update(members => [...members, payload]);
            } else if (eventType === 'DELETE') {
                lobbyMembers.update(members => members.filter(member => member.id !== payload.id));
            }
        }
    );
}



export async function subscribeLobby(gameId, onUpdate) {
    return await subscribe(
        'lobby',
        {
            event: '*',
            schema: 'public',
            table: 'lobby',
            filter: `id=eq.` + gameId,
        },
        onUpdate
    );
}

export async function updateLobbyMember(lobbyId, userId, characterId) {
    if (!userId || !lobbyId) return;

    const {error} = await supabase
        .from('lobby_members')
        .update({character_id: characterId})
        .eq('user_id', userId)
        .eq('lobby_id', lobbyId);

    if (error) {
        console.error('Error updating lobby member:', error);
    }
}

export async function unsubscribeLobbyMembers(subscription) {
    await supabase.removeChannel(subscription);
}

export async function unsubscribeLobby(subscription) {
    await supabase.removeChannel(subscription);
}

export async function setReadyStatus(lobbyId, userId, readyStatus) {
    if (!userId || !lobbyId) return;

    const {error} = await supabase
        .from('lobby_members')
        .update({ready: readyStatus})
        .eq('user_id', userId)
        .eq('lobby_id', lobbyId);

    if (error) {
        console.error('Error updating ready status:', error);
    }
}

// Add a resetReadyStatus function
export async function resetReadyStatus(gameId) {
    const { error } = await supabase
        .from("lobby_members")
        .update({ ready: false })
        .eq("lobby_id", gameId);

    if (error) {
        console.error("Error resetting ready status:", error);
    }
}
