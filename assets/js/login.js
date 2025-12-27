document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    const loginError = document.getElementById('login-error');
    const guestBtn = document.getElementById('guest-btn');
    
    // Predefined credentials
    const VALID_USERNAME = 'quizz';
    const VALID_PASSWORD = 'quizfy';
    
    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        usernameError.style.display = 'none';
        passwordError.style.display = 'none';
        loginError.style.display = 'none';
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        // Simple validation
        let isValid = true;
        
        if (!username) {
            usernameError.style.display = 'block';
            isValid = false;
        }
        
        if (!password) {
            passwordError.style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // Check credentials
            if (username === VALID_USERNAME && password === VALID_PASSWORD) {
                // Store login status
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                
                // Redirect to categories page
                window.location.href = 'category.html';
            } else {
                // Show error message
                loginError.style.display = 'block';
                
                // Clear password field
                passwordInput.value = '';
            }
        }
    });
    
    // Guest login
    guestBtn.addEventListener('click', function() {
        localStorage.setItem('isLoggedIn', 'guest');
        window.location.href = 'category.html';
    });
});
