// src/routes/lobby/[id]/+page.js
import { getLobby } from "$lib/api/get-lobby.js";

export async function load({ params }) {
    const { id } = params;
    const response = await getLobby(id);

    console.log(response);

    if (response.error) {
        return { status: response.status, error: response.error };
    }

    if (!response.lobby) {
        return { status: 404, error: new Error("Lobby not found") };
    }

    return { lobby: response.lobby };
}
