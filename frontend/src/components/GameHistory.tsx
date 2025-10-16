import React from "react";
import ImageOptions from "../utils/imageOptions";
import type { Game } from "../types/Types";

type Props = {
    games: Game[];
    currentUser: `0x${string}`;
};

const GameHistory: React.FC<Props> = ({ games, currentUser }) => {
    const getStatusStyle = (game: Game) => {
        if (game.winner === "draw") return "text-blue-600 bg-blue-100";
        if (game.winner === currentUser) return "text-green-600 bg-green-100";
        return "text-red-600 bg-red-100";

    };

    const getStatusText = (game: Game) => {
        if (game.winner === "draw") return "Draw";
        if (game.winner === currentUser) return "You Win";
        return "Opponent Wins";
    };

    const getMoveImage = (move: string | number | null | undefined) => {
        const image = ImageOptions.find(opt => opt.value.toString() === move?.toString());
        return image ? (
            <img
                src={image.image}
                alt={image.label}
                className="w-14 h-14 sm:w-20 sm:h-20 rounded shadow"
            />
        ) : (
            <div className="w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center bg-gray-100 rounded text-gray-400 text-sm">
                ?
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Game History</h2>

            {games.length === 0 ? (
                <p className="text-center text-gray-600">No game history yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {games.map((game) => (
                        <div
                            key={game.contractAddress}
                            className={`border rounded-xl p-5 shadow transition ${getStatusStyle(game)}`}
                        >
                            {/* Moves */}
                            <div className="flex justify-around items-center mb-4">
                                <div className="text-center space-y-1">
                                    <p className="text-xs text-gray-500">You</p>
                                    {getMoveImage(game.player1move)}
                                </div>
                                <span className="text-lg font-semibold text-gray-500">VS</span>
                                <div className="text-center space-y-1">
                                    <p className="text-xs text-gray-500">Opponent</p>
                                    {getMoveImage(game.player2move)}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-sm text-gray-800 space-y-1 text-center mb-3">
                                <p><strong>Stake:</strong> {game.value} ETH</p>
                                <p><strong>Opponent:</strong> {game.player2}</p>
                                <p className="break-all"><strong>Contract:</strong> {game.contractAddress}</p>
                            </div>

                            {/* Status */}
                            <div className="text-center text-sm font-semibold py-2 rounded">
                                {getStatusText(game)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GameHistory;
