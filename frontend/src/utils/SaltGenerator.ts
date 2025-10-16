const generateSalt = (): bigint => {
    const min = 10_000_000_000_000_000n;         // 10^15
    const max = 99_999_999_999_999_999n;         // just under 10^16

    const range = max - min + 1n;
    const rand = BigInt(Math.floor(Math.random() * Number(range)));

    return min + rand;
}

import { keccak256, encodeAbiParameters } from 'viem';

function hash(c: number, salt: bigint): `0x${string}` {
    const encoded = encodeAbiParameters(
        [
            { name: '_c', type: 'uint8' },
            { name: '_salt', type: 'uint256' },
        ],
        [c, salt]
    );

    const hashed = keccak256(encoded);
    return hashed;
}



export { hash, generateSalt }



