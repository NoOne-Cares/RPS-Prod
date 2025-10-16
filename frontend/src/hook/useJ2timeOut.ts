// src/hooks/useJ2Timeout.ts
import { useWriteContract, usePublicClient, useAccount } from 'wagmi';
import { getGameContractConfig } from '../Helpers/gameContract';

export function useJ2Timeout() {
    const { address } = useAccount()
    const publicClient = usePublicClient();
    const { writeContractAsync, isPending } = useWriteContract();

    const execute = async (contractAddress: `0x${string}`) => {
        try {
            const contractConfig = getGameContractConfig(contractAddress);

            const simulation = await publicClient!.simulateContract({
                ...contractConfig,
                functionName: 'j2Timeout',
                account: address,
            });

            return await writeContractAsync(simulation.request);
        } catch (error) {
            console.error("Simulation or write failed:", error);
            throw error;
        }
    };

    return { execute, isPending };
}
