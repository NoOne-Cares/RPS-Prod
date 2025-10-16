// wagmi.ts
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
    connectors: [injected()],
    chains: [mainnet],
    transports: {
        [mainnet.id]: http(),
    },
});
