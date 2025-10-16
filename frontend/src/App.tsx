
import './App.css'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home, Page404, Game } from './pages';
import Navbar from './components/Navbar';
import { useAtomValue } from "jotai";
import { AuthAtom, updateGame, GameCretedForMe, CompletedGames } from "./utils/store";
import { disconnectSocket } from './utils/Socket';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useGameSocket } from './hook/useSocket';
import { useSetAtom } from 'jotai';


function App() {
  const { address } = useAccount()
  const AuthStatus = useAtomValue(AuthAtom)
  const updateMyGame = useSetAtom(updateGame);
  const setGamesForMe = useSetAtom(GameCretedForMe)
  const setCompleteGame = useSetAtom(CompletedGames)
  useEffect(() => {

    const handleUnload = () => disconnectSocket;
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      disconnectSocket();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  useGameSocket(address as `0x${string}`, {
    reciveSecondMove: (data) => {
      console.log('Second move received:', data);
      updateMyGame({
        contractAddress: data.contractAddress!,
        player2move: data.player2move,
        claimable: true,
      });
    },
    reciveCreatedGame: (data) => {
      setGamesForMe((prev) => {
        const exists = prev.some(game => game.contractAddress === data.contractAddress);
        return exists ? prev : [...prev, data];
      });
    },
    contractClaimed: (data) => {
      setCompleteGame((prev) => {
        const exists = prev.some(game => game.contractAddress === data.contractAddress);
        return exists ? prev : [...prev, data];
      });
    },
  });


  return (
    <BrowserRouter>
      <div className='flex justify-center'><Navbar /></div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/game' element={AuthStatus == "authenticated" ? <Game /> : <Home />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
