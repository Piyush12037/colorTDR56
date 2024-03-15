

if (localStorage.getItem('info_panCard') !== '') {
    window.location.href = './page/planow/playnow.html';
} else {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var username = document.getElementById('loginUsername').value;
        var password = document.getElementById('loginPassword').value;
        var storedUsername = localStorage.getItem('username');
        var storedPassword = localStorage.getItem('password');
        if (username === storedUsername && password === storedPassword) {
            alert('Login successful!');
            window.location.href = './page/planow/playnow.html'; // Redirect to paynow.html after successful login
        } else {
            document.getElementById('loginError').innerText = 'Invalid username or password';
        }
    });

    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var username = document.getElementById('signupUsername').value;
        var password = document.getElementById('signupPassword').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            document.getElementById('signupError').innerText = 'Passwords do not match';
        } else {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            alert('Sign up successful!');
            window.location.href = './page/editinfo/editinfo.html'; // Redirect to editinfo.html after successful sign up
        }
    });

}