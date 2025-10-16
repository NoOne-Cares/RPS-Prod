import React from "react";
import ImageOptions from "../utils/imageOptions";
import type { Game } from "../types/Types";

type Props = {
    games: Game[];
    onClaim: (game: Game) => void;
};

const ClaimGame: React.FC<Props> = ({ games, onClaim }) => {
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Claim Your Games</h2>

            {games.length === 0 ? (
                <p className="text-center text-gray-600">No games available to claim.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {games.map((game) => {
                        const moveImage = ImageOptions.find(
                            (opt) => opt.value.toString() === game.player1move.toString()
                        );

                        return (
                            <div
                                key={game.contractAddress}
                                className="border rounded-xl p-4 shadow hover:shadow-md transition"
                            >
                                {/* Move Image */}
                                <div className="flex justify-center mb-4">
                                    {moveImage ? (
                                        <img
                                            src={moveImage.image}
                                            alt={moveImage.label}
                                            width={80}
                                            height={80}
                                            className="rounded"
                                        />
                                    ) : (
                                        <span className="text-gray-500">Unknown Move</span>
                                    )}
                                </div>

                                <div className="text-sm text-gray-700 space-y-1 mb-4 text-center">
                                    <p><strong>Stake:</strong> {game.value} ETH</p>
                                    <p><strong>Opponent:</strong> {game.player2}</p>
                                    <p className="break-all"><strong>Contract:</strong> {game.contractAddress}</p>
                                </div>

                                <div className="text-center">
                                    <button
                                        onClick={() => onClaim(game)}
                                        className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 hover:scale-105 transition-transform"
                                    >
                                        Claim
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ClaimGame;
