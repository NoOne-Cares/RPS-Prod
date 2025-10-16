
import { getGameContractConfig } from '../Helpers/gameContract';
import { useWriteContract, usePublicClient, useAccount } from 'wagmi';

export function useSolve() {
    const publicClient = usePublicClient();
    const { address } = useAccount();
    const { writeContractAsync, isPending } = useWriteContract();


    const write = async (
        contractAddress: `0x${string}`,
        _c1: number,
        salt: string
    ) => {
        try {
            if (!address) throw new Error("Wallet not connected");
            const _salt = BigInt(salt)

            const simulation = await publicClient!.simulateContract({
                ...getGameContractConfig(contractAddress),
                functionName: 'solve',
                args: [_c1, _salt],
                account: address,
            });

            return writeContractAsync(simulation.request);
        }
        catch (error) {
            console.log(error)
        }
    };

    return { write, isPending };
}
