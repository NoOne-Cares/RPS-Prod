import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import config from '../rainbowKit'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { RainbowKitAuthenticationProvider } from '@rainbow-me/rainbowkit'
import authenticationAdapter from './AuthProvider'
import { useAuthenticationStatus } from '../utils/isAuthinticated'
import { useAtomValue } from 'jotai'
import { AuthAtom } from '../utils/store'

const queryClient = new QueryClient();

const RainbowkitProvider = ({ children }: { children: React.ReactNode }) => {
    useAuthenticationStatus();
    const authStatus = useAtomValue(AuthAtom)
    return (

        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitAuthenticationProvider
                    adapter={authenticationAdapter}
                    status={authStatus}
                >
                    <RainbowKitProvider modalSize="compact">
                        {children}
                    </RainbowKitProvider>
                </RainbowKitAuthenticationProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default RainbowkitProvider