const findWinner = (player1Move: number, player2Move: number): number => {
    if (player1Move === player2Move) return 0;
    if (player1Move === 0) return 2;

    const sameParity = player1Move % 2 === player2Move % 2;

    if (sameParity) {
        return player1Move < player2Move ? 1 : 2;
    } else {
        return player1Move > player2Move ? 1 : 2;
    }
};

export default findWinner;
