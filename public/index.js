let spaceHoldInterval = 500;

document.addEventListener("DOMContentLoaded", () => {
    const scrambleText = document.getElementById("scramble-text");
    const timerText = document.getElementById("timer-text");
    const timerArea = document.getElementById("main-area");
    scrambleText.textContent = Scramble3();
    let timerRunning = false;
    let startTime;
    let spacePressedTime;
    let timerColorTimeout;
    let elapsedTime = 0; // Keep track of elapsed time
    let timerJustStopped = false;

    // Function to update the timer display
    function updateTimer() {
        if (timerRunning) {
            elapsedTime = (new Date() - startTime) / spaceHoldInterval;
            document.getElementById('timer-text').innerText = elapsedTime.toFixed(2);
            requestAnimationFrame(updateTimer);
        }
    }

    // Function to start the timer
    function startTimer() {
        if (!timerRunning) {
            timerRunning = true;
            startTime = new Date(); // Continue from the elapsed time
            document.documentElement.style.setProperty('--timer-color', 'white');
            updateTimer(); // Start the timer update loop
        }
    }

    // Function to stop the timer
    function stopTimer() {
        document.getElementById('timer-text').innerText = elapsedTime.toFixed(2);
        timerRunning = false;
        document.getElementById('scramble-text').innerText = Scramble3(); // Clear scramble text when stopping the timer
    }

    document.addEventListener('keydown', (e) => {
        e.preventDefault()
        if (e.key === ' ' && !timerRunning && !e.repeat) {
            spacePressedTime = new Date();
            document.documentElement.style.setProperty('--timer-color', 'red');
            timerJustStopped = false
            timerColorTimeout = setTimeout(() => {
                if (!timerRunning) {
                    document.documentElement.style.setProperty('--timer-color', 'green');
                }
            }, spaceHoldInterval);
        } else if (e.key === ' ' && timerRunning && !e.repeat) {
            stopTimer();
            timerJustStopped = true;
        }
    });

    document.addEventListener('keyup', (e) => {
        e.preventDefault();
        if (e.key === ' ') {
            clearTimeout(timerColorTimeout);
            if(!timerRunning && !timerJustStopped) {
                if (new Date() - spacePressedTime >= spaceHoldInterval) {
                    startTimer();
                } else {
                    document.documentElement.style.setProperty('--timer-color', 'white');
                }
            }
        }
    });
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


