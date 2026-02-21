// login.js

// Select form and inputs
const authForm = document.getElementById('authForm');
const passwordInput = document.getElementById('password');
const togglePasswordText = document.getElementById('togglePassword');

// Handle login form submit
authForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = passwordInput.value.trim();

    if(email === '' || password === '') {
        alert('Please fill in all fields!');
        return;
    }

    // Dummy login check
    if(email === 'user@example.com' && password === 'password123') {
        // Redirect to websiteorig index.html
       window.location.href = '../websiteorig/index.html';



    } else {
        alert('Invalid email or password!');
    }
});

// Show/Hide password toggle
togglePasswordText.addEventListener('click', function() {
    if(passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordText.textContent = 'Hide Password';
    } else {
        passwordInput.type = 'password';
        togglePasswordText.textContent = 'Show Password';
    }
});

// Sign Up button click
document.getElementById('signupBtn').addEventListener('click', function() {
    alert('Redirecting to Sign Up page...');
});

// Forgot Password click
document.getElementById('forgotPassword').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Redirecting to Forgot Password page...');
});
