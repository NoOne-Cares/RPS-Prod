import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const connectSocket = (userId: string): Socket => {
    if (!socket) {
        socket = io(BACKEND_URL, {
            path: '/socket.io',
            query: { userId },
            transports: ['websocket'],
        });

        console.log('Socket connected');
    }

    return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
        console.log('Socket disconnected');
    }
};
