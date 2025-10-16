import { useState } from "react";
import CreateGame from "./CreateGame";
import JoinGame from "./JoinGame";
import GameLogs from "./GameLogs";



const GameTabs = () => {
    const [activeTab, setActiveTab] = useState<"create" | "join" | "log">("create");

    return (
        <div>
            <div className="flex row max-w-4xl mx-auto bg-white   rounded-full shadow-md">
                <div
                    className={`rounded-tl-full rounded-bl-full basis-1/3 px-4 py-2 font-semibold rounded cursor-pointer ${activeTab === "create"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200  text-gray-800"
                        }`}
                    onClick={() => setActiveTab("create")}
                >
                    Create Game
                </div>
                <div
                    className={`basis-1/3 px-4 py-2 font-semibold cursor-pointer ${activeTab === "join"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={() => setActiveTab("join")}
                >
                    Join Game
                </div>
                <div
                    className={`basis-1/3 px-4 py-2 rounded-tr-full rounded-br-full cursor-pointer font-semibold rounded ${activeTab === "log"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={() => setActiveTab("log")}
                >
                    History
                </div>

            </div>
            <div>
                {activeTab === "create" ? <CreateGame /> : activeTab === "join" ? <JoinGame /> : <GameLogs />}
            </div>

        </div>
    );
};

export default GameTabs;
