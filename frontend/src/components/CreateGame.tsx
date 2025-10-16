import { useEffect } from 'react';
import { useSetAtom, useAtom } from 'jotai';
import { updateGame, GameCreatedByMe, CreatedGamesWithSalt, CompletedGames } from '../utils/store';
import { useAccount } from 'wagmi';
import ClaimGame from './GamesToBeClaimed';
import ImageSelector from './ImageSelector';
import type { Game } from '../types/Types';
import { decideWinner, getMyGames, getPlayer2Move, deleteGame } from '../Helpers/APIHelper';
import { ToastContainer, toast } from 'react-toastify';
import { useJ2Timeout } from '../hook/useJ2timeOut';
import { useSolve } from '../hook/useSolve';
import { getSocket } from '../utils/Socket';

// import { useHandleDeploy } from '../hook/useHandDeploy';

const CreateGame = () => {
    const { address } = useAccount();
    const setGameHistor = useSetAtom(CompletedGames)
    const [gameCreatedByMe, setGame] = useAtom(GameCreatedByMe);
    const [gameWithsalt, setGameWithSalt] = useAtom(CreatedGamesWithSalt)
    const updateMyGame = useSetAtom(updateGame);
    const notifySuccess = (msg: string) => toast.success(msg)
    const notifyError = (msg: string) => toast.error(msg)

    const { write: solve } = useSolve()
    const { execute } = useJ2Timeout()

    const handleClaim = async (game: Game) => {
        const sixMinutes = 6 * 60 * 1000;
        const timeElapsed = Date.now() - new Date(game.createdAt).getTime();

        try {
            if (game.player2move === null || game.player2move === undefined) {
                const { player2Move } = await getPlayer2Move(game.contractAddress!);

                if (player2Move !== null) {
                    updateMyGame({
                        contractAddress: game.contractAddress!,
                        player2move: player2Move,
                        claimable: true,
                    });
                    await handleSubmit(game);
                } else {
                    // Player2 move still not available, check time
                    if (timeElapsed >= sixMinutes) {
                        const tx = await execute(game.contractAddress!);
                        const req = await deleteGame(game.contractAddress!)
                        notifySuccess("game successfully clamed by calling time out with tx: " + tx)
                        console.log("Executed j2Timeout tx:", req);
                        setGameWithSalt(prev =>
                            prev.filter(g => g.contractAddress !== game.contractAddress)
                        );
                        setGame(prev => prev.filter(g => g.contractAddress !== game.contractAddress))
                    } else {
                        const timeLeft = Math.ceil((sixMinutes - timeElapsed) / 1000);
                        notifyError(`You can claim it after ${timeLeft} sec`);
                    }
                }
            } else {
                await handleSubmit(game);
            }
        } catch (err) {
            console.error("Error in handleClaim:", err);
            notifyError("Something went wrong while claiming the game.");
        }
    };

    const handleSubmit = async (game: Game) => {
        const CurrenGameWithSalt = gameWithsalt.find(g => g.contractAddress === game.contractAddress)

        if (CurrenGameWithSalt) {
            try {
                const tx = await solve(CurrenGameWithSalt.contractAddress, CurrenGameWithSalt.move, CurrenGameWithSalt.salt)
                console.log(tx)
                const res = await decideWinner(CurrenGameWithSalt.contractAddress, CurrenGameWithSalt.move)
                console.log(res)
                notifySuccess("game calimed successfully")
                setGameWithSalt(prev =>
                    prev.filter(game => game.contractAddress !== CurrenGameWithSalt.contractAddress)
                );
                setGame(prev => prev.filter(g => g.contractAddress !== CurrenGameWithSalt.contractAddress))
                setGameHistor((prev) => {
                    const exists = prev.some(game => game.contractAddress === res.contractAddress);
                    return exists ? prev : [...prev, res];
                });
                const socket = getSocket();
                if (socket) {
                    socket?.emit("claim", res)
                }


            } catch (error) {
                console.log(error)
                notifyError("Something went wrong while claiming the game.");
            }
        }
    }


    useEffect(() => {
        if (!address) return;
        const fetchGames = async () => {
            try {
                const myGames = await getMyGames(address);
                console.log("Fetched my games:", myGames);
                setGame(myGames)
            } catch (err) {
                console.error("Error fetching my games:", err);
            }
        };

        fetchGames();
    }, [address]);

    return (
        <div>
            <ToastContainer />
            <ImageSelector />
            <ClaimGame games={gameCreatedByMe} onClaim={handleClaim} />
        </div>
    );
};

export default CreateGame;
