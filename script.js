let countdown;
const timerDisplay = document.getElementById('timer');
const startStopButton = document.getElementById('startStopBtn');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const audio = new Audio('https://raw.githubusercontent.com/victorliu5296/html-timer/main/alarm-10-seconds-piano.mp3');
const volumeSlider = document.getElementById('volumeSlider');

window.addEventListener('load', () => {
    // Obtain search parameters from the URL
    const searchParams = new URLSearchParams(window.location.search);
    
    // Get the 'minutes' and 'seconds' parameters from the URL
    const minutesFromURL = searchParams.get('minutes');
    const secondsFromURL = searchParams.get('seconds');
    const volumeFromURL = searchParams.get('volume');
    
    // Update the timer and volume if parameters are provided
    if (minutesFromURL){
        minutesInput.value = parseInt(minutesFromURL, 10);
    }

    else if (secondsFromURL) {
        secondsInput.value = parseInt(secondsFromURL, 10);
    }
    
    if (volumeFromURL) {
        const volumeValue = Math.min(Math.max(parseFloat(volumeFromURL), 0), 1); // Clamp volume between 0 and 1
        audio.volume = volumeValue; // Update the audio volume
        volumeSlider.value = volumeValue; // Update the slider position
        document.getElementById('volumePercent').textContent = `${Math.round(volumeValue * 100)}%`; // Update the volume label
    }
});

// Update the audio volume in real-time as the slider moves
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
    document.getElementById('volumePercent').textContent = `${Math.round(volumeSlider.value * 100)}%`; // Update the volume label
});

function displayModal() {
    const modal = document.getElementById('alarmModal');
    modal.style.display = "flex"; // This will show the modal
    audio.play(); // This will play the sound
}

function closeModal() {
    const modal = document.getElementById('alarmModal');
    modal.style.display = "none";
    stopSound();
}

// Set up the event listener to close the modal on any click
document.addEventListener('click', function() {
    closeModal();
});

function stopSound() {
    audio.pause(); // Stop the sound
    audio.currentTime = 0; // Reset the sound to the start
}

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            audio.play(); // Play sound at end
            displayModal();
            startStopButton.textContent = 'Start'; // Reset button text
            // Stop the sound after 10 seconds
            setTimeout(stopSound, 10000); // 10000 milliseconds = 10 seconds
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

function startTimer() {
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);
    const totalSeconds = (minutes * 60) + seconds;
    timer(totalSeconds);
}

startStopButton.addEventListener('click', () => {
    if (startStopButton.textContent === 'Start') {
        startTimer();
        startStopButton.textContent = 'Stop';
    } else {
        clearInterval(countdown);
        timerDisplay.textContent = '0:00'; // Reset timer display
        minutesInput.value = 0; // Reset minutes input
        secondsInput.value = 0; // Reset seconds input
        startStopButton.textContent = 'Start'; // Reset button text
    }
});
