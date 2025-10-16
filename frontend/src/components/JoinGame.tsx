import JoinGameCard from "./JoinGameCard"
import type { Game } from "../types/Types";
import { useAccount } from "wagmi";
import { useAtom } from "jotai";
import { GameCretedForMe } from "../utils/store";
import { getSocket } from "../utils/Socket";
import { getGamesByPlayer2, secondMove } from "../Helpers/APIHelper";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import { usePlay } from "../hook/usePlay";

const JoinGame = () => {
    const { address } = useAccount()
    const [gamesForMe, setGamesForMe] = useAtom(GameCretedForMe)
    const notifySuccess = (msg: string) => toast.success(msg)
    const notifyError = (msg: string) => toast.error(msg)
    const { write: play } = usePlay();
    const handleGameSubmit = async (game: Game, selected: number) => {

        console.log("Submitted move:", selected, "for game:", game.contractAddress);
        if (selected != 0 && selected < 6) {
            const socket = getSocket();
            game.player2move = selected
            socket?.emit("secondmove", game)

            try {
                const tx = await play(game.contractAddress!, selected, game.value)
                console.log(tx)
                await secondMove(game.contractAddress!, selected)
                setGamesForMe(prevGames =>
                    prevGames.filter(prev => game.contractAddress !== prev.contractAddress)
                )

                notifySuccess("game move send successsfully")
            } catch (error) {
                console.log(error)
                notifyError("fail to send move")
            }

        } else {
            notifyError("Plese slect a value")
        }
    };
    useEffect(() => {
        const fectGmae = async () => {
            try {
                const data = await getGamesByPlayer2(address!)
                console.log("resquesting player 2 games")
                console.log(data)
                setGamesForMe(data)
                console.log(address!)
            } catch (error) {
                console.log(error)
            }
        }
        fectGmae()
    }, [address, setGamesForMe])





    return (
        < div className="space-y-2 pt-3">
            <ToastContainer />
            <JoinGameCard games={gamesForMe} handleSubmit={handleGameSubmit} />

        </div>
    )
}

export default JoinGame