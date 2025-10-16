import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'
import type { AuthStatus, CreatedGame, Game } from '../types/Types'

export const Games = atom<Game[]>()


export const AuthAtom = atom<AuthStatus>('loading');
export const GameCreatedByMe = atom<Game[]>([]);
export const GameCretedForMe = atom<Game[]>([])
export const CompletedGames = atom<Game[]>([])
export const CreatedGamesWithSalt = atomWithStorage<CreatedGame[]>('createdGame', [])


export const updateGame = atom(null, (get, set, update: Partial<Game> & { contractAddress: `0x${string}` }) => {
  const currentGames = get(GameCreatedByMe)
  const updatedGames = currentGames.map(game =>
    game.contractAddress === update.contractAddress
      ? { ...game, ...update }
      : game
  )
  set(GameCreatedByMe, updatedGames)
}
)

export const syncAllPlayer1Moves = atom(
  null,
  (get, set) => {
    const games = get(GameCreatedByMe)
    const createdWithSalt = get(CreatedGamesWithSalt)

    const updatedGames = games.map(game => {
      const match = createdWithSalt.find(g => g.contractAddress === game.contractAddress)
      if (!match) return game

      return {
        ...game,
        player1move: match.move
      }
    })

    set(GameCreatedByMe, updatedGames)
  }
)

// const syncMoves = useSetAtom(syncAllPlayer1Moves)
//   const updateSingleMove = useSetAtom(updatePlayer1MoveByContract)

//   const handleSyncAll = () => {
//     syncMoves() // updates all matching games
//   }

//   const handleUpdateOne = () => {
//     updateSingleMove({
//       contractAddress: '0xabc123...' as `0x${string}`,
//       move: 2
//     })
//   }

export const updatePlayer1MoveByContract = atom(
  null,
  (
    get,
    set,
    contractAddress: `0x${string}`
  ) => {
    const createdWithSalt = get(CreatedGamesWithSalt)
    const moveMatch = createdWithSalt.find(g => g.contractAddress === contractAddress)

    if (!moveMatch) {
      console.warn(`No move found for contract: ${contractAddress}`)
      return
    }

    const currentGames = get(GameCreatedByMe)

    const updatedGames = currentGames.map(game =>
      game.contractAddress === contractAddress
        ? { ...game, player1move: moveMatch.move }
        : game
    )

    set(GameCreatedByMe, updatedGames)
  }
)

// const updateMove = useSetAtom(updatePlayer1MoveByContract)

//   const handleClick = () => {
//     updateMove('0xabc123...' as `0x${string}`)
//   }