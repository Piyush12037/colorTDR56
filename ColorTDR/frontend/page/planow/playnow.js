document.addEventListener("DOMContentLoaded", function () {
    // Retrieve balance from local storage or set default value
    var balance = localStorage.getItem('balance');
    if (!balance) {
        balance = 1000;
        localStorage.setItem('balance', balance);
    } else {
        balance = parseFloat(balance);
    }

    // Update balance in the UI
    function updateBalance() {
        document.getElementById('balanceHeader').textContent = 'Balance: $' + balance.toFixed(2);
    }
    updateBalance();

    // Deposit function
    document.getElementById('depositBtn').addEventListener('click', function () {
        var amount = parseFloat(document.getElementById('amount').value);
        if (!isNaN(amount) && amount > 0) {
            balance += amount;
            localStorage.setItem('balance', balance);
            updateBalance();
        } else {
            alert('Please enter a valid amount for deposit.');
        }
    });

    // Withdraw function
    document.getElementById('withdrawBtn').addEventListener('click', function () {
        var amount = parseFloat(document.getElementById('amount').value);
        if (!isNaN(amount) && amount > 0 && amount <= balance) {
            balance -= amount;
            localStorage.setItem('balance', balance);
            updateBalance();
        } else {
            alert('Please enter a valid amount for withdrawal or you do not have sufficient balance.');
        }
    });
});
