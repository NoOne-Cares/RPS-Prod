export type Option = {
    label: string;
    value: number;
    image: string;
};

//type to store the salt and move in local storage
export type CreatedGame = {
    contractAddress: `0x${string}`
    move: number
    salt: string
}

// all the games the user has played or participated
export type Game = {
    contractAddress: `0x${string}` | undefined
    value: number
    player1: `0x${string}` | undefined
    player2: `0x${string}` | undefined
    player1move: `0x${string}` | number
    player2move?: null | number
    createdAt: number
    winner?: null | string
    claimable?: boolean
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';