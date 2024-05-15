document.addEventListener("DOMContentLoaded", () => {
    const scrambleText = document.getElementById("scramble-text");
    scrambleText.textContent = Scramble3();
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

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let ampm = " " +  (h >= 12 ? 'PM' : 'AM');
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s + ampm;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
    return i;
}
