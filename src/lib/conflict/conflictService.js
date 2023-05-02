import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';

export const engagementsStore = writable([]);


const isEngagementsReady = writable(false);

async function pairOpponents(gameId, lobbyMembers) {
    const {data: fightData, error: fightError} = await supabase
        .from('fights')
        .insert([{lobby_id: gameId}])
        .select();

    if (fightError || !fightData) {
        console.error('Error creating fight:', fightError);
        return;
    }

    const fightId = fightData[0].id;

    // Filter out players without characters
    const playersWithCharacters = lobbyMembers.filter(member => member.character_id);

    const engagementPromises = [];

    for (let i = 0; i < playersWithCharacters.length - 1; i += 2) {
        const player1 = playersWithCharacters[i];
        const player2 = playersWithCharacters[i + 1];

        const engagementPromise = supabase
            .from('engagements')
            .insert([
                {
                    fight_id: fightId,
                    player1_character_id: player1.character_id.id,
                    player2_character_id: player2.character_id.id,
                },
            ])
            .select()
            .then(({ data, error }) => {
                if (error) throw error;
                console.log('Engagement created:', data);
                return data; // Return the data here
            })
            .catch((error) => {
                console.error('Error creating engagement:', error);
            });

        engagementPromises.push(engagementPromise);
    }


    const engagements = await Promise.all(engagementPromises);
    return engagements.map((response) => response[0]);


    // isEngagementsReady.set(true);
}

async function setReadyStatus(gameId, userId) {
    const { data, error } = await supabase
        .from("lobby_members")
        .update({ ready: true })
        .match({ lobby_id: gameId, user_id: userId });

    if (error) {
        console.error("Error updating ready status:", error);
    } else {
        console.log("Ready status updated:", data);
    }
}

export { pairOpponents, isEngagementsReady, setReadyStatus };
