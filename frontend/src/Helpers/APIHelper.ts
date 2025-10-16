
import { mapBackendGameToFrontend } from "./handleBackendData.ts";
const BACKEND_URL = process.env.VITE_BACKEND_URL;
if (!BACKEND_URL) console.log("missing BACKEND_URL")
export type CreateGamePayload = {
    contractId: `0x${string}`;
    player1: `0x${string}`;
    player2: `0x${string}`;
    player1Move: number | `0x${string}`;
    stake: number;
};
export const createGame = async (payload: CreateGamePayload) => {
    const res = await fetch(`${BACKEND_URL}/api/games/creategame`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Failed to create game');
    }

    return res.json();
};

export const getMyGames = async (player1: `0x${string}`) => {
    const url = `${BACKEND_URL}/api/games/gmaemyme?player1=${encodeURIComponent(player1)}`;

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Failed to get games');
    }

    const data = await res.json();
    return data.map(mapBackendGameToFrontend);
};

///decide winner
export const decideWinner = async (contractId: string, player1Move: number) => {
    const res = await fetch(`${BACKEND_URL}/api/games/revel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ contractId, player1Move }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Failed to decide winner');
    }

    const data = await res.json();
    return mapBackendGameToFrontend(data.game);
};
// //get games by plyer 2
export const getGamesByPlayer2 = async (player2: `0x${string}`) => {


    const res = await fetch(`${BACKEND_URL}/api/games/gameforme?player=${encodeURIComponent(player2)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Failed to get games');
    }

    const data = await res.json();
    return data.map(mapBackendGameToFrontend);
}


export const getFinishedGames = async (player: `0x${string}`) => {
    const res = await fetch(`${BACKEND_URL}/api/games/getallgames?player=${encodeURIComponent(player)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Failed to get finished games');
    }

    const data = await res.json();
    return data.map(mapBackendGameToFrontend)
};


export const secondMove = async (contractId: `0x${string}`, player2Move: number) => {
    const res = await fetch(`${BACKEND_URL}/api/games/secondmove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ contractId, player2Move }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Failed to submit second move');
    }

    return res.json();
};

export const getPlayer2Move = async (contractId: `0x${string}`) => {
    // const res = await fetch(`/api/games/gameforme?player=${encodeURIComponent(player2)}`,

    const res = await fetch(`${BACKEND_URL}/api/games/getsecondmove?contract=${encodeURIComponent(contractId)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Failed to fetch Player 2 move');
    }

    return res.json();
};

export const deleteGame = async (contractId: `0x${string}`) => {
    const res = await fetch(`${BACKEND_URL}/api/games/deltegame`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ contractId }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Fail to delte Game");
    }

    return res.json();
};



