import GameHistory from "./GameHistory";
import { useAtom } from "jotai";
import { CompletedGames } from "../utils/store";
import { useEffect } from "react";
import { getFinishedGames } from "../Helpers/APIHelper";
import { useAccount } from "wagmi";

const GameLogs = () => {
    const { address } = useAccount();
    const [games, setGames] = useAtom(CompletedGames);

    useEffect(() => {
        const fetchFinishedGames = async () => {
            if (!address) return;

            try {
                const finishedGames = await getFinishedGames(address);
                setGames(finishedGames);
            } catch (error) {
                console.error("Error fetching finished games:", error);
            }
        };

        fetchFinishedGames();
    }, [address, setGames]);

    return (
        <div>
            <GameHistory games={games} currentUser={address!} />
        </div>
    );
};

export default GameLogs;
