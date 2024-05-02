// Function to generate a random jackpot number
function generateJackpotNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

// Function to update the jackpot number display
function updateJackpotDisplay(number) {
    document.getElementById('jackpotNumber').textContent = 'Jackpot number: ' + number;
}

// Function to show the jackpot hit message
function showJackpotHit() {
    var jackpotMessage = document.getElementById('jackpotMessage');
    jackpotMessage.classList.add('show');
    setTimeout(function() {
        jackpotMessage.classList.remove('show');
    }, 3000); // The message will be displayed for 3 seconds
}

// Set the initial jackpot number and update the display
var jackpotNumber = generateJackpotNumber();
updateJackpotDisplay(jackpotNumber);

// Variable to keep the last rolled number
var lastRolledNumber = 0;

// Event listener for the "Roll Dice" button
document.getElementById('rollButton').addEventListener('click', function() {
    lastRolledNumber = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').textContent = 'You rolled: ' + lastRolledNumber;

    // Check if the player hits the jackpot
    if (lastRolledNumber === jackpotNumber) {
        showJackpotHit();
    }
});

// Event listener for the "Regenerate Jackpot Number" button
document.getElementById('regenerateButton').addEventListener('click', function() {
    jackpotNumber = generateJackpotNumber(); // Regenerate the jackpot number
    updateJackpotDisplay(jackpotNumber);

    // Check if the new jackpot number matches the last rolled number
    if (lastRolledNumber === jackpotNumber) {
        showJackpotHit();
    }
});
