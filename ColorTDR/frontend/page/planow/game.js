document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch balance from local storage
    function fetchBalance() {
        var balance = parseFloat(localStorage.getItem('balance'));
        return isNaN(balance) ? 1000 : balance; // Default balance is 1000 if not found
    }

    // Function to update balance in the UI
    function updateBalanceUI() {
        var balance = fetchBalance();
        document.getElementById('balance').textContent = `Balance: $${balance.toFixed(2)}`;
    }

    // Function to calculate the current period number
    function calculatePeriodNumber() {
        var currentTime = new Date().getTime();
        var periodStart = 134234567000; // Start period number
        var periodDuration = Math.floor((currentTime - periodStart) / 10000); // Duration in 10-second intervals
        var randomIncrement = Math.floor(Math.random() * 349) + 1; // Random increment between 1 and 349
        return periodDuration + randomIncrement + 1; // Adding 1 as period starts from 1
    }

    // Function to update the period display
    function updatePeriodDisplay() {
        var period = calculatePeriodNumber();
        document.getElementById('periodNumber').textContent = `Period: ${period}`;
    }

    // Function to calculate color outcome based on the period number and bet color
    function calculateColorOutcome(periodNumber, betColor, betAmount) {
        var sum = periodNumber % 100; // Get last two digits of period number
        var color = '';
        var profit = 0;

        if (sum < 10) {
            if ((sum % 2 !== 0 && betColor === 'green') || (sum % 2 === 0 && betColor === 'red')) {
                color = betColor;
                profit = betAmount * 2; // Double the bet amount if correct color
            } else {
                color = 'violet'; // Incorrect color, set as violet
                profit = -betAmount; // Deduct the bet amount
            }
        } else if (sum > 10 && sum < 15) {
            if ((sum % 2 === 0 && betColor === 'green') || (sum % 2 !== 0 && betColor === 'red')) {
                color = betColor;
                profit = betAmount * 2; // Double the bet amount if correct color
            } else {
                color = 'violet'; // Incorrect color, set as violet
                profit = -betAmount; // Deduct the bet amount
            }
        } else {
            color = 'violet'; // Set color as violet
            profit = betAmount * 2; // Double the bet amount if correct color
        }

        return { color: color, profit: profit };
    }

    // Function to display outcome message with color box
    function displayOutcome(message, color) {
        var outcomeMessage = document.getElementById('outcomeMessage');
        outcomeMessage.textContent = message;
        outcomeMessage.style.color = color;

        var outcomeColorBox = document.getElementById('outcomeColorBox');
        outcomeColorBox.style.backgroundColor = color;
    }

    // Function to handle bet submission
    function handleBetSubmission(e) {
        e.preventDefault(); // Prevent form submission
        var betAmount = parseFloat(document.getElementById('betAmount').value);
        var selectedColor = document.querySelector('input[name="color"]:checked');

        if (!isNaN(betAmount) && betAmount > 0 && selectedColor) {
            var betColor = selectedColor.value;
            var balance = fetchBalance();
            var periodNumber = calculatePeriodNumber();
            var outcome = calculateColorOutcome(periodNumber, betColor, betAmount);

            var resultMessage = '';
            var profit = outcome.profit;
            balance += profit;
            if (profit >= 0) {
                resultMessage = `Congratulations! You won $${profit.toFixed(2)}!`;
            } else {
                resultMessage = `Oops! You lost $${(-profit).toFixed(2)}. Better luck next time!`;
            }

            localStorage.setItem('balance', balance);
            updateBalanceUI();
            displayOutcome(resultMessage, outcome.color);
        } else {
            displayOutcome('Please enter a valid bet amount and select a color.', 'black');
        }
    }

    // Set up event listener for bet submission form
    var betForm = document.getElementById('betForm');
    betForm.addEventListener('submit', handleBetSubmission);

    // Update the period display on page load and every 10 seconds
    updatePeriodDisplay();
    setInterval(updatePeriodDisplay, 10000);

    // Initialize balance UI on page load
    updateBalanceUI();
});
