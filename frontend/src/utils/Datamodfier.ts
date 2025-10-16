import type { Game, CreatedGame } from '../types/Types'

export const getGameByContractAddress = (
    games: Game[] | CreatedGame[],
    contractAddress: string
): Game | CreatedGame | undefined => {
    return games.find(game => game.contractAddress === contractAddress);
};

export const addGame = (games: Game[], newGame: Game): Game[] => {
    const exists = games.some(game => game.contractAddress === newGame.contractAddress);
    if (!exists) {
        return [...games, newGame];
    }
    return games;
};

export const deleteGameByContractAddress = (
    games: Game[],
    contractAddress: string
): Game[] => {
    return games.filter(game => game.contractAddress !== contractAddress);
};
