let countdown;
const timerDisplay = document.getElementById('timer');
const startStopButton = document.getElementById('startStopBtn');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const audio = new Audio('alarm-10-seconds-piano.mp3');

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            audio.play(); // Add this line to play the sound
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

startStopButton.addEventListener('click', () => {
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);
    const totalSeconds = minutes * 60 + seconds;

    if (startStopButton.textContent === 'Start') {
        timer(totalSeconds);
        startStopButton.textContent = 'Stop';
    } else {
        clearInterval(countdown);
        startStopButton.textContent = 'Start';
    }
});
