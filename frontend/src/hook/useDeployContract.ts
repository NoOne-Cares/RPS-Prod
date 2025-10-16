import {
    useAccount,
    useWalletClient,
    usePublicClient
} from 'wagmi'

import { keccak256, solidityPacked, parseEther } from "ethers";
import { abi, bytecode } from '../Helpers/contractHelper'
import type { Game } from '../types/Types'
import { generateSalt } from '../utils/SaltGenerator'
import { useSetAtom } from 'jotai'
import { CreatedGamesWithSalt } from '../utils/store'

export function useDeployContract() {
    const { address } = useAccount()
    const { data: walletClient } = useWalletClient()
    const publicClient = usePublicClient()
    const setCreatedGame = useSetAtom(CreatedGamesWithSalt)

    async function deployContractToChain(game: Game): Promise<{ contractAddress: `0x${string}`, salt: bigint } | undefined> {
        if (!walletClient || !address) {
            alert('Connect wallet first')
            return
        }

        const salt = generateSalt()
        const c1 = game.player1move as number
        const encoded = solidityPacked(["uint8", "uint256"], [c1, salt]);
        const c1Hash = keccak256(encoded);
        const j2 = game.player2
        const value = parseEther(game.value.toString())
        console.log(c1 + "       " + salt + "         " + c1Hash)
        try {
            const hash = await walletClient.deployContract({
                abi,
                //@ts-expect-error figure this out later
                bytecode,
                args: [c1Hash, j2],
                value,
                account: address,
            })

            console.log('Deploy tx hash:', hash)

            if (!publicClient) return

            const receipt = await publicClient.waitForTransactionReceipt({ hash })

            console.log('Contract deployed at:', receipt.contractAddress)
            const saltString = salt.toString()
            setCreatedGame((prev) => [
                ...prev,
                {
                    contractAddress: receipt.contractAddress!,
                    move: c1,
                    salt: saltString,
                }
            ])
            console.log("store updated")
            return {
                contractAddress: receipt.contractAddress!,
                salt
            }
        } catch (err) {
            console.error('Deployment failed:', err)
        }
    }

    return { deployContractToChain }
}
