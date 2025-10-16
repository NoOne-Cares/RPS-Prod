import GameSwitcher from "../components/GameSwitcher"
import { AuthAtom } from "../utils/store"
import { useAtomValue } from "jotai"
import { Navigate } from "react-router-dom";
const Game = () => {
    const authStatus = useAtomValue(AuthAtom)


    if (authStatus != "authenticated") {
        return <Navigate to="/" replace />;
    }
    return (
        <div className="pt-4">
            <div className="w-max-2xl">
                <GameSwitcher />
            </div>

        </div>
    )
}

export default Game