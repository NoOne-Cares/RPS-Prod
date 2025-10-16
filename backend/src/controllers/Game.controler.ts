import { AsyncHandler } from "../utils/AysncHandler";
import { ethers, toNumber } from "ethers";
import { Game } from "../models/Gmae.model";
import findWinner from "../utils/findWinner";
const createGame = AsyncHandler(async (req, res) => {
    const { contractId, player1, player2, player1Move, stake } = req.body;

    if (!contractId || !player1 || !player2 || !player1Move || !stake) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    if (!ethers.isAddress(player1) || !ethers.isAddress(player2)) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingGame = await Game.findOne({ contractId });
    if (existingGame) {
        return res.status(409).json({ error: 'Game with this contractId already exists.' });
    }

    const newGame = await Game.create({
        contractId,
        player1,
        player2,
        player1Move,
        stake,
        gameStatus: 'in-progress',
    });

    return res.status(201).json({ message: 'Game created successfully.', game: newGame });
});


const secondMove = AsyncHandler(async (req, res) => {
    const { contractId, player2Move } = req.body;

    if (!contractId || player2Move === undefined) {
        return res.status(400).json({ error: 'contractId and player2Move are required.' });
    }

    const game = await Game.findOne({ contractId });

    if (!game) {
        return res.status(404).json({ error: 'Game not found.' });
    }

    if (game.gameStatus === 'completed') {
        return res.status(400).json({ error: 'Game is already completed.' });
    }

    game.player2Move = player2Move;
    game.gameStatus = 'completed';

    await game.save();

    return res.status(200).json({
        message: 'Player 2 move recorded. Game completed.',
        game,
    });
});

const decideWiner = AsyncHandler(async (req, res) => {
    const { contractId, player1Move } = req.body;

    if (!contractId || player1Move === undefined) {
        return res.status(400).json({ error: 'contractId and player2Move are required.' });
    }

    const game = await Game.findOne({ contractId });

    if (!game) {
        return res.status(406).json({ error: 'Game not found.' });
    }


    game.player1Move = player1Move;

    if (game.player2Move) {
        const num = findWinner(toNumber(game.player1Move), game.player2Move)
        if (num == 1) game.winner = game.player1
        else if (num == 2) game.winner = game.player2
        else game.winner = "draw"
    }
    await game.save();

    return res.status(200).json({
        message: 'Player 2 move recorded. Game completed.',
        game,
    });
});

const getMyGames = AsyncHandler(async (req, res) => {
    const { player1 } = req.query;

    if (!player1 || typeof player1 !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid player1 parameter.' });
    }

    if (!ethers.isAddress(player1)) {
        return res.status(400).json({ error: 'Invalid player1 address' });
    }

    const games = await Game.find({ player1, winner: null }).exec();

    return res.status(200).json(games);
});

const getGamesByPlayer2 = AsyncHandler(async (req, res) => {
    const { player } = req.query;
    console.log(player)
    if (!player || typeof player !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid player address' });
    }

    if (!ethers.isAddress(player)) {
        return res.status(400).json({ error: 'Invalid Ethereum address' });
    }

    const games = await Game.find({ player2: player, gameStatus: 'in-progress' }).exec();

    return res.status(200).json(games);
});

const getFinishedGamesByPlayer = AsyncHandler(async (req, res) => {
    const { player } = req.query;

    if (!player) {
        return res.status(400).json({ error: 'Missing player address' });
    }

    if (!ethers.isAddress(player)) {
        return res.status(400).json({ error: 'Invalid Ethereum address' });
    }

    const games = await Game.find({
        winner: { $ne: null },
        $or: [
            { player1: player },
            { player2: player }
        ]
    }).exec();

    return res.status(200).json(games);
});


const getplayer2move = AsyncHandler(async (req, res) => {
    const { contract } = req.query;

    if (!contract) {
        return res.status(400).json({ error: 'Contract address is required.' });
    }

    const game = await Game.findOne({ contractId: contract });

    if (!game) {
        return res.status(406).json({ error: 'Game not found.' });
    }

    if (game.gameStatus === 'completed') {
        return res.status(200).json({
            message: 'Game is completed.',
            player2Move: game.player2Move,
        });
    }

    return res.status(200).json({
        message: 'Player 2 move is not yet made.',
        player2Move: game.player2Move ?? null,
    });
});
const deleteGame = AsyncHandler(async (req, res) => {
    const { contractId } = req.body;

    if (!contractId || typeof contractId !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid contractId.' });
    }

    const game = await Game.findOne({ contractId });

    if (!game) {
        return res.status(404).json({ error: 'Game not found.' });
    }

    await game.deleteOne();

    return res.status(200).json({ message: 'Game deleted successfully.' });
});




export { secondMove, createGame, decideWiner, getMyGames, getGamesByPlayer2, getFinishedGamesByPlayer, getplayer2move, deleteGame };
