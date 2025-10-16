const { Schema, model } = require('mongoose');

const GameSchema = new Schema(
    {
        contractId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        player1: {
            type: String,
            required: true,
            trim: true,
        },
        player2: {
            type: String,
            required: true,
            trim: true,
        },
        player1Move: {
            type: Schema.Types.Mixed, // can be String or Number
            required: true,
            trim: true,
        },
        player2Move: {
            type: Number,
            min: 1,
            max: 5,
            default: null,
        },
        stake: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        gameStatus: {
            type: String,
            enum: ['in-progress', 'completed'],
            default: 'in-progress',
        },
        winner: {
            type: String,
            default: null,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Game = model('Game', GameSchema);

export { Game }

