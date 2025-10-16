// socketServer.ts
import type { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';

const playerSocketMap = new Map<string, string>();


export const startSocketServer = (server: HttpServer) => {
    const io = new IOServer(server, {
        cors: {
            origin: "*",
        },
    });

    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);


        const userId = socket.handshake.query.userId as string;;

        if (userId) playerSocketMap.set(userId, socket.id)

        socket.on("createContract", (data) => {
            let player2 = findSocketByUserId(data.player2)
            if (player2) socket.to(player2).emit("reciveCreatedGame", data)
        })

        socket.on("secondmove", (data) => {
            let player1 = findSocketByUserId(data.player1)
            if (player1) socket.to(player1).emit("reciveSecondMove", data)
        })

        socket.on("claim", (data) => {
            let player2 = findSocketByUserId(data.player2)
            if (player2) socket.to(player2).emit("contractClaimed", data)
        })

        socket.on('disconnect', () => {
            for (const [playerId, sock] of playerSocketMap.entries()) {
                if (sock === socket.id) {
                    console.log("user removed" + sock)
                    playerSocketMap.delete(playerId);
                    break;
                }
            }
        });
    });
};

export const findSocketByUserId = (publicKey: string): string | undefined => {
    return playerSocketMap.get(publicKey);
};