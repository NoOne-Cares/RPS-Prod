import {
    getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { baseSepolia, sepolia, mainnet } from 'viem/chains';
import type { Chain } from '@rainbow-me/rainbowkit';

// ✅ Define Anvil chain compatible with wagmi/RainbowKit (not viem)
const anvil = {
    id: 31337,
    name: 'Anvil',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
    iconBackground: '#fff',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['http://localhost:8545'] },
    },
    blockExplorers: {
        default: { name: 'Local Explorer', url: '' },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 1,
        },
    },
} as const satisfies Chain;


const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: import.meta.env.VITE_WALLET_CONNNECT_PROJECT_ID ?? "",
    chains: [anvil, baseSepolia, sepolia, mainnet],
    ssr: false,
});

export default config;








