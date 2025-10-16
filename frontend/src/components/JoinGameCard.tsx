import { useState } from "react";
import ImageOptions from "../utils/imageOptions";
import type { Game } from "../types/Types";

type JoinGameCardProps = {
    games: Game[];
    handleSubmit: (game: Game, selected: number) => void;
};

const JoinGameCard = ({ games, handleSubmit }: JoinGameCardProps) => {
    // Store selection per game using contractAddress as the key
    const [selectedMoves, setSelectedMoves] = useState<Record<string, number>>({});

    const handleSelect = (gameId: string, value: number) => {
        setSelectedMoves((prev) => ({
            ...prev,
            [gameId]: value,
        }));

    };

    return (
        <div className="mx-auto pt-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Claim Your Games</h2>
            {games.length === 0 ? (
                <p className="text-center text-gray-600">No games available to claim.</p>
            ) : (
                games.map((game) => {
                    const selected = selectedMoves[game.contractAddress || ""] ?? -1;

                    return (
                        <div
                            className="max-w-4xl mx-auto p-6 space-y-8 shadow rounded-xl"
                            key={game.contractAddress}
                        >
                            <h2 className="text-2xl font-bold text-center text-gray-800">
                                Join Game by Submitting a move
                            </h2>

                            <div className="flex flex-wrap justify-center gap-6">
                                {ImageOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        onClick={() =>
                                            handleSelect(game.contractAddress || "", option.value)
                                        }
                                        className={`cursor-pointer border-4 rounded-lg p-1 transition-all ${selected === option.value
                                            ? "border-blue-500 scale-105"
                                            : "border-transparent hover:border-gray-300"
                                            }`}
                                    >
                                        <img
                                            src={option.image}
                                            alt={option.label}
                                            width={100}
                                            height={100}
                                            className="rounded"
                                        />
                                        <p className="text-center mt-1 text-gray-700">
                                            {option.label}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() =>
                                        handleSubmit(game, selectedMoves[game.contractAddress || ""])
                                    }
                                    className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 font-semibold hover:scale-105 rounded-xl shadow transition duration-300 cursor-pointer"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default JoinGameCard;
