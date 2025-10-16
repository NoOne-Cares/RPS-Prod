import { Link } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { useAtomValue } from "jotai";
import { AuthAtom } from "../utils/store";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const HeroHome = () => {

    const AuthStatus = useAtomValue(AuthAtom)
    return (
        <section className="bg-white min-h-[80vh] flex items-center justify-center">
            <div className="text-center px-4 max-w-3xl">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Rock, Paper, Scissors, Lizard, Spock : on Ethereum!
                </h1>
                <p className="text-lg text-gray-700 mb-8 tracking-tight">
                    Challenge friends in a trustless, smart contract-powered game. Every move is on-chain.<br></br>
                    No cheating. Just strategy and fun.
                </p>
                {
                    AuthStatus == "authenticated" ?
                        <Link
                            to='/game'
                            className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 font-semibold hover:scale-105 rounded-lg shadow transition duration-300"
                        >
                            Start Playing
                        </Link> :
                        <div className="inline-block">
                            <ConnectButton />
                        </div>



                }

                <div className="mt-12 flex flex-col items-center">
                    <FaEthereum className="text-blue-500 text-4xl mb-2" />
                    <h2 className="text-xl font-semibold text-gray-800">
                        Powered by Ethereum
                    </h2>
                    <p className="text-gray-600 mt-1 max-w-md">
                        Fully decentralized gameplay. Trust the code, not your opponent.
                    </p>
                    <div className="inline-block">

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroHome;
