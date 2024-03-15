document.getElementById('kycForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var panCard = document.getElementById('panCard').value;
    var aadharCard = document.getElementById('aadharCard').value;

    // Storing form data in local storage with keys prefixed with "info_"
    localStorage.setItem('info_fullName', fullName);
    localStorage.setItem('info_email', email);
    localStorage.setItem('info_phone', phone);
    localStorage.setItem('info_address', address);
    localStorage.setItem('info_panCard', panCard);
    localStorage.setItem('info_aadharCard', aadharCard);

    // Redirecting to playzone.html after submission
    window.location.href = '../planow/playnow.html';
});
