import HeroHome from "../components/HeroHome"
import { useAccount } from 'wagmi'
import { useAtomValue } from "jotai"
import { AuthAtom } from "../utils/store"
import { useEffect } from "react"
import { connectSocket } from "../utils/Socket"

const Home = () => {
    const { address } = useAccount()
    const AuthStatus = useAtomValue(AuthAtom)

    useEffect(() => {
        if (address && AuthStatus === "authenticated") {
            connectSocket(address)

        }
    }, [address, AuthStatus])

    return (
        <>
            <HeroHome />
        </>
    )
}

export default Home