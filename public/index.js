document.addEventListener("DOMContentLoaded", () => {

})

function Scramble3() {
    const moves = ['U', 'D', 'L', 'R', 'F', 'B'];
    const variations = ['', '\'', '2'];
    const scrambleLength = 20; // Standard competition scramble length
    let lastMove = '';
    let scramble = [];

    for (let i = 0; i < scrambleLength; i++) {
        let nextMove = moves[Math.floor(Math.random() * moves.length)];
        let variation = variations[Math.floor(Math.random() * variations.length)];

        // Avoiding consecutive moves of the same face
        while (nextMove === lastMove) {
            nextMove = moves[Math.floor(Math.random() * moves.length)];
        }

        scramble.push(nextMove + variation);
        lastMove = nextMove;
    }

    return scramble.join(' ');
}
