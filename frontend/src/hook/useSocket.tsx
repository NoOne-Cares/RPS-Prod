import { useEffect } from 'react';
import { connectSocket } from '../utils/Socket'
import type { Game } from '../types/Types';
type SocketEvents = {
    reciveCreatedGame: (data: Game) => void;
    reciveSecondMove: (data: Game) => void;
    contractClaimed: (data: Game) => void;
};

export const useGameSocket = (
    userId: `0x${string}`,
    handlers: Partial<SocketEvents>
) => {
    useEffect(() => {
        if (!userId) return;

        const socket = connectSocket(userId);

        if (handlers.reciveCreatedGame) {
            socket.on('reciveCreatedGame', handlers.reciveCreatedGame);
        }

        if (handlers.reciveSecondMove) {
            socket.on('reciveSecondMove', handlers.reciveSecondMove);
        }

        if (handlers.contractClaimed) {
            socket.on('contractClaimed', handlers.contractClaimed);
        }

        return () => {

            if (userId) {
                if (handlers.reciveCreatedGame) {
                    socket.off('reciveCreatedGame', handlers.reciveCreatedGame);
                }
                if (handlers.reciveSecondMove) {
                    socket.off('reciveSecondMove', handlers.reciveSecondMove);
                }
                if (handlers.contractClaimed) {
                    socket.off('contractClaimed', handlers.contractClaimed);
                }
            }

            // disconnectSocket();
        };
    }, [userId]);
};
