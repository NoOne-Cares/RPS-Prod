import { abi } from './contractHelper';

export const getGameContractConfig = (address: `0x${string}`) => ({
    abi,
    address,
} as const);
