import type { Game } from "../types/Types"; // wherever your frontend type is defined

export const mapBackendGameToFrontend = (backendGame: any): Game => {
    return {
        contractAddress: backendGame.contractId,
        value: backendGame.stake,
        player1: backendGame.player1,
        player2: backendGame.player2,
        player1move: backendGame.player1Move,
        player2move: backendGame.player2Move ?? null,
        createdAt: new Date(backendGame.createdAt).getTime(), // convert ISO to timestamp
        winner: backendGame.winner ?? null,
        claimable: backendGame.gameStatus === "completed",
    };
};
