import { abi } from './contractHelper.ts';

export const getGameContractConfig = (address: `0x${string}`) => ({
    abi,
    address,
} as const);
