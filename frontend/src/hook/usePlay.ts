// import { useSimulateContract, useWriteContract } from 'wagmi';
// import { parseEther } from 'viem';
// import { getGameContractConfig } from '../Helpers/gameContract';

// export function usePlay(contractAddress: `0x${string}`, _c2: number, stake: number) {
//     const { data: simulation, error: simulationError, status } = useSimulateContract({
//         ...getGameContractConfig(contractAddress),
//         functionName: 'play',
//         args: [_c2],
//         value: parseEther(stake.toString()),
//     });

//     const { writeContractAsync, isPending } = useWriteContract();

//     const write = async () => {






//         if (!simulation) {
//             throw new Error("Simulation not ready or failed");
//         }
//         return writeContractAsync(simulation.request);
//     };

//     return { write, isPending, simulationError, simulationStatus: status };
// }

import { useAccount, usePublicClient, useWalletClient, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import { getGameContractConfig } from '../Helpers/gameContract';

export function usePlay() {
    const { address } = useAccount();
    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();



    const { writeContractAsync, isPending } = useWriteContract();

    const write = async (contractAddress: `0x${string}`, _c2: number, stake: number) => {
        if (!address) throw new Error('Connect wallet first');
        if (!walletClient) throw new Error('Wallet client not ready');
        if (!publicClient) throw new Error('Public client not ready');

        // Simulate the contract call
        const simulation = await publicClient.simulateContract({
            ...getGameContractConfig(contractAddress),
            functionName: 'play',
            args: [_c2],
            value: parseEther(stake.toString()),
            account: address,
        });

        if (!simulation) throw new Error('Simulation failed');

        return writeContractAsync(simulation.request);
    };

    return { write, isPending };
}
