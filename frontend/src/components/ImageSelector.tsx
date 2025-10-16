import { useState } from "react";
import ImageOptions from "../utils/imageOptions";
import type { Game } from "../types/Types";
import { useAccount } from "wagmi";
import { useDeployContract } from "../hook/useDeployContract";
import { connectSocket } from '../utils/Socket'
// import { useGameSocket } from "../hook/useSocket";
import { ToastContainer, toast } from 'react-toastify';
import { ethers } from 'ethers'
import { hash } from "../utils/SaltGenerator";
import { useSetAtom } from "jotai";
import { GameCreatedByMe } from "../utils/store";
import { createGame } from "../Helpers/APIHelper";
import { type CreateGamePayload } from "../Helpers/APIHelper";
const ImageSelector = () => {
    const { address } = useAccount()
    const { deployContractToChain } = useDeployContract();
    const [key, setKey] = useState<`0x${string}` | undefined>(undefined)
    const [selected, setSelected] = useState<number | null>(null);
    const [stake, setStake] = useState<number>();
    const setCreatedGame = useSetAtom(GameCreatedByMe)

    const handleSelect = (value: number) => {
        setSelected(value)
    };

    const showToast = (mesg: string) => toast.error(mesg);
    const showToastSuccess = (mesg: string) => toast.success(mesg);
    // const handleKey = (key: string) => {
    //     setCreatedGame(prev => ({ ...prev, player2: key as string }));
    // }
    // useGameSocket(address as `0x${string}`, {
    //     reciveCreatedGame: (data) => {
    //         console.log('Game created:', data);
    //     },
    //     reciveSecondMove: (data) => {
    //         console.log('Second move received:', data);
    //     },
    //     contractClaimed: (data) => {
    //         console.log('Contract claimed:', data);
    //     },
    // });

    const HandleSubmit = async () => {
        const currentstake = Number(stake)
        const currentKey = key!
        const currentMove = Number(selected)

        if (currentMove! > 6 || currentMove! < 0 || !currentstake || currentstake < 0 || !ethers.isAddress(address!) || !ethers.isAddress(currentKey!)) {
            showToast("Invalid Input")
            return
        }
        const createdGame: Game = {
            contractAddress: undefined,
            value: currentstake,
            player1: address!,
            player2: key!,
            player1move: currentMove,
            createdAt: Date.now()
        }


        const response = await deployContractToChain(createdGame);

        if (response) {
            createdGame.contractAddress = response.contractAddress
            const hashedPlayerMove = hash(createdGame.player1move as number, BigInt(response.salt))
            createdGame.player1move = hashedPlayerMove
            // hasded the player player move and send it using socket
            const updatedGame = {
                ...createdGame,
                player1move: hashedPlayerMove
            }
            handleSocket(updatedGame)

            setCreatedGame((prev) => {
                const exists = prev.some(game => game.contractAddress === createdGame.contractAddress);
                return exists ? prev : [...prev, createdGame];
            });

            try {
                const gamePayload: CreateGamePayload = {
                    contractId: response.contractAddress,
                    player1: address!,
                    player2: key!,
                    player1Move: hashedPlayerMove, // rock = 1, paper = 2, etc.
                    stake: currentstake,
                };
                await createGame(gamePayload)
                showToastSuccess("contract created successsfully")
            } catch (error) {
                console.log(error)
                showToast("somthing went wrong")
            }


        }

    };

    const handleSocket = (game: Game) => {
        let socket
        if (address) socket = connectSocket(address)
        if (socket) {
            socket.emit("createContract", game)
        }

    }


    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <ToastContainer />
            <h2 className="text-2xl font-bold text-center text-gray-800">Select Your Move</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {ImageOptions.map((option) => (
                    <div
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
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
                        <p className="text-center mt-1 text-gray-700 ">{option.label}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center">
                <input
                    type="text"
                    placeholder="Opponent Public Key"
                    value={key}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value.startsWith('0x')) {
                            setKey(value as `0x${string}`);
                        } else {
                            setKey(undefined);
                        }
                    }}
                    className="px-4 py-2 rounded border border-gray-300  bg-gray-50  text-gray-800  w-full sm:w-96"
                />
                <input
                    type="number"
                    min={0}
                    placeholder="Stake (ETH)"
                    value={stake ?? ""} // fallback to empty string if null/undefined
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                            setStake(undefined); // allow empty input
                        } else {
                            setStake(Number(value));
                        }
                    }}
                    className="px-4 py-2 rounded border border-gray-300 bg-gray-50 text-gray-800 w-full sm:w-40"
                />

            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                    // onClick={handleSocket}
                    onClick={HandleSubmit}
                    className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 font-semibold hover:scale-105 rounded-xl shadow transition duration-300 cursor-pointer"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ImageSelector;
