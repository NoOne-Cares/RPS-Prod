import { Router } from "express";
import { requireSiweAuth } from "../middleware/Auth.middleware";
import { createGame, decideWiner, deleteGame, getFinishedGamesByPlayer, getGamesByPlayer2, getMyGames, getplayer2move, secondMove } from "../controllers/Game.controler";

const GameRouter = Router()

GameRouter.route('/creategame').post(requireSiweAuth, createGame)
GameRouter.route('/secondmove').post(requireSiweAuth, secondMove)
GameRouter.route('/getallgames').get(requireSiweAuth, getFinishedGamesByPlayer)
GameRouter.route('/gmaemyme').get(requireSiweAuth, getMyGames)
GameRouter.route('/revel').post(requireSiweAuth, decideWiner)
GameRouter.route('/gameforme').get(requireSiweAuth, getGamesByPlayer2)
GameRouter.route('/getsecondmove').get(requireSiweAuth, getplayer2move)
GameRouter.route('/deltegame').delete(requireSiweAuth, deleteGame)


export default GameRouter