// SELECTORS & VARIABLES
const display = document.getElementById('display')
const startStopBtn = document.getElementById('start-stop')
const lapResetBtn = document.getElementById('lap-reset')
const lapTimes = document.getElementById('lap-times')

let displayCounter = 0;
let lapCounter = 0;
let displayInterval = null;
let lapInterval = null;
let watchStatus = 'stopped';
let lapNumber = 1;

// FUNCTIONS
updateDisplay = () => {
    
    // Increment display counter
    displayCounter++;
    
    // Define and format minutes, seconds, and centiseconds
    let min = Math.floor(displayCounter / 6000);
    let sec = Math.floor((displayCounter - (min * 6000)) / 100);
    let cs = displayCounter % 100;
    
    // Add leading zero
    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;
    if (cs < 10) cs = '0' + cs;
    
    // Update display with elapsed time
    document.querySelector('[data-min]').innerText = min;
    document.querySelector('[data-sec]').innerText = sec;
    document.querySelector('[data-cs]').innerText = cs;
}

updateLapTime = () => {

    // Increment lap counter
    lapCounter++;
    
    // Define and format minutes, seconds, and centiseconds
    let min = Math.floor(lapCounter / 6000);
    let sec = Math.floor((lapCounter - (min * 6000)) / 100);
    let cs = lapCounter % 100;
    
    // Add leading zero
    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;
    if (cs < 10) cs = '0' + cs;

    // Display current lap time
    lapTimes.firstChild.innerHTML = 
        `<span class="column-left">Lap <span class="lato">${lapNumber}</span></span>
        <span class="column-right">${min}:${sec}.${cs}</span>`
}

start = () => {
    if (displayInterval || lapInterval) {
        return;
    }
    displayInterval = setInterval(updateDisplay, 10);
    lapInterval = setInterval(updateLapTime, 10);
    watchStatus = 'started';

    // Change the buttons to display "Stop" and "Lap"
    startStopBtn.innerText = 'Stop';
    lapResetBtn.innerText = 'Lap';

    if (document.getElementById('lap-container').classList.contains('disabled')) {
        document.getElementById('lap-container').classList.replace('disabled','enabled')
    }
}

stop = () => {
    clearInterval(displayInterval);
    clearInterval(lapInterval);
    displayInterval = null;
    lapInterval = null;
    watchStatus = 'stopped';

    // Change the buttons to display "Start" and "Reset"
    startStopBtn.innerText = 'Start';
    lapResetBtn.innerText = 'Reset';
}

addLap = () => {
    // Create new lap at top of list
    let listItem = document.createElement('li');
    lapTimes.insertBefore(listItem, lapTimes.firstChild)

    // Reset lap time to 00:00.00
    lapCounter = 0;
}

reset = () => {
    displayCounter = 0;
    lapCounter = 0;
    lapNumber = 1;

    // Reset the display
    document.querySelector('[data-min]').innerText = '00';
    document.querySelector('[data-sec]').innerText = '00';
    document.querySelector('[data-cs]').innerText = '00';

    // Reset the lap times
    lapTimes.innerHTML = '<li></li>';
    
    // Change the button from "Reset" to "Lap"
    lapResetBtn.innerText = 'Lap';
}

// EVENT LISTENERS
startStopBtn.addEventListener('click', () => {
    // Run start function
    if (watchStatus === 'stopped') {
        start();
            
    // Run stop function
    } else {
        stop();
    }
});

lapResetBtn.addEventListener('click', () => {
    // Increment lapNumber and run addLap function
    if (watchStatus === 'started') {
        lapNumber++;
        addLap();
    
    // Run reset function
    } else {
        reset();

        // Disable the 'lap-container' div
        if (document.getElementById('lap-container').classList.contains('enabled')) {
            document.getElementById('lap-container').classList.replace('enabled','disabled')
        }
    }
})

reset();