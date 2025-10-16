import { createAuthenticationAdapter } from '@rainbow-me/rainbowkit';
import { createSiweMessage } from 'viem/siwe';
import { AuthAtom } from '../utils/store';
import { getDefaultStore } from 'jotai';
import { disconnectSocket } from '../utils/Socket';

const store = getDefaultStore();


const authenticationAdapter = createAuthenticationAdapter({

    getNonce: async () => {
        const response = await fetch('/api/auth/nonce');
        return await response.text();
    },
    createMessage: ({ nonce, address, chainId }) => {
        return createSiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in with Ethereum to the app.',
            uri: window.location.origin,
            version: '1',
            chainId,
            nonce,
        });
    },
    verify: async ({ message, signature }) => {
        const verifyRes = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, signature }),
        });
        if (verifyRes.ok) {

            store.set(AuthAtom, 'authenticated');

        }
        return Boolean(verifyRes.ok);
    },
    signOut: async () => {
        const res = await fetch('/api/auth/logout');
        if (res.ok) {
            store.set(AuthAtom, 'unauthenticated');
            disconnectSocket()
        }
    },
});

export default authenticationAdapter